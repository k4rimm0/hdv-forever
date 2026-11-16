import sys,os,numpy as np,cv2
T=533.3333333
SRC='/mnt/user-data/uploads/wow.export/maps/%s/minimap/map%02d_%02d.png'
def zone_img(cont,w,h,xo,yo,ppy=0.96,maxw=None):
    # map left Y = xo+w, top X = -yo ; px per yard
    yl=xo+w; xt=-yo
    c0=32-yl/T; r0=32-xt/T   # fractional tile coords of top-left
    c1=c0+w/T; r1=r0+h/T
    W=int(round(w*ppy)); H=int(round(h*ppy))
    out=np.zeros((H,W,3),np.uint8); out[:]=(60,40,20)
    s=ppy*T  # px per tile in output
    for c in range(int(np.floor(c0)),int(np.ceil(c1))):
        for r in range(int(np.floor(r0)),int(np.ceil(r1))):
            p=SRC%(cont,c,r)
            if not os.path.exists(p): continue
            im=cv2.imread(p,cv2.IMREAD_COLOR)
            if im is None: continue
            x=(c-c0)*s; y=(r-r0)*s
            M=np.float32([[s/512,0,x],[0,s/512,y]])
            warped=cv2.warpAffine(im,M,(W,H),flags=cv2.INTER_AREA,borderMode=cv2.BORDER_TRANSPARENT,dst=out)
    return out
