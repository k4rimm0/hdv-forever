"""Fausse API Blizzard pour tester le collecteur sans réseau ni identifiants."""
import random
import zlib

ITEMS = {
    # id: (en, fr, qualité, classe, sous-classe, niveau, niveau requis, prix PNJ achat, prix vente PNJ, prix HDV de base, ventes/h)
    2589: ("Linen Cloth", "Étoffe de lin", "COMMON", 7, 5, 5, 0, 0, 13, 30, 40),
    2592: ("Wool Cloth", "Étoffe de laine", "COMMON", 7, 5, 15, 0, 0, 33, 140, 25),
    4306: ("Silk Cloth", "Étoffe de soie", "COMMON", 7, 5, 25, 0, 0, 150, 420, 18),
    2318: ("Light Leather", "Cuir léger", "COMMON", 7, 6, 10, 0, 0, 15, 65, 22),
    2319: ("Medium Leather", "Cuir moyen", "COMMON", 7, 6, 20, 0, 0, 50, 128, 15),
    2770: ("Copper Ore", "Minerai de cuivre", "COMMON", 7, 7, 10, 0, 0, 5, 150, 20),
    2771: ("Tin Ore", "Minerai d'étain", "COMMON", 7, 7, 20, 0, 0, 25, 160, 12),
    2447: ("Peacebloom", "Pacifique", "COMMON", 7, 9, 5, 0, 0, 10, 69, 20),
    765: ("Silverleaf", "Feuillargent", "COMMON", 7, 9, 5, 0, 0, 10, 40, 22),
    2450: ("Briarthorn", "Églantine", "COMMON", 7, 9, 15, 0, 0, 25, 143, 10),
    2673: ("Coyote Meat", "Viande de coyote", "COMMON", 7, 8, 12, 0, 0, 10, 45, 6),
    3685: ("Raptor Egg", "Œuf de raptor", "COMMON", 7, 8, 28, 0, 0, 30, 110, 4),
    2684: ("Coyote Steak", "Steak de coyote", "COMMON", 0, 5, 15, 5, 0, 25, 160, 5),
    3665: ("Curiously Tasty Omelet", "Omelette au goût étrange", "COMMON", 0, 5, 26, 16, 0, 100, 520, 3),
    2581: ("Heavy Linen Bandage", "Bandage en lin épais", "COMMON", 0, 7, 10, 0, 0, 20, 95, 9),
    118: ("Minor Healing Potion", "Potion de soins mineure", "COMMON", 0, 1, 5, 1, 0, 5, 60, 8),
    4238: ("Linen Bag", "Sac en lin", "COMMON", 1, 0, 11, 0, 0, 200, 900, 2),
    2678: ("Mild Spices", "Épices douces", "COMMON", 7, 8, 5, 0, 10, 2, 90, 3),
    2692: ("Hot Spices", "Épices fortes", "COMMON", 7, 8, 15, 0, 40, 10, 75, 1),
    3371: ("Empty Vial", "Fiole vide", "COMMON", 7, 0, 1, 0, 20, 1, 150, 2),
    2320: ("Coarse Thread", "Fil grossier", "COMMON", 7, 5, 5, 0, 10, 2, 60, 3),
    6256: ("Fishing Pole", "Canne à pêche", "COMMON", 2, 20, 1, 0, 23, 4, 500, 1),
    1179: ("Ice Cold Milk", "Lait glacé", "COMMON", 0, 5, 15, 5, 125, 6, 90, 1),
    9999: ("Green Sword of the Bear", "Épée verte de l'ours", "UNCOMMON", 2, 7, 22, 17, 0, 900, 4500, 0.4),
}

HOUSES = [(110, "Alliance Auction House"), (111, "Horde Auction House"), (112, "Blackwater Auction House"),
          (113, "Alliance Auction House"), (114, "Horde Auction House"), (115, "Blackwater Auction House")]


def rnd(*k):
    return random.Random(zlib.crc32(repr(k).encode()))


class MockAPI:
    def __init__(self, now):
        self.now = now
        self.region = "eu"

    def listing(self, hid, now):
        out = []
        hour = now // 3600
        for item, row in ITEMS.items():
            base = row[9] * (0.75 if hid % 3 == 2 else 1.0) * (1.1 if hid % 3 == 1 else 1.0)
            rate = row[10] * (0.3 if hid % 3 == 2 else 1.0)
            # annonces créées sur les 60 dernières heures
            for h in range(hour - 60, hour + 1):
                r = rnd(hid, item, h)
                n = int(rate * r.uniform(0.6, 1.4) + r.random())
                for k in range(n):
                    rr = rnd(hid, item, h, k)
                    start = h * 3600 + rr.randint(0, 3599)
                    dur = rr.choice([12, 24, 48]) * 3600
                    sold_at = start + rr.randint(1800, int(dur * 1.6))
                    end = min(start + dur, sold_at)
                    if not (start <= now < end):
                        continue
                    left = start + dur - now
                    tl = "SHORT" if left < 1800 else "MEDIUM" if left < 7200 else "LONG" if left < 43200 else "VERY_LONG"
                    drift = 1 + 0.15 * ((h % 48) / 48)
                    unit = max(1, int(base * drift * rr.uniform(0.85, 1.6)))
                    qty = rr.choice([1, 5, 10, 20]) if row[3] == 7 else 1
                    aid = zlib.crc32(repr((hid, item, h, k)).encode())
                    if row[3] == 7:
                        out.append({"id": aid, "item": {"id": item}, "quantity": qty, "unit_price": unit, "time_left": tl})
                    else:
                        out.append({"id": aid, "item": {"id": item}, "quantity": qty, "buyout": unit * qty, "time_left": tl})
        return out

    def get(self, path, namespace, params=None, if_modified=None, raw=False):
        p = path.strip("/").split("/")
        lm = f"T{self.now // 3600}"
        if path.endswith("/auctions/"):
            return 200, {"auctions": [{"key": {"href": "x"}, "name": n, "id": i} for i, n in HOUSES]}, None
        if "auctions" in p and p[-1] == "commodities":
            hid = int(p[-2])
            return 200, {"auctions": [a for a in self.listing(hid, self.now) if "unit_price" in a]}, lm
        if "auctions" in p:
            if if_modified == lm:
                return 304, None, lm
            hid = int(p[-1])
            return 200, {"id": hid, "auctions": [a for a in self.listing(hid, self.now) if "buyout" in a]}, lm
        if p[2] == "item" and namespace == "static-forever":
            iid = int(p[3])
            row = ITEMS.get(iid)
            if not row:
                return 404, None, None
            return 200, {
                "id": iid, "name": {"en_US": row[0], "fr_FR": row[1]}, "quality": {"type": row[2]},
                "item_class": {"id": row[3], "name": {"en_US": "Class", "fr_FR": "Classe"}},
                "item_subclass": {"id": row[4], "display_name": {"en_US": "Sub", "fr_FR": "Sous"}},
                "level": row[5], "required_level": row[6], "purchase_price": row[7], "sell_price": row[8],
                "purchase_quantity": 1, "max_count": 0}, None
        if p[2] == "media":
            return 200, {"assets": [{"key": "icon", "value": "https://render.worldofwarcraft.com/eu/icons/56/inv_misc_questionmark.jpg"}]}, None
        if p[2] == "profession" and p[3] == "index":
            return 200, {"professions": [{"id": 185, "name": {"en_US": "Cooking", "fr_FR": "Cuisine"}},
                                         {"id": 129, "name": {"en_US": "First Aid", "fr_FR": "Secourisme"}},
                                         {"id": 171, "name": {"en_US": "Alchemy", "fr_FR": "Alchimie"}},
                                         {"id": 197, "name": {"en_US": "Tailoring", "fr_FR": "Couture"}}]}, None
        if p[2] == "profession" and len(p) == 4:
            return 200, {"skill_tiers": [{"id": int(p[3]) * 10, "name": {"en_US": "Classic X"}}]}, None
        if p[2] == "profession" and "skill-tier" in p:
            pid = int(p[3])
            rec = {185: [1, 2], 129: [3], 171: [4], 197: [5]}[pid]
            return 200, {"categories": [{"recipes": [{"id": r} for r in rec]}]}, None
        if p[2] == "recipe":
            rid = int(p[3])
            data = {1: ("Coyote Steak", "Steak de coyote", 2684, [[2673, 1]]),
                    2: ("Curiously Tasty Omelet", "Omelette au goût étrange", 3665, [[3685, 1], [2692, 1]]),
                    3: ("Heavy Linen Bandage", "Bandage en lin épais", 2581, [[2589, 2]]),
                    4: ("Minor Healing Potion", "Potion de soins mineure", 118, [[2447, 1], [765, 1], [3371, 1]]),
                    5: ("Linen Bag", "Sac en lin", 4238, [[2589, 3], [2320, 3]])}[rid]
            return 200, {"id": rid, "name": {"en_US": data[0], "fr_FR": data[1]}, "crafted_item": {"id": data[2]},
                         "crafted_quantity": {"value": 1},
                         "reagents": [{"reagent": {"id": a}, "quantity": q} for a, q in data[3]]}, None
        return 404, None, None

# Sources de farm simulées (même format que farm.summarize).
FARM = {
    "2589": {"m": [["Defias Looter", 13, 14, "Westfall", 39.0, "1–3"], ["Kolkar Wrangler", 12, 13, "The Barrens", 39.0, "1–3"]], "n": []},
    "2592": {"m": [["Mosshide Fenrunner", 22, 23, "Wetlands", 25.0, "1–2"], ["Windshear Digger", 21, 22, "Stonetalon Mountains", 25.0, "1–2"]], "n": []},
    "4306": {"m": [["Bloodscalp Scout", 34, 35, "Stranglethorn Vale", 30.0, "1–2"]], "n": []},
    "2318": {"m": [], "n": [], "s": [1, 28, "Gesharahan", "The Barrens", 82.0, 1]},
    "2319": {"m": [], "n": [], "s": [16, 36, "Skum", "Wailing Caverns", 99.0, 60]},
    "2770": {"m": [], "n": [["Copper Vein", ["The Barrens", "Durotar"], 4, 100.0]], "k": ["mining", 1]},
    "2771": {"m": [], "n": [["Tin Vein", ["Ashenvale", "Wetlands"], 4, 100.0]], "k": ["mining", 65]},
    "2447": {"m": [], "n": [["Peacebloom", ["Teldrassil", "Tirisfal Glades"], 4, 100.0]], "k": ["herb", 1]},
    "765": {"m": [], "n": [["Silverleaf", ["Tirisfal Glades", "Teldrassil"], 4, 100.0]], "k": ["herb", 1]},
    "2450": {"m": [], "n": [["Briarthorn", ["Westfall", "Silverpine Forest"], 4, 100.0]], "k": ["herb", 70]},
    "2673": {"m": [["Coyote", 10, 11, "Westfall", 54.0, ""], ["Coyote Packleader", 11, 12, "Westfall", 51.0, ""]], "n": [],
             "p": [[1436, "Westfall", [["Coyote", "d"], ["Coyote Packleader", "d"]], [[46.4, 20.5, 1], [47.5, 14.8, 1], [62.3, 42.0, 1], [55, 30, 0], [58, 35, 0], [40, 50, 0], [44, 60, 0]]]]},
    "2678": {"m": [], "n": [], "b": "Buy Mild Spices from Tharynn Bouden in Elwynn Forest for 10c.", "vn": 66,
             "v": [["Tharynn Bouden", "a", "Trade Supplies", "Elwynn Forest", 41.8, 67.2, 10, 0], ["Banalash", "h", "Trade Goods", "Swamp of Sorrows", 44.8, 56.6, 10, 0], ["Kelsey Yance", "", "Cook", "Stranglethorn Vale", 28.2, 74.3, 10, 0]],
             "p": [[1435, "Swamp of Sorrows", [["Banalash", "v"]], [[44.8, 56.6, 0]]], [1434, "Stranglethorn Vale", [["Kelsey Yance", "v"]], [[28.2, 74.3, 0]]]]},
    "3685": {"m": [["Highland Razormaw", 27, 28, "Wetlands", 72.0, ""]], "n": []},
}
