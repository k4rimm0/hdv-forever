# Vrai terrain (maps_terrain/)

Images construites à partir des tuiles de minimap du client WoW Forever (export wow.export,
`maps/{azeroth,kalimdor}/minimap/mapCC_RR.png`, CC = 32 - Y/533.33, RR = 32 - X/533.33).
Bornes des zones : table WorldMapSize (Astrolabe) — bord gauche Y = xOffset + width, bord haut X = -yOffset.

Vérification : 54 maîtres de vol (tools/landmarks.json) placés sur chaque image, tous tombent sur leur village.
Le site charge ces images quand on zoome (bouton A / ⛰ / 🗺 sur la carte).
