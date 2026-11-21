"""Convertit les objets relevés sur Wowhead (section WoW Forever) au format de la base d'équipement du site.
Entrée : listes [id, nom, qualité, niv. objet, niv. requis, slotbak, classe, sous-classe, icône, jsonequip, source, sourcemore]
Sortie : data/gear_wh.json = {"items": [lignes comme metabot], "det": {slug: {...}}, "qu": {slug: info}}"""
import json, re, sys
SLOT = {1: 'head', 2: 'neck', 3: 'shoulder', 5: 'chest', 20: 'chest', 6: 'waist', 7: 'legs', 8: 'feet', 9: 'wrist', 10: 'hands', 11: 'finger',
        12: 'trinket', 16: 'back', 13: 'one-hand', 14: 'off-hand', 15: 'ranged', 17: 'two-hand', 21: 'main-hand', 22: 'off-hand',
        23: 'held-in-off-hand', 25: 'thrown', 26: 'ranged', 28: 'relic'}
WCAT = {15: 0, 7: 1, 8: 2, 0: 3, 1: 4, 4: 5, 5: 6, 6: 7, 10: 8, 13: 9, 2: 10, 3: 11, 18: 12, 19: 13, 16: 14}
ACAT = {1: 16, 2: 17, 3: 18, 4: 19, 6: 20}
STAT = {'sta': 'stamina', 'int': 'intellect', 'spi': 'spirit', 'str': 'strength', 'agi': 'agility', 'splpwr': 'spell-power', 'splheal': 'healing',
        'spldmg': 'spell-damage', 'manargn': 'mana-regen', 'healthrgn': 'health-regen', 'atkpwr': 'attack-power', 'rgdatkpwr': 'ranged-attack-power',
        'critstrkrtng': 'crit-rating', 'hitrtng': 'hit-rating', 'hastertng': 'haste-rating', 'dodgertng': 'dodge-rating', 'parryrtng': 'parry-rating',
        'blockrtng': 'block-rating', 'exprtng': 'expertise-rating', 'defrtng': 'defense-rating', 'armorbonus': 'bonus-armor', 'blockamount': 'block-value',
        'natres': 'nature-resistance', 'firres': 'fire-resistance', 'frores': 'frost-resistance', 'shares': 'shadow-resistance', 'arcres': 'arcane-resistance',
        'shasplpwr': 'shadow-damage-done', 'firsplpwr': 'fire-damage-done', 'frosplpwr': 'frost-damage-done', 'arcsplpwr': 'arcane-damage-done',
        'holsplpwr': 'holy-damage-done', 'natsplpwr': 'nature-damage-done', 'splpen': 'spell-penetration'}
CLS = {1: 'warrior', 2: 'paladin', 4: 'hunter', 8: 'rogue', 16: 'priest', 64: 'shaman', 128: 'mage', 256: 'warlock', 1024: 'druid'}
ZONE = {1581: 'Deadmines', 718: 'Wailing Caverns', 209: 'Shadowfang Keep', 719: 'Blackfathom Deeps', 717: 'Stormwind Stockade', 721: 'Gnomeregan',
        491: 'Razorfen Kraul', 796: 'Scarlet Monastery', 722: 'Razorfen Downs', 1337: 'Uldaman', 1176: "Zul'Farrak", 2100: 'Maraudon',
        1477: "The Temple of Atal'Hakkar", 1584: 'Blackrock Depths', 1583: 'Blackrock Spire', 2557: 'Dire Maul', 2057: 'Scholomance', 2017: 'Stratholme',
        2717: 'Molten Core', 2159: "Onyxia's Lair", 2677: 'Blackwing Lair', 1977: "Zul'Gurub", 3429: "Ruins of Ahn'Qiraj", 3428: "Ahn'Qiraj Temple",
        3456: 'Naxxramas', 2437: 'Ragefire Chasm', 16611: 'Ruins of Lordaeron', 16544: 'City of Dalaran', 16560: 'City of Dalaran',
        16842: "Krol'dok Stronghold", 16620: 'Alcaz Prison', 16919: 'The Hall of Thanes', 16732: 'Excavation Site: Wetlands', 16619: 'Excavation Site - Bael Modan'}
ZONE.update({1: 'Dun Morogh', 3: 'Badlands', 4: 'Blasted Lands', 8: 'Swamp of Sorrows', 10: 'Duskwood', 11: 'Wetlands', 12: 'Elwynn Forest', 14: 'Durotar', 15: 'Dustwallow Marsh', 16: 'Azshara', 17: 'The Barrens', 28: 'Western Plaguelands', 33: 'Stranglethorn Vale', 36: 'Alterac Mountains', 38: 'Loch Modan', 40: 'Westfall', 41: 'Deadwind Pass', 44: 'Redridge Mountains', 45: 'Arathi Highlands', 46: 'Burning Steppes', 47: 'The Hinterlands', 51: 'Searing Gorge', 85: 'Tirisfal Glades', 130: 'Silverpine Forest', 139: 'Eastern Plaguelands', 141: 'Teldrassil', 148: 'Darkshore', 215: 'Mulgore', 267: 'Hillsbrad Foothills', 331: 'Ashenvale', 357: 'Feralas', 361: 'Felwood', 400: 'Thousand Needles', 405: 'Desolace', 406: 'Stonetalon Mountains', 440: 'Tanaris', 490: "Un'Goro Crater", 493: 'Moonglade', 618: 'Winterspring', 1377: 'Silithus', 1497: 'Undercity', 1519: 'Stormwind City', 1537: 'Ironforge', 1637: 'Orgrimmar', 1638: 'Thunder Bluff', 1657: 'Darnassus'})
ZONE.update({16550: 'The Drowned City', 16554: 'Blackmaw Hold', 16591: 'Riverglades', 16593: 'Zephras Isle', 616: 'Mount Hyjal'})
# Instance située dans une zone extérieure (Wowhead donne la zone, « dd » signale le donjon).
DDZONE = {36: 'City of Dalaran', 11: 'Excavation Site: Wetlands'}
RAID = {2717, 2159, 2677, 1977, 3429, 3428, 3456}
DUNG = {16550, 16554, 1581, 718, 209, 719, 717, 721, 491, 796, 722, 1337, 1176, 2100, 1477, 1584, 1583, 2557, 2057, 2017, 2437, 16611, 16544, 16560, 16842, 16620, 16919, 16732, 16619} | RAID
STATK = set(STAT)


def slug(n, i):
    return re.sub(r'[^a-z0-9]+', '-', n.lower().replace("'", '')).strip('-') + '-' + str(i)


def norm_row(r):
    """Ligne de la liste « armure » (tableau) -> objet comme les listes Wowhead."""
    if isinstance(r, dict):
        return r
    iid, name, q, il, rl, sb, cl, sub, ic, je, src, sm = r[:12]
    o = dict(je or {})
    o.update(id=iid, name=name, quality=q, level=il, reqlevel=rl, slotbak=sb, classs=cl, subclass=sub, icon=ic, source=src or [])
    o['sourcemore'] = [dict(zip(('t', 'n', 'z', 'ti', 'dd'), x)) for x in (sm or [])]
    if je and je.get('classes'):
        o['reqclass'] = je['classes']
    return o


def convert(rows, fr, icons, known, zfr=None, weak=()):
    """known : noms déjà dans la base ; weak : parmi eux, ceux sans source ni niveau (on les complète)."""
    items, det, qu, unkz, patch = [], {}, {}, {}, {}
    seen = set()
    for x in map(norm_row, rows):
        iid, name = x['id'], x.get('name') or ''
        if iid in seen or (name in known and name not in weak) or not name:
            continue
        seen.add(iid)
        q, sb, cl, sub = x.get('quality'), x.get('slotbak'), x.get('classs'), x.get('subclass')
        slot = SLOT.get(sb)
        if not slot or q is None or q < 1 or re.match(r'(PVP |Template|Nax PH|Monster |TEST|Test |zz|QA |Deprecated|OLD)', name) or '[' in name:
            continue
        if cl == 2:
            cat = WCAT.get(sub)
        elif sb == 16: cat = 24
        elif sb == 2: cat = 21
        elif sb == 11: cat = 22
        elif sb == 12: cat = 23
        elif sb == 23: cat = 25
        elif sb == 28: cat = 26
        else: cat = ACAT.get(sub)
        if cat is None:
            continue
        st = {STAT[k]: v for k, v in x.items() if k in STATK and isinstance(v, (int, float)) and v}
        dps = x.get('dps') or x.get('rgddps') or x.get('mledps') or 0
        rc = x.get('reqclass') or 0
        cls = [c for b, c in CLS.items() if rc & b] if rc and (rc & 1535) != 1535 else []
        s = slug(name, iid)
        src = x.get('source') or []
        sm = x.get('sourcemore') or []
        d = {}
        source = ''
        drops = [m for m in sm if m.get('t') == 1 and m.get('n')] if 2 in src else []
        quests = [m for m in sm if m.get('t') == 5] if 4 in src else []
        zids = [m.get('z') for m in sm if m.get('z')]
        for z in zids:
            if z not in ZONE:
                unkz[z] = unkz.get(z, 0) + 1
        zn = lambda z: ZONE.get(z, '')
        isd = lambda m: m.get('z') in DUNG or m.get('dd') is not None
        mz = lambda m: DDZONE.get(m.get('z')) if (m.get('dd') is not None and m.get('z') in DDZONE) else zn(m.get('z'))
        if 2 in src:
            source = 'd'
            if drops:
                d['b'] = [[m['n'], 12.0 if isd(m) else 0.5, mz(m), 1 if isd(m) else 0, None, None] for m in drops[:3]]
                d['bn'] = len(drops)
            elif zids:
                d['b'] = [['?', 12.0 if zids[0] in DUNG else 0.5, zn(zids[0]), 1 if zids[0] in DUNG else 0, None, None]]
        elif 4 in src:
            source = 'q'
            z = zids[0] if zids else None
            ql = quests or [{'n': '', 'ti': 'z%s-%s' % (z, iid), 'z': z}]
            d['q'] = []
            for m in ql[:3]:
                k = 'wh-%s' % m.get('ti')
                d['q'].append([k, m.get('n') or ''])
                qu[k] = ['', x.get('reqlevel') or 1, x.get('level'), zn(m.get('z') or z), '', None, None, (zfr or {}).get(str(m.get('ti')), '')]
        elif 1 in src:
            source = 'c'
        elif 5 in src:
            source = 'v'
        elif 3 in src:
            continue  # récompenses JcJ, gérées à part
        d['bop'] = 1 if source in ('d', 'q') else 0
        how = {'d': 'drops in %s' % (d.get('b') or [['', 0, '']])[0][2], 'q': 'is a quest reward', 'c': 'is crafted', 'v': 'is sold by a vendor'}.get(source, 'has an unknown source')
        d['t'] = '%s %s (Wowhead, WoW Forever).' % (name, how)
        ic = x.get('icon') or icons.get(str(iid)) or 'inv_misc_questionmark'
        if name in weak:
            if source:
                patch[name] = [x.get('reqlevel') or 0, source, d]
            continue
        items.append([s, name, ic, q, x.get('level') or 0, x.get('reqlevel') or 0, slot, cat, round(dps, 1), x.get('armor') or 0, st, cls, source,
                      1 if iid > 250000 else 0, '' if fr.get(iid, '').startswith('[') else fr.get(iid, '')])
        det[s] = d
    return {'items': items, 'det': det, 'qu': qu, 'patch': patch}, unkz
