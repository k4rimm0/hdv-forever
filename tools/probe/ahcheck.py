import json, os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "..", "collector"))
from collect import BlizzardAPI
cfg = json.load(open(os.path.join(os.path.dirname(__file__), "..", "..", "config.json")))
api = BlizzardAPI(cfg["region"], os.environ["BLIZZARD_CLIENT_ID"], os.environ["BLIZZARD_CLIENT_SECRET"])
for rs in (1, 2, 3, 5, 15):
    st, d, _ = api.get(f"/data/wow/ruleset/{rs}", "dynamic-forever")
    dd = dict(d or {}); dd.pop("_links", None)
    s = json.dumps(dd)
    print("RSD", rs, st, s[:1500])
    st, d, _ = api.get(f"/data/wow/ruleset/{rs}/auctions/", "dynamic-forever")
    print("RSH", rs, [h["id"] for h in (d or {}).get("auctions", [])])
st, b, _ = api.get("/data/wow/ruleset/2/auctions/113", "dynamic-forever")
bb = dict(b or {}); a = bb.pop("auctions", None)
print("HOUSE113", st, json.dumps(bb)[:800], len(a or []))
for ns in ("dynamic-forever", "dynamic-classic1x", "dynamic-classic"):
    st, d, _ = api.get("/data/wow/realm/index", ns)
    print("REALMS", ns, st, json.dumps(d)[:1500] if d else "")
