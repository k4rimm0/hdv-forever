"""Teste la recherche d'objets de l'API Blizzard (noms français)."""
import os, sys, json
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "..", "collector"))
from collect import BlizzardAPI
api = BlizzardAPI("eu", os.environ["BLIZZARD_CLIENT_ID"], os.environ["BLIZZARD_CLIENT_SECRET"])
for en in ["Rotmender's Garb", "Featherbead Bracers", "Sanguine Cape"]:
    for ns in ("static-forever", "static-classic1x", "static-classic", "static"):
        for params in ({"name.en_US": en}, {"name.en_US": en, "orderby": "id"}):
            st, d, _ = api.get("/data/wow/search/item", ns, params=params)
            res = (d or {}).get("results", [])
            print(en, ns, params, st, len(res), [((r.get("data") or {}).get("id"), ((r.get("data") or {}).get("name") or {}).get("fr_FR")) for r in res[:5]])
# objet par id dans static-forever
for iid in (11122, 211450, 230000):
    for ns in ("static-forever", "static-classic1x"):
        st, d, _ = api.get(f"/data/wow/item/{iid}", ns)
        print("item", iid, ns, st, (d or {}).get("name"))
