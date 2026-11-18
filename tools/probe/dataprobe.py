"""Diagnostic données : marchés, monstres, farm et objets, chiffrés pour l'analyse hors ligne."""
import json, os, sys, io, tarfile
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "..", "collector"))
from collect import Vault
cfg = json.load(open(os.path.join(os.path.dirname(__file__), "..", "..", "config.json")))
v = Vault("public", os.environ["SITE_PASSWORD"], cfg["kdf_iterations"])
out = "probe_out"; os.makedirs(out, exist_ok=True)
meta = v.read("d/meta", {}) or {}
json.dump(meta, open(f"{out}/meta.json", "w"))
for h in meta.get("houses", []):
    m = v.read(f"d/m_{h['id']}", None)
    if m: json.dump(m, open(f"{out}/m_{h['id']}.json", "w"))
for n in ["d/npcs", "d/farm", "d/items", "d/vendor", "d/gear", "d/geardet", "d/recipes", "d/craft", "d/wfb", "d/tt"]:
    x = v.read(n, None)
    if x is not None: json.dump(x, open(f"{out}/{n.split('/')[1]}.json", "w"), ensure_ascii=False)
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
print("probe.enc", os.path.getsize("probe.enc"), os.listdir(out))
