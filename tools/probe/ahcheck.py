import json, os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "..", "collector"))
from collect import BlizzardAPI
cfg = json.load(open(os.path.join(os.path.dirname(__file__), "..", "..", "config.json")))
api = BlizzardAPI(cfg["region"], os.environ["BLIZZARD_CLIENT_ID"], os.environ["BLIZZARD_CLIENT_SECRET"])
st, d, _ = api.get("/data/wow/ruleset/index", "dynamic-forever")
print("RULESETS", st, json.dumps(d)[:1500])
for rs in (1, 2, 3, 4, 5):
    st, d, _ = api.get(f"/data/wow/ruleset/{rs}/auctions/", "dynamic-forever")
    print("RS", rs, st, json.dumps(d)[:2500] if d else "")
st, d, _ = api.get("/data/wow/connected-realm/index", "dynamic-forever")
print("CR", st, json.dumps(d)[:800] if d else "")
st, d, _ = api.get("/data/wow/realm/index", "dynamic-forever")
print("REALMS", st, json.dumps(d)[:3000] if d else "")
