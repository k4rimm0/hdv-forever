"""Base d'équipement de WoW Forever pour la page « Équipement ».

- Liste complète des objets : fichier items.json de metabot.gg (16 000 objets, stats, niveau, emplacement, source).
  On ne garde que ce qui s'équipe. Rafraîchi une fois par jour.
- Détail « comment l'obtenir » de chaque objet : page objet metabot (résumé, boss/donjon, quête, vendeurs) et
  page de la quête (faction, niveau requis). Récupéré petit à petit (budget par passage) et gardé en cache 14 jours.

Le calcul des stuffs (poids de stats par spécialisation) se fait dans le navigateur (site/app.js, GEAR_SPECS).
"""
import re
import time

from farm import UA, _text, parse_page, parse_where

BASE = "https://metabot.gg/en/wow-forever"
# Catégories (index de la liste « Category » de metabot) qu'on garde : armes, armures, bijoux, reliques.
KEEP_CATS = set(range(0, 27)) - {15}          # 15 = canne à pêche ; 27 chemise, 28 tabard exclus
KEEP_SLOTS = {"back", "chest", "feet", "finger", "hands", "head", "held-in-off-hand", "legs", "main-hand", "neck",
              "off-hand", "one-hand", "ranged", "relic", "shoulder", "thrown", "trinket", "two-hand", "waist", "wrist"}
SRC = {1: "v", 2: "d", 3: "q", 4: "c", 5: "o", 6: "o", 7: "f", 8: "s", 9: "p"}


def parse_items(j):
    """items.json -> liste compacte [slug, nom, icône, qualité, ilvl, niveau requis, emplacement, catégorie,
    dps, armure, {stat: valeur}, [classes], source, forever(0/1/2)]."""
    slots, stats = j["slots"], j["stats"]
    out = []
    for r in j["rows"]:
        if len(r) < 13 or r[3] < 1 or r[7] not in KEEP_CATS:
            continue
        slot = slots[r[6]] if 0 <= r[6] < len(slots) else ""
        if slot not in KEEP_SLOTS:
            continue
        st = r[12] or []
        sd = {stats[st[i]]: st[i + 1] for i in range(0, len(st) - 1, 2) if 0 <= st[i] < len(stats)}
        cls = r[15] if len(r) > 15 and isinstance(r[15], list) else []
        src = SRC.get(r[16], "") if len(r) > 16 else ""
        out.append([r[0], r[1], r[2], r[3], r[4], r[5], slot, r[7], round((r[9] or 0) / 10, 1), r[10] or 0, sd, cls, src, r[11] or 0])
    return out


def parse_detail(html):
    """Page objet metabot -> {t: résumé, q: [quêtes], b: [boss/monstres], v: [vendeurs], c: [métier, compétence]}."""
    desc, tables = parse_page(html)
    out = {"t": desc[:260]}
    where = parse_where(html)
    if where.get("v"):
        # [nom, camp h/a/'', sous-titre, zone, x, y, prix, stock limité]
        out["v"] = where["v"][:6]
    quests = []
    for slug_, name in re.findall(r'href="/en/wow-forever/quests/([\w-]+)"[^>]*>(.*?)</a>', html, flags=re.S):
        if slug_ not in [q[0] for q in quests]:
            quests.append([slug_, _text(name)])
    if quests:
        out["q"] = quests[:4]
    drops = []
    for key in ("B", "D"):
        for r in tables.get(key, []):
            drops.append([r["name"], r["pct"], "/".join(r["zones"][:2]), 1 if r["elite"] else 0, r["lmin"], r["lmax"]])
    if not drops:
        # Boss de donjon : résumé « drops from X in Donjon (33% drop chance) ».
        m = re.search(r"drops from (.+?) in (.+?) \(([\d.]+)% drop chance\)", desc)
        if m:
            drops.append([m.group(1), float(m.group(3)), m.group(2), 1, None, None])
    if drops:
        drops.sort(key=lambda d: -(d[1] or 0))
        out["b"] = drops[:5]
        out["bn"] = len(drops)
    m = re.search(r"crafted with ([A-Za-z ]+?) \(skill (\d+)\)", desc)
    if m:
        out["c"] = [m.group(1), int(m.group(2))]
    if re.search(r"Binds when picked up", html):
        out["bop"] = 1
    return out


def parse_quest(html):
    """Page quête -> [faction h/a/'', niveau requis, niveau de la quête, zone, PNJ de départ, x, y]."""
    fac = re.search(r"<dt>Faction</dt><dd>(?:<[^>]+>)*([A-Za-z ]+)<", html)
    req = re.search(r"<dt>Required level</dt><dd>(\d+)<", html)
    sub = re.search(r'_subtitle">([^<]*)</span>', html)
    lvl = re.search(r"Level (\d+) quest", sub.group(1)) if sub else None
    zone = _text(sub.group(1)).split("·")[-1].strip() if sub else ""
    desc = re.search(r'<meta name="description" content="([^"]*)"', html)
    d = _text(desc.group(1)) if desc else ""
    npc = re.search(r"picked up from (.+?) in .+? at (\d+(?:\.\d+)?), (\d+(?:\.\d+)?)", d)
    f = fac.group(1).strip() if fac else ""
    return [{"Horde": "h", "Alliance": "a"}.get(f, ""), int(req.group(1)) if req else None,
            int(lvl.group(1)) if lvl else None, zone, npc.group(1) if npc else "",
            float(npc.group(2)) if npc else None, float(npc.group(3)) if npc else None]


def collect_gear(prev, requests_mod, log, now, budget=500, delay=0.35):
    """prev : état précédent {t, items, det:{slug:[t, détail]}, qu:{slug:[t, quête]}}. Renvoie le nouvel état."""
    st = dict(prev or {})
    st.setdefault("det", {})
    st.setdefault("qu", {})
    s = requests_mod.Session()
    s.headers["User-Agent"] = UA
    if not st.get("items") or now - st.get("t", 0) > 86400 or len(st["items"][0]) < 15:
        try:
            r = s.get(f"{BASE}/items/items.json", timeout=60)
            if r.status_code == 200:
                st["items"] = parse_items(r.json())
                st["t"] = now
                # Noms français : même fichier dans la version française de metabot.
                try:
                    rf = s.get("https://metabot.gg/fr_FR/wow-forever/items/items.json", timeout=60)
                    fr = {row[0]: row[1] for row in rf.json()["rows"]} if rf.status_code == 200 else {}
                    for it in st["items"]:
                        n = fr.get(it[0])
                        it.append(n if n and n != it[1] else "")
                    log("équipement : noms français", sum(1 for it in st["items"] if it[-1]))
                except Exception as e:
                    log("équipement : noms français", type(e).__name__)
                log("équipement : base d'objets", len(st["items"]))
            else:
                log("équipement : items.json statut", r.status_code)
        except Exception as e:
            log("équipement : items.json", type(e).__name__)
    collect_sets(st, s, log, now)
    items = st.get("items") or []
    # Détails : d'abord les objets jamais lus, du plus haut niveau de qualité au plus bas, puis les plus anciens.
    order = sorted(items, key=lambda it: (it[0] in st["det"], st["det"].get(it[0], [0])[0], -it[3], it[5]))
    done = fails = qn = 0
    for it in order:
        if done >= budget:
            break
        slug_ = it[0]
        old = st["det"].get(slug_)
        if old and now - old[0] < 14 * 86400:
            break
        try:
            r = s.get(f"{BASE}/items/{slug_}", timeout=30)
            if r.status_code != 200:
                fails += 1
                st["det"][slug_] = [now, {"err": r.status_code}]
                if r.status_code in (403, 429) and fails > 5:
                    log("équipement : metabot refuse (statut", r.status_code, "), arrêt")
                    break
                continue
            det = parse_detail(r.text)
            for q in det.get("q", []):
                if q[0] in st["qu"] and now - st["qu"][q[0]][0] < 30 * 86400 and len(st["qu"][q[0]][1]) > 7:
                    continue
                time.sleep(delay)
                try:
                    rq = s.get(f"{BASE}/quests/{q[0]}", timeout=30)
                    if rq.status_code == 200:
                        info = parse_quest(rq.text)
                        rf = s.get(f"https://metabot.gg/fr_FR/wow-forever/quests/{q[0]}", timeout=30)
                        mf = re.search(r'_titleMain">(.*?)</span>', rf.text) if rf.status_code == 200 else None
                        info.append(_text(mf.group(1)) if mf else "")
                        st["qu"][q[0]] = [now, info]
                        qn += 1
                except Exception as e:
                    log("équipement : quête", q[0], type(e).__name__)
            st["det"][slug_] = [now, det]
            done += 1
        except Exception as e:
            fails += 1
            log("équipement", slug_, type(e).__name__)
        time.sleep(delay)
    # Noms français des quêtes déjà connues (rattrapage, 400 par passage).
    fq = 0
    for slug_, v in list(st["qu"].items()):
        if fq >= 400:
            break
        if len(v[1]) > 7:
            continue
        try:
            rf = s.get(f"https://metabot.gg/fr_FR/wow-forever/quests/{slug_}", timeout=30)
            mf = re.search(r'_titleMain">(.*?)</span>', rf.text) if rf.status_code == 200 else None
            v[1].append(_text(mf.group(1)) if mf else "")
            fq += 1
        except Exception:
            pass
        time.sleep(delay)
    if fq:
        log("équipement : noms français de quêtes", fq)
    known = sum(1 for it in items if it[0] in st["det"])
    log("équipement : détails lus", done, "quêtes", qn, "échecs", fails, "· connus", known, "/", len(items))
    return st


def parse_set(html):
    """Page de panoplie metabot -> [nom, [objets (slugs)], [[nombre de pièces, texte du bonus], ...]]."""
    name = re.search(r'<title>(.*?) – WoW Forever', html)
    pieces = []
    for slug_ in re.findall(r'_pieceHead"><a [^>]*href="/en/wow-forever/items/([\w-]+)"', html):
        if slug_ not in pieces:
            pieces.append(slug_)
    bonus = [[int(n), _text(txt)] for n, txt in
             re.findall(r'_bonusCount">\((\d)\) Set</span><span class="[^"]*_bonusText">(.*?)</span>', html, flags=re.S)]
    return [_text(name.group(1)) if name else "", pieces, bonus]


def collect_sets(st, s, log, now, delay=0.3):
    """Panoplies (170 environ), rafraîchies une fois par semaine."""
    if st.get("sets") and now - st.get("sets_t", 0) < 7 * 86400:
        return
    try:
        r = s.get(f"{BASE}/item-sets", timeout=30)
        slugs = []
        for x in re.findall(r"/en/wow-forever/item-sets/([a-z0-9-]+)", r.text):
            if x not in slugs:
                slugs.append(x)
        sets = {}
        for x in slugs:
            time.sleep(delay)
            rs = s.get(f"{BASE}/item-sets/{x}", timeout=30)
            if rs.status_code == 200:
                ps = parse_set(rs.text)
                if ps[1] and ps[2]:
                    sets[x] = ps
        if sets:
            st["sets"] = sets
            st["sets_t"] = now
        log("équipement : panoplies", len(sets))
    except Exception as e:
        log("équipement : panoplies", type(e).__name__)


def publish(st):
    """Données publiées pour le site : objets + détails + quêtes (sans les dates)."""
    det = {k: v[1] for k, v in st.get("det", {}).items() if "err" not in v[1]}
    qu = {k: v[1] for k, v in st.get("qu", {}).items()}
    return {"t": st.get("t", 0), "items": st.get("items", [])}, {"det": det, "qu": qu, "sets": st.get("sets", {})}
