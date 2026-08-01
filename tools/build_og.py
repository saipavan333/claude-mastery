#!/usr/bin/env python3
"""build_og.py — generate Open Graph share images (1200x630) for social cards.
Reads tools/_seo_manifest.json (written by build_seo.js) and emits og/<tid>.png
per track plus og/og-default.png. Needs Pillow (pip install pillow)."""
import json, os

try:
    from PIL import Image, ImageDraw, ImageFont
except ImportError:
    raise SystemExit("Pillow is required: pip install pillow")
try:
    import numpy as np
except ImportError:
    raise SystemExit("numpy is required: pip install numpy")

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
OG = os.path.join(ROOT, "og")
os.makedirs(OG, exist_ok=True)

EMBER = (255, 138, 84); EMBER2 = (255, 180, 84); GOLD = (255, 210, 77)
INK = (242, 232, 221); MUT = (184, 168, 148); BG0 = (20, 16, 13); BG1 = (30, 23, 18)
W, H = 1200, 630

def font(sz, bold=True):
    paths = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf",
    ]
    for p in paths:
        try: return ImageFont.truetype(p, sz)
        except Exception: pass
    return ImageFont.load_default()

def base_canvas():
    yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
    t = np.clip(xx/W*0.6 + yy/H*0.4, 0, 1)[..., None]
    grad = np.array(BG1, np.float32)*(1-t) + np.array(BG0, np.float32)*t
    d = np.hypot(xx-120, yy-90)
    f = (np.clip(1 - d/640, 0, 1) ** 2)[..., None]
    glow = f * np.array([255, 150, 70], np.float32) * 0.55
    out = 255 - (255-grad)*(255-glow)/255           # screen blend
    return Image.fromarray(np.clip(out, 0, 255).astype('uint8'), 'RGB')

def wrap(draw, text, fnt, maxw):
    words = text.split(); lines=[]; cur=""
    for w in words:
        t = (cur+" "+w).strip()
        if draw.textlength(t, font=fnt) <= maxw: cur = t
        else:
            if cur: lines.append(cur)
            cur = w
    if cur: lines.append(cur)
    return lines

def draw_card(title, kicker, base=None):
    img = base.copy() if base is not None else base_canvas()
    d = ImageDraw.Draw(img)
    # borders
    d.rounded_rectangle([24,24,W-24,H-24], radius=22, outline=(255,190,140), width=2)
    # brandmark
    d.text((70, 66), "◆  CLAUDE MASTERY", font=font(30), fill=EMBER2)
    d.text((72, 108), "Z E R O   →   O P E R A T O R", font=font(17, False), fill=MUT)
    # kicker (track / phase)
    if kicker:
        kf = font(22)
        d.rounded_rectangle([70, 190, 70+int(d.textlength(kicker,font=kf))+34, 234], radius=10, outline=(255,210,77), width=1)
        d.text((88, 198), kicker, font=kf, fill=GOLD)
    # title (wrapped, gold)
    tf = font(62)
    lines = wrap(d, title, tf, W-140)[:3]
    y = 270
    for ln in lines:
        d.text((70, y), ln, font=tf, fill=INK); y += 76
    # footer strip
    d.text((70, H-84), "The complete, hands-on course on Claude — build & sell AI agents.", font=font(24, False), fill=MUT)
    return img

def main():
    with open(os.path.join(HERE, "_seo_manifest.json")) as f:
        man = json.load(f)
    base = base_canvas()                      # identical background — compute once, reuse
    lessons = man.get("lessons", [])
    draw_card("Master Claude. Then get paid for it.", "%d lessons · the complete course on Claude" % len(lessons), base).save(os.path.join(OG, "og-default.png"))
    n = 1
    for L in lessons:
        kicker = "Lesson %s · Track %s" % (L["id"], L["tn"])
        draw_card(L["title"], kicker, base).save(os.path.join(OG, "%s.png" % L["id"]))
        n += 1
    print("Wrote %d OG images (per lesson + default) -> og/" % n)

if __name__ == "__main__":
    main()
