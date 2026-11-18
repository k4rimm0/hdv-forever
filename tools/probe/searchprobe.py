"""Teste l'API Blizzard : recherche de créatures et effets de panoplie (noms français)."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "..", "collector"))
from collect import BlizzardAPI
api = BlizzardAPI("eu", os.environ["BLIZZARD_CLIENT_ID"], os.environ["BLIZZARD_CLIENT_SECRET"])
for en in ["Fenrus the Devourer", "Vendor-Tron 1000", "Nightbane Dark Runner"]:
    for ns in ("static-classic1x", "static"):
        st, d, _ = api.get("/data/wow/search/creature", ns, params={"name.en_US": en, "_pageSize": 100})
        res = (d or {}).get("results", [])
        ex = [((r.get("data") or {}).get("id"), ((r.get("data") or {}).get("name") or {}).get("fr_FR")) for r in res if ((r.get("data") or {}).get("name") or {}).get("en_US") == en]
        print("RES", en, ns, st, len(res), ex[:3])
# panoplie : pièce Wildheart (Classic) id 16716 ?
for iid in (16715, 10399):
    st, d, _ = api.get(f"/data/wow/item/{iid}", "static-classic1x", params={"locale": "fr_FR"})
    s = (d or {}).get("preview_item", {}).get("set") if d else None
    print("RES item", iid, st, (d or {}).get("name"), str(s)[:700])
