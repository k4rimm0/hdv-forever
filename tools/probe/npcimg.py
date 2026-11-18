import json, os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "..", "collector"))
from collect import BlizzardAPI
cfg = json.load(open(os.path.join(os.path.dirname(__file__), "..", "..", "config.json")))
api = BlizzardAPI(cfg["region"], os.environ["BLIZZARD_CLIENT_ID"], os.environ["BLIZZARD_CLIENT_SECRET"])
for cid in (833, 3671, 3399, 1765):
    for ns in ("static-forever", "static-classic1x", "static-classic", "static"):
        st, d, _ = api.get(f"/data/wow/creature/{cid}", ns)
        if st == 200 and d:
            disp = (d.get("creature_displays") or [{}])[0].get("id")
            st2, m, _ = api.get(f"/data/wow/media/creature-display/{disp}", ns)
            print(cid, ns, d.get("name", {}).get("fr_FR") if isinstance(d.get("name"), dict) else d.get("name"), disp, st2, json.dumps((m or {}).get("assets"))[:300])
            break
        else:
            print(cid, ns, st)
