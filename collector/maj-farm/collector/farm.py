"""Sources de farm : monstres et taux de drop, filons/herbes, dépeçage, pêche, compétence requise.

Les taux de drop viennent des pages objets de metabot.gg (données de Classic reprises pour
WoW Forever, Blizzard a pu en changer certaines). Rafraîchi une fois par semaine.
"""
import re
import time

UA = "hdv-forever personal price tracker (weekly, ~200 pages)"
DUNGEONS = re.compile(r"Deadmines|Wailing Caverns|Blackfathom|Razorfen|Shadowfang|Zul'Gurub|Molten Core|Maraudon|"
                      r"Dire Maul|Blackrock|Stockade|Scarlet|Uldaman|Gnomeregan|Zul'Farrak|Sunken Temple|Stratholme|"
                      r"Scholomance|Blackwing|Ahn'Qiraj|Ragefire|Onyxia|Temple of Atal")
CRAFTED = re.compile(r"\bBar\b|Bolt of|Thread|Cured |Grinding|Simple Flour|^Salt$|Refined|Enchanted|Seeds|"
                     r"Elemental Flux|^Coal$|Guardian Stone|Seasonal Fish|Ruined Leather|Mooncloth|Essence of Undeath")

# Compétence de récolte minimale (valeurs de Classic).
HERB_SKILL = {
    "Peacebloom": 1, "Silverleaf": 1, "Earthroot": 15, "Mageroyal": 50, "Briarthorn": 70, "Swiftthistle": 50,
    "Stranglekelp": 85, "Bruiseweed": 100, "Wild Steelbloom": 115, "Grave Moss": 120, "Kingsblood": 125,
    "Liferoot": 150, "Fadeleaf": 160, "Goldthorn": 170, "Khadgar's Whisker": 185, "Wintersbite": 195,
    "Firebloom": 205, "Purple Lotus": 210, "Wildvine": 210, "Arthas' Tears": 220, "Sungrass": 230,
    "Blindweed": 235, "Ghost Mushroom": 245, "Gromsblood": 250, "Golden Sansam": 260, "Dreamfoil": 270,
    "Mountain Silversage": 280, "Plaguebloom": 285, "Icecap": 290, "Black Lotus": 300,
}
MINING_SKILL = {
    "Copper Ore": 1, "Rough Stone": 1, "Tin Ore": 65, "Coarse Stone": 65, "Silver Ore": 75, "Iron Ore": 125,
    "Heavy Stone": 125, "Gold Ore": 155, "Mithril Ore": 175, "Solid Stone": 175, "Truesilver Ore": 230,
    "Dark Iron Ore": 230, "Thorium Ore": 245, "Dense Stone": 245,
}


def skinning_skill(level):
    """Compétence de dépeçage requise pour une bête de ce niveau (formule de Classic)."""
    if level is None:
        return None
    if level <= 10:
        return 1
    if level <= 20:
        return (level - 10) * 10
    return level * 5


def slug(name):
    s = name.lower().replace("'", "")
    return re.sub(r"[^a-z0-9]+", "-", s).strip("-")


def _text(html):
    html = re.sub(r"<!--.*?-->", "", html, flags=re.S)
    txt = re.sub(r"<[^>]+>", "", html)
    return (txt.replace("&#x27;", "'").replace("&#39;", "'").replace("&amp;", "&").replace("&quot;", '"')
            .replace("&lt;", "<").replace("&gt;", ">")).strip()


def parse_page(html):
    """Renvoie (description, {lettre_tableau: [lignes]}) d'une page objet metabot."""
    m = re.search(r'<meta name="description" content="([^"]*)"', html)
    desc = _text(m.group(1)) if m else ""
    tables = {}
    for t in re.findall(r"<table.*?</table>", html, flags=re.S):
        cap = re.search(r"<caption[^>]*>(.*?)</caption>", t, flags=re.S)
        if not cap:
            continue
        key = _text(cap.group(1))[:1]
        if key not in "BDL":
            continue
        body = re.search(r"<tbody>(.*?)</tbody>", t, flags=re.S)
        rows = []
        for tr in re.findall(r"<tr>(.*?)</tr>", body.group(1) if body else "", flags=re.S):
            cells = re.findall(r"<t[hd][^>]*>(.*?)</t[hd]>", tr, flags=re.S)
            if len(cells) < 3:
                continue
            first = cells[0]
            name_m = re.search(r"<bdi>(.*?)</bdi>", first, flags=re.S)
            name = _text(name_m.group(1)) if name_m else _text(first)
            sub = re.search(r'class="[^"]*_sub"[^>]*>(.*?)</span>', first, flags=re.S)
            lv = re.search(r"(\d+)(?:–(\d+))?", _text(sub.group(1))) if sub else None
            elite = bool(re.search(r">\s*(Elite|Boss|Rare Elite)\s*<", first))
            zones = [_text(z) for z in re.findall(r"<a [^>]*>(.*?)</a>", cells[1], flags=re.S)]
            more = re.search(r"\+(?:<!-- -->)?(\d+)", cells[1])
            pc = re.search(r"<b>([\d.]+)%</b>", cells[2])
            qty = re.search(r"×(?:<!-- -->)?(\d+(?:–\d+)?)", cells[2])
            rows.append({
                "name": name, "lmin": int(lv.group(1)) if lv else None,
                "lmax": int(lv.group(2) or lv.group(1)) if lv else None, "elite": elite,
                "zones": zones, "more": int(more.group(1)) if more else 0,
                "pct": float(pc.group(1)) if pc else None, "qty": qty.group(1) if qty else "",
            })
        tables.setdefault(key, []).extend(rows)
    return desc, tables


def summarize(name, desc, tables):
    mobs, seen = [], set()
    for key in ("B", "D"):
        for r in tables.get(key, []):
            zone = "/".join(r["zones"])
            if r["elite"] or r["pct"] is None or r["name"] in seen or DUNGEONS.search(zone) or not r["zones"]:
                continue
            seen.add(r["name"])
            mobs.append([r["name"], r["lmin"], r["lmax"], r["zones"][0], r["pct"], r["qty"]])
    mobs.sort(key=lambda x: -x[4])
    nodes = []
    for r in tables.get("L", []):
        if re.search(r"Chest|Crate|Strongbox|Trunk|Box|Cache|Grave", r["name"], re.I) or (r["pct"] or 0) < 20:
            continue
        nodes.append([r["name"], r["zones"][:3], r["more"], r["pct"]])
    nodes = nodes[:3]
    sk = re.search(r"skinned from level (\d+)–(\d+) creatures; (.+?) in (.+?) gives it most often \(([\d.]+)%\)", desc)
    fi = re.search(r"caught by fishing in (?:\d+ zones?, most often in )?(.+?) \(([\d.]+)% of catches\)", desc)
    out = {"m": mobs[:3], "n": nodes}
    if sk:
        lo = int(sk.group(1))
        out["s"] = [lo, int(sk.group(2)), sk.group(3), sk.group(4), float(sk.group(5)), skinning_skill(max(lo, 1))]
    if fi:
        out["f"] = [fi.group(1), float(fi.group(2))]
    if name in HERB_SKILL:
        out["k"] = ["herb", HERB_SKILL[name]]
    elif name in MINING_SKILL:
        out["k"] = ["mining", MINING_SKILL[name]]
    if "new in WoW Forever" in desc:
        out["new"] = 1
    return out


def collect(items, requests_mod, log, delay=0.6):
    """items : dict id -> meta (avec n.en, c, sc). Renvoie {id: résumé}."""
    targets = []
    for k, m in items.items():
        if k.startswith("_") or m.get("c") != 7 or m.get("sc") not in (5, 6, 7, 8, 9, 10):
            continue
        en = (m.get("n") or {}).get("en") or ""
        if en and not CRAFTED.search(en):
            targets.append((k, en))
    log("sources de farm à récupérer :", len(targets))
    s = requests_mod.Session()
    s.headers["User-Agent"] = UA
    out, fails = {}, 0
    for k, en in targets:
        try:
            r = s.get(f"https://metabot.gg/en/wow-forever/items/{slug(en)}", timeout=30)
            if r.status_code == 200:
                desc, tables = parse_page(r.text)
                out[k] = summarize(en, desc, tables)
            else:
                fails += 1
                if r.status_code in (403, 429) and fails > 5:
                    log("metabot refuse les requêtes (statut", r.status_code, "), arrêt")
                    break
        except Exception as e:  # réseau
            fails += 1
            log("farm", en, type(e).__name__)
        time.sleep(delay)
    log("sources de farm récupérées :", len(out), "échecs :", fails)
    return out
