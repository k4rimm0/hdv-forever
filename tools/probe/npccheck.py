import json, os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "..", "collector"))
from collect import Vault
cfg = json.load(open(os.path.join(os.path.dirname(__file__), "..", "..", "config.json")))
v = Vault("public", os.environ["SITE_PASSWORD"], cfg["kdf_iterations"])
n = v.read("state/npcs", {}) or {}
print("MISSING " + ",".join(k.rsplit("-", 1)[1] for k, x in n.items() if not x.get("img") and k.rsplit("-", 1)[-1].isdigit()))
