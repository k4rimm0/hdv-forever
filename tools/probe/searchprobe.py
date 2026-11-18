"""Teste la recherche d'objets de l'API Blizzard (noms français)."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "..", "collector"))
from collect import BlizzardAPI
api = BlizzardAPI("eu", os.environ["BLIZZARD_CLIENT_ID"], os.environ["BLIZZARD_CLIENT_SECRET"])
for en in ["Rotmender's Garb", "Rotmender's Sash", "Featherbead Bracers", "Violet Sorcerer's Robe"]:
    for ns in ("static-classic1x", "static"):
        st, d, _ = api.get("/data/wow/search/item", ns, params={"name.en_US": en, "_pageSize": 1000})
        res = (d or {}).get("results", [])
        ex = [((r.get("data") or {}).get("id"), ((r.get("data") or {}).get("name") or {}).get("fr_FR")) for r in res if ((r.get("data") or {}).get("name") or {}).get("en_US") == en]
        print("RES", en, ns, st, len(res), (d or {}).get("pageCount"), ex)
st, d, _ = api.get("/data/wow/item/268285", "static")
print("RES item", st, (d or {}).get("name", {}).get("fr_FR") if d else None)
