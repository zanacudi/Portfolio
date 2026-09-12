"""Original illustrated call backgrounds for Paywandi, 1280x720.
All artwork is drawn here from shapes and gradients: no photographs, no third-party images."""
import math, random, os, io

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'paywandi-bg')
os.makedirs(OUT, exist_ok=True)
W, H = 1280, 720

def svg(body, defs=''):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}">'
            f'<defs>{defs}</defs>{body}</svg>\n')

def f(v): return f'{v:.1f}'.rstrip('0').rstrip('.')

def ridge(rng, base, amp, n=48, sharp=1.0, phase=0.0, freq=2.2):
    """A mountain skyline: folded long waves (the Zagros are parallel folds) plus peaks."""
    pts = []
    for i in range(n + 1):
        x = W * i / n
        t = i / n
        y = base - amp * (0.55 * math.sin(t * math.pi * freq + phase) + 0.45 * math.sin(t * math.pi * freq * 2.7 + phase * 1.7))
        y -= amp * 0.35 * (rng.random() ** sharp)
        pts.append((x, y))
    d = f'M0 {H} L' + ' L'.join(f'{f(x)} {f(y)}' for x, y in pts) + f' L{W} {H} Z'
    return d

def save(name, content):
    io.open(os.path.join(OUT, name), 'w', encoding='utf-8', newline='\n').write(content)
    print('wrote', name, len(content))

# ------------------------------------------------------------------ 1. Zagros at dawn
rng = random.Random(7)
defs = ('<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">'
        '<stop offset="0" stop-color="#26325a"/><stop offset=".42" stop-color="#9b5f78"/>'
        '<stop offset=".68" stop-color="#ee9f66"/><stop offset="1" stop-color="#f9dba2"/></linearGradient>'
        '<radialGradient id="glow"><stop offset="0" stop-color="#fff4cf" stop-opacity=".95"/>'
        '<stop offset=".25" stop-color="#ffd68a" stop-opacity=".55"/><stop offset="1" stop-color="#ffb070" stop-opacity="0"/></radialGradient>'
        '<linearGradient id="mist" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/>'
        '<stop offset=".5" stop-color="#ffe9d0" stop-opacity=".16"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>')
body = f'<rect width="{W}" height="{H}" fill="url(#sky)"/>'
body += '<circle cx="985" cy="395" r="260" fill="url(#glow)"/><circle cx="985" cy="395" r="44" fill="#fff3cc"/>'
layers = [(430, 70, '#9c7390', .85, 1.1), (480, 80, '#77597e', .92, 1.6), (545, 70, '#524766', 1, 2.3), (610, 60, '#35304c', 1, 2.9), (675, 45, '#1f1e33', 1, 3.6)]
for k, (base, amp, col, op, ph) in enumerate(layers):
    body += f'<path d="{ridge(rng, base, amp, n=60, sharp=1.4, phase=ph, freq=1.6 + k * .35)}" fill="{col}" opacity="{op}"/>'
    if k < 3:
        body += f'<rect x="0" y="{base - 90}" width="{W}" height="180" fill="url(#mist)"/>'
for bx, by, s in [(760, 250, 1), (800, 270, .8), (835, 240, .7), (712, 285, .6)]:
    body += (f'<path d="M{f(bx - 14 * s)} {f(by)} q{f(7 * s)} {f(-7 * s)} {f(14 * s)} 0 q{f(7 * s)} {f(-7 * s)} {f(14 * s)} 0" '
             f'fill="none" stroke="#2a2440" stroke-width="{f(2.2 * s)}" stroke-linecap="round"/>')
save('zagros-dawn.svg', svg(body, defs))

# ------------------------------------------------------------------ 2. Kurdistan flag
def star(cx, cy, R, r, n, rot=-90):
    pts = []
    for i in range(2 * n):
        a = math.radians(rot + i * 180 / n)
        rad = R if i % 2 == 0 else r
        pts.append(f'{f(cx + rad * math.cos(a))},{f(cy + rad * math.sin(a))}')
    return ' '.join(pts)
defs = '<linearGradient id="fold" x1="0" y1="0" x2="1" y2="0">'
for i in range(13):
    op = .16 * (0.5 + 0.5 * math.sin(i * 1.3)) ** 2
    defs += f'<stop offset="{i / 12:.3f}" stop-color="#000" stop-opacity="{op:.3f}"/>'
defs += '</linearGradient><linearGradient id="sheen" x1="0" y1="0" x2="1" y2="0">'
for i in range(13):
    op = .14 * (0.5 + 0.5 * math.cos(i * 1.3 + .4)) ** 3
    defs += f'<stop offset="{i / 12:.3f}" stop-color="#fff" stop-opacity="{op:.3f}"/>'
defs += '</linearGradient>'
body = (f'<rect width="{W}" height="240" fill="#ED2024"/><rect y="240" width="{W}" height="240" fill="#FFFFFF"/>'
        f'<rect y="480" width="{W}" height="240" fill="#278E43"/>'
        f'<polygon points="{star(640, 360, 178, 112, 21)}" fill="#FEBD11"/><circle cx="640" cy="360" r="98" fill="#FEBD11"/>'
        f'<rect width="{W}" height="{H}" fill="url(#fold)"/><rect width="{W}" height="{H}" fill="url(#sheen)"/>')
save('kurdistan-flag.svg', svg(body, defs))

# ------------------------------------------------------------------ 3. Newroz fires
rng = random.Random(21)
defs = ('<linearGradient id="night" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#060a1e"/>'
        '<stop offset=".55" stop-color="#1b1640"/><stop offset=".85" stop-color="#4a2346"/><stop offset="1" stop-color="#6b2d3c"/></linearGradient>'
        '<radialGradient id="fireglow"><stop offset="0" stop-color="#ffcf6b" stop-opacity=".9"/>'
        '<stop offset=".3" stop-color="#ff8a3d" stop-opacity=".45"/><stop offset="1" stop-color="#ff5a1f" stop-opacity="0"/></radialGradient>'
        '<radialGradient id="torch"><stop offset="0" stop-color="#fff0b0"/><stop offset=".35" stop-color="#ffab45" stop-opacity=".85"/>'
        '<stop offset="1" stop-color="#ff7a1f" stop-opacity="0"/></radialGradient>'
        '<linearGradient id="flame" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#ff5a1f"/>'
        '<stop offset=".55" stop-color="#ffa030"/><stop offset="1" stop-color="#ffe7a0"/></linearGradient>')
body = f'<rect width="{W}" height="{H}" fill="url(#night)"/>'
for _ in range(190):
    x, y = rng.uniform(0, W), rng.uniform(0, 430) ** 1.0
    body += f'<circle cx="{f(x)}" cy="{f(y)}" r="{f(rng.uniform(.5, 1.7))}" fill="#fff" opacity="{rng.uniform(.25, .95):.2f}"/>'
far_d = ridge(rng, 520, 60, n=50, sharp=1.2, phase=.4, freq=1.4)
far_pts = [tuple(map(float, p.split())) for p in far_d.split(' L')[1:-1]]
def far_y(x):
    for (xa, ya), (xb, yb) in zip(far_pts, far_pts[1:]):
        if xa <= x <= xb: return ya + (yb - ya) * (x - xa) / (xb - xa) + 4
    return 520
def near_y(x):   # the near mountain's right flank runs from the peak (930,300) down to (1280,470)
    return 300 + (470 - 300) * (x - 930) / (1280 - 930) + 6
body += f'<path d="{far_d}" fill="#1a1636"/>'
# the near mountain, peaking right of centre, with a torch procession climbing to the fire
peak = (930, 300)
near = f'M0 {H} L0 640 C 260 610 520 520 700 430 S 880 300 {peak[0]} {peak[1]} S 1100 380 {W} 470 L{W} {H} Z'
body += f'<path d="{near}" fill="#0b0a18"/>'
# switchbacks: points walk up the slope line, swinging side to side across it, so the path never crosses itself
x0, y0, x9, y9 = 110, 700, 900, 318
L = math.hypot(x9 - x0, y9 - y0); nx, ny = -(y9 - y0) / L, (x9 - x0) / L
trail = []
for k in range(15):
    t = k / 14
    swing = 0 if k in (0, 14) else (34 if k % 2 else -34) * (1 - .5 * t)
    trail.append((x0 + (x9 - x0) * t + nx * swing, y0 + (y9 - y0) * t + ny * swing))
for (x1, y1), (x2, y2) in zip(trail, trail[1:]):
    steps = max(3, int(math.hypot(x2 - x1, y2 - y1) / 26))
    for s in range(steps):
        t = s / steps
        x, y = x1 + (x2 - x1) * t, y1 + (y2 - y1) * t
        body += f'<circle cx="{f(x)}" cy="{f(y)}" r="9" fill="url(#torch)"/>'
fx, fy = peak
body += f'<circle cx="{fx}" cy="{fy - 30}" r="200" fill="url(#fireglow)"/>'
body += (f'<path d="M{fx - 40} {fy} C {fx - 50} {fy - 50} {fx - 10} {fy - 60} {fx - 12} {fy - 110} '
         f'C {fx + 20} {fy - 70} {fx + 45} {fy - 60} {fx + 40} {fy} Z" fill="url(#flame)"/>'
         f'<path d="M{fx - 18} {fy} C {fx - 22} {fy - 30} {fx} {fy - 40} {fx + 2} {fy - 72} '
         f'C {fx + 18} {fy - 40} {fx + 26} {fy - 30} {fx + 20} {fy} Z" fill="#fff1b8" opacity=".85"/>')
for _ in range(26):
    body += f'<circle cx="{f(fx + rng.uniform(-70, 70))}" cy="{f(fy - rng.uniform(80, 230))}" r="{f(rng.uniform(1, 2.6))}" fill="#ffb347" opacity="{rng.uniform(.35, .9):.2f}"/>'
# smaller fires on the far ridges
for x, y in [(210, far_y(210)), (455, far_y(455)), (1185, near_y(1185))]:
    body += f'<circle cx="{x}" cy="{y}" r="40" fill="url(#fireglow)"/><circle cx="{x}" cy="{y}" r="4" fill="#ffe7a0"/>'
save('newroz-fires.svg', svg(body, defs))

# ------------------------------------------------------------------ 4. Erbil Citadel at golden hour
rng = random.Random(3)
defs = ('<linearGradient id="gold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5d86b0"/>'
        '<stop offset=".5" stop-color="#e9b980"/><stop offset="1" stop-color="#f8deaa"/></linearGradient>'
        '<linearGradient id="mound" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c39461"/><stop offset="1" stop-color="#8a5f3a"/></linearGradient>'
        '<radialGradient id="sun2"><stop offset="0" stop-color="#fff2c8"/><stop offset=".2" stop-color="#ffd98f" stop-opacity=".6"/>'
        '<stop offset="1" stop-color="#ffc070" stop-opacity="0"/></radialGradient>')
body = f'<rect width="{W}" height="{H}" fill="url(#gold)"/><circle cx="210" cy="330" r="230" fill="url(#sun2)"/><circle cx="210" cy="330" r="38" fill="#fff0c4"/>'
for cx, cy, rx in [(520, 150, 120), (620, 170, 90), (1010, 120, 140)]:
    body += f'<ellipse cx="{cx}" cy="{cy}" rx="{rx}" ry="18" fill="#fff" opacity=".35"/>'
top_y = 420
body += f'<path d="M110 {H - 70} C 230 {H - 90} 260 {top_y + 10} 330 {top_y} L 950 {top_y} C 1020 {top_y + 10} 1050 {H - 90} 1170 {H - 70} Z" fill="url(#mound)"/>'
x = 322
while x < 958:
    w = rng.choice([22, 28, 34, 40])
    h = rng.choice([26, 34, 42, 50])
    if 600 < x < 680:
        x = 680
        continue
    shade = rng.choice(['#e0bb86', '#d4aa73', '#caa06a'])
    body += f'<rect x="{x}" y="{top_y - h}" width="{w}" height="{h + 4}" fill="{shade}"/>'
    for wy in range(top_y - h + 8, top_y - 6, 14):
        for wx in range(x + 5, x + w - 6, 11):
            if rng.random() < .55:
                body += f'<rect x="{wx}" y="{wy}" width="4" height="7" fill="#6e4a2b" opacity=".8"/>'
    x += w
# the great gate
body += (f'<rect x="600" y="{top_y - 92}" width="80" height="96" fill="#e7c893"/>'
         f'<path d="M618 {top_y + 4} L618 {top_y - 40} A22 22 0 0 1 662 {top_y - 40} L662 {top_y + 4} Z" fill="#7b5230"/>'
         f'<rect x="596" y="{top_y - 100}" width="88" height="10" fill="#d4ae78"/>'
         f'<line x1="640" y1="{top_y - 100}" x2="640" y2="{top_y - 150}" stroke="#5b3d24" stroke-width="3"/>'
         f'<rect x="641" y="{top_y - 150}" width="36" height="8" fill="#ED2024"/><rect x="641" y="{top_y - 142}" width="36" height="8" fill="#fff"/>'
         f'<rect x="641" y="{top_y - 134}" width="36" height="8" fill="#278E43"/><circle cx="659" cy="{top_y - 138}" r="3" fill="#FEBD11"/>')
# the modern city at its foot
x = 0
while x < W:
    w = rng.randint(40, 110); h = rng.randint(30, 90)
    body += f'<rect x="{x}" y="{H - h}" width="{w}" height="{h}" fill="{rng.choice(["#6e4f37", "#5f4430", "#7a583d"])}"/>'
    x += w - 2
for tx in [60, 150, 1110, 1215]:
    body += f'<rect x="{tx - 3}" y="{H - 140}" width="6" height="80" fill="#4a3322"/>'
    body += ''.join(f'<path d="M{tx} {H - 140} q{dx} -10 {dx * 2} 14" stroke="#3f5a2c" stroke-width="7" fill="none" stroke-linecap="round"/>' for dx in (-22, -12, 12, 22))
save('erbil-citadel.svg', svg(body, defs))

# ------------------------------------------------------------------ 5. Hawraman terraced village
rng = random.Random(11)
defs = ('<linearGradient id="day" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7fbfe6"/><stop offset="1" stop-color="#e2f2f6"/></linearGradient>'
        '<linearGradient id="slope" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#6f9b55"/><stop offset="1" stop-color="#3e6a3a"/></linearGradient>')
body = f'<rect width="{W}" height="{H}" fill="url(#day)"/>'
for cx, cy, s in [(250, 110, 1), (330, 95, .7), (900, 80, 1.2), (1010, 100, .8)]:
    body += f'<ellipse cx="{cx}" cy="{cy}" rx="{f(80 * s)}" ry="{f(20 * s)}" fill="#fff" opacity=".85"/>'
body += f'<path d="{ridge(rng, 330, 70, n=40, sharp=1.1, phase=.9, freq=1.3)}" fill="#8fb1b8"/>'
body += f'<path d="{ridge(rng, 400, 60, n=40, sharp=1.1, phase=2.1, freq=1.1)}" fill="#6f9a86"/>'
body += f'<path d="M0 300 C 300 330 520 470 760 560 S 1100 690 {W} 700 L{W} {H} L0 {H} Z" fill="url(#slope)"/>'
body += f'<path d="M{W} 360 C 1060 400 960 520 880 720 L{W} {H} Z" fill="#4d7a44"/>'

def house(x, y, w, h, tone):
    s = f'<rect x="{x}" y="{y - h}" width="{w}" height="{h}" fill="{tone}"/>'
    s += f'<rect x="{x - 2}" y="{y - h - 5}" width="{w + 4}" height="6" fill="#8b6f4e"/>'
    for wx in range(x + 7, x + w - 10, 16):
        s += f'<rect x="{wx}" y="{y - h + 10}" width="7" height="10" fill="#45382a"/>'
    return s
# stepped rows climbing the left slope: each roof is the next house's yard
for row in range(7):
    y0 = 690 - row * 52
    x0 = 20 + row * 34
    xs = x0
    while xs < x0 + 380 - row * 30:
        w = rng.choice([44, 52, 60])
        body += house(xs, y0, w, rng.choice([34, 40, 46]), rng.choice(['#d8c6a2', '#cbb58c', '#e2d3b3', '#bfa37a']))
        xs += w + rng.choice([0, 4, 8])
for row in range(5):
    y0 = 700 - row * 50
    x0 = 1260 - row * 26
    xs = x0
    while xs > x0 - 260 + row * 20:
        w = rng.choice([44, 52])
        body += house(xs - w, y0, w, rng.choice([34, 40]), rng.choice(['#d8c6a2', '#cbb58c', '#e2d3b3']))
        xs -= w + rng.choice([0, 6])
# trees only on the open slope between the two villages, clumped along its fall line
for _ in range(34):
    t = rng.random()
    tx = 480 + 360 * t + rng.uniform(-40, 40)
    ty = 470 + 190 * t + rng.uniform(-30, 30)
    r = rng.uniform(9, 17)
    body += f'<circle cx="{f(tx)}" cy="{f(ty)}" r="{f(r)}" fill="{rng.choice(["#3f6b35", "#4f7d3f", "#355c2e"])}"/>'
body += '<path d="M420 720 C 520 690 600 700 700 680 S 860 650 940 720 Z" fill="#6fb3d2" opacity=".85"/>'
save('hawraman-village.svg', svg(body, defs))

# ------------------------------------------------------------------ 6. Kilim
T = 120  # one motif tile
defs = (f'<pattern id="motif" width="{T}" height="{T}" patternUnits="userSpaceOnUse" x="40" y="0">'
        f'<rect width="{T}" height="{T}" fill="#7d1f22"/>'
        f'<polygon points="60,6 114,60 60,114 6,60" fill="#1f2f5c"/>'
        f'<polygon points="60,22 98,60 60,98 22,60" fill="#d69a2d"/>'
        f'<polygon points="60,38 82,60 60,82 38,60" fill="#7d1f22"/>'
        f'<polygon points="60,50 70,60 60,70 50,60" fill="#efe3c8"/>'
        # hooks at the four tips: the "ram's horn" motif common in Kurdish weaving
        f'<path d="M60 6 l0 -6 M54 0 h12 M60 114 l0 6 M54 120 h12 M6 60 h-6 M0 54 v12 M114 60 h6 M120 54 v12" stroke="#efe3c8" stroke-width="5"/>'
        f'<rect x="0" y="0" width="10" height="10" fill="#efe3c8"/><rect x="{T - 10}" y="0" width="10" height="10" fill="#efe3c8"/>'
        f'<rect x="0" y="{T - 10}" width="10" height="10" fill="#efe3c8"/><rect x="{T - 10}" y="{T - 10}" width="10" height="10" fill="#efe3c8"/>'
        f'</pattern>'
        '<pattern id="zig" width="40" height="40" patternUnits="userSpaceOnUse">'
        '<rect width="40" height="40" fill="#1f2f5c"/><path d="M0 30 L10 10 L20 30 L30 10 L40 30" stroke="#d69a2d" stroke-width="6" fill="none"/></pattern>'
        '<radialGradient id="vig" cx=".5" cy=".5" r=".75"><stop offset=".45" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".45"/></radialGradient>')
body = (f'<rect width="{W}" height="{H}" fill="url(#motif)"/>'
        f'<rect width="{W}" height="56" fill="url(#zig)"/><rect y="56" width="{W}" height="10" fill="#efe3c8"/>'
        f'<rect y="{H - 56}" width="{W}" height="56" fill="url(#zig)"/><rect y="{H - 66}" width="{W}" height="10" fill="#efe3c8"/>'
        f'<rect width="{W}" height="{H}" fill="url(#vig)"/>')
save('kilim.svg', svg(body, defs))
