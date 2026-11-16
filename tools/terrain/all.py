import re,json,sys,numpy as np,cv2
sys.path.insert(0,'/tmp/terr'); from build import zone_img
src=open('/tmp/lc/LootCollector/Modules/Map.lua').read()
Z={}
cont=None
for line in src.splitlines():
    if re.match(r'\s*\[1\] = \{',line): cont='kalimdor'
    if re.match(r'\s*\[2\] = \{',line): cont='azeroth'
    if re.match(r'\s*\[3\] = \{',line): cont=None
    m=re.search(r'name="([^"]+)",\s*width\s*=\s*([\d.]+),\s*height\s*=\s*([\d.]+),\s*xOffset\s*=\s*([-\d.]+),\s*yOffset\s*=\s*([-\d.]+)',line)
    if m and cont: Z[m.group(1)]=(cont,*map(float,m.groups()[1:]))
REDRAWN={"Alterac Mountains","Eastern Plaguelands","Redridge Mountains","Stormwind City","Tirisfal Glades","Desolace","Mulgore"}
def slug(z): return re.sub(r"[^a-z0-9]+","-",z.lower().replace("'","")).strip("-")
res={}
for name,(cont,w,h,xo,yo) in Z.items():
    s=slug(name); import os
    if not os.path.exists(f'/tmp/terr/ref/z_{s}.jpg'): continue
    ppy=min(0.96, 4096/w)
    im=zone_img(cont,w,h,xo,yo,ppy=ppy)
    W=4096 if w*ppy>=4095 else im.shape[1]
    ref=cv2.imread(f'/tmp/terr/ref/z_{s}.jpg')
    a=cv2.cvtColor(cv2.resize(im,(1002,668),interpolation=cv2.INTER_AREA),cv2.COLOR_BGR2GRAY).astype(np.float32)
    b=cv2.cvtColor(cv2.resize(ref,(1002,668)),cv2.COLOR_BGR2GRAY).astype(np.float32)
    # compare gradient magnitude maps via phase correlation
    def g(x):
        x=cv2.GaussianBlur(x,(0,0),3); gx=cv2.Sobel(x,cv2.CV_32F,1,0); gy=cv2.Sobel(x,cv2.CV_32F,0,1); return cv2.magnitude(gx,gy)
    win=cv2.createHanningWindow((1002,668),cv2.CV_32F)
    (dx,dy),resp=cv2.phaseCorrelate(g(a),g(b),win)
    cv2.imwrite(f'/tmp/terr/out/z_{s}.jpg',im,[cv2.IMWRITE_JPEG_QUALITY,78])
    sm=cv2.resize(im,(1002,668),interpolation=cv2.INTER_AREA)
    cv2.imwrite(f'/tmp/terr/chk/{s}.jpg',cv2.addWeighted(sm,0.5,cv2.resize(ref,(1002,668)),0.5,0))
    cov=float((cv2.cvtColor(sm,cv2.COLOR_BGR2GRAY)!=cv2.cvtColor(np.full((1,1,3),(60,40,20),np.uint8),cv2.COLOR_BGR2GRAY)[0,0]).mean())
    res[name]=dict(slug=s,shift=[round(dx,1),round(dy,1)],resp=round(resp,3),size=im.shape[:2],redrawn=name in REDRAWN)
    print(f"{name:24s} shift=({dx:6.1f},{dy:6.1f}) resp={resp:.3f} {im.shape[1]}x{im.shape[0]} {'REDRAWN' if name in REDRAWN else ''}",flush=True)
json.dump(res,open('/tmp/terr/res.json','w'),indent=1)
