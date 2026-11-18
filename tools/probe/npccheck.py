import json, os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "..", "collector"))
from collect import Vault
cfg = json.load(open(os.path.join(os.path.dirname(__file__), "..", "..", "config.json")))
v = Vault("public", os.environ["SITE_PASSWORD"], cfg["kdf_iterations"])
n = v.read("d/npcs", {}) or {}
st = v.read("state/npcs", {}) or {}
print("d/npcs", len(n), "avec img", sum(1 for x in n.values() if x.get("img")), "img vide", sum(1 for x in n.values() if "img" in x and not x["img"]), "sans clé img", sum(1 for x in n.values() if "img" not in x))
print("state", len(st), "sans nm", sum(1 for x in st.values() if not x.get("nm")))
ex = [(k, x.get("img")) for k, x in n.items()][:8]
for e in ex: print(e)
for k in ["bluegill-raider", "coyote-packleader-833"]:
    print(k, [(kk, vv.get("img")) for kk, vv in n.items() if kk.startswith(k)][:2])
