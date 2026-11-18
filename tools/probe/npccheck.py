import json, os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "..", "collector"))
from collect import BlizzardAPI
cfg = json.load(open(os.path.join(os.path.dirname(__file__), "..", "..", "config.json")))
api = BlizzardAPI(cfg["region"], os.environ["BLIZZARD_CLIENT_ID"], os.environ["BLIZZARD_CLIENT_SECRET"])
for cid in (1418, 696, 8522, 3671):
    for ns in ("static-forever", "static-classic1x"):
        st, d, _ = api.get(f"/data/wow/creature/{cid}", ns)
        print(cid, ns, st, json.dumps((d or {}).get("creature_displays"))[:200], (d or {}).get("type", {}))
        if st == 200:
            for disp in (d.get("creature_displays") or [])[:2]:
                st2, m, _ = api.get(f"/data/wow/media/creature-display/{disp['id']}", ns)
                print("   media", disp["id"], st2, json.dumps(m)[:300] if m else None)
