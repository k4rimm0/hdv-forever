"""Diagnostic équipement : base metabot + un échantillon de détails, chiffré pour l'analyse hors ligne."""
import json, os, sys, time, requests, io, tarfile
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "..", "collector"))
from collect import Vault
from gear import collect_gear, parse_items, BASE
cfg = json.load(open(os.path.join(os.path.dirname(__file__), "..", "..", "config.json")))
v = Vault("public", os.environ["SITE_PASSWORD"], cfg["kdf_iterations"])
out = "probe_out"; os.makedirs(out, exist_ok=True)
items = v.read("state/items", {}) or {}
json.dump({k: [(m.get("n") or {}).get("en"), m.get("q"), m.get("ic"), m.get("bp"), m.get("sp")] for k, m in items.items() if not k.startswith("_")},
          open(f"{out}/names.json", "w"), ensure_ascii=False)
meta = v.read("d/meta", {}) or {}
for h in meta.get("houses", []):
    m = v.read(f"d/m_{h['id']}", None)
    if m and h.get("faction") == "horde" and len(m["items"]) > 1000:
        json.dump(m, open(f"{out}/market.json", "w")); print("market", h["id"], len(m["items"])); break
r = requests.get(f"{BASE}/items/items.json", headers={"User-Agent": "hdv-forever"}, timeout=60)
open(f"{out}/items_raw.json", "w").write(r.text)
lst = parse_items(r.json())
print("items", len(lst))
# Échantillon : objets niveau 1-30 qualité >= 2 + quelques 60, pour tester les détails et les quêtes.
pick = [it for it in lst if max(it[5] or 1, it[4] - 7) <= 34 and it[3] >= 1]
st = {"t": int(time.time()), "items": pick, "det": {}, "qu": {}}
st = collect_gear(st, requests, print, int(time.time()), budget=6000, delay=0.15)
st["items"] = lst
json.dump(st, open(f"{out}/gear_state.json", "w"), ensure_ascii=False)
for slug in ["belt-of-the-fang", "scalemail-vest", "bow-of-plunder", "totemic-clan-ring", "embossed-leather-vest"]:
    open(f"{out}/item_{slug}.html", "w").write(requests.get(f"{BASE}/items/{slug}", headers={"User-Agent": "hdv-forever"}, timeout=30).text)
open(f"{out}/quest_dangerous.html", "w").write(requests.get(f"{BASE}/quests/dangerous-567", headers={"User-Agent": "hdv-forever"}, timeout=30).text)
from cryptography.hazmat.primitives import serialization, hashes
from cryptography.hazmat.primitives.asymmetric import padding
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
buf = io.BytesIO()
with tarfile.open(fileobj=buf, mode="w:gz") as tf:
    tf.add(out, arcname="probe")
pub = serialization.load_pem_public_key(open(os.path.join(os.path.dirname(__file__), "pub.pem"), "rb").read())
key = os.urandom(32); iv = os.urandom(12)
ek = pub.encrypt(key, padding.OAEP(mgf=padding.MGF1(hashes.SHA256()), algorithm=hashes.SHA256(), label=None))
open("probe.enc", "wb").write(len(ek).to_bytes(2, "big") + ek + iv + AESGCM(key).encrypt(iv, buf.getvalue(), None))
print("probe.enc", os.path.getsize("probe.enc"))
