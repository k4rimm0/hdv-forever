"""Diagnostic : exporte les recettes (niveaux, prix des composants) et télécharge des pages de référence."""
import json, os, sys, time, requests
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "..", "collector"))
from collect import Vault
cfg = json.load(open(os.path.join(os.path.dirname(__file__), "..", "..", "config.json")))
v = Vault("public", os.environ["SITE_PASSWORD"], cfg["kdf_iterations"])
out = "probe_out"; os.makedirs(out, exist_ok=True)
meta = v.read("d/meta", {}) or {}
houses = meta.get("houses", [])
items = v.read("state/items", {}) or {}
recipes = (v.read("state/recipes", {}) or {}).get("list", [])
craft = v.read("state/craft", {}) or {}
mk = {}
for h in houses:
    m = v.read(f"d/m_{h['id']}", None)
    if m:
        mk[h["id"]] = {"faction": h.get("faction"), "auctions": h.get("auctions"), "items": m["items"]}
best = max(mk.items(), key=lambda kv: len(kv[1]["items"]))[0] if mk else None
rows = []
for rc in recipes:
    o = str(rc["o"]); c = (craft.get("o") or {}).get(o, {}).get("c", [])
    reag = []
    for rid, q in rc["r"]:
        it = items.get(str(rid), {}); prices = {hid: (m["items"].get(str(rid)) or [None, None])[:2] for hid, m in mk.items()}
        reag.append({"id": rid, "q": q, "en": (it.get("n") or {}).get("en"), "vendor_buy": it.get("bp"), "prices": prices})
    rows.append({"p": rc["p"], "n": (rc.get("n") or {}).get("en"), "o": rc["o"], "oq": rc.get("oq"), "craft": c, "reag": reag})
json.dump({"houses": houses, "best": best, "recipes": rows, "recinfo": craft.get("r", {})}, open(f"{out}/recipes.json", "w"), ensure_ascii=False)
print("recettes", len(rows), "maisons", len(mk))
from collections import Counter
print(Counter(r["p"] for r in rows))
print("sans niveau", Counter(r["p"] for r in rows if not any(e.get("sk") for e in r["craft"])))
UA = {"User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/124 Safari/537.36"}
PROFS = ["alchemy", "blacksmithing", "cooking", "enchanting", "engineering", "first-aid", "leatherworking", "tailoring", "mining", "herbalism", "skinning", "fishing"]
urls = []
for p in PROFS:
    urls += [f"https://wowforeverbuilds.com/professions/{p}/recipes", f"https://seemeta.com/en/wow-forever/professions/{p}",
             f"https://www.wowhead.com/forever/profession-leveling-guides/{p}", f"https://metaforge.app/wow-forever/professions/{p}"]
for u in urls:
    try:
        r = requests.get(u, headers=UA, timeout=30)
        fn = u.split("//")[1].replace("/", "_")[:150] + ".html"
        open(f"{out}/{fn}", "w").write(r.text)
        print(r.status_code, len(r.text), u)
    except Exception as e:
        print("ERR", u, e)
    time.sleep(0.5)

# Archive chiffrée pour l'analyse (clé publique : seul le détenteur de la clé privée peut lire).
import io, tarfile, base64
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
