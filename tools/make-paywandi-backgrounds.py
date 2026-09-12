"""Original illustrated call backgrounds for Paywandi, 1280x720.
All artwork is drawn here from shapes and gradients: no photographs, no third-party images.
Run from anywhere: writes into ../paywandi-bg next to this script."""
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
    return f'M0 {H} L' + ' L'.join(f'{f(x)} {f(y)}' for x, y in pts) + f' L{W} {H} Z'

def star(cx, cy, R, r, n, rot=-90):
    pts = []
    for i in range(2 * n):
        a = math.radians(rot + i * 180 / n)
        rad = R if i % 2 == 0 else r
        pts.append(f'{f(cx + rad * math.cos(a))},{f(cy + rad * math.sin(a))}')
    return ' '.join(pts)

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

# ------------------------------------------------------------------ 3. Kurdish rug
# A pile carpet in the Bijar / Senneh manner: madder-red field under a small lattice, a central
# medallion with pendants, corner spandrels, a navy main border of stars and botehs, guard stripes.
RED, RED_DK, NAVY, GOLD, IVORY, TEAL = '#8e1c1f', '#6c1417', '#1d2a4d', '#c8922f', '#ece0c4', '#2f6b6a'
X0, X1 = 36, W - 36            # rug body; fringe beyond on the short ends
def inset(d): return (X0 + d, d, X1 - d, H - d)

def boteh(cx, cy, s, rot, fill, inner):
    # the paisley: a teardrop whose tip curls over
    p = (f'M0 {f(-20 * s)} C {f(14 * s)} {f(-20 * s)} {f(18 * s)} {f(6 * s)} 0 {f(18 * s)} '
         f'C {f(-16 * s)} {f(8 * s)} {f(-14 * s)} {f(-8 * s)} {f(-4 * s)} {f(-12 * s)} '
         f'C {f(-10 * s)} {f(-16 * s)} {f(-6 * s)} {f(-22 * s)} 0 {f(-20 * s)} Z')
    return (f'<g transform="translate({f(cx)} {f(cy)}) rotate({rot})"><path d="{p}" fill="{fill}"/>'
            f'<circle cx="{f(2 * s)}" cy="{f(2 * s)}" r="{f(6 * s)}" fill="{inner}"/></g>')

def eight(cx, cy, R, fill):
    return f'<polygon points="{star(cx, cy, R, R * .62, 8, rot=-90 + 22.5)}" fill="{fill}"/>'

def hexagon(cx, cy, hw, hh, cut):
    return f'{f(cx - hw)},{f(cy)} {f(cx - hw + cut)},{f(cy - hh)} {f(cx + hw - cut)},{f(cy - hh)} {f(cx + hw)},{f(cy)} {f(cx + hw - cut)},{f(cy + hh)} {f(cx - hw + cut)},{f(cy + hh)}'

defs = (f'<pattern id="lattice" width="52" height="52" patternUnits="userSpaceOnUse" x="{X0 + 90}" y="90">'
        f'<rect width="52" height="52" fill="{RED}"/>'
        f'<path d="M26 0 L52 26 L26 52 L0 26 Z" fill="none" stroke="{RED_DK}" stroke-width="3"/>'
        f'<circle cx="26" cy="26" r="5" fill="{GOLD}"/>'
        + ''.join(f'<ellipse cx="{f(26 + 9 * math.cos(math.radians(a)))}" cy="{f(26 + 9 * math.sin(math.radians(a)))}" rx="4" ry="2.2" '
                  f'transform="rotate({a} {f(26 + 9 * math.cos(math.radians(a)))} {f(26 + 9 * math.sin(math.radians(a)))})" fill="{IVORY}" opacity=".85"/>'
                  for a in (0, 90, 180, 270)) +
        f'<circle cx="0" cy="0" r="3" fill="{NAVY}"/><circle cx="52" cy="0" r="3" fill="{NAVY}"/>'
        f'<circle cx="0" cy="52" r="3" fill="{NAVY}"/><circle cx="52" cy="52" r="3" fill="{NAVY}"/></pattern>'
        # warp and weft: the faint grid that makes it read as woven rather than printed
        '<pattern id="weave" width="4" height="4" patternUnits="userSpaceOnUse">'
        '<rect width="4" height="4" fill="#000" opacity="0"/><rect width="1" height="4" fill="#000" opacity=".07"/>'
        '<rect width="4" height="1" fill="#fff" opacity=".03"/></pattern>'
        # abrash: the gentle banding of hand-dyed wool
        '<linearGradient id="abrash" x1="0" y1="0" x2="1" y2="0">'
        + ''.join(f'<stop offset="{i / 10:.2f}" stop-color="#000" stop-opacity="{.04 + .05 * (0.5 + 0.5 * math.sin(i * 2.1)):.3f}"/>' for i in range(11)) +
        '</linearGradient>'
        '<radialGradient id="rugvig" cx=".5" cy=".5" r=".7"><stop offset=".55" stop-color="#000" stop-opacity="0"/>'
        '<stop offset="1" stop-color="#000" stop-opacity=".35"/></radialGradient>')

body = f'<rect width="{W}" height="{H}" fill="#2b1d16"/>'
# fringe on the short ends
for y in range(4, H, 7):
    body += (f'<line x1="2" y1="{y}" x2="{X0}" y2="{y + 1}" stroke="{IVORY}" stroke-width="3" opacity=".9"/>'
             f'<line x1="{X1}" y1="{y + 1}" x2="{W - 2}" y2="{y}" stroke="{IVORY}" stroke-width="3" opacity=".9"/>')
# outer guard: ivory with red dots
x, y, x2, y2 = inset(0)
body += f'<rect x="{x}" y="{y}" width="{x2 - x}" height="{y2 - y}" fill="{IVORY}"/>'
x, y, x2, y2 = inset(12)
body += f'<rect x="{x}" y="{y}" width="{x2 - x}" height="{y2 - y}" fill="{NAVY}"/>'
for t in range(X0 + 10, X1 - 6, 18):
    body += f'<circle cx="{t}" cy="6" r="2.6" fill="{RED}"/><circle cx="{t}" cy="{H - 6}" r="2.6" fill="{RED}"/>'
for t in range(12, H - 6, 18):
    body += f'<circle cx="{X0 + 6}" cy="{t}" r="2.6" fill="{RED}"/><circle cx="{X1 - 6}" cy="{t}" r="2.6" fill="{RED}"/>'
# main border motifs, alternating star and boteh, on all four sides
mid = 12 + 32   # centre line of the 64 px navy border
def along(a, b, step):
    n = max(1, round((b - a) / step)); return [a + (b - a) * (i + .5) / n for i in range(n)]
k = 0
for t in along(X0 + 76, X1 - 76, 78):
    for yy, rot in ((mid, 0), (H - mid, 180)):
        body += eight(t, yy, 20, IVORY) + f'<circle cx="{f(t)}" cy="{yy}" r="6" fill="{RED}"/>' if k % 2 == 0 else boteh(t, yy, 1.05, 90 + rot, GOLD, RED)
    k += 1
k = 0
for t in along(76, H - 76, 78):
    for xx, rot in ((X0 + mid, 0), (X1 - mid, 180)):
        body += eight(xx, t, 20, IVORY) + f'<circle cx="{xx}" cy="{f(t)}" r="6" fill="{RED}"/>' if k % 2 == 0 else boteh(xx, t, 1.05, rot, GOLD, RED)
    k += 1
for cx, cy in ((X0 + mid, mid), (X1 - mid, mid), (X0 + mid, H - mid), (X1 - mid, H - mid)):
    body += eight(cx, cy, 24, GOLD) + f'<circle cx="{cx}" cy="{cy}" r="8" fill="{NAVY}"/><circle cx="{cx}" cy="{cy}" r="4" fill="{IVORY}"/>'
# inner guard: gold with a running navy reciprocal
x, y, x2, y2 = inset(76)
body += f'<rect x="{x}" y="{y}" width="{x2 - x}" height="{y2 - y}" fill="{GOLD}"/>'
for t in range(X0 + 84, X1 - 80, 16):
    body += f'<polygon points="{t},79 {t + 8},85 {t},91 {t - 8},85" fill="{NAVY}"/><polygon points="{t},{H - 91} {t + 8},{H - 85} {t},{H - 79} {t - 8},{H - 85}" fill="{NAVY}"/>'
for t in range(92, H - 84, 16):
    body += f'<polygon points="{X0 + 85},{t - 8} {X0 + 91},{t} {X0 + 85},{t + 8} {X0 + 79},{t}" fill="{NAVY}"/><polygon points="{X1 - 85},{t - 8} {X1 - 79},{t} {X1 - 85},{t + 8} {X1 - 91},{t}" fill="{NAVY}"/>'
# the field
fx0, fy0, fx1, fy1 = inset(94)
body += f'<rect x="{fx0}" y="{fy0}" width="{fx1 - fx0}" height="{fy1 - fy0}" fill="url(#lattice)"/>'
# corner spandrels: quarter medallions
for cx, cy, sx, sy in ((fx0, fy0, 1, 1), (fx1, fy0, -1, 1), (fx0, fy1, 1, -1), (fx1, fy1, -1, -1)):
    body += (f'<path d="M{cx} {cy} h{sx * 190} q{-sx * 20} {sy * 90} {-sx * 190} {sy * 140} Z" fill="{GOLD}"/>'
             f'<path d="M{cx} {cy} h{sx * 176} q{-sx * 20} {sy * 82} {-sx * 176} {sy * 128} Z" fill="{NAVY}"/>'
             + eight(cx + sx * 62, cy + sy * 44, 18, IVORY) + boteh(cx + sx * 120, cy + sy * 26, .8, 0 if sx > 0 else 180, TEAL, GOLD))
# central medallion with pendants
cx, cy = 640, 360
for (dy, s) in ((-1, 1), (1, 1)):
    py = cy + dy * 232          # sits just outside the medallion's gold edge
    body += (f'<polygon points="{cx},{py - 34} {cx + 34},{py} {cx},{py + 34} {cx - 34},{py}" fill="{GOLD}"/>'
             f'<polygon points="{cx},{py - 24} {cx + 24},{py} {cx},{py + 24} {cx - 24},{py}" fill="{NAVY}"/>'
             f'<circle cx="{cx}" cy="{py}" r="7" fill="{IVORY}"/>'
             f'<rect x="{cx - 3}" y="{py + dy * 30 - (14 if dy < 0 else 0)}" width="6" height="14" fill="{GOLD}"/>')
body += (f'<polygon points="{hexagon(cx, cy, 330, 196, 120)}" fill="{GOLD}"/>'
         f'<polygon points="{hexagon(cx, cy, 318, 186, 116)}" fill="{NAVY}"/>')
# motifs placed midway between the outer and inner hexagons, so none sits on a frame
for sy in (-1, 1):
    body += eight(cx, cy + sy * 151, 15, IVORY)
    for sx in (-1, 1):
        body += boteh(cx + sx * 112, cy + sy * 151, .75, 90 if sx > 0 else 270, TEAL, GOLD)
        body += boteh(cx + sx * 208, cy + sy * 80, .7, (90 if sx > 0 else 270) + sx * sy * 35, TEAL, GOLD)
for sx in (-1, 1):
    body += eight(cx + sx * 257, cy, 15, IVORY)
body += (f'<polygon points="{hexagon(cx, cy, 196, 116, 70)}" fill="{IVORY}"/>'
         f'<polygon points="{hexagon(cx, cy, 182, 106, 64)}" fill="{RED}"/>'
         + eight(cx, cy, 78, GOLD) + eight(cx, cy, 50, NAVY) + eight(cx, cy, 26, IVORY) +
         f'<circle cx="{cx}" cy="{cy}" r="9" fill="{RED}"/>')
for dx in (-128, 128):
    body += boteh(cx + dx, cy, 1.1, 90 if dx > 0 else 270, GOLD, NAVY)
body += (f'<rect x="{X0}" y="0" width="{X1 - X0}" height="{H}" fill="url(#abrash)"/>'
         f'<rect x="{X0}" y="0" width="{X1 - X0}" height="{H}" fill="url(#weave)"/>'
         f'<rect width="{W}" height="{H}" fill="url(#rugvig)"/>')
save('kurdish-rug.svg', svg(body, defs))
