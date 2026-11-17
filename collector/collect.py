#!/usr/bin/env python3
"""
Collecteur HDV WoW Forever.

Toutes les heures (via GitHub Actions) :
  1. lit les hôtels des ventes de l'ensemble de règles choisi depuis l'API Blizzard,
  2. calcule pour chaque objet : prix minimum, prix du marché, quantité, ventes estimées,
  3. met à jour l'historique (horaire 72 h, journalier 180 j) et les indices par secteur,
  4. récupère les infos des nouveaux objets (noms FR/EN, niveau, prix PNJ, icône),
  5. rafraîchit les recettes une fois par semaine,
  6. écrit tout chiffré (AES-GCM, clé dérivée du mot de passe du site) dans le dossier de sortie.

Variables d'environnement :
  BLIZZARD_CLIENT_ID, BLIZZARD_CLIENT_SECRET  identifiants develop.battle.net
  SITE_PASSWORD                               mot de passe du site (chiffrement)
  HOUSE_IDS (optionnel)                       ids d'HDV séparés par des virgules
  MOCK_API=1 (optionnel)                      utilise une fausse API (tests)
  MOCK_NOW (optionnel)                        horodatage simulé (tests)
"""
import argparse
import base64
import gzip
import json
import os
import random
import statistics
import sys
import threading
import time
from concurrent.futures import ThreadPoolExecutor

from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TL_WEIGHT = {"VERY_LONG": 1.0, "LONG": 0.9, "MEDIUM": 0.4, "SHORT": 0.0}
EXPANSION_WORDS = ("outland", "northrend", "cataclysm", "pandaria", "draenor", "legion",
                   "zandalari", "kul tiran", "shadowlands", "dragon isles", "khaz algar",
                   "midnight", "quel'thalas")
CRAFT_PROFESSIONS = ("Alchemy", "Blacksmithing", "Cooking", "Engineering", "Leatherworking", "Mining",
                     "Tailoring", "First Aid", "Enchanting")


def log(*a):
    print(time.strftime("[%H:%M:%S]"), *a, flush=True)


def now_ts():
    return int(os.environ.get("MOCK_NOW") or time.time())


# --------------------------------------------------------------------------- chiffrement
class Vault:
    """Lit et écrit des fichiers JSON compressés (gzip) puis chiffrés (AES-256-GCM)."""

    def __init__(self, out_dir, password, iterations):
        self.out = out_dir
        os.makedirs(out_dir, exist_ok=True)
        salt_path = os.path.join(out_dir, "salt.json")
        salt = None
        if os.path.exists(salt_path):
            with open(salt_path) as f:
                meta = json.load(f)
            if meta.get("iterations") == iterations:
                salt = base64.b64decode(meta["salt"])
        if salt is None:
            salt = os.urandom(16)
            with open(salt_path, "w") as f:
                json.dump({"salt": base64.b64encode(salt).decode(), "iterations": iterations}, f)
        kdf = PBKDF2HMAC(algorithm=hashes.SHA256(), length=32, salt=salt, iterations=iterations)
        self.aes = AESGCM(kdf.derive(password.encode("utf-8")))

    def path(self, name):
        return os.path.join(self.out, name + ".bin")

    def write(self, name, obj):
        raw = gzip.compress(json.dumps(obj, separators=(",", ":"), ensure_ascii=False).encode("utf-8"), 6)
        iv = os.urandom(12)
        p = self.path(name)
        os.makedirs(os.path.dirname(p), exist_ok=True)
        with open(p + ".tmp", "wb") as f:
            f.write(iv + self.aes.encrypt(iv, raw, None))
        os.replace(p + ".tmp", p)

    def read(self, name, default=None):
        p = self.path(name)
        if not os.path.exists(p):
            return default
        try:
            with open(p, "rb") as f:
                blob = f.read()
            return json.loads(gzip.decompress(self.aes.decrypt(blob[:12], blob[12:], None)))
        except Exception as e:  # mauvais mot de passe ou fichier abîmé : on repart de zéro
            log("lecture impossible", name, type(e).__name__)
            return default


# --------------------------------------------------------------------------- API Blizzard
class BlizzardAPI:
    def __init__(self, region, client_id, client_secret):
        import requests
        self.requests = requests
        self.region = region
        self.base = f"https://{region}.api.blizzard.com"
        self.local = threading.local()
        r = requests.post(f"https://oauth.battle.net/token", data={"grant_type": "client_credentials"},
                          auth=(client_id, client_secret), timeout=30)
        r.raise_for_status()
        self.token = r.json()["access_token"]

    def _session(self):
        if not hasattr(self.local, "s"):
            self.local.s = self.requests.Session()
            self.local.s.headers["Authorization"] = f"Bearer {self.token}"
        return self.local.s

    def get(self, path, namespace, params=None, if_modified=None, raw=False):
        """Renvoie (statut, json ou None, last_modified)."""
        p = dict(params or {})
        p["namespace"] = f"{namespace}-{self.region}"
        headers = {"If-Modified-Since": if_modified} if if_modified else {}
        for attempt in range(5):
            try:
                r = self._session().get(self.base + path, params=p, headers=headers, timeout=120)
            except self.requests.RequestException as e:
                log("réseau", path, e)
                time.sleep(2 + attempt * 3)
                continue
            if r.status_code == 429 or r.status_code >= 500:
                time.sleep(1 + attempt * 2)
                continue
            lm = r.headers.get("Last-Modified")
            if r.status_code != 200:
                return r.status_code, None, lm
            return 200, (r.content if raw else r.json()), lm
        return 599, None, None


# --------------------------------------------------------------------------- utilitaires
def loc(d):
    """Garde seulement l'anglais et le français d'un nom localisé."""
    if isinstance(d, str):
        return {"en": d, "fr": d}
    if not isinstance(d, dict):
        return {"en": "", "fr": ""}
    en = d.get("en_US") or d.get("en_GB") or next(iter(d.values()), "")
    return {"en": en, "fr": d.get("fr_FR") or en}


def parse_house(listing):
    """Agrège la liste d'annonces d'un HDV par objet.

    Renvoie (stats, auctions) avec
      stats[item] = [prix_min, prix_marché, quantité, nb_annonces]
      auctions[id] = [item, quantité, prix_unitaire, durée]
    """
    per_item = {}
    auctions = {}
    for a in listing:
        try:
            item = a["item"]["id"]
            qty = int(a.get("quantity") or 1)
        except (KeyError, TypeError):
            continue
        if "unit_price" in a:
            unit = int(a["unit_price"])
        elif a.get("buyout"):
            unit = int(a["buyout"]) / max(qty, 1)
        else:
            continue  # enchère seule : pas de prix d'achat immédiat
        if unit <= 0:
            continue
        auctions[str(a["id"])] = [item, qty, round(unit, 2), a.get("time_left", "VERY_LONG")]
        per_item.setdefault(item, []).append((unit, qty))
    stats = {}
    for item, lst in per_item.items():
        lst.sort()
        units = sum(q for _, q in lst)
        target = max(1, units * 0.15)
        acc = 0
        tot = 0.0
        for price, q in lst:
            take = min(q, target - acc)
            tot += price * take
            acc += take
            if acc >= target:
                break
        stats[item] = [round(lst[0][0]), round(tot / acc), units, len(lst)]
    return stats, auctions


def estimate_sales(prev, cur, gap_s):
    """Unités probablement vendues par objet entre deux relevés.

    Une annonce qui disparaît alors qu'il lui restait du temps est comptée comme vendue
    (pondérée selon sa durée restante). Une annonce de matières premières dont la quantité
    baisse compte pour la différence. Renvoie None si l'écart entre relevés est trop grand.
    """
    if not prev or gap_s < 20 * 60 or gap_s > 3 * 3600:
        return None
    sold = {}
    for aid, (item, qty, unit, tl) in prev.items():
        c = cur.get(aid)
        if c is None:
            w = TL_WEIGHT.get(tl, 0.5)
            if w:
                sold[item] = sold.get(item, 0) + qty * w
        elif c[1] < qty:
            sold[item] = sold.get(item, 0) + (qty - c[1])
    return sold


def nearest(points, t, max_gap):
    best = None
    for p in points:
        d = abs(p[0] - t)
        if d <= max_gap and (best is None or d < best[0]):
            best = (d, p)
    return best[1] if best else None


def pct(a, b):
    if a is None or b is None or not b:
        return None
    return round((a - b) / b * 100, 1)


CATEGORY_RULES = [
    ("ALL", None, None), ("TRADE", 7, None), ("CONS", 0, None), ("GEAR", (2, 4), None), ("RECIPE", 9, None),
    ("CLOTH", 7, 5), ("LEATHER", 7, 6), ("ORE", 7, 7), ("MEAT", 7, 8), ("HERB", 7, 9), ("ELEM", 7, 10),
    ("ENCH", 7, 12), ("POT", 0, 1), ("ELIX", 0, 2), ("SCROLL", 0, 4), ("FOOD", 0, 5), ("BAND", 0, 7),
]


def categories_of(meta):
    if not meta:
        return ["ALL"]
    c, sc = meta.get("c"), meta.get("sc")
    out = []
    for key, cls, sub in CATEGORY_RULES:
        if cls is None:
            out.append(key)
        elif isinstance(cls, tuple):
            if c in cls:
                out.append(key)
        elif c == cls and (sub is None or sc == sub):
            out.append(key)
    return out


# --------------------------------------------------------------------------- collecte
class Collector:
    def __init__(self, cfg, api, vault):
        self.cfg = cfg
        self.api = api
        self.v = vault
        self.t = now_ts()

    # ----- HDV
    def list_houses(self):
        status, data, _ = self.api.get(f"/data/wow/ruleset/{self.cfg['ruleset']}/auctions/", "dynamic-forever")
        if status != 200 or not data:
            raise SystemExit(f"Index des HDV indisponible (statut {status})")
        houses = []
        for h in data.get("auctions", []):
            name = h.get("name")
            name_en = loc(name)["en"] if isinstance(name, dict) else (name or "")
            low = name_en.lower()
            faction = "alliance" if "alliance" in low else "horde" if "horde" in low else "neutral"
            houses.append({"id": h["id"], "key": h.get("key"), "name": name_en, "faction": faction})
        return houses

    def select_houses(self, houses):
        wanted = [int(x) for x in os.environ.get("HOUSE_IDS", "").replace(" ", "").split(",") if x] \
            or self.cfg.get("house_ids") or []
        if wanted:
            return [h for h in houses if h["id"] in wanted]
        return houses

    def fetch_house(self, house, prev_state):
        rs = self.cfg["ruleset"]
        hid = house["id"]
        lm_prev = (prev_state or {}).get("lm")
        status, body, lm = self.api.get(f"/data/wow/ruleset/{rs}/auctions/{hid}", "dynamic-forever",
                                        if_modified=lm_prev)
        if status == 304 or (lm and lm == lm_prev):
            return None
        if status != 200:
            log("HDV", hid, "statut", status)
            return None
        listing = list(body.get("auctions") or [])
        s2, com, _ = self.api.get(f"/data/wow/ruleset/{rs}/auctions/{hid}/commodities", "dynamic-forever")
        if s2 == 200 and com:
            listing += com.get("auctions") or []
        return {"lm": lm, "listing": listing}

    # ----- objets
    def update_tooltips(self, items, tt, budget=4000):
        """Infobulle façon jeu (effets « Utiliser : », stats, niveau requis…) depuis preview_item."""
        todo = [k for k in items if not k.startswith("_") and k not in tt][:budget]
        if not todo:
            return tt
        if os.environ.get("MOCK_API"):
            from mockapi import TOOLTIPS
            for k in todo:
                tt[k] = TOOLTIPS.get(k, [])
            return tt

        def d2(x):
            return loc((x or {}).get("display_string")) if isinstance(x, dict) and x.get("display_string") else None

        def one(k):
            for ns in ("static-forever", "static-classic1x", "static"):
                st, d, _ = self.api.get(f"/data/wow/item/{k}", ns)
                if st == 200 and d:
                    break
            else:
                return k, None
            p = d.get("preview_item") or {}
            lines = []
            def add(text, col=""):
                if text and (text.get("en") or text.get("fr")):
                    lines.append([text, col])
            add(loc((p.get("binding") or {}).get("name")) if p.get("binding") else None)
            add(loc(p.get("unique_equipped")) if p.get("unique_equipped") else None)
            inv = (p.get("inventory_type") or {}).get("name")
            if inv and (p.get("inventory_type") or {}).get("type") not in ("NON_EQUIP",):
                add(loc(inv))
            w = p.get("weapon") or {}
            add(d2(w.get("damage")))
            add(d2(w.get("attack_speed")))
            add(d2(w.get("dps")))
            add(d2((p.get("armor") or {}).get("display")))
            for s in p.get("stats") or []:
                add(d2(s.get("display")), "g" if s.get("is_negated") is False and (s.get("type") or {}).get("type", "").endswith("_RATING") else "")
            for s in p.get("spells") or []:
                add(loc(s.get("description")), "u")
            add(d2((p.get("durability") or {})))
            req = p.get("requirements") or {}
            add(d2(req.get("level")))
            add(d2(req.get("skill")))
            add(d2(req.get("playable_classes")))
            add(loc(p.get("crafting_reagent")) if p.get("crafting_reagent") else None, "b")
            add(loc(p.get("description")) if p.get("description") else None, "y")
            return k, lines

        got = 0
        with ThreadPoolExecutor(16) as ex:
            for k, lines in ex.map(one, todo):
                if lines is None:
                    tt[k] = []
                    continue
                tt[k] = lines
                got += bool(lines)
        log(f"infobulles : {len(todo)} objets lus, {got} avec du texte, {sum(1 for k in items if not k.startswith('_') and k not in tt)} restants")
        return tt

    def fill_icons(self, items):
        """Complète les icônes manquantes avec le catalogue de LifeOnAzeroth (une fois par jour au plus)."""
        missing = [k for k, m in items.items() if not k.startswith("_") and not m.get("ic")]
        meta = items.setdefault("_icons", {})
        if not missing or os.environ.get("MOCK_API") or self.t - meta.get("t", 0) < 86400:
            return
        meta["t"] = self.t
        try:
            import requests
            r = requests.get("https://forever-live.sanredz.workers.dev/v1/catalog", timeout=60,
                             headers={"User-Agent": "hdv-forever personal tracker"})
            cat = r.json() if r.status_code == 200 else {}
        except Exception as e:
            log("catalogue d'icônes :", type(e).__name__)
            return
        if isinstance(cat, dict) and "items" in cat and isinstance(cat["items"], dict):
            cat = cat["items"]
        got = 0
        for k in missing:
            row = cat.get(k) if isinstance(cat, dict) else None
            ic = row[2] if isinstance(row, list) and len(row) > 2 else (row or {}).get("icon") if isinstance(row, dict) else None
            if ic:
                items[k]["ic"] = str(ic).rsplit("/", 1)[-1].rsplit(".", 1)[0].lower()
                got += 1
        log(f"icônes : {len(missing)} manquantes, {got} complétées")

    def update_items(self, items, ids):
        miss = items.setdefault("_missing", {})
        retry = self.cfg["item_retry_days"] * 86400
        todo = [i for i in ids if str(i) not in items and self.t - miss.get(str(i), 0) > retry]
        if not todo:
            return
        log("nouveaux objets à décrire :", len(todo))

        def one(item_id):
            for ns in ("static-forever", "static-classic1x", "static"):
                st, d, _ = self.api.get(f"/data/wow/item/{item_id}", ns)
                if st == 200 and d:
                    break
            else:
                return item_id, None
            icon = None
            for ns2 in (ns, "static"):
                st, m, _ = self.api.get(f"/data/wow/media/item/{item_id}", ns2)
                if st == 200 and m:
                    for a in m.get("assets", []):
                        if a.get("key") == "icon":
                            icon = a["value"].rsplit("/", 1)[-1].rsplit(".", 1)[0]
                    break
            ic = d.get("item_class") or {}
            sc = d.get("item_subclass") or {}
            return item_id, {
                "n": loc(d.get("name")), "q": (d.get("quality") or {}).get("type", "COMMON"),
                "c": ic.get("id"), "sc": sc.get("id"),
                "cn": loc(ic.get("name")), "scn": loc(sc.get("display_name") or sc.get("name")),
                "il": d.get("level") or 0, "rl": d.get("required_level") or 0,
                "bp": d.get("purchase_price") or 0, "pq": d.get("purchase_quantity") or 1,
                "sp": d.get("sell_price") or 0, "ms": d.get("max_count") or 0, "ic": icon,
            }

        done = 0
        with ThreadPoolExecutor(16) as ex:
            for item_id, meta in ex.map(one, todo):
                if meta:
                    items[str(item_id)] = meta
                    miss.pop(str(item_id), None)
                else:
                    miss[str(item_id)] = self.t
                done += 1
                if done % 500 == 0:
                    log("  objets", done, "/", len(todo))

    # ----- recettes
    def update_recipes(self, recipes):
        if recipes and recipes.get("v") == 2 and self.t - recipes.get("t", 0) < self.cfg["recipes_refresh_days"] * 86400:
            return recipes
        log("rafraîchissement des recettes")
        out = []
        for ns in ("static-forever", "static"):
            st, idx, _ = self.api.get("/data/wow/profession/index", ns)
            if st != 200 or not idx:
                continue
            for prof in idx.get("professions", []):
                pname = loc(prof.get("name"))
                if pname["en"] not in CRAFT_PROFESSIONS:
                    continue
                st, pd, _ = self.api.get(f"/data/wow/profession/{prof['id']}", ns)
                tiers = (pd or {}).get("skill_tiers") or []
                if not tiers:
                    continue
                tier = None
                for t in tiers:
                    if "classic" in loc(t.get("name"))["en"].lower():
                        tier = t
                if tier is None:
                    plain = [t for t in tiers if not any(w in loc(t.get("name"))["en"].lower() for w in EXPANSION_WORDS)]
                    tier = min(plain or tiers, key=lambda t: t["id"])
                st, td, _ = self.api.get(f"/data/wow/profession/{prof['id']}/skill-tier/{tier['id']}", ns)
                rids = [r["id"] for cat in (td or {}).get("categories", []) for r in cat.get("recipes", [])]

                def one(rid):
                    st, rd, _ = self.api.get(f"/data/wow/recipe/{rid}", ns)
                    if st != 200 or not rd:
                        return None
                    ci = rd.get("crafted_item") or rd.get("horde_crafted_item") or rd.get("alliance_crafted_item")
                    if not ci:
                        return None
                    cq = rd.get("crafted_quantity") or {}
                    qty = cq.get("value") or ((cq.get("minimum", 1) + cq.get("maximum", 1)) / 2)
                    reag = [[r["reagent"]["id"], r["quantity"]] for r in rd.get("reagents", []) if r.get("reagent")]
                    if not reag:
                        return None
                    return {"id": rid, "p": pname["en"], "n": loc(rd.get("name")), "o": ci["id"], "oq": qty, "r": reag}

                with ThreadPoolExecutor(12) as ex:
                    out += [r for r in ex.map(one, rids) if r]
            if out:
                log("recettes trouvées :", len(out), "via", ns)
                break
        if not out and recipes:
            return recipes
        return {"t": self.t, "v": 2, "list": out}

    # ----- historique et marché
    def update_history(self, hid, stats, sold, valid_sales):
        hp = self.cfg["hourly_points"]
        dp = self.cfg["daily_points"]
        shards = self.cfg["history_shards"]
        day = self.t // 86400 * 86400
        by_shard = {}
        for item in stats:
            by_shard.setdefault(item % shards, []).append(item)
        market = {}
        idx_points = {}
        for s in range(shards):
            name = f"d/h_{hid}_{s}"
            hist = self.v.read(name, {}) or {}
            touched = set(by_shard.get(s, []))
            for key in set(hist.keys()) | {str(i) for i in touched}:
                item = int(key)
                h = hist.get(key) or {"h": [], "d": [], "b": None}
                st = stats.get(item)
                if st:
                    sv = round(sold.get(item, 0), 1) if valid_sales else None
                    h["h"].append([self.t, st[0], st[1], st[2], sv])
                    if h.get("b") is None:
                        h["b"] = st[1]
                else:
                    sv = 0 if valid_sales else None
                    h["h"].append([self.t, None, None, 0, sv])
                h["h"] = h["h"][-hp:]
                todays = [p for p in h["h"] if p[0] >= day]
                prices = [p[2] for p in todays if p[2]]
                mins = [p[1] for p in todays if p[1]]
                sold_vals = [p[4] for p in todays if p[4] is not None]
                dayrow = [day, round(statistics.median(prices)) if prices else None, min(mins) if mins else None,
                          round(sum(p[3] for p in todays) / len(todays)) if todays else 0,
                          round(sum(sold_vals), 1) if sold_vals else None, len(sold_vals)]
                if h["d"] and h["d"][-1][0] == day:
                    h["d"][-1] = dayrow
                else:
                    h["d"].append(dayrow)
                h["d"] = h["d"][-dp:]
                if not any(p[1] for p in h["h"]) and not any(d[1] for d in h["d"]):
                    hist.pop(key, None)
                    continue
                hist[key] = h
                market[item] = self.summarize(item, h, st)
                if st and h.get("b"):
                    idx_points[item] = st[1] / h["b"] * 100
            self.v.write(name, hist)
        return market, idx_points

    def summarize(self, item, h, st):
        cur_min, cur_mkt, qty, listings = st if st else (None, None, 0, 0)
        p24 = nearest(h["h"], self.t - 86400, 3 * 3600)
        if p24 is not None:
            mkt24 = p24[2]
        else:
            d24 = nearest(h["d"][:-1], self.t - 86400, 36 * 3600)
            mkt24 = d24[1] if d24 else None
        d7 = nearest(h["d"], self.t - 7 * 86400, 36 * 3600)
        d30 = nearest(h["d"], self.t - 30 * 86400, 48 * 3600)
        hourly_sales = [p for p in h["h"] if p[4] is not None]
        full_days = [d for d in h["d"][:-1][-7:] if d[4] is not None and d[5] >= 12]
        if len(full_days) >= 2:
            per_day = sum(d[4] * 24 / d[5] for d in full_days) / len(full_days)
        elif len(hourly_sales) >= 3:
            per_day = sum(p[4] for p in hourly_sales) / len(hourly_sales) * 24
        else:
            per_day = None
        last24 = [p[2] for p in h["h"] if p[0] > self.t - 86400 and p[2]]
        return [cur_min, cur_mkt, qty, listings,
                round(per_day, 1) if per_day is not None else None,
                round(statistics.mean(last24)) if last24 else None,
                pct(cur_mkt, mkt24),
                pct(cur_mkt, d7[1] if d7 else None),
                pct(cur_mkt, d30[1] if d30 else None)]

    def update_indexes(self, hid, items, idx_points):
        series = self.v.read(f"d/idx_{hid}", {}) or {}
        by_cat = {}
        for item, v in idx_points.items():
            for cat in categories_of(items.get(str(item))):
                by_cat.setdefault(cat, []).append(v)
        day = self.t // 86400 * 86400
        for cat, vals in by_cat.items():
            if len(vals) < 3:
                continue
            val = round(statistics.median(vals), 2)
            s = series.setdefault(cat, {"h": [], "d": []})
            s["h"].append([self.t, val, len(vals)])
            s["h"] = s["h"][-self.cfg["hourly_points"]:]
            if s["d"] and s["d"][-1][0] == day:
                s["d"][-1] = [day, val, len(vals)]
            else:
                s["d"].append([day, val, len(vals)])
            s["d"] = s["d"][-self.cfg["daily_points"]:]
        self.v.write(f"d/idx_{hid}", series)

    # ----- exécution complète
    def vendor_ids(self):
        try:
            return [v["id"] for v in json.load(open(os.path.join(ROOT, "data", "vendor_items.json"))).get("items", [])]
        except Exception:
            return []

    def run(self):
        houses = self.list_houses()
        log("HDV listés :", len(houses))
        selected = self.select_houses(houses)
        meta_prev = self.v.read("d/meta", {}) or {}
        house_meta = {h["id"]: h for h in meta_prev.get("houses", [])}
        all_ids = set()
        changed = 0
        for house in selected:
            hid = house["id"]
            prev = self.v.read(f"state/auctions_{hid}", None)
            got = self.fetch_house(house, prev)
            hm = house_meta.get(hid, {})
            hm.update(house)
            house_meta[hid] = hm
            if got is None:
                log("HDV", hid, house["name"], ": pas de nouveau relevé")
                if prev:
                    all_ids.update(int(v[0]) for v in prev["a"].values())
                continue
            stats, auctions = parse_house(got["listing"])
            gap = self.t - (prev or {}).get("t", 0)
            sold = estimate_sales((prev or {}).get("a"), auctions, gap)
            valid = sold is not None
            log("HDV", hid, house["name"], ":", len(got["listing"]), "annonces,", len(stats), "objets,",
                "ventes estimées" if valid else "ventes non estimées (premier relevé ou trou)")
            self.v.write(f"state/auctions_{hid}", {"lm": got["lm"], "t": self.t, "a": auctions})
            all_ids.update(stats.keys())
            hm["_stats"] = stats
            hm["_sold"] = sold or {}
            hm["_valid"] = valid
            hm["auctions"] = len(got["listing"])
            hm["value"] = round(sum(s[1] * s[2] for s in stats.values()))
            hm["items"] = len(stats)
            hm["updated"] = self.t
            hm["lm"] = got["lm"]
            changed += 1

        items = self.v.read("state/items", {}) or {}
        # Décrit aussi les objets des recettes (résultats et composants), même jamais vus à l'HDV.
        for rc in ((self.v.read("state/recipes", None) or {}).get("list") or []):
            all_ids.add(int(rc["o"]))
            all_ids.update(int(r[0]) for r in rc.get("r") or [])
        self.update_items(items, sorted(all_ids))
        self.fill_icons(items)
        tt = self.update_tooltips(items, self.v.read("state/tt", None) or {})
        self.v.write("state/tt", tt)
        self.v.write("d/tt", {k: v for k, v in tt.items() if v})
        self.v.write("state/items", items)

        for house in selected:
            hm = house_meta[house["id"]]
            if "_stats" not in hm:
                continue
            market, idx_points = self.update_history(house["id"], hm.pop("_stats"), hm.pop("_sold"), hm.pop("_valid"))
            self.v.write(f"d/m_{house['id']}", {"t": self.t, "items": {str(k): v for k, v in market.items()}})
            self.update_indexes(house["id"], items, idx_points)

        farm = self.v.read("state/farm", None)
        stale = not farm or self.t - farm.get("t", 0) > 7 * 86400 or farm.get("v", 1) < 4
        if stale and not os.environ.get("MOCK_API"):
            import requests
            from farm import collect as farm_collect
            got = farm_collect(items, requests, log, extra_ids=self.vendor_ids())
            if got:
                farm = {"t": self.t, "v": 4, "items": got}
            else:  # échec : on garde l'ancien et on réessaie dans un jour
                farm = {"t": self.t - 6 * 86400, "items": (farm or {}).get("items", {})}
        elif stale:
            from mockapi import FARM
            farm = {"t": self.t, "v": 4, "items": FARM}
        farm = farm or {"t": 0, "items": {}}
        self.v.write("state/farm", farm)
        self.v.write("d/farm", farm["items"])
        self._farm_items = farm["items"]

        recipes = self.update_recipes(self.v.read("state/recipes", None))
        self.v.write("state/recipes", recipes)
        custom = json.load(open(os.path.join(ROOT, "data", "recipes_custom.json")))
        rlist = list(recipes.get("list", []))
        for i, r in enumerate(custom.get("recipes", [])):
            if r.get("disabled"):
                continue
            rlist.append({"id": f"c{i}", "p": r["profession"], "n": loc(r.get("name")), "o": r["out"],
                          "oq": r.get("out_qty", 1), "r": r["reagents"], "custom": True})
        vendor = json.load(open(os.path.join(ROOT, "data", "vendor_items.json")))
        site_items = {k: v for k, v in items.items() if not k.startswith("_")}
        self.v.write("d/items", site_items)
        self.v.write("d/recipes", rlist)
        craft = self.v.read("state/craft", None)
        if not os.environ.get("MOCK_API"):
            import requests
            from farm import collect_craft, fetch_maps
            craft = collect_craft(craft, rlist, items, requests, log, self.t,
                                  budget=int(os.environ.get("CRAFT_BUDGET", "350")))
            fetch_maps({**self._farm_items, **craft["r"]}, self.v.out, requests, log)
        elif craft is None:
            from mockapi import CRAFT
            craft = CRAFT
        import copy
        from farm import validate
        pub_farm = copy.deepcopy(self._farm_items)
        pub_rec = copy.deepcopy(craft["r"])
        problems = validate(pub_farm, pub_rec, self.v.out, log) if not os.environ.get("MOCK_API") else []
        self.v.write("d/farm", pub_farm)
        if not os.environ.get("MOCK_API"):
            from farm import collect_wfb
            wfb = collect_wfb(self.v.read("state/wfb", None), items, requests, log, self.t)
            self.v.write("state/wfb", wfb)
            self.v.write("d/wfb", wfb.get("p", {}))
        npcs = self.v.read("state/npcs", None) or {}
        if not os.environ.get("MOCK_API"):
            from farm import collect_npcs
            npcs = collect_npcs(npcs, self._farm_items, requests, log, self.t, budget=int(os.environ.get("NPC_BUDGET", "400")))
        else:
            from mockapi import NPCS
            npcs = npcs or NPCS
        self.v.write("state/npcs", npcs)
        self.v.write("d/npcs", {k: {k2: v2 for k2, v2 in v.items() if k2 != "t"} for k, v in npcs.items() if v.get("nm")})
        self.v.write("d/checks", {"t": self.t, "problems": problems[:200], "n": len(problems)})
        self.v.write("state/craft", craft)
        self.v.write("d/craft", {"o": {k: v.get("c", []) for k, v in craft["o"].items()},
                                 "r": {k: {k2: v2 for k2, v2 in v.items() if k2 != "t"} for k, v in pub_rec.items()}})
        self.v.write("d/vendor", vendor.get("items", []))
        self.v.write("d/meta", {
            "t": self.t, "region": self.cfg["region"], "ruleset": self.cfg["ruleset"],
            "ruleset_name": self.cfg.get("ruleset_name"), "ah_cut": self.cfg["ah_cut"],
            "shards": self.cfg["history_shards"],
            "houses": [house_meta[h["id"]] for h in houses if h["id"] in house_meta],
            "tracked": [h["id"] for h in selected],
            "all_houses": houses,
        })
        log("terminé :", changed, "HDV mis à jour,", len(site_items), "objets décrits,", len(rlist), "recettes")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", default=os.path.join(ROOT, "public"))
    args = ap.parse_args()
    cfg = json.load(open(os.path.join(ROOT, "config.json")))
    password = os.environ.get("SITE_PASSWORD")
    if not password:
        sys.exit("SITE_PASSWORD manquant")
    vault = Vault(os.path.join(args.out), password, cfg["kdf_iterations"])
    if os.environ.get("MOCK_API"):
        sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
        from mockapi import MockAPI
        api = MockAPI(now_ts())
    else:
        cid, sec = os.environ.get("BLIZZARD_CLIENT_ID"), os.environ.get("BLIZZARD_CLIENT_SECRET")
        if not cid or not sec:
            sys.exit("BLIZZARD_CLIENT_ID / BLIZZARD_CLIENT_SECRET manquants")
        api = BlizzardAPI(cfg["region"], cid, sec)
    Collector(cfg, api, vault).run()


if __name__ == "__main__":
    main()
