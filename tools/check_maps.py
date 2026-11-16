"""Relecture visuelle des cartes : place les maîtres de vol connus (données du jeu Forever) sur chaque
carte de zone publiée et assemble une planche. Si un point ne tombe pas sur la bonne ville, la carte
ou le calage est faux. Usage : python tools/check_maps.py <dossier maps> <sortie.png>"""
import json, os, re, sys
from PIL import Image, ImageDraw

def slug(z):
    return re.sub(r"[^a-z0-9]+", "-", z.lower().replace("'", "")).strip("-")

maps_dir, out = sys.argv[1], sys.argv[2]
marks = json.load(open(os.path.join(os.path.dirname(__file__), "landmarks.json")))
tiles = []
for zone, pts in sorted(marks.items()):
    p = os.path.join(maps_dir, f"z_{slug(zone)}.jpg")
    if not os.path.exists(p):
        continue
    im = Image.open(p).convert("RGB").resize((501, 334))
    d = ImageDraw.Draw(im)
    for name, (x, y) in pts:
        cx, cy = x / 100 * 501, y / 100 * 334
        d.ellipse([cx - 6, cy - 6, cx + 6, cy + 6], outline=(255, 0, 0), width=3)
        d.text((cx + 8, cy - 6), name, fill=(255, 255, 255), stroke_width=2, stroke_fill=(0, 0, 0))
    d.text((6, 4), zone, fill=(255, 255, 0), stroke_width=2, stroke_fill=(0, 0, 0))
    tiles.append(im)
cols = 3
rows = (len(tiles) + cols - 1) // cols
sheet = Image.new("RGB", (cols * 501, rows * 334), (0, 0, 0))
for i, im in enumerate(tiles):
    sheet.paste(im, ((i % cols) * 501, (i // cols) * 334))
sheet.save(out)
print(len(tiles), "cartes vérifiées ->", out)
