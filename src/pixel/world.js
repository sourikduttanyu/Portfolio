// Pixel world engine: CRT hero, wooden divider, tiny-planet work scene.
// Ported from the approved sketch. Everything is drawn into small canvases and scaled
// with nearest-neighbour, so all art (and any real clip) is genuinely pixelated.
// mountWorld() returns a cleanup that stops the loop and removes listeners and nodes.

export function mountWorld(root, { projects, jobs }) {
const $id = id => root.querySelector('#' + id);
const esc = v => String(v).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const offs = [];
const on = (el, ev, fn) => { el.addEventListener(ev, fn); offs.push(() => el.removeEventListener(ev, fn)); };
let raf = 0, ro = null, stopped = false;

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------------- data (from src/data) ---------------- */
const SCENES = { jellysynth: 'plasma', sentinel: 'code', 'go-pubsub': 'packets', veil: 'noise', chronos: 'chart', astral: 'meter', feastfleet: 'delivery' };
const PROJECTS = projects.map(p => {
  const href = p.repo ?? p.live;
  return { id: p.slug, name: p.name, tag: p.skill, line: p.tagline, plain: p.plain, results: p.results, how: p.how, stat: p.stat, pipeline: p.pipeline ?? [], open: p.source === 'open', libs: p.libraries,
    stack: p.libraries.join(' · '), src: p.source === 'open' ? 'Open source' : 'Closed source',
    href, linkText: href.replace(/^https:\/\/(github\.com\/)?/, ''), scene: SCENES[p.slug] ?? 'plasma' };
});
const JOBS = jobs.map(j => ({ id: j.slug, co: j.company, role: j.role, when: j.period,
  mono: j.company.split(' ').filter(w => /^[A-Z]/.test(w)).map(w => w[0]).join('').slice(0, 2),
  work: j.work.map(w => [w.name, w.text]) }));

/* ---------------- pixel helpers ---------------- */
const C = {
  out:'#140f22', plasticHi:'#e4dccb', plastic:'#c8bfab', plasticMid:'#a39a86', plasticLo:'#766e5e',
  bezel:'#2b2735', bezelLo:'#1c1924', glass:'#0b0a12', knob:'#3a3446', knobHi:'#6c6479', led:'#ff3d7f', ledOff:'#5a2034',
};
function rect(g, x, y, w, h, c) { g.fillStyle = c; g.fillRect(x, y, w, h); }
function pixelScale() { const w = innerWidth; return w >= 1560 ? 4 : w >= 1000 ? 3 : 2; }

/* ---------------- CRT sprite: 3/4 view, dithered, rim-lit ---------------- */
const TV_W = 100, TV_H = 90, SX = 10, SY = 33, SW = 54, SH = 42;
const hash = (x, y) => { const s = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453; return s - Math.floor(s); };
const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const bayer = (x, y) => BAYER[(y & 3) * 4 + (x & 3)] / 16;
const hex = h => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
const PLASTIC = ['#120d1c', '#4a4338', '#6f6655', '#978d78', '#bdb39c', '#d9d0b8', '#efe7d2'].map(hex);
const RIM_PINK = hex('#e58db3'), RIM_CYAN = hex('#8fd3e0');
function inPoly(x, y, pts) {
  let inside = false;
  for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
    const [xi, yi] = pts[i], [xj, yj] = pts[j];
    if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}
// Paint a sprite: fn(x, y) -> [r,g,b] | null, then outline everything non-empty.
function paint(w, h, fn, outline = PLASTIC[0], outside = false) {
  const cv = document.createElement('canvas'); cv.width = w; cv.height = h;
  const g = cv.getContext('2d'), img = g.createImageData(w, h), px = img.data;
  const filled = new Uint8Array(w * h);
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const c = fn(x + .5, y + .5, x, y); if (!c) continue;
    const k = (y * w + x) * 4; px[k] = c[0]; px[k + 1] = c[1]; px[k + 2] = c[2]; px[k + 3] = c[3] ?? 255; filled[y * w + x] = 1;
  }
  if (outside) {                                             // outline drawn around the shape, keeps 1px features
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      if (filled[y * w + x]) continue;
      const near = (x > 0 && filled[y * w + x - 1] === 1) || (x < w - 1 && filled[y * w + x + 1] === 1) || (y > 0 && filled[(y - 1) * w + x] === 1) || (y < h - 1 && filled[(y + 1) * w + x] === 1);
      if (near) { const k = (y * w + x) * 4; px[k] = outline[0]; px[k + 1] = outline[1]; px[k + 2] = outline[2]; px[k + 3] = 255; filled[y * w + x] = 2; }
    }
    g.putImageData(img, 0, 0); return cv;
  }
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    if (!filled[y * w + x]) continue;
    const edge = x === 0 || y === 0 || x === w - 1 || y === h - 1 || !filled[y * w + x - 1] || !filled[y * w + x + 1] || !filled[(y - 1) * w + x] || !filled[(y + 1) * w + x];
    if (edge) { const k = (y * w + x) * 4; px[k] = outline[0]; px[k + 1] = outline[1]; px[k + 2] = outline[2]; px[k + 3] = 255; }
  }
  g.putImageData(img, 0, 0); return cv;
}
const ramp = (pal, v, x, y) => pal[Math.max(1, Math.min(pal.length - 1, Math.floor(v + (bayer(x, y) - .5) * .55 - (hash(x, y) < .025 ? 1 : 0))))];
const mix = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];

const TV_TOP = [[4, 26], [84, 26], [92, 17], [18, 17]];
const TV_SIDE = [[84, 26], [92, 17], [92, 72], [84, 82]];
function buildTVFrame() {
  return paint(TV_W, TV_H, (fx, fy, x, y) => {
    // antenna
    if (x >= 48 && x <= 60 && y >= 14 && y <= 18) return y === 14 ? PLASTIC[3] : PLASTIC[1];
    // feet (with a lit top edge)
    if (y >= 82 && y <= 86 && ((x >= 12 && x <= 24) || (x >= 62 && x <= 74))) return y === 82 ? PLASTIC[3] : PLASTIC[1];
    // top face: lightest, fades toward the back, vent slots
    if (inPoly(fx, fy, TV_TOP)) {
      const depth = (26 - y) / 9;
      if (y >= 19 && y <= 23 && y % 2 === 1 && x > 28 + (26 - y) && x < 72 && x % 4 !== 0) return PLASTIC[2];
      return ramp(PLASTIC, 5.4 - depth * 1.3, x, y);
    }
    // side face: in shadow, cyan rim on the back edge, faded sticker
    if (inPoly(fx, fy, TV_SIDE)) {
      if (x === 91) return RIM_CYAN;
      if (x >= 86 && x <= 89 && y >= 44 && y <= 52) return (y === 46 || y === 49) ? [120, 96, 60] : [196, 170, 110];
      return ramp(PLASTIC, 2.9 - (y - 26) / 56 * .8, x, y);
    }
    // front face
    if (x >= 4 && x <= 84 && y >= 26 && y <= 82) {
      const corner = (x === 4 || x === 84) && (y === 26 || y === 82);
      if (corner) return null;
      if (x === 5) return mix(PLASTIC[4], RIM_PINK, .7);                                // pink rim light
      if (y === 27 && x < 60) return x < 30 ? PLASTIC[6] : PLASTIC[5];                    // lip highlight
      if (y >= 80) return PLASTIC[2];
      // screws
      if ([[7, 29], [81, 29], [7, 79], [81, 79]].some(([sx, sy]) => x >= sx && x <= sx + 1 && y >= sy && y <= sy + 1)) return x === 7 || x === 81 ? PLASTIC[5] : PLASTIC[1];
      // bezel: outer lip, recessed inner ring (shadow top-left, lit bottom-right), glass edge
      if (x >= 7 && x <= 66 && y >= 30 && y <= 78) {
        if (x >= SX && x < SX + SW && y >= SY && y < SY + SH) return [11, 10, 18];
        if (x === 7 || y === 30) return PLASTIC[2];
        if (x === 66 || y === 78) return PLASTIC[5];
        const inner = x >= 8 && x <= 65 && y >= 31 && y <= 77;
        if (inner) {
          if (x <= 9 || y <= 32) return [22, 19, 30];
          if (x >= 64 || y >= 75) return [62, 58, 74];
          return [43, 39, 53];
        }
      }
      // control panel: knobs with ridges + pointer, speaker grille, LED
      for (const [cx, cy] of [[76, 38], [76, 50]]) {
        const d = Math.hypot(fx - cx - .5, fy - cy - .5);
        if (d < 4.6) {
          if (d > 3.6) return [18, 14, 26];
          const ang = Math.atan2(fy - cy, fx - cx);
          if (d > 2.6 && Math.floor((ang + Math.PI) / (Math.PI / 5)) % 2) return [44, 38, 56];
          if (x === cx && y < cy) return [230, 225, 235];
          return fx - cx + fy - cy < -1 ? [110, 102, 124] : fx - cx + fy - cy < 1.5 ? [72, 64, 86] : [52, 46, 64];
        }
      }
      if (y >= 66 && y <= 76 && x >= 70 && x <= 81 && x % 2 === 0 && y % 2 === 0) return PLASTIC[1];
      if (x >= 70 && x <= 71 && y >= 78 && y <= 78) return [255, 61, 127];
      return ramp(PLASTIC, 4.7 - (y - 26) / 56 * 1.6, x, y);
    }
    return null;
  });
}
// Antennas: 2px chrome rods (lit left edge, shaded right), ball tips, outlined from outside
// so the thin shapes keep their colour. Composited under the body.
function buildAntenna() {
  const rods = [[[50, 16], [34, 2]], [[58, 16], [78, 2]]];
  return paint(TV_W, TV_H, (fx, fy) => {
    for (const [[x0, y0], [x1, y1]] of rods) {
      if (Math.hypot(fx - x1, fy - y1) < 2) return fx - x1 + fy - y1 < -.5 ? [255, 255, 255] : [196, 200, 214];   // ball tip
      const t = (fy - y0) / (y1 - y0);
      if (t < 0 || t > 1) continue;
      const cx = x0 + (x1 - x0) * t, d = fx - cx;
      if (Math.abs(d) <= 1.05) return d < 0 ? [226, 230, 240] : [128, 134, 150];
    }
    return null;
  }, [20, 16, 30], true);
}
const TV_FRAME = (() => {
  const c = document.createElement('canvas'); c.width = TV_W; c.height = TV_H;
  const g = c.getContext('2d'); g.drawImage(buildAntenna(), 0, 0); g.drawImage(buildTVFrame(), 0, 0);
  return c;
})();

/* Live knobs: ridges + pointer rotate, shading stays lit from the top-left */
const KNOBS = [[76, 38], [76, 50]];
function drawKnob(g, cx, cy, ang) {
  for (let dy = -5; dy <= 5; dy++) for (let dx = -5; dx <= 5; dx++) {
    const d = Math.hypot(dx, dy); if (d >= 4.6) continue;
    let c;
    if (d > 3.6) c = '#120e1a';
    else {
      const a = Math.atan2(dy, dx) - ang;
      const along = dx * Math.cos(ang) + dy * Math.sin(ang), across = Math.abs(-dx * Math.sin(ang) + dy * Math.cos(ang));
      if (along > .4 && along < 3.4 && across < .55) c = '#f2eef8';                              // pointer
      else if (d > 2.6 && Math.floor(((a % (2 * Math.PI)) + 2 * Math.PI) / (Math.PI / 5)) % 2) c = '#2c2638';  // grip ridges
      else c = dx + dy < -1 ? '#6e667e' : dx + dy < 1.5 ? '#484056' : '#342e40';
    }
    g.fillStyle = c; g.fillRect(cx + dx, cy + dy, 1, 1);
  }
}
const knobAngle = (k, t) => {
  const p = k.dur ? Math.min(1, Math.max(0, (t - k.t0) / k.dur)) : 1;
  return k.from + (k.to - k.from) * (1 - Math.pow(1 - p, 4));                               // ease-out-quart
};

/* 7-segment channel readout on the panel */
const SEG = { 1: 'bc', 2: 'abged', 3: 'abgcd', 4: 'fgbc', 5: 'afgcd', 6: 'afgedc' };
function drawDigit(g, n) {
  rect(g, 69, 57, 13, 8, '#0a0708'); rect(g, 69, 64, 13, 1, '#5a5264');
  const on = '#ff3d4a', off = '#2a1216', s = SEG[n] || '';
  const segs = { a: [74, 58, 3, 1], b: [76, 58, 1, 3], c: [76, 61, 1, 3], d: [74, 63, 3, 1], e: [74, 61, 1, 3], f: [74, 58, 1, 3], g: [74, 60, 3, 1] };
  for (const k in segs) { const [x, y, w, h] = segs[k]; rect(g, x, y, w, h, s.includes(k) ? on : off); }
}

/* ---------------- procedural placeholder footage (54x42) ---------------- */
const PAL_PLASMA = ['#12081f','#3a0f5c','#7a1e7a','#d13d86','#ff8a5c','#ffd66b'];
const scenes = {
  plasma(g, t) {
    for (let y = 0; y < SH; y++) for (let x = 0; x < SW; x++) {
      const v = Math.sin(x * .19 + t) + Math.sin(y * .23 - t * 1.3) + Math.sin((x + y) * .12 + t * .7) + Math.sin(Math.hypot(x - 27, y - 21) * .3 - t * 2);
      g.fillStyle = PAL_PLASMA[Math.max(0, Math.min(5, Math.floor((v + 4) / 8 * 6)))]; g.fillRect(x, y, 1, 1);
    }
  },
  code(g, t) {
    rect(g, 0, 0, SW, SH, '#0c1420');
    const scroll = Math.floor(t * 6);
    for (let r = 0; r < 14; r++) {
      const n = r + scroll, y = r * 3 + 1;
      const ind = (n * 7) % 4 * 3, len = 8 + (n * 13) % 30;
      const flagged = n % 9 === 4;
      if (flagged) rect(g, 0, y - 1, SW, 3, '#4a1025');
      rect(g, 2, y, 3, 1, '#34506b');                                   // line number
      rect(g, 7 + ind, y, len, 1, flagged ? '#ff5c7a' : ['#6fd3ff','#b48cff','#9be58f'][n % 3]);
      if ((n * 5) % 3 === 0) rect(g, 9 + ind + len, y, 6, 1, '#c9d4e0');
    }
    // three agent dots pulsing
    for (let i = 0; i < 3; i++) rect(g, SW - 12 + i * 4, SH - 4, 2, 2, (Math.floor(t * 3) + i) % 3 === 0 ? '#ffd66b' : '#34506b');
  },
  packets(g, t) {
    rect(g, 0, 0, SW, SH, '#0b1118');
    const hub = [10, 21], subs = [[44, 8], [46, 21], [44, 34]];
    subs.forEach(([x, y]) => { for (let i = 0; i <= 30; i++) { const k = i / 30; rect(g, Math.round(hub[0] + (x - hub[0]) * k), Math.round(hub[1] + (y - hub[1]) * k), 1, 1, '#1d3346'); } });
    rect(g, hub[0] - 3, hub[1] - 3, 7, 7, '#3de0ff'); rect(g, hub[0] - 2, hub[1] - 2, 5, 5, '#0b1118'); rect(g, hub[0] - 1, hub[1] - 1, 3, 3, '#3de0ff');
    subs.forEach(([x, y], s) => {
      rect(g, x - 2, y - 2, 5, 5, '#9be58f');
      for (let p = 0; p < 4; p++) {
        const k = ((t * 1.6 + p / 4 + s * .13) % 1);
        rect(g, Math.round(hub[0] + (x - hub[0]) * k), Math.round(hub[1] + (y - hub[1]) * k), 2, 1, '#ffd66b');
      }
    });
    rect(g, 2, 2, 1 + Math.floor((Math.sin(t * 2) + 1) * 3), 1, '#ff5c7a');
  },
  delivery(g, t) {                                                   // FeastFleet: order -> SQS -> rider across a street grid
    rect(g, 0, 0, SW, SH, '#0d0f14');
    for (let x = 2; x < SW; x += 10) rect(g, x, 0, 2, SH, '#1c2230');
    for (let y = 4; y < SH; y += 10) rect(g, 0, y, SW, 2, '#1c2230');
    rect(g, 4, 7, 6, 5, '#ff8a5c'); rect(g, 5, 6, 4, 1, '#ffb45c');           // restaurant
    rect(g, 43, 27, 6, 5, '#6fd3ff'); rect(g, 44, 26, 4, 1, '#9fe8ff');        // customer
    const q = Math.floor(t * 1.5) % 5;                                        // SQS queue filling and draining
    rect(g, 36, 2, 16, 5, '#2a2f45');
    for (let k = 0; k < 4; k++) rect(g, 37 + k * 4, 3, 3, 3, k < (q > 3 ? 7 - q : q) ? '#ffd66b' : '#1c2230');
    const k = (t * .25) % 1, path = [[10, 9], [22, 9], [22, 29], [43, 29]];     // rider follows the streets
    const segs = [12, 20, 21], total = 53; let d = k * total, i = 0;
    while (i < 2 && d > segs[i]) { d -= segs[i]; i++; }
    const [ax, ay] = path[i], [bx, by] = path[i + 1], f = Math.min(1, d / segs[i]);
    rect(g, Math.round(ax + (bx - ax) * f) - 1, Math.round(ay + (by - ay) * f) - 1, 3, 3, '#57f287');
    for (let s2 = 0; s2 < 3; s2++) rect(g, Math.round(ax + (bx - ax) * Math.max(0, f - .06 * (s2 + 1))), Math.round(ay + (by - ay) * Math.max(0, f - .06 * (s2 + 1))), 1, 1, '#2f6b4a');
  },
  nosignal(g, t) {                                                   // empty slot: SMPTE bars + blinking NO SIGNAL
    const bars = ['#c0c0c0', '#c0c000', '#00c0c0', '#00c000', '#c000c0', '#c00000', '#0000c0'];
    bars.forEach((c, k) => rect(g, Math.floor(k * SW / 7), 0, Math.ceil(SW / 7), 28, c));
    ['#0000c0', '#131313', '#c000c0', '#131313', '#00c0c0', '#131313', '#c0c0c0'].forEach((c, k) => rect(g, Math.floor(k * SW / 7), 28, Math.ceil(SW / 7), 4, c));
    rect(g, 0, 32, SW, 10, '#101010');
    if (Math.floor(t * 1.5) % 2 === 0) { rect(g, 6, 12, 42, 9, '#000000cc'); g.font = '8px "Silkscreen"'; g.textBaseline = 'top'; g.fillStyle = '#ffffff'; g.fillText('NO SIGNAL', 9, 12); }
  },
  noise(g, t) {
    rect(g, 0, 0, SW, SH, '#10091a');
    const cap = 12;
    for (let i = 0; i < 8; i++) {
      const trueH = 6 + ((i * 37) % 22), noisy = Math.max(2, trueH + Math.round(Math.sin(t * 4 + i * 1.7) * 4));
      rect(g, 4 + i * 6, SH - 4 - noisy, 4, noisy, noisy > cap + 10 ? '#ff5c7a' : '#b48cff');
    }
    for (let x = 0; x < SW; x += 2) rect(g, x, SH - 4 - cap - 10, 1, 1, '#ffd66b');     // cap line
    // blocked ad
    const on = Math.floor(t * 1.2) % 2 === 0;
    rect(g, 34, 4, 16, 10, on ? '#3a2233' : '#1a1320');
    if (on) for (let i = 0; i < 10; i++) { rect(g, 37 + i, 4 + i, 1, 1, '#ff5c7a'); rect(g, 46 - i, 4 + i, 1, 1, '#ff5c7a'); }
  },
  chart(g, t) {
    rect(g, 0, 0, SW, SH, '#07140e');
    for (let y = 6; y < SH; y += 8) for (let x = 0; x < SW; x += 3) rect(g, x, y, 1, 1, '#143324');
    let prev = null;
    for (let x = 0; x < SW; x++) {
      const v = Math.sin((x + t * 14) * .18) * 8 + Math.sin((x + t * 14) * .05) * 7 + ((x * 31 + Math.floor(t * 14)) % 5 === 0 ? 5 : 0);
      const y = Math.round(21 - v);
      if (prev !== null) { const a = Math.min(prev, y), b = Math.max(prev, y); rect(g, x, a, 1, b - a + 1, '#57f287'); }
      prev = y;
    }
    rect(g, SW - 3, 0, 3, SH, '#07140e'); rect(g, SW - 2, prev - 1, 2, 2, '#e6ffe9');
  },
  meter(g, t) {
    rect(g, 0, 0, SW, SH, '#0e0c18');
    const k = (t * .12) % 1, w = Math.floor(k * 44);
    rect(g, 4, 18, 46, 8, '#2a2438'); rect(g, 5, 19, 44, 6, '#0e0c18');
    const col = k < .4 ? '#57f287' : k < .55 ? '#ffd66b' : k < .7 ? '#ff9f4a' : '#ff5c7a';
    rect(g, 5, 19, w, 6, col);
    [.4, .55, .7].forEach(m => rect(g, 5 + Math.floor(44 * m), 15, 1, 14, '#6c6479'));
    for (let i = 0; i < 5; i++) rect(g, 6 + i * 9, 32, 6, 4, i < Math.floor(k * 6) ? '#b48cff' : '#2a2438');  // saved snapshots
    if (k > .7 && Math.floor(t * 4) % 2) rect(g, 4, 6, 18, 3, '#ff5c7a');
  },
};

/* ---------------- CRT post: glow spill, scanlines, curved glass, static ---------------- */
function avgColor(sg) {
  const d = sg.getImageData(0, 0, SW, SH).data; let r = 0, gg = 0, b = 0, n = 0;
  for (let i = 0; i < d.length; i += 16) { r += d[i]; gg += d[i + 1]; b += d[i + 2]; n++; }
  return [r / n | 0, gg / n | 0, b / n | 0];
}
function crtPost(g, sg, noisy) {
  // screen light spilling onto the recessed bezel
  const [r, gg, b] = noisy ? [170, 170, 180] : avgColor(sg);
  g.fillStyle = `rgba(${r},${gg},${esc(b)},.28)`;
  g.fillRect(SX - 2, SY - 2, SW + 4, 2); g.fillRect(SX - 2, SY + SH, SW + 4, 2);
  g.fillRect(SX - 2, SY, 2, SH); g.fillRect(SX + SW, SY, 2, SH);
  g.fillStyle = `rgba(${r},${gg},${esc(b)},.12)`; g.fillRect(SX - 3, SY - 3, SW + 6, 1);
  // scanlines
  g.fillStyle = 'rgba(0,0,0,.3)';
  for (let y = 1; y < SH; y += 2) g.fillRect(SX, SY + y, SW, 1);
  // curved-glass vignette: darker toward every edge, rounded corners
  g.fillStyle = 'rgba(0,0,0,.28)';
  g.fillRect(SX, SY, SW, 1); g.fillRect(SX, SY + SH - 1, SW, 1); g.fillRect(SX, SY, 1, SH); g.fillRect(SX + SW - 1, SY, 1, SH);
  g.fillStyle = 'rgba(0,0,0,.14)';
  g.fillRect(SX + 1, SY + 1, SW - 2, 1); g.fillRect(SX + 1, SY + SH - 2, SW - 2, 1); g.fillRect(SX + 1, SY + 1, 1, SH - 2); g.fillRect(SX + SW - 2, SY + 1, 1, SH - 2);
  g.fillStyle = '#2b2735';
  [[0, 0], [SW - 2, 0], [0, SH - 1], [SW - 2, SH - 1]].forEach(([x, y]) => g.fillRect(SX + x, SY + y, 2, 1));
  [[0, 1], [SW - 1, 1], [0, SH - 2], [SW - 1, SH - 2]].forEach(([x, y]) => g.fillRect(SX + x, SY + y, 1, 1));
  // glare: curved streak top-left + a hot dot
  g.fillStyle = 'rgba(255,255,255,.16)';
  for (let i = 0; i < 16; i++) g.fillRect(SX + 3 + i, SY + 3 + Math.floor(i * i / 60), 1, 1);
  for (let i = 0; i < 7; i++) g.fillRect(SX + 3, SY + 4 + i, 1, 1);
  g.fillStyle = 'rgba(255,255,255,.4)'; g.fillRect(SX + 4, SY + 4, 1, 1);
}
function staticNoise(g, t) {
  for (let y = 0; y < SH; y++) for (let x = 0; x < SW; x++) {
    const v = Math.random() * 255 | 0; g.fillStyle = `rgb(${v},${v},${v + 10})`; g.fillRect(SX + x, SY + y, 1, 1);
  }
  const roll = Math.floor((t * 90) % SH);
  g.fillStyle = 'rgba(255,255,255,.55)'; g.fillRect(SX, SY + roll, SW, 3);
}

/* ---------------- real clips (public/clips/<slug>.mp4), placeholder until present ---------------- */
const clips = {};
function clipFor(slug) {
  if (clips[slug]) return clips[slug];
  const v = document.createElement('video');
  const c = clips[slug] = { video: v, ready: false };
  v.muted = true; v.loop = true; v.playsInline = true; v.preload = 'auto';
  v.addEventListener('loadeddata', () => { c.ready = true; if (!reduce) v.play().catch(() => {}); });
  v.src = `clips/${slug}.mp4`;
  return c;
}
function drawCover(g, v, w, h) {
  const s = Math.max(w / v.videoWidth, h / v.videoHeight), sw = w / s, sh = h / s;
  g.drawImage(v, (v.videoWidth - sw) / 2, (v.videoHeight - sh) / 2, sw, sh, 0, 0, w, h);
}
function playOnly(slugs) {
  Object.entries(clips).forEach(([k, c]) => { if (!slugs.includes(k) && !c.video.paused) c.video.pause(); });
  slugs.forEach(k => { const c = clipFor(k); if (c.ready && !reduce && c.video.paused) c.video.play().catch(() => {}); });
}

/* ---------------- build TVs ---------------- */
const stage = $id('stage');
let channel = 0, switchAt = -10, osdUntil = 0;
const tvs = [0, 1, 2].map(i => {
  const btn = document.createElement('button'); btn.className = 'tv';
  const cv = document.createElement('canvas'); cv.width = TV_W; cv.height = TV_H;
  const label = document.createElement('div'); label.className = 'tv-label';
  const shadow = document.createElement('div'); shadow.className = 'tv-shadow';
  btn.append(cv, shadow, label); stage.append(btn);
  const g = cv.getContext('2d');
  const screen = document.createElement('canvas'); screen.width = SW; screen.height = SH;
  const sg = screen.getContext('2d', { willReadFrequently: true });
  btn.addEventListener('click', () => { takeControl(); const p = current()[i]; if (p) $id('p-' + p.id)?.scrollIntoView({ block: 'start' }); });
  const up = -Math.PI / 2;
  const knobs = [{ from: up, to: up, t0: 0, dur: 0 }, { from: up + .6 * (i - 1), to: up + .6 * (i - 1), t0: 0, dur: 0 }];
  return { btn, cv, g, sg, screen, label, knobs };
});
// Channels of three; a short last channel shows NO SIGNAL on its open slots.
const NCH = Math.ceil(PROJECTS.length / 3);
function current() { return [0, 1, 2].map(i => PROJECTS[channel * 3 + i] ?? null); }
// Triangle: TV 1 bottom-left, TV 2 bottom-right, TV 3 centred and raised.
// Picks the largest scale at which all three screens + captions fit above the fold.
const GAP = 20;
function layoutStage(extra = 0) {
  const LABEL_H = Math.max(50, ...tvs.map(tv => tv.label.offsetHeight + 22));   // real caption height (wraps on phones)
  const G = 0;
  const W = stage.clientWidth;
  const top = stage.getBoundingClientRect().top + scrollY;
  const below = root.querySelector('.remote').offsetHeight + $id('hint').offsetHeight + 44 + extra;
  const availH = Math.max(260, innerHeight - top - below);
  let fit = null;
  for (let s = 4; s >= 1; s -= .25) {
    const w = TV_W * s, h = TV_H * s, full = h + LABEL_H;
    const overlap = 3 * w + 2 * GAP <= W;                       // bottom pair clears the raised TV sideways
    if (!overlap && 2 * w + GAP > W) continue;
    const drop = overlap ? h * .5 : full + 4;                   // how far the bottom pair sits below the top TV
    if (drop + full <= availH) { fit = { s, w, h, full, drop, overlap }; break; }
  }
  fit ??= { s: 1, w: TV_W, h: TV_H, full: TV_H + LABEL_H, drop: TV_H + LABEL_H + 4, overlap: false };
  const { s, w, drop, full, overlap } = fit;
  const spread = overlap ? Math.min((W - 2 * w) / 2, w / 2 + GAP + w * .45) : Math.min((W - 2 * w) / 2, GAP * 1.5);
  const pos = [[G + W / 2 - spread - w, drop], [G + W / 2 + spread, drop], [G + (W - w) / 2, 0]];
  tvs.forEach((tv, i) => {
    tv.cv.style.width = w + 'px'; tv.cv.style.height = TV_H * s + 'px';
    tv.btn.style.width = w + 'px'; tv.btn.style.left = pos[i][0] + 'px'; tv.btn.style.top = pos[i][1] + 'px';
  });
  stage.style.height = drop + full + 'px';
  // the remote rises into the empty space under the raised middle TV, between the lower two
  const remote = root.querySelector('.remote'), gapW = pos[1][0] - (pos[0][0] + w);
  if (overlap && gapW >= remote.offsetWidth + 24) remote.style.marginTop = -Math.max(0, drop - 24) + 'px';
  else {                                                                    // sit just below the lowest set / caption
    const lowest = Math.max(...tvs.map(tv => tv.btn.offsetTop + tv.btn.offsetHeight));
    const m = Math.max(8, lowest - (drop + full) + 10);
    remote.style.marginTop = m + 'px';
    if (!extra && m > 8) layoutStage(m);                                    // reserve that height and fit again
  }
}
// Work scene = one screen: size the three sets so they, their plates and the raised middle one
// fit between the top edge and the ground. Narrow screens stack instead (scene grows taller).
function layoutWork() {
  const sceneEl = $id('scene'), vw = sceneEl.clientWidth, vh = window.innerHeight;
  const narrow = vw < 860;
  sceneEl.classList.toggle('fit', !narrow);
  let s = pixelScale();
  if (!narrow) {
    const top = Math.max(40, vh * .07), ground = Math.max(150, vh * .2), plate = 64;
    const byH = (vh - top - ground - plate) / (TV_H * 1.3), byW = vw * .8 / (TV_W * 3.3);
    s = Math.max(1.5, Math.min(4, Math.floor(Math.min(byH, byW) * 4) / 4));
    sceneEl.style.setProperty('--wtop', top + 'px');
    const raise = Math.round(TV_H * s * .3) + 'px';
    lcds.forEach(l => { l.d.style.marginTop = l.n === 1 ? '0px' : raise; });
  } else lcds.forEach(l => { l.d.style.marginTop = '0px'; });
  lcds.forEach(l => { l.cv.style.width = TV_W * s + 'px'; l.cv.style.height = TV_H * s + 'px'; l.d.style.width = Math.max(TV_W * s, 200) + 'px'; });
}
function sizeTVs() {
  layoutStage(); bk = null;
  layoutWork();
  drawBeam(); drawSign();
}

function renderNow() {
  const now = $id('now');
  now.innerHTML = current().filter(Boolean).map(p => `
    <article id="p-${p.id}">
      <div class="tag">${esc(p.tag)}</div>
      <h2>${esc(p.name)}</h2>
      <p style="color:var(--ink)">${esc(p.line)}</p>
      <p>${esc(p.plain)}</p>
      <p class="meta"><b>Results</b> ${esc(p.results)}</p>
      <p class="meta"><b>Stack</b> ${esc(p.libs.join(' · '))}</p>
      ${p.pipeline.length ? `<p class="meta"><b>Flow</b> ${esc(p.pipeline.join(' → '))}</p>` : ''}
      <details class="how"><summary>How it works</summary><p>${esc(p.how)}</p></details>
      <p class="meta">${esc(p.src)} · <a href="${p.href}" target="_blank" rel="noopener noreferrer">${esc(p.linkText)} ↗</a></p>
    </article>`).join('');
  tvs.forEach((tv, i) => {
    const p = current()[i];
    tv.btn.classList.toggle('empty', !p);
    tv.label.innerHTML = p ? `<small>${esc(p.tag)}</small>${esc(p.name)}` : `<small>CH 0${channel + 1}</small>Open slot`;
    tv.btn.setAttribute('aria-label', p ? `${esc(p.name)}: ${esc(p.line)} Show details` : 'Open slot, no project on this channel yet');
  });
  const ch = $id('chLabel'), pad = n => String(n).padStart(2, '0');
  ch.innerHTML = `<span class="ch-num">CH ${pad(channel + 1)}<small> /${pad(NCH)}</small></span>`
    + `<span class="ch-pips" aria-hidden="true">${Array.from({ length: NCH }, (_, i) => `<i class="${i === channel ? 'on' : ''}"></i>`).join('')}</span>`;
  ch.setAttribute('aria-label', `Channel ${channel + 1} of ${NCH}`);
}
function flip(dir) {
  channel = (channel + dir + NCH) % NCH;
  switchAt = performance.now() / 1000; osdUntil = switchAt + 1.6;
  tvs.forEach((tv, i) => {                                   // every set turns its knobs its own way
    const [ch, fine] = tv.knobs, t0 = switchAt + i * .06, dur = reduce ? 0 : .32;
    ch.from = knobAngle(ch, switchAt); ch.to = ch.from + dir * (Math.PI / 3 + i * .45); ch.t0 = t0; ch.dur = dur;
    fine.from = knobAngle(fine, switchAt); fine.to = fine.from - dir * (.35 + hash(i, channel) * .9); fine.t0 = t0 + .08; fine.dur = dur;
  });
  renderNow(); attractAt = switchAt; playOnly([...current().filter(Boolean).map(p => p.id), ...JOBS.map(j => j.id)]);
  if (reduce) (raf = requestAnimationFrame(frame));
}
// Attract mode: until someone interacts, the sets flip themselves every ATTRACT seconds so a
// recruiter who never clicks still sees every project. Any interaction hands over control.
const ATTRACT = 10;
let attract = !reduce, attractAt = 0;
function takeControl() { attract = false; root.classList.add('ch-manual'); }
on(window, 'scroll', () => { if (attract && window.scrollY > 40) takeControl(); });
const readIO = new IntersectionObserver(([e]) => { if (e.isIntersecting && attract) takeControl(); }, { threshold: .25 });
readIO.observe($id('now')); offs.push(() => readIO.disconnect());
$id('prev').onclick = () => { takeControl(); flip(-1); };
$id('next').onclick = () => { takeControl(); flip(1); };
// Swipe across the TVs on touch screens.
let touchX = null;
on(stage, 'touchstart', e => { touchX = e.touches[0].clientX; });
on(stage, 'touchend', e => { if (touchX === null) return; const dx = e.changedTouches[0].clientX - touchX; touchX = null; if (Math.abs(dx) > 40) { takeControl(); flip(dx < 0 ? 1 : -1); } });
on(window, 'keydown', e => { if (e.altKey || e.ctrlKey || e.metaKey || /INPUT|TEXTAREA/.test(e.target.tagName)) return; if (e.key === 'ArrowRight') { takeControl(); flip(1); press('next'); } if (e.key === 'ArrowLeft') { takeControl(); flip(-1); press('prev'); } });
function press(id) { const b = $id(id); b.classList.add('pressed'); setTimeout(() => b.classList.remove('pressed'), 130); }

function drawTVs(t) {
  if (attract) {                                                        // attract-mode countdown + flip
    const k = Math.min(1, (t - attractAt) / ATTRACT);
    root.style.setProperty('--attract', k.toFixed(3));
    if (k >= 1 && vis.hero) flip(1);
  }
  const staticFor = reduce ? 0 : .38;
  tvs.forEach((tv, i) => {
    tv.g.clearRect(0, 0, TV_W, TV_H); tv.g.drawImage(TV_FRAME, 0, 0);
    tv.knobs.forEach((k, j) => drawKnob(tv.g, KNOBS[j][0], KNOBS[j][1], knobAngle(k, t)));
    const since = t - switchAt - i * .06;               // slight stagger between sets
    const surge = tv.surgeAt != null && t - tv.surgeAt >= 0 && t - tv.surgeAt < .7;
    const noisy = (since >= 0 && since < staticFor) || (surge && t - tv.surgeAt < .3);
    if (noisy) { staticNoise(tv.g, t); }
    else {
      const p = current()[i], clip = p && clipFor(p.id);
      if (!p) scenes.nosignal(tv.sg, reduce ? 0 : t);
      else if (clip.ready) drawCover(tv.sg, clip.video, SW, SH); else scenes[p.scene](tv.sg, reduce ? 1.5 : t + i);
      tv.g.drawImage(tv.screen, SX, SY);
      if (t < osdUntil) {                                   // on-screen display
        tv.g.fillStyle = '#9be58f'; tv.g.font = '8px "Press Start 2P"'; tv.g.textBaseline = 'top';
        tv.g.fillText('CH' + (channel + 1), SX + 3, SY + 3);
      }
    }
    crtPost(tv.g, tv.sg, noisy); drawDigit(tv.g, surge ? 1 + Math.floor(Math.random() * 6) : channel + 1);
    screenGlow(tv.btn, tv.sg, t);
  });
}

/* ---------------- sky: Brooklyn at night (DUMBO view), rain + thunderstorm ---------------- */
// Back to front: Manhattan skyline across the East River (One WTC, Empire State, Chrysler),
// the river with rain-broken reflections, a Brooklyn Bridge tower with its cable web, and
// DUMBO rooftops with wooden water towers, a fire escape and Jane's Carousel on the water.
const sky = $id('sky'), kg = sky.getContext('2d');
let SKY_W = 320, SKY_H = 180, HY = 136, PY = 150, bk = null, drops = [];
// Two palettes over the same hand-placed city. Night: neon rain, warm windows, violet haze.
// Dawn: sun low in the east-southeast, Manhattan's faces catch it; glass throws the sky back.
const NIGHT = {
  day: false,
  sky: ['#05030f', '#08061a', '#0d0a26', '#151034', '#1f1540', '#2d1a4a', '#40204f'],
  haze: [70, 40, 110], hazeK: .45,
  face: '#1b1537', faceHi: '#2a2250', side: '#100c24', rim: '#3e3470',
  win: ['#ffcf7a', '#ffe3a8', '#9fd7ff', '#ff6fa0'], winP: .22,
  glassTop: '#1a1a3e', glassBot: '#3a2a5a', streak: '#6a5aa0',
  copper: '#1f3a3a', copperHi: '#2f5a55', masonry: '#1e1834', cream: '#2a2240', crownLit: '#ffe6a8',
  stone: '#2c2546', stoneHi: '#3d3560', stoneLo: '#171229', stoneJoint: '#221c3a', arch: '#07050f',
  deck: '#1a1530', deckLo: '#0c0a18', deckLight: '#ffb45c', cable: '#5e548f', hanger: '#4a427844', stay: '#6b5fa840',
  brick: '#1c1226', brickLo: '#140c1c', brickHi: '#2a1b33', brickSide: '#0f0916', parapet: '#35243f',
  foreWin: '#ffb45c', foreWinP: .1, winDark: '#0b0714', fire: '#2a2140',
  tank: ['#4a3526', '#3a2a1f', '#2e2118', '#1f160f'], carousel: { glass: '#ffcf7a66', top: '#ffcf7a', horse: '#fff1c4' },
  water: ['#07051a', '#0b0824'], waterTint: 'rgba(8,6,26,.55)',
};
const DAWN = {
  day: true,
  sky: ['#1d2350', '#2c3266', '#43407a', '#6b4a86', '#9c5a86', '#cf6f78', '#f09468', '#ffc07a'],
  haze: [240, 170, 150], hazeK: .5,
  face: '#8d86b2', faceHi: '#c7b4c4', side: '#5d5a8a', rim: '#ffe8c8',
  win: ['#4d4a78', '#5a5788', '#ffe2b0'], winP: .3,
  glassTop: '#6a74b0', glassBot: '#f0a878', streak: '#fff0d8',
  copper: '#4f8f7a', copperHi: '#7fbfa2', masonry: '#a4889a', cream: '#d8c0b0', crownLit: '#fff3d8',
  stone: '#a88c86', stoneHi: '#d8b89e', stoneLo: '#6e5a68', stoneJoint: '#8a7278', arch: '#3a2e4e',
  deck: '#4a3f5e', deckLo: '#342b45', deckLight: '#7a6a80', cable: '#3a3350', hanger: '#3a335040', stay: '#3a335030',
  brick: '#7a3e38', brickLo: '#64302e', brickHi: '#a4584a', brickSide: '#4a2530', parapet: '#c98a6a',
  foreWin: '#ffe2b0', foreWinP: .12, winDark: '#3a2a3a', fire: '#3a2230',
  tank: ['#c89a6a', '#9a6e48', '#7a5438', '#4a3222'], carousel: { glass: '#ffe6b0aa', top: '#fff3d0', horse: '#ffffff' },
  water: ['#3a4478', '#566aa0'], waterTint: 'rgba(60,70,130,.4)',
};

// Hand-placed skyline. x = fraction of width; w/h in art pixels at 180px height.
const MIDTOWN = [
  { x: .03, w: 12, h: 30, s: 'grid', r: 'flat' }, { x: .1, w: 7, h: 44, s: 'strips', r: 'antenna' },
  { x: .17, w: 10, h: 34, s: 'bands', r: 'setback' }, { x: .24, w: 6, h: 40, s: 'grid', r: 'flat' },
  { x: .52, w: 6, h: 70, s: 'strips', r: 'flat' },                 // Central Park Tower
  { x: .57, w: 5, h: 78, s: 'grid', r: 'flat' },                   // 432 Park: pencil-thin grid
  { x: .63, w: 12, h: 60, s: 'glass', r: 'taper' },                // One Vanderbilt
  { x: .79, icon: 'chrysler' },
  { x: .86, w: 10, h: 42, s: 'bands', r: 'setback' }, { x: .92, w: 8, h: 36, s: 'grid', r: 'antenna' },
  { x: .97, w: 12, h: 30, s: 'masonry', r: 'flat' },
];
const DOWNTOWN = [
  { x: .0, w: 16, h: 34, s: 'masonry', r: 'crown' }, { x: .07, w: 14, h: 46, s: 'glass', r: 'slant' },
  { x: .15, w: 20, h: 30, s: 'grid', r: 'setback' },
  { x: .38, w: 13, h: 56, s: 'glass', r: 'flat' }, { x: .44, w: 11, h: 40, s: 'bands', r: 'antenna' },
  { x: .5, icon: 'spruce' }, { x: .57, icon: 'woolworth' }, { x: .635, icon: 'pine70' }, { x: .69, icon: 'wall40' },
  { x: .755, w: 18, h: 36, s: 'grid', r: 'flat' }, { x: .83, w: 13, h: 48, s: 'glass', r: 'slant' },
  { x: .895, w: 15, h: 32, s: 'masonry', r: 'setback' }, { x: .955, w: 14, h: 42, s: 'bands', r: 'flat' },
];

function buildCity(P, W, H) {
  const layer = () => { const c = document.createElement('canvas'); c.width = W; c.height = H; return [c, c.getContext('2d')]; };
  const [skyC, sg] = layer(), [far, fg] = layer(), [mid, mg] = layer(), [br, bg2] = layer(), [fore, og] = layer();
  const K = H / 180;                                                  // scale heights with the canvas
  const rods = {};
  const dot = (g, x, y, c) => { g.fillStyle = c; g.fillRect(x, y, 1, 1); };
  const box = (g, x, y, w, h, c) => { g.fillStyle = c; g.fillRect(x, y, w, h); };
  const dither = (x, y, t) => bayer(x, y) < t;
  const rgbOf = c => c.startsWith('rgb') ? c.match(/\d+/g).slice(0, 3).map(Number) : hex(c.slice(0, 7));
  const tint = (c, rgb, k) => { const [r, g, b] = rgbOf(c); return `rgb(${r + (rgb[0] - r) * k | 0},${g + (rgb[1] - g) * k | 0},${b + (rgb[2] - b) * k | 0})`; };

  // sky: dithered bands, plus a glow pooled on the horizon
  for (let y = 0; y < HY + 20; y++) for (let x = 0; x < W; x++) {
    const t = Math.pow(Math.min(1, y / HY), 1.5) * (P.sky.length - 1);
    dot(sg, x, y, P.sky[Math.max(0, Math.min(P.sky.length - 1, Math.floor(t + (bayer(x, y) - .5) * .9)))]);
  }

  // one tower: lit face, shadow side, top rim, window pattern, fog toward the base
  function tower(g, b, depthK) {
    const w = b.w, h = Math.round(b.h * K), x0 = Math.round(b.x * W), top = HY - h;
    const side = Math.max(1, Math.round(w * .28));
    const col = c => depthK ? tint(c, P.haze, depthK) : c;
    for (let y = top; y < HY; y++) {
      const fog = Math.max(0, (y - (HY - 14 * K)) / (14 * K));            // haze pools near the water
      for (let x = x0; x < x0 + w; x++) {
        const onSide = x >= x0 + w - side;
        let c;
        if (b.s === 'glass') {
          const k = (y - top) / h;
          c = dither(x, y, k) ? P.glassBot : P.glassTop;
          if (((x - x0) + (y - top) * .6) % 13 < 2) c = P.streak;              // diagonal glare
          if (onSide) c = P.side;
        } else {
          c = onSide ? P.side : (y - top < 2 ? P.faceHi : P.face);
          if (b.s === 'masonry' && !onSide && (y - top) % 4 === 0) c = P.masonry;
        }
        if (fog > 0 && dither(x, y, fog * .8)) c = tint(c, P.haze, .35);
        dot(g, x, y, col(c));
      }
      dot(g, x0 + w - side - 1, y, col(P.rim + '55'));                       // edge where face meets side
    }
    box(g, x0, top, w - side, 1, col(P.rim));
    // windows
    const lit = (x, y) => hash(x * 3 + b.x * 97, y) < P.winP;
    for (let y = top + 3; y < HY - 2; y++) for (let x = x0 + 1; x < x0 + w - side - 1; x++) {
      let on = false;
      if (b.s === 'grid') on = (x - x0) % 2 === 1 && (y - top) % 3 === 0;
      else if (b.s === 'strips') on = (x - x0) % 2 === 1 && (y - top) % 2 === 0;
      else if (b.s === 'bands') on = (y - top) % 4 === 0 && hash(x, y) < .8;
      else if (b.s === 'masonry') on = (x - x0) % 3 === 1 && (y - top) % 4 === 2;
      else if (b.s === 'glass') on = !P.day && (x - x0) % 3 === 1 && (y - top) % 3 === 0 && hash(x, y) < .35;
      if (on && lit(x, y)) dot(g, x, y, col(P.win[Math.floor(hash(x, y + 5) * P.win.length)]));
    }
    // roofs
    const cx = x0 + Math.floor((w - side) / 2);
    if (b.r === 'antenna') { box(g, cx, top - 8, 1, 8, col(P.side)); dot(g, cx, top - 9, P.day ? col(P.side) : '#ff5c7a'); }
    if (b.r === 'setback') { box(g, x0 + 2, top - 5, w - 4, 5, col(P.face)); box(g, x0 + w - side - 1, top - 5, side - 1, 5, col(P.side)); box(g, x0 + 2, top - 5, w - side - 3, 1, col(P.rim)); }
    if (b.r === 'crown') for (let k = 0; k < w - side; k += 3) box(g, x0 + k, top - 2, 2, 2, col(P.faceHi));
    if (b.r === 'slant') for (let k = 0; k < w; k++) box(g, x0 + k, top - Math.round((w - k) * .5), 1, Math.round((w - k) * .5), col(k >= w - side ? P.side : P.glassTop));
    if (b.r === 'taper') for (let r = 0; r < 8; r++) box(g, x0 + Math.round(r * .6), top - r, Math.max(1, w - Math.round(r * 1.2)), 1, col(r % 2 ? P.faceHi : P.face));
  }

  // --- icons ---
  function esb(g, xf, dk) {
    const col = c => tint(c, P.haze, dk), x = Math.round(xf * W), b = HY;
    const tiers = [[13, 34], [9, 12], [5, 7], [3, 4]]; let y = b;
    tiers.forEach(([w, h], i) => {
      h = Math.round(h * K); y -= h;
      for (let yy = y; yy < y + h; yy++) for (let xx = x - (w >> 1); xx <= x + (w >> 1); xx++)
        dot(g, xx, yy, col(xx > x + (w >> 1) - 2 ? P.side : yy === y ? P.rim : P.face));
      if (i < 2) for (let yy = y + 2; yy < y + h - 1; yy += 2) { dot(g, x - 1, yy, col(P.win[0])); dot(g, x + 1, yy, col(P.win[0])); }
    });
    box(g, x, y - 20, 1, 20, col(P.side)); box(g, x - 1, y - 6, 3, 1, col(P.side)); dot(g, x, y - 21, P.day ? col(P.side) : '#ff5c7a'); rods.esb = [x, y - 21];
  }
  function chrysler(g, xf, dk) {
    const col = c => tint(c, P.haze, dk), x = Math.round(xf * W), h = Math.round(40 * K), top = HY - h;
    for (let y = top; y < HY; y++) for (let xx = x - 3; xx <= x + 3; xx++) dot(g, xx, y, col(xx >= x + 2 ? P.side : P.face));
    for (let r = 0; r < 9; r++) {                                           // sunburst crown
      const half = 3 - Math.floor(r / 3);
      box(g, x - half, top - 1 - r, half * 2 + 1, 1, col(P.faceHi));
      if (r % 3 === 1) { dot(g, x - half, top - 1 - r, P.crownLit); dot(g, x + half, top - 1 - r, P.crownLit); dot(g, x, top - 1 - r, P.crownLit); }
    }
    box(g, x, top - 16, 1, 7, col(P.faceHi));
  }
  function wtc(g, xf) {                                                     // One WTC: tapered, faceted, lit left / dark right
    const x = Math.round(xf * W), h = Math.min(Math.round(100 * K), HY - ROD.wtcMaxTop - 29), top = HY - h;
    for (let y = top; y < HY; y++) {
      const k = (HY - y) / h, half = Math.round(8 - k * 5.5);
      for (let xx = x - half; xx <= x + half; xx++) {
        const facet = xx < x ? P.faceHi : xx === x ? P.rim : P.side;
        let c = facet;
        if (P.day && xx < x && ((xx - x) + (y - top) * .4) % 11 < 1.5) c = P.streak;
        if (!P.day && hash(xx, y) < .07) c = P.win[1];
        dot(g, xx, y, c);
      }
    }
    box(g, x, top - 28, 1, 28, P.rim); box(g, x - 1, top - 4, 3, 4, P.rim); dot(g, x, top - 29, P.day ? '#ffffff' : '#ff5c7a'); rods.wtc = [x, top - 29];
  }
  function spruce(g, xf) {                                                  // 8 Spruce: rippled stainless skin
    const x0 = Math.round(xf * W), w = 12, h = Math.round(74 * K), top = HY - h;
    for (let y = top; y < HY; y++) for (let x = x0; x < x0 + w; x++) {
      const ripple = Math.sin(y * .45 + (x - x0) * 1.2) + Math.sin(y * .13);
      let c = ripple > .6 ? P.faceHi : ripple > -.4 ? P.face : P.side;
      if (x >= x0 + w - 3) c = P.side;
      if (!P.day && (y - top) % 3 === 0 && (x - x0) % 2 && hash(x, y) < .25) c = P.win[0];
      dot(g, x, y, c);
    }
    box(g, x0, top, w - 3, 1, P.rim);
  }
  function woolworth(g, xf) {                                               // gothic tower, copper pyramid, pinnacles
    const x0 = Math.round(xf * W), w = 14, h = Math.round(46 * K), top = HY - h;
    for (let y = top; y < HY; y++) for (let x = x0; x < x0 + w; x++) {
      let c = x >= x0 + w - 3 ? P.side : (x - x0) % 3 === 0 ? P.cream : P.masonry;
      if ((y - top) % 5 === 0) c = P.cream;
      if (!P.day && (x - x0) % 3 === 1 && (y - top) % 5 === 2 && hash(x, y) < .4) c = P.win[0];
      dot(g, x, y, c);
    }
    const tx = x0 + 3, tw = 8, th = Math.round(14 * K);
    for (let y = top - th; y < top; y++) for (let x = tx; x < tx + tw; x++) dot(g, x, y, x >= tx + tw - 2 ? P.side : P.cream);
    for (let r = 0; r < 9; r++) box(g, tx + Math.floor(r / 2), top - th - 1 - r, Math.max(1, tw - r), 1, r % 3 === 0 ? P.copperHi : P.copper);
    [tx - 1, tx + tw].forEach(px => box(g, px, top - th - 4, 1, 4, P.cream));
    box(g, tx + 3, top - th - 14, 1, 5, P.cream);
    if (!P.day) for (let y = top - th + 1; y < top; y += 2) dot(g, tx + 3, y, P.crownLit);
  }
  function pine70(g, xf) {                                                  // stepped art deco + spire
    const x = Math.round(xf * W); let y = HY;
    [[11, 30], [8, 12], [5, 8], [3, 6]].forEach(([w, h]) => {
      h = Math.round(h * K); y -= h;
      for (let yy = y; yy < y + h; yy++) for (let xx = x - (w >> 1); xx <= x + (w >> 1); xx++) dot(g, xx, yy, xx >= x + (w >> 1) - 1 ? P.side : yy === y ? P.rim : P.face);
      if (!P.day) dot(g, x, y + 1, P.crownLit);
    });
    box(g, x, y - 10, 1, 10, P.faceHi);
  }
  function wall40(g, xf) {                                                  // copper pyramid roof + spire
    const x = Math.round(xf * W), w = 11, h = Math.round(40 * K), top = HY - h;
    for (let y = top; y < HY; y++) for (let xx = x - 5; xx <= x + 5; xx++) {
      let c = xx >= x + 3 ? P.side : P.face;
      if (!P.day && (xx - x) % 2 === 0 && (y - top) % 3 === 1 && hash(xx, y) < .35) c = P.win[0];
      dot(g, xx, y, c);
    }
    for (let r = 0; r < 8; r++) box(g, x - 5 + Math.ceil(r * .7), top - 1 - r, Math.max(1, w - Math.ceil(r * 1.4)), 1, r % 2 ? P.copperHi : P.copper);
    box(g, x, top - 16, 1, 8, P.copperHi);
  }

  // midtown: farther, hazier (depth), then downtown: closer, full detail
  MIDTOWN.forEach(b => b.icon === 'esb' ? esb(fg, b.x, P.hazeK) : b.icon === 'chrysler' ? chrysler(fg, b.x, P.hazeK) : tower(fg, b, P.hazeK));
  const drawRods = () => { esb(mg, ROD.esb, 0); wtc(mg, ROD.wtc); };   // lightning-rod towers: in the open gaps, on top
  DOWNTOWN.forEach(b => {
    if (b.icon === 'wtc') wtc(mg, b.x); else if (b.icon === 'spruce') spruce(mg, b.x);
    else if (b.icon === 'woolworth') woolworth(mg, b.x); else if (b.icon === 'pine70') pine70(mg, b.x);
    else if (b.icon === 'wall40') wall40(mg, b.x); else tower(mg, b, 0);
  });
  drawRods();

  // --- Brooklyn Bridge: stone courses, deep arches, cornice, cables ---
  const tx = Math.round(W * .09), tw = 22, ttop = Math.round(HY - 86 * K), deck = Math.round(HY - 20 * K);
  for (let y = ttop; y < HY + 6; y++) for (let x = tx; x < tx + tw; x++) {
    let c = x < tx + 2 ? P.stoneHi : x >= tx + tw - 4 ? P.stoneLo : P.stone;
    if ((y - ttop) % 4 === 0) c = P.stoneJoint;                             // stone courses
    if (hash(x, y) < .06) c = P.stoneLo;
    dot(bg2, x, y, c);
  }
  box(bg2, tx - 2, ttop - 3, tw + 4, 3, P.stoneHi); box(bg2, tx - 2, ttop, tw + 4, 1, P.stoneLo);   // cornice
  box(bg2, tx - 1, ttop + 10, tw + 2, 1, P.stoneHi);
  for (const ax of [tx + 4, tx + 13]) {                                   // twin gothic arches, shadowed inside
    const archTop = Math.round(HY - 62 * K);
    for (let y = archTop; y < deck + 3; y++) box(bg2, ax, y, 5, 1, P.arch);
    box(bg2, ax + 1, archTop - 2, 3, 2, P.arch); dot(bg2, ax + 2, archTop - 3, P.arch);
    box(bg2, ax + 4, archTop, 1, deck - archTop, P.stoneLo);
  }
  box(bg2, 0, deck, W, 2, P.deck); box(bg2, 0, deck + 2, W, 1, P.deckLo);
  for (let x = 2; x < W; x += 7) dot(bg2, x, deck - 1, P.deckLight);
  const top = [tx + tw - 3, ttop + 2], low = [Math.round(W * .62), deck - 4];
  const a = (top[1] - low[1]) / ((top[0] - low[0]) ** 2);
  const cableY = x => Math.round(a * (x - low[0]) ** 2 + low[1]);
  for (let x = top[0]; x < W; x++) {
    const y = Math.max(ttop - 24, cableY(x)); dot(bg2, x, y, P.cable); dot(bg2, x, y + 1, P.cable + '66');
    if (x % 4 === 0 && y < deck - 1) for (let yy = y + 2; yy < deck; yy++) dot(bg2, x, yy, P.hanger);
  }
  for (let x = tx + 2; x >= 0; x--) dot(bg2, x, ttop + 2 + Math.round((tx + 2 - x) ** 2 * .01), P.cable);
  for (let k = 1; k <= 9; k++) {
    const ex = top[0] + k * 10, n = ex - top[0];
    for (let i = 0; i <= n; i++) { const x = top[0] + i, y = Math.round(top[1] + (deck - top[1]) * i / n); if (y > cableY(x) + 1) dot(bg2, x, y, P.stay); }
  }

  // --- Brooklyn Bridge Park promenade: bulkhead, iron railing, wet boardwalk, lamps, benches,
  //     Jane's Carousel by the bridge, and a DUMBO warehouse framing the right edge ---
  const Q = P.day
    ? { cap: '#d8c4b0', face: '#8a7478', rail: '#2a2438', railHi: '#8a7a9a', plank: '#8a6a58', plankLo: '#6e5244', plankHi: '#a88470', seam: '#54403a', pole: '#2a2438', poleHi: '#6a5a78', lantern: '#e8d8c0', bench: '#5a4038', brickRim: '#ffd9a0' }
    : { cap: '#3a3054', face: '#1a1430', rail: '#0c0918', railHi: '#3a3060', plank: '#231824', plankLo: '#1a1120', plankHi: '#33243a', seam: '#120b16', pole: '#0c0918', poleHi: '#3a3060', lantern: '#ffe2a8', bench: '#140d18', brickRim: '#ff6fa0' };
  box(og, 0, PY, W, 2, Q.cap); box(og, 0, PY + 2, W, 3, Q.face);             // bulkhead
  for (let y = PY + 5; y < H; y++) {                                       // boardwalk: planks widen toward the viewer
    const depth = (y - PY - 5) / (H - PY - 5), rowH = 2 + Math.floor(depth * 4);
    const seamRow = Math.floor(Math.pow(depth, .7) * 14) !== Math.floor(Math.pow((y + 1 - PY - 5) / (H - PY - 5), .7) * 14);
    for (let x = 0; x < W; x++) {
      let c = seamRow ? Q.seam : (x + Math.floor(y / rowH) * 7) % 23 === 0 ? Q.seam : hash(x, y) < .12 ? Q.plankLo : depth < .15 ? Q.plankHi : Q.plank;
      dot(og, x, y, c);
    }
  }
  for (let x = 0; x < W; x++) {                                            // railing along the water
    dot(og, x, PY - 6, Q.railHi); dot(og, x, PY - 5, Q.rail); dot(og, x, PY - 2, Q.rail);
    if (x % 3 === 0) box(og, x, PY - 4, 1, 4, Q.rail);
  }
  const lamps = [.3, .52, .74].map(f => Math.round(f * W));
  lamps.forEach(lx => {                                                    // NYC park lamp: fluted pole, crook, lantern
    const base = PY + 10, top = PY - 26;
    box(og, lx - 1, base - 2, 3, 3, Q.pole);
    for (let y = top; y < base - 2; y++) { dot(og, lx, y, Q.pole); if (y % 5 === 0) dot(og, lx - 1, y, Q.poleHi); }
    box(og, lx - 2, top - 1, 5, 1, Q.pole); box(og, lx - 1, top - 5, 3, 4, Q.lantern); box(og, lx - 1, top - 6, 3, 1, Q.pole); dot(og, lx, top - 7, Q.pole);
  });
  [.41, .63].forEach(f => {                                                // benches
    const bx = Math.round(f * W), by = PY + 8;
    box(og, bx, by - 3, 9, 1, Q.bench); box(og, bx, by - 1, 9, 1, Q.bench); dot(og, bx + 1, by, Q.bench); dot(og, bx + 7, by, Q.bench);
  });
  // Jane's Carousel: glass pavilion on the pier beside the bridge
  // Open and lit: slim steel frame, clear glass, a warm interior; the canopy, bulbs and horses
  // are drawn live (drawPromenade) so they turn.
  const cx0 = Math.round(W * .13), cw = 38, cy0 = PY - 22;
  box(og, cx0 - 2, cy0 - 3, cw + 4, 2, Q.railHi); box(og, cx0 - 2, cy0 - 1, cw + 4, 1, Q.rail);          // roof slab
  box(og, cx0 - 1, cy0, 1, PY - cy0, Q.rail); box(og, cx0 + cw, cy0, 1, PY - cy0, Q.rail);                 // corner posts
  for (let y = cy0; y < PY; y++) for (let x = cx0; x < cx0 + cw; x++) {                                    // interior
    const warm = P.day ? (y - cy0 < 4 ? '#b8cce0' : '#a8bcd4') : (bayer(x, y) < (y - cy0) / 22 ? '#3a2416' : '#2a1a12');
    dot(og, x, y, warm);
  }
  if (P.day) for (let k = 0; k < 3; k++) for (let i = 0; i < 10; i++) dot(og, cx0 + 4 + k * 12 + i, cy0 + 2 + i, '#e8f0ff88');   // glass reflections
  const pcx = cx0 + cw / 2;
  for (let y = PY - 5; y < PY - 1; y++) for (let x = cx0 + 2; x < cx0 + cw - 2; x++) {                      // round platform
    const e = ((x - pcx) / (cw / 2 - 2)) ** 2 + ((y - (PY - 3)) / 2) ** 2;
    if (e <= 1) dot(og, x, y, e > .7 ? '#d8a040' : y < PY - 3 ? '#9a3a30' : '#6a2420');
  }
  // DUMBO warehouse, close to camera, framing the right edge
  const wx = W - 40, wy = HY - 46;
  for (let y = wy; y < H; y++) for (let x = wx; x < W; x++) {
    let c = (y - wy) % 3 === 0 ? P.brickLo : (x + (Math.floor((y - wy) / 3) % 2) * 2) % 5 === 0 ? P.brickLo : P.brick;
    if (x === wx) c = Q.brickRim; else if (x === wx + 1 && y % 2) c = Q.brickRim;  // neon / sunrise rim light
    dot(og, x, y, c);
  }
  box(og, wx, wy - 3, 40, 3, P.parapet);
  for (let y = wy + 5; y < H - 4; y += 9) for (let x = wx + 6; x < W - 3; x += 9) {
    const lit = hash(x, y) < (P.day ? .05 : .35);                             // at sunrise most panes are dark glass
    const pane = lit ? P.foreWin : P.day ? '#6e6290' : P.winDark;
    box(og, x, y + 1, 5, 6, pane); box(og, x + 1, y, 3, 1, pane);
    if (P.day && !lit) { box(og, x + 1, y + 1, 3, 1, '#b8a8d0'); dot(og, x + 1, y + 2, '#9a8cc0'); }   // dawn sky caught in the glass
    box(og, x - 1, y + 7, 7, 1, P.parapet); if (lit) box(og, x + 2, y + 1, 1, 6, P.winDark);   // sill + mullion
  }
  for (let y = wy + 12; y < PY + 4; y += 9) {                                // fire escape on the near face
    box(og, wx + 3, y, 14, 1, Q.rail); box(og, wx + 3, y - 3, 1, 3, Q.rail); box(og, wx + 16, y - 3, 1, 3, Q.rail);
    for (let k = 0; k < 7; k++) dot(og, wx + 4 + (Math.floor(y / 9) % 2 ? k * 2 : 12 - k * 2), y + 1 + k, Q.rail);
  }
  const T = P.tank, tcx = W - 26, try_ = wy - 3;                            // water tower on the roof
  for (let y = 1; y <= 7; y++) { dot(og, tcx + 1, try_ - y, T[3]); dot(og, tcx + 9, try_ - y, T[3]); if (y === 4) box(og, tcx + 1, try_ - y, 9, 1, T[3]); }
  for (let y = 0; y < 11; y++) for (let x = 0; x < 11; x++) dot(og, tcx + x, try_ - 8 - y, (y === 3 || y === 7) ? T[3] : x < 2 ? T[0] : x < 6 ? T[1] : x < 9 ? T[2] : T[3]);
  for (let r = 0; r < 5; r++) for (let x = r; x < 11 - r; x++) dot(og, tcx + x, try_ - 20 - r, x < 5 ? T[1] : T[2]);
  const promenade = { lamps, carousel: [cx0, cy0, cw], Q };

  // rim map for lightning: every silhouette pixel with open sky above it
  const [edge, eg] = layer();
  const d = [fg, mg, bg2, og].map(g => g.getImageData(0, 0, W, H).data);
  const solid = (x, y) => y >= 0 && d.some(p => p[(y * W + x) * 4 + 3] > 0);
  eg.fillStyle = P.day ? '#fff3d0' : '#b8aef0';
  for (let y = 1; y < H; y++) for (let x = 0; x < W; x++) if (solid(x, y) && !solid(x, y - 1)) eg.fillRect(x, y, 1, 1);
  // what the river mirrors: sky + skyline + bridge
  const [mirror, mig] = layer();
  [skyC, far, mid, br].forEach(c => mig.drawImage(c, 0, 0));
  return { skyC, far, mid, br, fore, edge, mirror, P, rods, promenade };
}
function buildDawnExtras(W) {
  const c = document.createElement('canvas'); c.width = W; c.height = HY + 10; const g = c.getContext('2d');
  // cumulus: overlapping puffs, lit from below by the low sun, dithered edges
  [[.84, .06, 20], [.8, .34, 30], [.98, .14, 14], [.62, .5, 16], [.1, .56, 18]].forEach(([fx, fy, r]) => {
    const cx = Math.round(fx * W), cy = Math.round(fy * HY) + 8;
    for (let y = -r; y <= r / 2; y++) for (let x = -r * 2; x <= r * 2; x++) {
      const v = Math.max(...[[0, 0, 1], [-r * .9, 3, .75], [r * .9, 2, .8], [-r * 1.6, 5, .5], [r * 1.5, 5, .55]].map(([ox, oy, s]) => 1 - Math.hypot((x - ox) / (r * s), (y - oy) / (r * s * .5))));
      if (v <= 0 || !(bayer(cx + x, cy + y) < v * 3)) continue;
      const under = y / (r / 2);
      g.fillStyle = under > .45 ? '#ffd08a' : under > 0 ? '#f0a07a' : v > .5 ? '#c7869a' : '#9a6a92';
      g.fillRect(cx + x, cy + y, 1, 1);
    }
  });
  return c;
}
// 4x4 Bayer masks, one per dissolve step: the day scene shows through where bayer < level.
const DITHER = Array.from({ length: 17 }, (_, k) => {
  const c = document.createElement('canvas'); c.width = c.height = 4; const g = c.getContext('2d');
  g.fillStyle = '#fff';
  for (let y = 0; y < 4; y++) for (let x = 0; x < 4; x++) if (bayer(x, y) < k / 16) g.fillRect(x, y, 1, 1);
  return c;
});
// Where the rod towers go: in the open sky between the TVs (left/middle and middle/right),
// falling back to behind a lower TV with its tall rod clearing the top when there's no gap.
const ROD = { wtc: .3, esb: .7, wtcMaxTop: 0 };
function placeRods() {
  const hero = sky.parentElement.getBoundingClientRect();
  const [L, R, M] = tvs.map(tv => tv.cv.getBoundingClientRect());
  if (!hero.width || !L.width) return;
  const art = x => (x - hero.left) / hero.width;
  ROD.wtc = M.left - L.right > 6 ? art((L.right + M.left) / 2) : art(L.left + L.width / 2);
  ROD.esb = R.left - M.right > 6 ? art((M.right + R.left) / 2) : art(R.left + R.width / 2);
  const links = root.querySelector('.links').getBoundingClientRect();         // keep the spire below the header text
  const nearText = ROD.wtc * hero.width + hero.left < links.right + 24;
  ROD.wtcMaxTop = nearText ? Math.ceil((links.bottom - hero.top + 10) / hero.height * SKY_H) : 0;
}
function buildBrooklyn() {
  const hero = sky.parentElement;
  SKY_W = 320; SKY_H = Math.max(160, Math.round(SKY_W * hero.clientHeight / Math.max(1, hero.clientWidth)));
  sky.width = SKY_W; sky.height = SKY_H; HY = SKY_H - Math.round(SKY_H * .26); PY = HY + Math.round((SKY_H - HY) * .38);
  placeRods();
  const mk = () => { const c = document.createElement('canvas'); c.width = SKY_W; c.height = SKY_H; return [c, c.getContext('2d')]; };
  const [dayCv, dg] = mk(), [nightCv, ng] = mk();
  bk = { night: buildCity(NIGHT, SKY_W, SKY_H), dawn: buildCity(DAWN, SKY_W, SKY_H), clouds: buildDawnExtras(SKY_W), nightClouds: buildNightClouds(SKY_W), dayCv, dg, nightCv, ng };
  drops = Array.from({ length: Math.round(90 * SKY_H / 180) }, () => ({ x: Math.random() * SKY_W, y: Math.random() * SKY_H, v: 1.4 + Math.random() * 1.6 }));
}
/* Thunderstorm: random strikes every 6-20s. Double flash (bright, dip, bright, fade),
   kept low-intensity and under 3 flashes/s (WCAG 2.3.1); off entirely for reduced motion. */
const storm = { next: 3 + Math.random() * 6, at: -10, bolt: null };
function makeBolt() {
  const rods = bk?.night.rods, hitRod = rods && (storm.forceRod || Math.random() < .25);
  const target = hitRod ? (storm.forceRod === 'esb' ? rods.esb : storm.forceRod === 'wtc' ? rods.wtc : Math.random() < .5 ? rods.wtc : rods.esb) : null;
  storm.forceRod = null;
  const pts = [[target ? target[0] + Math.round((Math.random() - .3) * 30) : Math.round(SKY_W * (.58 + Math.random() * .36)), 0]], branches = [];
  const end = target ? target[1] : HY - 30 + Math.random() * 20;
  while (pts[pts.length - 1][1] < end) {
    const [x, y] = pts[pts.length - 1];
    const pull = target ? (target[0] - x) / Math.max(4, (target[1] - y) / 3) : 0;   // steer toward the rod
    pts.push([x + Math.round((Math.random() - .5) * 7 + pull), Math.min(end, y + 2 + Math.round(Math.random() * 3))]);
    if (Math.random() < .12 && branches.length < 3) {                      // forks
      const b = [[x, y]], dir = Math.random() < .5 ? -1 : 1;
      for (let k = 0; k < 4 + Math.random() * 6; k++) { const [bx, by] = b[b.length - 1]; b.push([bx + dir * (1 + Math.round(Math.random() * 3)), by + 2 + Math.round(Math.random() * 2)]); }
      branches.push(b);
    }
  }
  if (target) pts.push([target[0], target[1]]);
  return { pts, branches, target };
}
function flashLevel(dt) {
  if (dt < 0) return 0;
  if (dt < .07) return 1;
  if (dt < .15) return .12;
  if (dt < .23) return .75;
  return Math.max(0, .75 * Math.exp(-(dt - .23) * 5));
}
function line(g, [x0, y0], [x1, y1]) {                                     // pixel line
  const n = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0), 1);
  for (let i = 0; i <= n; i++) g.fillRect(Math.round(x0 + (x1 - x0) * i / n), Math.round(y0 + (y1 - y0) * i / n), 1, 1);
}
function drawBolt(g, path) {
  g.fillStyle = 'rgba(180,140,255,.55)';                                  // violet halo
  for (let i = 1; i < path.length; i++) { const [a, b] = [path[i - 1], path[i]]; line(g, [a[0] - 1, a[1]], [b[0] - 1, b[1]]); line(g, [a[0] + 1, a[1]], [b[0] + 1, b[1]]); }
  g.fillStyle = '#f4f0ff';
  for (let i = 1; i < path.length; i++) line(g, path[i - 1], path[i]);
}
// Living promenade: lamp halos, carousel, walkers, rain splashes. (Ferry is drawn on the river.)
function drawFerry(g, L, t) {
  const day = L.P.day, tt = reduce ? 0 : t;
  // ferry: NYC-ferry white/blue, crosses right to left every 40s, wake behind
  const fk = (tt % 40) / 40, fx = Math.round(SKY_W + 30 - fk * (SKY_W + 70)), fy = HY + Math.round((PY - HY) * .6);   // mid-river
  for (let i = 0; i < 26; i++) if (hash(i, Math.floor(tt * 6)) < .6 - i / 50) { g.fillStyle = '#e8ecff88'; g.fillRect(fx + 24 + i, fy + 3 + (i % 2), 1, 1); }
  g.fillStyle = day ? '#f4f4f8' : '#c8c8e0'; g.fillRect(fx, fy, 24, 3);
  g.fillStyle = '#2a5aa8'; g.fillRect(fx, fy + 2, 24, 1);
  g.fillStyle = day ? '#e8e8f0' : '#9a9ab8'; g.fillRect(fx + 4, fy - 3, 15, 3);
  for (let k = 0; k < 5; k++) { g.fillStyle = day ? '#5a6a9a' : '#ffe2a8'; g.fillRect(fx + 5 + k * 3, fy - 2, 2, 1); }
}
const walkers = [
  { speed: 6, dir: 1, y: 3, off: 0, coat: '#ff6fa0', umb: '#ff3d7f' },
  { speed: 4.5, dir: -1, y: 6, off: 140, coat: '#6fd3ff', umb: '#3de0ff' },
  { speed: 5.2, dir: 1, y: 9, off: 220, coat: '#ffd66b', umb: '#b48cff' },
];
function drawPromenade(g, L, t) {
  const P = L.P, pm = L.promenade, day = P.day, tt = reduce ? 0 : t;
  drawCarousel(g, pm, tt, day);
  // lamp halos (night) with a faint flicker, and their smear on the wet boardwalk
  if (!day) pm.lamps.forEach((lx, i) => {
    const ly = PY - 29, k = .8 + .2 * vnoise(tt * 2 + i * 7, i);
    for (let y = -12; y <= 12; y++) for (let x = -12; x <= 12; x++) {
      const d = Math.hypot(x, y * 1.1);
      if (d < 12 && bayer(lx + x, ly + y) < (1 - d / 12) * .5 * k) { g.fillStyle = 'rgba(255,210,140,.35)'; g.fillRect(lx + x, ly + y, 1, 1); }
    }
    for (let y = PY + 6; y < SKY_H; y += 2) if (hash(lx, y + Math.floor(tt * 4)) < .6) { g.fillStyle = 'rgba(255,200,130,.35)'; g.fillRect(lx + Math.round(Math.sin(y + tt) * 1), y, 1, 1); }
  });
  // walkers: umbrellas at night, joggers at sunrise; two-frame legs. They pass behind the
  // near warehouse (clipped at its edge) instead of walking across its face.
  g.save(); g.beginPath(); g.rect(0, 0, SKY_W - 40, SKY_H); g.clip();
  walkers.forEach((w, i) => {
    const span = SKY_W + 20, x = Math.round(((w.off + tt * w.speed * w.dir) % span + span) % span) - 10, y = PY + 4 + w.y;
    const step = Math.floor(tt * (day ? 6 : 4) + i) % 2;
    g.fillStyle = day ? '#3a2438' : '#07050c';
    g.fillRect(x, y - 5, 2, 4); g.fillRect(x, y - 7, 2, 2);                         // body, head
    g.fillRect(x + (step ? 0 : 1), y - 1, 1, 2); g.fillRect(x + (step ? 1 : 0), y - 1, 1, 2);
    g.fillStyle = w.coat; g.fillRect(x, y - 4, 2, 1);
    if (!day) { g.fillStyle = w.umb; g.fillRect(x - 2, y - 10, 6, 1); g.fillRect(x - 1, y - 11, 4, 1); g.fillStyle = '#07050c'; g.fillRect(x + 1, y - 9, 1, 2); }
  });
  g.restore();
  // rain splashes on the boardwalk (night only)
  if (!day && !reduce) for (let k = 0; k < 10; k++) {
    const sx = Math.floor(hash(k, Math.floor(t * 8)) * SKY_W), sy = PY + 6 + Math.floor(hash(k + 20, Math.floor(t * 8)) * (SKY_H - PY - 6));
    g.fillStyle = '#b8aef066'; g.fillRect(sx - 1, sy, 1, 1); g.fillRect(sx + 1, sy, 1, 1); g.fillRect(sx, sy - 1, 1, 1);
  }
}

/* Air traffic, kept deliberately far away: tiny jets only in the top-right corner of the sky,
   well above the tallest spire, always flying away from the city toward the corner and
   shrinking as they recede. If there is no clear sky above the skyline, none spawn. */
const planes = [];
let nextPlane = 4;
function airCeiling() {
  const r = bk?.night.rods; if (!r) return 0;
  return Math.min(r.wtc[1], r.esb[1]) - 30;                     // wide margin above the highest rod
}
function updatePlanes(t) {
  if (reduce) return;
  const ceil = airCeiling();
  if (t >= nextPlane && ceil > 12 && planes.length < 2) {
    const x = SKY_W * (.62 + Math.random() * .22), y = Math.max(4, ceil * (.35 + Math.random() * .5));
    const ang = -(.25 + Math.random() * .35);                     // up and to the right, away from the skyline
    planes.push({ x, y, x0: x, y0: y, ang, born: t, life: 55 + Math.random() * 20, trail: [], lastPuff: t });
    nextPlane = t + 14 + Math.random() * 16;
  }
  planes.forEach(p => {
    const k = (t - p.born) / p.life, dt = Math.min(.1, t - (p.t ?? t)); p.t = t;
    const v = 2.2 * (1 - k * .7);                                 // slows as it recedes
    p.x += Math.cos(p.ang) * v * dt; p.y += Math.sin(p.ang) * v * dt;
    if (k < .9 && t - p.lastPuff > .25) { p.trail.push({ x: p.x, y: p.y, t }); p.lastPuff = t; }
    p.trail = p.trail.filter(q => t - q.t < 30);
    p.done = k >= 1 || p.x > SKY_W + 4 || p.y < -4;
  });
  for (let i = planes.length - 1; i >= 0; i--) if (planes[i].done) planes.splice(i, 1);
}
function drawPlanes(g, day, t) {
  planes.forEach(p => {
    const k = (t - p.born) / p.life, fadeIn = Math.min(1, (t - p.born) / 3), far = 1 - k;
    p.trail.forEach(q => {                                          // hairline contrail, thinning with distance
      const a = Math.max(0, 1 - (t - q.t) / 30) * fadeIn * far;
      g.fillStyle = day ? `rgba(255,236,220,${(.45 * a).toFixed(3)})` : `rgba(180,165,235,${(.22 * a).toFixed(3)})`;
      g.fillRect(Math.round(q.x + (t - q.t) * .05), Math.round(q.y), 1, 1);
    });
    const x = Math.round(p.x), y = Math.round(p.y);
    g.globalAlpha = fadeIn * Math.min(1, far * 3);
    if (day) { g.fillStyle = '#fffbe8'; g.fillRect(x, y, 1, 1); if (far > .5) { g.fillStyle = '#c8ccdc'; g.fillRect(x - 1, y, 1, 1); } }
    else {
      g.fillStyle = Math.floor(t * 1.4 + p.x0) % 2 ? '#ff4a5a' : '#6a2233'; g.fillRect(x, y, 1, 1);
      if (Math.floor(t * 1.1 + p.y0) % 4 === 0) { g.fillStyle = '#ffffff'; g.fillRect(x - 1, y, 1, 1); }
    }
    g.globalAlpha = 1;
  });
}
// Night clouds: a few dim, moonlit banks on the right, underside lit violet by the city.
function buildNightClouds(W) {
  const c = document.createElement('canvas'); c.width = W; c.height = HY; const g = c.getContext('2d');
  [[.72, .12, 26], [.9, .26, 20], [.58, .3, 16]].forEach(([fx, fy, r]) => {
    const cx = Math.round(fx * W), cy = Math.round(fy * HY) + 6;
    for (let y = -r; y <= r / 2; y++) for (let x = -r * 2; x <= r * 2; x++) {
      const v = Math.max(...[[0, 0, 1], [-r * .9, 3, .75], [r * .9, 2, .8], [-r * 1.6, 5, .5], [r * 1.5, 5, .55]].map(([ox, oy, s]) => 1 - Math.hypot((x - ox) / (r * s), (y - oy) / (r * s * .5))));
      if (v <= 0 || !(bayer(cx + x, cy + y) < v * 2.2)) continue;
      const under = y / (r / 2);
      g.fillStyle = under > .5 ? '#3a2a5e' : under > 0 ? '#2a2048' : v > .5 ? '#1d1838' : '#161230';
      g.fillRect(cx + x, cy + y, 1, 1);
    }
  });
  return c;
}

// Jane's Carousel, live: a turning striped canopy with bulbs, a brass pole, and horses on poles
// circling in depth (the far ones pass behind the pole, dimmer), all bobbing.
function drawCarousel(g, pm, tt, day) {
  const [cx0, cy0, cw] = pm.carousel, pcx = cx0 + cw / 2, R = cw / 2 - 5, top = cy0 + 1, base = PY - 5;
  const put = (x, y, c) => { g.fillStyle = c; g.fillRect(Math.round(x), Math.round(y), 1, 1); };
  if (!day) for (let y = PY; y < PY + 10; y++) for (let x = cx0 - 4; x < cx0 + cw + 4; x++)            // light spilling onto the boardwalk
    if (bayer(x, y) < (1 - (y - PY) / 10) * .45) put(x, y, 'rgba(255,190,110,.28)');
  const horse = (a, back) => {
    const x = pcx + Math.cos(a) * R, bob = Math.sin(tt * 2.2 + a * 3) * 1.5, y = base - 6 + bob;
    const body = back ? '#8a6a50' : '#fff1dc', mane = back ? '#6a3a2a' : '#c0503a', pole = back ? '#8a7040' : '#f0c860';
    for (let yy = top + 7; yy < base; yy++) put(x + 1, yy, pole);
    const dir = -Math.sin(a) > 0 ? 1 : -1;
    put(x, y, body); put(x + 1, y, body); put(x + 2, y, body); put(x + dir * 2 + 1, y - 1, body); put(x + dir * 2 + 1, y - 2, mane);
    put(x, y + 1, body); put(x + 2, y + 1, body); put(x, y + 2, mane); put(x + 2, y + 2, mane);
  };
  const angles = Array.from({ length: 5 }, (_, k) => tt * .9 + k * Math.PI * 2 / 5);
  angles.filter(a => Math.sin(a) < 0).forEach(a => horse(a, true));                    // far side first
  for (let y = top + 6; y < base; y++) put(pcx, y, '#e8c060');                          // brass centre pole
  angles.filter(a => Math.sin(a) >= 0).forEach(a => horse(a, false));
  for (let r = 0; r < 6; r++) {                                                         // canopy: stripes turn with the ride
    const half = Math.round(4 + r * (cw / 2 - 5) / 5);
    for (let x = -half; x <= half; x++) {
      const stripe = Math.floor((x * 6 / Math.max(1, half) + tt * 3) % 2 + 2) % 2;
      put(pcx + x, top + r, stripe ? (day ? '#d04a3a' : '#ff5a44') : (day ? '#f4e8d0' : '#fff0d8'));
    }
  }
  put(pcx, top - 1, '#e8c060'); put(pcx, top - 2, '#e8c060');
  const edge = top + 6, half = Math.round(cw / 2 - 1);
  for (let x = -half; x <= half; x++) {                                                  // scalloped gold edge with bulbs
    put(pcx + x, edge + (Math.abs(x) % 3 === 1 ? 1 : 0), '#d8a040');
    if (x % 2 === 0) put(pcx + x, edge + 2, (Math.floor(tt * 3) + x) % 4 === 0 ? '#ffffff' : day ? '#ffe0a0' : '#ffd66b');
  }
}

/* Day/night: `mode.day` is the target; the dissolve runs 1.6s in either direction. */
const mode = { day: false, from: 0, at: -10 };
const DISSOLVE = 1.6;
function dayAmount(t) {
  const p = reduce ? 1 : Math.min(1, Math.max(0, (t - mode.at) / DISSOLVE));
  const e = 1 - Math.pow(1 - p, 3);
  return mode.from + ((mode.day ? 1 : 0) - mode.from) * e;
}
// The river: a Manhattan shoreline, then the city mirrored below it as broken, fading ripple
// streaks (alternate rows), so the skyline stands on land instead of sinking into the water.
function drawRiver(g, L, t) {
  const P = L.P, rows = PY - HY;
  g.fillStyle = P.water[0]; g.fillRect(0, HY, SKY_W, rows);
  g.fillStyle = P.day ? '#3a3558' : '#0a0716'; g.fillRect(0, HY, SKY_W, 2);                 // bulkhead / FDR edge
  g.fillStyle = P.day ? '#6a6488' : '#1c1630'; g.fillRect(0, HY + 2, SKY_W, 1);
  if (!P.day) for (let x = 1; x < SKY_W; x += 4) { g.fillStyle = hash(x, 77) < .6 ? '#ffcf7a' : '#ff8a5c'; g.fillRect(x, HY, 1, 1); }  // FDR lights
  for (let i = 3; i < rows; i++) {
    if (i % 2 === 0) continue;                                                           // water between streaks
    const y = HY + i, src = Math.max(0, HY - 1 - Math.floor((i - 3) * 2.4));
    const dx = reduce ? 0 : Math.round(Math.sin(i * 1.3 + t * 2.6) * (1.5 + i * .12));
    g.globalAlpha = Math.max(0, .75 * (1 - (i - 3) / rows));
    g.drawImage(L.mirror, 0, src, SKY_W, 1, dx, y, SKY_W, 1);
    if (dx) g.drawImage(L.mirror, 0, src, SKY_W, 1, dx - Math.sign(dx) * SKY_W, y, SKY_W, 1);
  }
  g.globalAlpha = 1;
  g.fillStyle = P.waterTint; g.fillRect(0, HY + 3, SKY_W, rows - 3);
  const tq = reduce ? 0 : Math.floor(t * 5);
  g.fillStyle = P.water[1];
  for (let y = HY + 4; y < PY; y += 2) for (let x = (y * 3 + tq) % 7; x < SKY_W; x += 7) if (hash(x, y) < .4) g.fillRect(x, y, 2, 1);
}
function drawCity(g, L, t, f) {
  g.drawImage(L.skyC, 0, 0);
  if (L.P.day) {
    const sx = Math.round(SKY_W * .78), sunY = Math.round(HY - 6 - dayAmount(t) * 16);   // low sun, clear of the TVs
    for (let y = -14; y <= 14; y++) for (let x = -14; x <= 14; x++) {
      const d = Math.hypot(x, y);
      if (d <= 6) { g.fillStyle = d < 3 ? '#fffbe8' : '#ffe39a'; g.fillRect(sx + x, sunY + y, 1, 1); }
      else if (d < 14 && bayer(sx + x, sunY + y) < (1 - (d - 6) / 8) * .55) { g.fillStyle = '#ffd08a'; g.fillRect(sx + x, sunY + y, 1, 1); }
    }
  }
  drawPlanes(g, L.P.day, t);                                                // planes and trails pass behind the clouds
  g.drawImage(L.P.day ? bk.clouds : bk.nightClouds, 0, 0);
  g.drawImage(L.far, 0, 0);
  g.drawImage(L.mid, 0, 0);
  drawRiver(g, L, t);
  drawFerry(g, L, t);
  if (L.P.day) {                                                            // sun glitter path toward the viewer
    const sx = Math.round(SKY_W * .78), tq = reduce ? 0 : Math.floor(t * 6);
    for (let y = HY + 1; y < PY; y++) { const w = 2 + (y - HY) * 1.6; for (let x = -w; x <= w; x++) if (hash(x + y * 7, tq) < .3) { g.fillStyle = hash(x, y + tq) < .5 ? '#fff3d0' : '#ffc070'; g.fillRect(sx + Math.round(x), y, 1, 1); } }
  }
  g.drawImage(L.br, 0, 0);
  g.drawImage(L.fore, 0, 0);
  drawPromenade(g, L, t);
  if (f > 0) { g.globalAlpha = .6 * f; g.drawImage(L.edge, 0, 0); g.globalAlpha = 1; }
}
function drawSky(t) {
  if (!bk) buildBrooklyn();
  updatePlanes(t);
  kg.clearRect(0, 0, SKY_W, SKY_H);
  const day = dayAmount(t);
  if (!reduce && day === 0 && t >= storm.next) {
    storm.at = t; storm.bolt = makeBolt(); storm.next = t + 6 + Math.random() * 14;
    if (storm.bolt.target) surgeNearest(storm.bolt.target[0], t);
  }
  const f = reduce || day > 0 ? 0 : flashLevel(t - storm.at);
  root.classList.toggle('storm-lit', f > .05);
  if (f > .05) root.style.setProperty('--flash', f.toFixed(2));
  if (day < 1) {
    drawCity(kg, bk.night, t, f);
    if (f > 0) {
      kg.fillStyle = `rgba(190,175,255,${(.18 * f).toFixed(3)})`; kg.fillRect(0, 0, SKY_W, HY);
      if (f > .3 && storm.bolt) { drawBolt(kg, storm.bolt.pts); storm.bolt.branches.forEach(b => drawBolt(kg, b)); }
      if (storm.bolt?.target) {                                           // the rod takes the hit: spark burst at the tip
        const [rx, ry] = storm.bolt.target;
        for (let k = 0; k < 14; k++) { const a = hash(k, 3) * 6.28, r = 1 + hash(k, 4) * 6 * f; kg.fillStyle = k % 3 ? '#fff3d0' : '#b48cff'; kg.fillRect(Math.round(rx + Math.cos(a) * r), Math.round(ry + Math.sin(a) * r), 1, 1); }
        kg.fillStyle = '#ffffff'; kg.fillRect(rx - 1, ry - 1, 3, 3);
      }
    }
  }
  if (day > 0) {                                                            // dawn, dissolved in through a Bayer mask
    const g = bk.dg;
    g.clearRect(0, 0, SKY_W, SKY_H);
    drawCity(g, bk.dawn, t, 0);
    if (day < 1) {
      g.globalCompositeOperation = 'destination-in';
      g.fillStyle = g.createPattern(DITHER[Math.round(day * 16)], 'repeat'); g.fillRect(0, 0, SKY_W, SKY_H);
      g.globalCompositeOperation = 'source-over';
    }
    kg.drawImage(bk.dayCv, 0, 0);
  }
  if (day < 1) {
    kg.fillStyle = f > .3 ? '#b8aef088' : '#6b5fa844';                   // rain thins out as the sun comes up
    const n = Math.round(drops.length * (1 - day));
    for (let k = 0; k < drops.length; k++) {
      const d = drops[k];
      if (k < n) kg.fillRect(Math.round(d.x), Math.round(d.y), 1, 3);
      if (!reduce) { d.y += d.v; d.x -= d.v * .25; if (d.y > SKY_H) { d.y = -3; d.x = Math.random() * (SKY_W + 30); } }
    }
  }
}
function surgeNearest(rodX, t) {
  const hero = sky.parentElement.getBoundingClientRect(), x = hero.left + rodX / SKY_W * hero.width;
  let best = null, bd = Infinity;
  tvs.forEach(tv => { const r = tv.cv.getBoundingClientRect(), d = Math.abs(r.left + r.width / 2 - x); if (d < bd) { bd = d; best = tv; } });
  if (!best) return;
  best.surgeAt = t + .02;
  best.knobs.forEach((k, j) => { k.from = knobAngle(k, t); k.to = k.from + (j ? -.7 : .9) * (Math.random() < .5 ? 1 : -1); k.t0 = t; k.dur = .18; });
  best.btn.classList.add('surge'); setTimeout(() => best.btn.classList.remove('surge'), 750);
}
function setDay(on, t = performance.now() / 1000) {
  mode.from = dayAmount(t); mode.day = on; mode.at = t;
  const btn = $id('dayNight');
  btn.setAttribute('aria-pressed', String(on));
  btn.setAttribute('aria-label', on ? 'Switch to night' : 'Switch to sunrise');
  btn.classList.toggle('is-day', on);
  root.classList.toggle('is-day', on);
  drawSwitchIcon(on);
  try { localStorage.setItem('sd-sky', on ? 'day' : 'night'); } catch { /* storage unavailable */ }
  if (reduce) raf = requestAnimationFrame(frame);
}
// Pixel icons for the switch knob: crescent moon + bolt at night, sun with rays at dawn.
function drawSwitchIcon(on) {
  const cv = $id('dayNightIcon'), g = cv.getContext('2d');
  g.clearRect(0, 0, 12, 12);
  const P = (x, y, c) => { g.fillStyle = c; g.fillRect(x, y, 1, 1); };
  if (on) {
    for (let y = 0; y < 12; y++) for (let x = 0; x < 12; x++) { const d = Math.hypot(x - 5.5, y - 5.5); if (d <= 2.6) P(x, y, d < 1.4 ? '#fffbe8' : '#ffd66b'); }
    [[5, 0], [6, 0], [5, 11], [6, 11], [0, 5], [0, 6], [11, 5], [11, 6], [2, 2], [9, 2], [2, 9], [9, 9]].forEach(([x, y]) => P(x, y, '#ffb238'));
  } else {
    for (let y = 0; y < 12; y++) for (let x = 0; x < 12; x++) if (Math.hypot(x - 5, y - 6) <= 4.2 && Math.hypot(x - 7, y - 4.5) > 3.4) P(x, y, '#e8e4ff');
    [[9, 6], [8, 7], [9, 7], [10, 7], [9, 8], [8, 9], [8, 10]].forEach(([x, y]) => P(x, y, '#ffd66b'));
  }
}
$id('dayNight').addEventListener('click', () => setDay(!mode.day));
{
  let saved = null;
  try { saved = localStorage.getItem('sd-sky'); } catch { /* storage unavailable */ }
  mode.day = saved === 'day'; mode.from = mode.day ? 1 : 0; mode.at = -10;
  const btn = $id('dayNight');
  btn.setAttribute('aria-pressed', String(mode.day)); btn.setAttribute('aria-label', mode.day ? 'Switch to night' : 'Switch to sunrise');
  btn.classList.toggle('is-day', mode.day); root.classList.toggle('is-day', mode.day);
  drawSwitchIcon(mode.day);
}
window.planes = () => { nextPlane = 0; };
window.lightning = (rod) => { storm.next = 0; if (rod) storm.forceRod = rod; };

/* ---------------- aged wood beam + Zelda vine + hanging sign ---------------- */
const beam = $id('beam'), bg = beam.getContext('2d');
const sign = $id('sign'), sgn = sign.getContext('2d');
const WOOD = ['#140c07', '#2a1a0f', '#3f2817', '#57381f', '#6e4829', '#865a33', '#a07446', '#b99466'].map(hex);
const WEATHER = hex('#8c8475');
const VINE = { out: hex('#0b3b16'), dark: hex('#178a2a'), mid: hex('#34b13a'), light: hex('#7ee04a'), hi: hex('#c8ff7a') };
const FLOWER = [hex('#ffffff'), hex('#ff9ad5')];
const RUST = [hex('#3a1c10'), hex('#7a3b1d'), hex('#c7784a')];

function vnoise(x, y) {                                     // smooth value noise
  const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi;
  const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
  const a = hash(xi, yi), b = hash(xi + 1, yi), c = hash(xi, yi + 1), d = hash(xi + 1, yi + 1);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}
// Planks with uneven lengths; each gets its own seed, knots, crack.
function planksFor(w, seed) {
  const out = []; let x = 0, i = 0;
  while (x < w) {
    const len = 48 + Math.floor(hash(i, seed) * 40), k = hash(i, seed + 3);
    out.push({ x0: x, x1: Math.min(w, x + len), seed: i * 7.3 + seed,
      knots: k < .8 ? [{ x: x + 10 + Math.floor(hash(i, seed + 5) * (len - 20)), y: hash(i, seed + 6) }] : [],
      crack: hash(i, seed + 8) < .6 ? { x: x + Math.floor(hash(i, seed + 9) * (len - 24)), len: 10 + Math.floor(hash(i, seed + 10) * 16), y: hash(i, seed + 11) } : null });
    x += len; i++;
  }
  return out;
}
// Aged wood colour for a face pixel. top/bot = face rows; light = base lightness index.
function woodPixel(x, y, top, bot, plank, light) {
  const t = (y - top) / Math.max(1, bot - top);
  let v = light - t * 1.2;
  let bend = 0;
  for (const k of plank.knots) {
    const ky = top + 2 + k.y * (bot - top - 4), d = Math.hypot((x - k.x) / 3.2, (y - ky) / 1.6);
    if (d < .55) return WOOD[1];
    if (d < 2.4) { if ((d * 2.2) % 1 < .45) v -= 1.3; bend += 2.2 / (d + .6); }
  }
  const grain = Math.sin((y + Math.sin(x * .045 + plank.seed) * 1.7 + Math.sin(x * .012 + plank.seed * 2) * 2.4 + bend) * 2.2);
  if (grain > .82) v -= 1.2; else if (grain < -.9) v += .6;
  if (plank.crack) {
    const c = plank.crack, cy = Math.round(top + 2 + c.y * (bot - top - 4) + Math.sin(x * .7) * .6);
    if (x >= c.x && x < c.x + c.len && y === cy) return WOOD[0];
    if (x >= c.x && x < c.x + c.len && y === cy + 1) v -= .8;
  }
  const n = vnoise(x / 16, y / 5 + plank.seed);
  let col = WOOD[Math.max(1, Math.min(7, Math.floor(v + (bayer(x, y) - .5) * .6 - (hash(x, y * 3) < .05 ? 1 : 0))))];
  if (n > .64) col = mix(col, WEATHER, Math.min(.55, (n - .64) * 2.4));       // sun-bleached grey patches
  return col;
}
function nailAt(x, y, nx, ny) {
  if (x >= nx && x <= nx + 1 && y >= ny && y <= ny + 1) return x === nx && y === ny ? RUST[2] : RUST[1];
  if (x === nx && y >= ny + 2 && y <= ny + 4 && hash(nx, y) < .8) return mix(RUST[1], WOOD[3], (y - ny - 2) / 3);   // rust streak
  return null;
}

// Beam rows (logical px): top face 6-8, front face 9-22, underside 23-24.
const BH = 34, B_TOP = 6, B_FRONT = 9, B_BOT = 22;
function buildBeam(w) {
  const planks = planksFor(w, 1);
  const wood = paint(w, BH, (fx, fy, x, y) => {
    if (y < B_TOP || y > B_BOT + 2) return null;
    const p = planks.find(q => x >= q.x0 && x < q.x1);
    // chipped outline along the top edge
    if (y === B_TOP && hash(x, 99) < .12) return null;
    if (y > B_BOT) return y === B_BOT + 1 ? WOOD[1] : hash(x, 7) < .3 ? null : WOOD[0];
    if (x === p.x0) return WOOD[0];                                                // seam
    if (x === p.x0 + 1) return WOOD[5];
    if (y < B_FRONT) {                                                            // top face: bleached, a little moss
      if (vnoise(x / 9, 3) > .72 && hash(x, y) < .7) return hash(x, y + 1) < .5 ? VINE.dark : VINE.mid;
      return woodPixel(x, y, B_TOP, B_FRONT, p, 7.2);
    }
    if (y === B_FRONT) return hash(x, 5) < .1 ? WOOD[2] : WOOD[6];                  // worn front edge
    return nailAt(x, y, p.x0 + 4, B_FRONT + 3) || nailAt(x, y, p.x0 + 4, B_BOT - 5) || woodPixel(x, y, B_FRONT, B_BOT, p, 5.6);
  }, WOOD[0]);
  return wood;
}

// The vine: a stem that wraps the beam (dips behind it on the back half of each turn),
// alternating leaves, a curly tendril and two flowers. Only the left ~third of the beam.
function buildVine(w) {
  const L = Math.min(Math.floor(w * .4), 220), mid = (B_TOP + B_BOT) / 2, amp = 11, f = .075;
  const stemY = x => mid + Math.sin(x * f + .6) * amp * (1 - x / L * .45);
  const behind = x => Math.cos(x * f + .6) < -.25;
  const leaves = [];
  for (let x = 3; x < L - 4; x += 6) if (!behind(x)) leaves.push({ x, y: Math.round(stemY(x)), up: (x / 8) % 2 < 1 });
  const tendrilX = Math.floor(L * .62);
  return paint(w, BH, (fx, fy, x, y) => {
    if (x < L) {
      const sy = stemY(x), thick = x < L * .75 ? 1.6 : 1;
      const onBeam = y >= B_TOP && y <= B_BOT + 1;
      if (Math.abs(y - sy) < thick && !(behind(x) && onBeam)) return y < sy ? VINE.light : VINE.mid;
    }
    for (const l of leaves) {                                                     // 6x3 leaf, pointed tip
      const dx = x - l.x, dy = l.up ? l.y - 1 - y : y - l.y - 1;
      if (dx >= 0 && dx <= 5 && dy >= 0 && dy <= 2 && !(dy === 2 && (dx === 0 || dx >= 4)) && !(dy === 0 && dx === 5)) {
        if (dy === 1 && dx >= 1 && dx <= 3) return VINE.light;
        if (dy === 2 || dx === 5) return VINE.dark;
        return dx === 1 && dy === 0 ? VINE.hi : VINE.mid;
      }
    }
    // hanging tendril: drops from the underside and curls
    const ty = y - (B_BOT + 1);
    if (ty >= 0 && ty <= 8) {
      const cx = tendrilX + Math.round(Math.sin(ty * .9) * (ty > 4 ? 2 : .6));
      if (x === cx) return VINE.mid;
    }
    // flowers
    for (const fxp of [Math.floor(L * .28), Math.floor(L * .8)]) {
      const fyp = Math.round(stemY(fxp)) - 3;
      if (Math.abs(x - fxp) + Math.abs(y - fyp) === 1) return FLOWER[fxp % 2];
      if (x === fxp && y === fyp) return hex('#ffd66b');
    }
    return null;
  }, VINE.out, true);
}

function drawBeam() {
  const s = pixelScale(), w = Math.ceil(innerWidth / s);
  beam.width = w; beam.height = BH; beam.style.height = BH * s + 'px';
  bg.clearRect(0, 0, w, BH);
  bg.drawImage(buildBeam(w), 0, 0);
  bg.drawImage(buildVine(w), 0, 0);
}

// Sign: two aged planks on pixel chains; vine climbs the left chain onto the corner.
function drawSign() {
  const s = pixelScale(), W = 150, H = 60, T = 16, M = 34, Bt = 51;
  sign.width = W; sign.height = H; sign.style.width = W * s + 'px'; sign.style.height = H * s + 'px';
  const planks = [{ x0: 4, x1: W - 4, seed: 11, knots: [{ x: 118, y: .4 }], crack: { x: 12, len: 18, y: .7 } },
                  { x0: 4, x1: W - 4, seed: 23, knots: [{ x: 30, y: .5 }], crack: { x: 96, len: 22, y: .3 } }];
  const board = paint(W, H, (fx, fy, x, y) => {
    if (x < 4 || x > W - 5 || y < T || y > Bt + 1) return null;
    if ((x === 4 || x === W - 5) && (y === T || y === Bt + 1)) return null;         // rounded corners
    if (x === 5 && y === T + 1 && true) return null;                                 // chipped corner
    if (y >= Bt) return y === Bt ? WOOD[2] : WOOD[1];                                // board thickness
    if (y === M) return WOOD[0];                                                     // seam between planks
    if (y === M + 1) return WOOD[6];
    const p = y < M ? planks[0] : planks[1];
    return nailAt(x, y, 8, T + 3) || nailAt(x, y, W - 10, T + 3) || nailAt(x, y, 8, M + 4) || nailAt(x, y, W - 10, M + 4)
      || woodPixel(x, y, y < M ? T : M + 1, y < M ? M - 1 : Bt - 1, p, 5.8);
  }, WOOD[0]);
  const chains = paint(W, H, (fx, fy, x, y) => {
    for (const cx of [22, 126]) {                                                // alternating open/edge-on links
      if (y > T || Math.abs(x - cx) > 1) continue;
      const link = Math.floor(y / 4), ly = y % 4;
      if (link % 2 === 0) { if (x === cx && (ly === 1 || ly === 2)) return null; return x === cx - 1 ? [190, 194, 204] : [120, 124, 136]; }
      if (x === cx) return ly === 0 ? [200, 204, 214] : [110, 114, 126];
    }
    return null;
  }, hex('#15131b'), true);
  sgn.clearRect(0, 0, W, H); sgn.drawImage(chains, 0, 0); sgn.drawImage(board, 0, 0);
  // burned-in lettering: dark glyphs with a light lower lip, like carving
  sgn.font = '8px "Press Start 2P"'; sgn.textBaseline = 'top'; sgn.textAlign = 'center';
  sgn.fillStyle = '#c9a070'; sgn.fillText('WORK', W / 2 + 1, T + 7); sgn.fillText('EXPERIENCE', W / 2 + 1, M + 6);
  sgn.fillStyle = '#1a0d06'; sgn.fillText('WORK', W / 2, T + 6); sgn.fillText('EXPERIENCE', W / 2, M + 5);
  // vine coiling up the left chain and over the top-left corner
  const vine = paint(W, H, (fx, fy, x, y) => {
    if (y <= T + 1) { const cx = 22 + Math.round(Math.sin(y * .9) * 2); if (x === cx && Math.cos(y * .9) > -.3) return VINE.mid; }
    if (y >= T - 1 && y <= T + 1 && x >= 16 && x <= 34) { const vy = T + Math.round(Math.sin(x * .6)); if (y === vy) return VINE.mid; }
    for (const [lx, ly, up] of [[18, 4, true], [23, 9, false], [28, T - 1, true], [33, T + 2, false]]) {
      const dx = x - lx, dy = up ? ly - y : y - ly;
      if (dx >= 0 && dx <= 4 && dy >= 0 && dy <= 1 && !(dy === 1 && (dx === 0 || dx === 4))) return dy === 0 && dx === 1 ? VINE.hi : dy === 0 ? VINE.light : VINE.mid;
    }
    if (Math.abs(x - 37) + Math.abs(y - (T + 1)) === 1) return FLOWER[1];
    if (x === 37 && y === T + 1) return hex('#ffd66b');
    return null;
  }, VINE.out, true);
  sgn.drawImage(vine, 0, 0);
}

/* ---------------- work CRTs: one set per job, flipping through that job's projects ---------------- */
// Wordless, vivid screens (54x42), in the order of each job's work items in src/data/experience.js.
const P2 = (g, x, y, c) => { g.fillStyle = c; g.fillRect(Math.round(x), Math.round(y), 1, 1); };
const glowDot = (g, x, y, c, halo) => { P2(g, x, y, c); if (halo) { g.fillStyle = halo; g.fillRect(Math.round(x) - 1, Math.round(y), 1, 1); g.fillRect(Math.round(x) + 1, Math.round(y), 1, 1); g.fillRect(Math.round(x), Math.round(y) - 1, 1, 1); g.fillRect(Math.round(x), Math.round(y) + 1, 1, 1); } };
// JellySynth-style living background for the work screens: a slow, dark, dithered plasma
// whose hue drifts around the wheel from each project's base colour. Foreground stays crisp on top.
function flowBg(g, t, hue) {
  const h = (hue + (reduce ? 0 : t * 9)) % 360, cols = [0, 1, 2, 3].map(k => `hsl(${(h + k * 18) % 360}, ${45 + k * 6}%, ${5 + k * 4}%)`);
  for (let y = 0; y < SH; y++) for (let x = 0; x < SW; x++) {
    const v = (Math.sin(x * .13 + t * .7) + Math.sin(y * .17 - t * .5) + Math.sin((x + y) * .09 + t * .35) + Math.sin(Math.hypot(x - 27, y - 21) * .22 - t * .9)) / 4;
    g.fillStyle = cols[Math.max(0, Math.min(3, Math.floor((v + 1) / 2 * 3.99 + (bayer(x, y) - .5) * .9)))]; g.fillRect(x, y, 1, 1);
  }
}
const JOB_SCENES = {
  insight: [
    function llmCore(g, t) {                                   // requests pour into a glowing core; a few bounce off the rate-limit ring
      flowBg(g, t, 275);
      const cx = 27, cy = 21, pulse = 4.5 + Math.sin(t * 3) * .8;
      for (let y = -9; y <= 9; y++) for (let x = -9; x <= 9; x++) {
        const d = Math.hypot(x, y);
        if (d < pulse) P2(g, cx + x, cy + y, d < pulse * .45 ? '#fff4ff' : d < pulse * .75 ? '#d8b4ff' : '#9a6aff');
        else if (d < pulse + 4 && bayer(cx + x, cy + y) < (1 - (d - pulse) / 4) * .5) P2(g, cx + x, cy + y, '#5a3aa0');
      }
      for (let a = 0; a < 24; a++) { const ang = a / 24 * Math.PI * 2 + t * .6; if (a % 2) P2(g, cx + Math.cos(ang) * 13, cy + Math.sin(ang) * 11, '#6fd3ff'); }
      for (let i = 0; i < 22; i++) {
        const ang = hash(i, 1) * Math.PI * 2, ph = (t * .45 + i / 22) % 1, cycle = Math.floor(t * .45 + i / 22);
        const limited = hash(i, cycle) < .2;
        let r = 30 * (1 - ph);
        if (limited && r < 13) r = 26 - r;                      // bounced back out
        const col = limited && 30 * (1 - ph) < 13 ? '#ff5c9a' : r < 13 ? '#ffffff' : '#6fd3ff';
        P2(g, cx + Math.cos(ang) * r, cy + Math.sin(ang) * r * .85, col);
      }
      for (let i = 0; i < 8; i++) { const ang = hash(i, 7) * 6.28, r = ((t * .7 + i / 8) % 1) * 26; P2(g, cx + Math.cos(ang) * r, cy + Math.sin(ang) * r * .85, '#57f287'); }
    },
    function heartbeat(g, t) {                                 // live signal; the anomaly spike sets off alarm rings
      flowBg(g, t, 195);
      for (let x = 0; x < SW; x += 6) for (let y = 3; y < SH; y += 6) P2(g, x, y, '#0f2233');
      let prev = null; const beat = (t % 3) / 3;
      for (let x = 0; x < SW; x++) {
        const u = (x / SW + t * .35) % 1, spike = Math.abs(u - .72) < .02;
        const y = Math.round(24 + Math.sin(u * 40) * 1.5 + (spike ? -14 * (1 - Math.abs(u - .72) / .02) : 0));
        if (prev !== null) for (let yy = Math.min(prev, y); yy <= Math.max(prev, y); yy++) glowDot(g, x, yy, spike ? '#ff5c9a' : '#6ff0ff', spike ? '#ff5c9a44' : '#6ff0ff22');
        prev = y;
      }
      for (let k = 0; k < 3; k++) { const r = ((beat + k / 3) % 1) * 14; for (let a = 0; a < 20; a++) { const an = a / 20 * 6.28; if (bayer(a, k) < 1 - r / 14) P2(g, 44 + Math.cos(an) * r, 9 + Math.sin(an) * r, '#ff5c9a'); } }
      rect(g, 42, 6, 5, 5, '#ffd66b'); rect(g, 41, 11, 7, 1, '#ffd66b');
    },
    function drain(g, t) {                                     // sockets pile up red, then one pooled pipe drains to green
      flowBg(g, t, 150);
      const k = (t % 10) / 10, fixed = k > .5, level = fixed ? 30 - (k - .5) / .5 * 22 : 8 + k / .5 * 22;
      rect(g, 8, 4, 2, 34, '#3a4060'); rect(g, 44, 4, 2, 34, '#3a4060'); rect(g, 8, 37, 38, 2, '#3a4060');
      for (let y = 37 - Math.round(level); y < 37; y++) for (let x = 10; x < 44; x++) P2(g, x, y, bayer(x, y + Math.floor(t * 8)) < .5 ? (fixed ? '#1f8a5a' : '#8a1f3a') : (fixed ? '#2fbf7a' : '#c02a50'));
      for (let i = 0; i < 12; i++) { const bx = 12 + (i * 7) % 30, by = 36 - ((t * (6 + i % 3) + i * 5) % Math.max(2, level)); P2(g, bx, by, fixed ? '#bfffe0' : '#ffc0d0'); }
      if (fixed) { rect(g, 44, 34, 8, 2, '#57f287'); for (let x = 46; x < 54; x += 2) P2(g, x + Math.floor(t * 10) % 2, 35, '#bfffe0'); }
    },
    function spectrum(g, t) {                                  // real-time dashboard: a neon spectrum at 60fps
      flowBg(g, t, 300);
      for (let b = 0; b < 12; b++) {
        const h = Math.round(6 + (Math.sin(t * 5 + b * .9) * .5 + .5) * 26 * (.6 + .4 * vnoise(b, t * 3)));
        for (let y = 0; y < h; y++) { const f = y / 32; rect(g, 3 + b * 4, 39 - y, 3, 1, f < .4 ? '#3de0ff' : f < .7 ? '#b48cff' : '#ff3d9f'); }
        rect(g, 3 + b * 4, 38 - h - 2, 3, 1, '#ffffff');
      }
    },
    function portal(g, t) {                                    // care calendar lighting up around a beating heart
      flowBg(g, t, 335);
      const lit = Math.floor(t * 3) % 24;
      for (let i = 0; i < 24; i++) { const x = 3 + (i % 6) * 5, y = 6 + Math.floor(i / 6) * 8; rect(g, x, y, 4, 6, i === lit ? '#57f2c8' : hash(i, 2) < .4 ? '#1f5a5a' : '#1a1a2e'); }
      const big = Math.sin(t * 5) > .3, hx = 40, hy = 18;
      const HEART = big ? ['.XX.XX.', 'XXXXXXX', 'XXXXXXX', '.XXXXX.', '..XXX..', '...X...'] : ['.X.X.', 'XXXXX', '.XXX.', '..X..'];
      HEART.forEach((row, r) => [...row].forEach((c, q) => { if (c === 'X') P2(g, hx + q - (big ? 3 : 2), hy + r - 3, r === 0 || q === 1 ? '#ff9ac0' : '#ff3d7f'); }));
    },
    function scanner(g, t) {                                   // a laser tags bottles on the line
      flowBg(g, t, 20);
      rect(g, 0, 32, SW, 3, '#2a2530'); for (let x = -(t * 20 % 4); x < SW; x += 4) P2(g, x, 33, '#4a4252');
      const lx = 30;
      for (let y = 4; y < 32; y++) if ((y + Math.floor(t * 20)) % 3) P2(g, lx, y, '#ff3d5a');
      rect(g, lx - 3, 2, 7, 3, '#3a3f5a');
      for (let i = 0; i < 5; i++) {
        const bx = ((i * 13 + t * 16) % (SW + 12)) - 6;
        rect(g, bx + 1, 21, 2, 2, '#3a8a5a'); rect(g, bx, 23, 4, 9, '#4ab070'); P2(g, bx + 1, 24, '#aaf0c0');
        if (bx > lx) { ['#57f287'].forEach(c => { P2(g, bx - 2, 19, c); P2(g, bx - 1, 19, c); P2(g, bx + 5, 19, c); P2(g, bx + 4, 19, c); P2(g, bx - 2, 20, c); P2(g, bx + 5, 20, c); }); }
      }
    },
    function pairTree(g, t) {                                  // two cursors growing one tree together
      flowBg(g, t, 215);
      const k = (t % 8) / 8, depth = Math.floor(k * 6) + 1;
      const branch = (x, y, len, ang, d, who) => {
        if (d > depth) return;
        const ex = x + Math.cos(ang) * len, ey = y + Math.sin(ang) * len, n = Math.ceil(len);
        for (let i = 0; i <= n; i++) P2(g, x + (ex - x) * i / n, y + (ey - y) * i / n, d < 3 ? '#9be58f' : who ? '#ff9ac0' : '#ffe08a');
        branch(ex, ey, len * .72, ang - .5, d + 1, 0); branch(ex, ey, len * .72, ang + .5, d + 1, 1);
      };
      branch(27, 40, 9, -Math.PI / 2, 1, 0);
      if (Math.floor(t * 3) % 2) { rect(g, 14 + Math.sin(t) * 6, 8, 1, 4, '#ff6fa0'); rect(g, 38 + Math.cos(t) * 6, 10, 1, 4, '#ffd66b'); }
    },
  ],
  hanu: [
    function lap(g, t) {                                       // fast laps, needle held in the green
      flowBg(g, t, 200);
      for (let a = 0; a < 60; a++) { const an = a / 60 * 6.28; P2(g, 27 + Math.cos(an) * 22, 17 + Math.sin(an) * 11, '#1f2a44'); }
      for (let i = 0; i < 12; i++) { const an = t * 4 - i * .07; P2(g, 27 + Math.cos(an) * 22, 17 + Math.sin(an) * 11, i ? (i < 4 ? '#bff4ff' : '#3de0ff') : '#ffffff'); }
      const cx = 44, cy = 38;
      for (let a = 0; a <= 12; a++) { const an = Math.PI + a / 12 * Math.PI; P2(g, cx + Math.cos(an) * 8, cy + Math.sin(an) * 8, a < 8 ? '#57f287' : '#ff5c7a'); }
      const nd = Math.PI + (.35 + Math.sin(t * 7) * .06) * Math.PI;
      for (let r = 0; r < 7; r++) P2(g, cx + Math.cos(nd) * r, cy + Math.sin(nd) * r, '#ffffff');
    },
    function shield(g, t) {                                    // bugs zapped at the shield
      flowBg(g, t, 180);
      const S = ['..XXXXX..', '.XXXXXXX.', 'XXXXXXXXX', 'XXXXXXXXX', 'XXXXXXXXX', '.XXXXXXX.', '.XXXXXXX.', '..XXXXX..', '...XXX...', '....X....'];
      S.forEach((row, r) => [...row].forEach((c, q) => { if (c === 'X') P2(g, 23 + q, 15 + r, q < 4 ? '#6ff0ff' : '#2ab0d0'); }));
      for (let a = 0; a < 30; a++) { const an = a / 30 * 6.28; if (bayer(a, Math.floor(t * 4)) < .5) P2(g, 27 + Math.cos(an) * 10, 20 + Math.sin(an) * 10, '#1f6a8a'); }
      for (let i = 0; i < 6; i++) {
        const an = hash(i, 3) * 6.28, ph = (t * .5 + i / 6) % 1, r = 26 - ph * 16;
        const x = 27 + Math.cos(an) * r, y = 20 + Math.sin(an) * r;
        if (r > 11) { P2(g, x, y, '#ff3d5a'); P2(g, x + 1, y, '#ff3d5a'); P2(g, x, y - 1, '#aa1a3a'); }
        else for (let s2 = 0; s2 < 5; s2++) P2(g, x + (hash(i, s2) - .5) * 6, y + (hash(s2, i) - .5) * 6, '#ffd66b');
      }
    },
    function coins(g, t) {                                     // spend shrinks while instances breathe with load
      flowBg(g, t, 45);
      const k = Math.min(1, (t % 8) / 6), n = Math.round(10 - 4 * k);
      for (let i = 0; i < n; i++) { rect(g, 8, 34 - i * 3, 12, 2, '#ffc83d'); rect(g, 8, 35 - i * 3, 12, 1, '#b8861a'); P2(g, 9, 34 - i * 3, '#fff0b0'); }
      for (let y = 0; y < 6; y++) rect(g, 24 - y + 2, 12 + y, 1 + y * 0 + 1, 1, '#57f287');
      rect(g, 25, 6, 2, 8, '#57f287');
      const up = 2 + Math.round((Math.sin(t * .8) * .5 + .5) * 4);
      for (let v = 0; v < 6; v++) rect(g, 34 + (v % 3) * 6, 12 + Math.floor(v / 3) * 8, 5, 6, v < up ? '#3de0ff' : '#18202e');
    },
    function donut(g, t) {                                     // live FinOps: flowing area + turning donut
      flowBg(g, t, 255);
      for (let x = 0; x < 30; x++) { const y = Math.round(28 - (Math.sin((x + t * 12) * .2) * .5 + .5) * 16); for (let yy = y; yy < 38; yy++) P2(g, x + 2, yy, yy === y ? '#3de0ff' : yy % 2 ? '#1a3a6a' : '#12284a'); }
      const cx = 43, cy = 20;
      for (let y = -9; y <= 9; y++) for (let x = -9; x <= 9; x++) { const d = Math.hypot(x, y); if (d < 9 && d > 5) { const a = (Math.atan2(y, x) - t * .8 + 20 * Math.PI) % (2 * Math.PI); P2(g, cx + x, cy + y, a < 2.2 ? '#b48cff' : a < 4 ? '#ffd66b' : '#57f287'); } }
    },
  ],
  ey: [
    function lanes(g, t) {                                     // sensor data streaming down three Kafka lanes
      flowBg(g, t, 30);
      [9, 20, 31].forEach((ly, i) => {
        for (let x = 6; x < SW - 6; x += 2) P2(g, x, ly, '#241e10');
        for (let p = 0; p < 4; p++) {
          const x = 6 + ((t * (14 + i * 4) + p * 11) % (SW - 12));
          for (let k = 1; k < 6; k++) P2(g, x - k, ly, ['#ffb347', '#ffd66b', '#ff8a5c'][i] + (k < 3 ? 'aa' : '44'));
          glowDot(g, x, ly, '#fff3d0', ['#ffb347', '#ffd66b', '#ff8a5c'][i] + '88');
        }
        rect(g, 1, ly - 2, 4, 5, '#6b5a3a'); rect(g, SW - 5, ly - 2, 4, 5, Math.floor(t * 4 + i) % 2 ? '#57f287' : '#2f6b4a');
      });
    },
    function race(g, t) {                                      // slow query drip vs. an instant cache bolt
      flowBg(g, t, 315);
      rect(g, 4, 6, 8, 10, '#6a5a8a'); rect(g, 4, 5, 8, 2, '#9a8ab8'); rect(g, 4, 15, 8, 2, '#4a3a6a');           // database
      rect(g, 4, 26, 8, 8, '#c02a3a'); rect(g, 5, 27, 6, 6, '#ff5c5c');                                        // cache chip
      rect(g, 44, 14, 8, 12, '#1a2a3a'); const k = (t % 3) / 3;
      rect(g, 45, 15, 6, 10, k < .15 ? '#57f287' : '#12202e');                                                  // dashboard lights on the bolt
      P2(g, 12 + k * 32, 11, '#ff8a5c'); P2(g, 12 + k * 32 - 1, 11, '#ff8a5c66');                               // the slow drip
      if (k < .15) for (let x = 12; x < 44; x++) P2(g, x, 30 - ((x >> 2) % 2) * 3 + Math.floor((x - 12) / 11) * -2, '#fff3a0');
    },
  ],
};
const WORK_ORDER = ['insight', 'hanu', 'ey'];                    // most recent first, left to right; middle set raised
const WSLOT = 7;
const lcdWrap = $id('lcds');
const lcds = WORK_ORDER.map((id, n) => {
  const j = JOBS.find(q => q.id === id);
  const d = document.createElement('div'); d.className = 'tv wtv';
  const cv = document.createElement('canvas'); cv.width = TV_W; cv.height = TV_H;
  const shadow = document.createElement('div'); shadow.className = 'tv-shadow';
  const cap = document.createElement('div'); cap.className = 'tv-label';
  const scope = document.createElement('canvas'); scope.width = 84; scope.height = 14; scope.className = 'scope'; scope.setAttribute('aria-hidden', 'true'); scope.style.width = '252px'; scope.style.height = '42px';
  d.append(scope, cv, shadow, cap); lcdWrap.append(d);
  d.tabIndex = 0; d.setAttribute('role', 'button');
  const screen = document.createElement('canvas'); screen.width = SW; screen.height = SH;
  const up = -Math.PI / 2;
  const entry = { j, n, d, cv, cap, g: cv.getContext('2d'), screen, sg: screen.getContext('2d', { willReadFrequently: true }),
    scopeG: scope.getContext('2d'), scope, tuned: false, idx: -1, switchAt: -10,
    knobs: [{ from: up, to: up, t0: 0, dur: 0 }, { from: up + .5 * (n - 1), to: up + .5 * (n - 1), t0: 0, dur: 0 }] };
  const open = () => {
    const card = $id('log-' + j.id); card.scrollIntoView({ block: 'start' }); card.classList.add('active');
    card.focus({ preventScroll: true }); setTimeout(() => card.classList.remove('active'), 2400);
  };
  d.addEventListener('click', open); d.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
  ['mouseenter', 'focus'].forEach(ev => d.addEventListener(ev, () => { entry.tuned = true; }));
  ['mouseleave', 'blur'].forEach(ev => d.addEventListener(ev, () => { entry.tuned = false; }));
  return entry;
});
// Company emblem mounted on the casing's top-left corner, like a maker's badge: pixel versions
// of each brand's mark (Insight wordmark on red-violet, HANU on orange, EY's yellow beam over EY).
const GLYPH = { E: ['111', '100', '110', '100', '111'], Y: ['101', '101', '010', '010', '010'], N: ['101', '111', '111', '111', '101'],
  S: ['111', '100', '111', '001', '111'], I: ['111', '010', '010', '010', '111'], T: ['111', '010', '010', '010', '010'],
  H: ['101', '101', '111', '101', '101'], A: ['010', '101', '111', '101', '101'], U: ['101', '101', '101', '101', '111'],
  G: ['111', '100', '101', '101', '111'] };
function drawWord(g, word, x0, y0, col) {
  [...word].forEach((ch, i) => (GLYPH[ch] || []).forEach((row, ry) => [...row].forEach((b, rx) => {
    if (b === '1') { g.fillStyle = col; g.fillRect(x0 + i * 4 + rx, y0 + ry, 1, 1); }
  })));
}
function badge(g, x0, y0, w, h, bg, hi) {                               // outlined plate with a lit top edge
  g.fillStyle = 'rgba(20,16,30,.85)'; g.fillRect(x0 - 1, y0, w + 2, h); g.fillRect(x0, y0 - 1, w, h + 2);
  g.fillStyle = bg; g.fillRect(x0, y0, w, h);
  g.fillStyle = hi; g.fillRect(x0 + 1, y0, w - 2, 1);
  g.fillStyle = 'rgba(0,0,0,.25)'; g.fillRect(x0 + 1, y0 + h - 1, w - 2, 1);
}
function drawEmblem(g, id) {
  if (id === 'insight') { badge(g, 5, 20, 31, 9, '#d40e8c', '#f25ab4'); drawWord(g, 'INSIGHT', 7, 22, '#ffffff'); }
  else if (id === 'hanu') { badge(g, 5, 20, 19, 9, '#f7941d', '#ffc070'); drawWord(g, 'HANU', 7, 22, '#1a1a1a'); }
  else if (id === 'ey') {
    // EY on dark: white EY on charcoal, the yellow beam rising off the top-right corner
    badge(g, 5, 21, 11, 8, '#2e2e38', '#4a4a58');
    for (let r = 0; r < 4; r++) for (let x = 0; x < 13; x++) { g.fillStyle = r === 0 ? '#fff6a0' : '#ffe600'; g.fillRect(9 + x + (3 - r) * 2, 15 + r, 1, 1); }
    g.fillStyle = 'rgba(20,16,30,.85)'; for (let x = -1; x < 14; x++) { g.fillRect(9 + x + 6, 14, 1, 1); g.fillRect(9 + x, 19, 1, 1); }
    drawWord(g, 'EY', 7, 23, '#ffffff');
  }
}
function setWorkChannel(l, idx, t) {
  l.idx = idx; l.switchAt = t;
  const [ch, fine] = l.knobs, dur = reduce ? 0 : .32;
  ch.from = knobAngle(ch, t); ch.to = ch.from + Math.PI / 3 + l.n * .3; ch.t0 = t; ch.dur = dur;
  fine.from = knobAngle(fine, t); fine.to = fine.from - (.3 + hash(l.n, idx) * .6); fine.t0 = t + .06; fine.dur = dur;
  const name = l.j.work[idx][0];
  l.cap.innerHTML = `<span class="plate-co">${esc(l.j.co)}</span><span class="plate-role">${esc(l.j.role)}</span>`
    + `<span class="plate-when">${esc(l.j.when)}</span><small class="plate-now">▸ ${esc(name)}</small>`;
  l.d.setAttribute('aria-label', `${esc(l.j.co)}, now showing ${esc(name)}. Open job details`);
  root.querySelectorAll(`#log-${l.j.id} li`).forEach((li, i) => li.classList.toggle('on', i === idx));
}
function drawLCDs(t) {
  lcds.forEach(l => {
    const scenes = JOB_SCENES[l.j.id], count = Math.min(scenes.length, l.j.work.length);
    const idx = reduce ? 0 : Math.floor((t + l.n * 2.3) / WSLOT) % count;
    if (idx !== l.idx) setWorkChannel(l, idx, l.idx < 0 ? -10 : t);
    const g = l.g;
    g.clearRect(0, 0, TV_W, TV_H); g.drawImage(TV_FRAME, 0, 0);
    l.knobs.forEach((k, i) => drawKnob(g, KNOBS[i][0], KNOBS[i][1], knobAngle(k, t)));
    drawEmblem(g, l.j.id);
    g.save(); g.globalCompositeOperation = 'source-atop';               // campfire underlight
    const wl = g.createLinearGradient(0, TV_H * .55, 0, TV_H);
    wl.addColorStop(0, 'rgba(255,140,60,0)'); wl.addColorStop(1, `rgba(255,140,60,${(.3 * FIRE.level).toFixed(3)})`);
    g.fillStyle = wl; g.fillRect(0, 0, TV_W, TV_H); g.restore();
    const noisy = !reduce && t - l.switchAt < .35;
    if (noisy) staticNoise(g, t);
    else {
      const clip = clipFor(l.j.id);
      if (clip.ready) drawCover(l.sg, clip.video, SW, SH); else scenes[idx](l.sg, reduce ? 2 : t + l.n);
      g.drawImage(l.screen, SX, SY);
    }
    crtPost(g, l.sg, noisy); drawDigit(g, idx + 1);
    screenGlow(l.d, l.sg, t);
  });
}
// Hover glow takes the colour of what's on the glass, so it suits night, sunrise and the campfire.
function screenGlow(el, sg, t) {
  if (Math.floor(t * 4) === el._glowTick) return;
  el._glowTick = Math.floor(t * 4);
  const [r, g, b] = avgColor(sg);
  el.style.setProperty('--glow', `${Math.min(255, r * 1.6 + 40) | 0} ${Math.min(255, g * 1.6 + 40) | 0} ${Math.min(255, b * 1.6 + 40) | 0}`);
}

/* readable job details, styled like the project strip */
$id('jobs').innerHTML = JOBS.map(j => `
  <article class="job" id="log-${j.id}" tabindex="-1">
    <div class="tag">${esc(j.role)} · <span class="nowrap">${esc(j.when)}</span></div>
    <h3>${esc(j.co)}</h3>
    <ul>${j.work.map(([a, b]) => `<li><b>${esc(a)}</b> ${esc(b)}</li>`).join('')}</ul>
  </article>`).join('');

/* ================= work scene: tiny planet under open space (Outer Wilds-inspired) ================= */
const scene = $id('scene'), space = $id('space'), xg = space.getContext('2d');
let oceanSprite = null, twinA = null, twinB = null, redSprite = null;
let SPW = 0, SPH = 0, SPS = 3, spaceStatic = null, spaceBand = null, spaceGround = null, twinkles = [], gasSprite = null, moonSprite = null;
const FIRE = { x: 0, y: 0, level: 1 };
const AMBER = '#e8a33d';
const px = (g, x, y, c) => { g.fillStyle = c; g.fillRect(x, y, 1, 1); };
const groundTop = x => Math.round(SPH - 36 + 16 * ((x - SPW / 2) / (SPW / 2)) ** 2);   // convex: edges fall away

function buildPlanet(r, fn) {
  const c = document.createElement('canvas'); c.width = c.height = r * 2 + 1; const g = c.getContext('2d');
  for (let y = -r; y <= r; y++) for (let x = -r; x <= r; x++) {
    const d = Math.hypot(x, y); if (d > r) continue;
    const nz = Math.sqrt(Math.max(0, 1 - (d / r) ** 2));
    const lit = (x / r) * .55 + (-y / r) * .45 + nz * .5;                  // sun sits top-right
    const col = fn(x, y, d);
    if (lit + (bayer(x + r, y + r) - .5) * .35 < .05) px(g, x + r, y + r, '#0b0913');
    else if (lit + (bayer(x + r, y + r) - .5) * .35 < .32) px(g, x + r, y + r, mixHex(col, '#0b0913', .55));
    else px(g, x + r, y + r, col);
  }
  return c;
}
function mixHex(a, b, t) { const [r1, g1, b1] = hex(a), [r2, g2, b2] = hex(b); return `rgb(${r1 + (r2 - r1) * t | 0},${g1 + (g2 - g1) * t | 0},${b1 + (b2 - b1) * t | 0})`; }

function buildSpace() {
  SPS = pixelScale(); SPW = Math.ceil(scene.clientWidth / SPS); SPH = Math.ceil(scene.clientHeight / SPS);
  space.width = SPW; space.height = SPH;
  const c = document.createElement('canvas'); c.width = SPW; c.height = SPH; let g = c.getContext('2d');
  // sky: dithered bands from deep space down to a teal horizon
  const SKYB = ['#05070f', '#070b18', '#0a1224', '#0c1a2e', '#0f2433'];
  for (let y = 0; y < SPH; y++) for (let x = 0; x < SPW; x++) {
    const t = y / SPH; px(g, x, y, SKYB[Math.max(0, Math.min(4, Math.floor(t * 4.6 + (bayer(x, y) - .5) * .9)))]);
  }
  // celestial band: twice the view wide, wraps seamlessly; the sky slides across it as the planet turns
  const BW = SPW * 2, band = document.createElement('canvas'); band.width = BW; band.height = SPH;
  const bg = band.getContext('2d');
  const wrapNoise = (x, y, sx, sy) => { const k = x / BW; return vnoise(x / sx, y / sy) * (1 - k) + vnoise((x - BW) / sx, y / sy) * k; };
  for (let y = 0; y < SPH * .8; y++) for (let x = 0; x < BW; x++) {
    const bandY = SPH * .3 + Math.sin(x / BW * Math.PI * 2) * SPH * .08;
    const v = (wrapNoise(x, y, 38, 16) * .6 + wrapNoise(x, y, 11, 7) * .4) * Math.exp(-(((y - bandY) / (SPH * .16)) ** 2));
    if (v > .38 && bayer(x, y) < (v - .38) * 2.6) px(bg, x, y, wrapNoise(x + 900, y, 30, 30) > .5 ? '#15404f' : '#2b2152');
  }
  twinkles = [];
  const n = Math.floor(BW * SPH / 150);
  for (let i = 0; i < n; i++) {
    const x = Math.floor(hash(i, 1) * BW), y = Math.floor(hash(i, 2) * (SPH - 40));
    const b = hash(i, 3);
    if (b > .96) { const col = hash(i, 5) > .5 ? '#fff4d8' : '#cfe0ff'; px(bg, x, y, col); px(bg, x - 1, y, col + '99'); px(bg, x + 1, y, col + '99'); px(bg, x, y - 1, col + '99'); px(bg, x, y + 1, col + '99'); }
    else px(bg, x, y, b > .7 ? '#aab4d0' : '#4f5a78');
    if (hash(i, 4) > .86) twinkles.push({ x, y, ph: hash(i, 6) * 6.28, sp: .6 + hash(i, 7) * 1.6 });
  }
  spaceBand = band;
  // everything on the ground draws into its own layer, in front of the turning sky
  const gc = document.createElement('canvas'); gc.width = SPW; gc.height = SPH; g = gc.getContext('2d');
  spaceGround = gc;
  // ground: grassy crest, dithered soil
  for (let x = 0; x < SPW; x++) {
    const gt = groundTop(x);
    if (hash(x, 31) < .25) px(g, x, gt - 1, '#3f7d3a');
    if (hash(x, 32) < .08) { px(g, x, gt - 1, '#5fa04a'); px(g, x, gt - 2, '#5fa04a'); }
    for (let y = gt; y < SPH; y++) {
      const d = y - gt;
      const col = d === 0 ? (hash(x, 33) < .3 ? '#5fa04a' : '#3f7d3a') : d < 3 ? '#24502c' : ['#16301f', '#10231a', '#0a150f'][Math.max(0, Math.min(2, Math.floor(d / 8 + (bayer(x, y) - .5) * .8)))];
      px(g, x, y, col);
    }
  }
  // pines: back row darker, front row with a warm rim toward the fire
  const pine = (bx, h, dark) => {
    const gy = groundTop(bx);
    for (let y = 0; y < 4; y++) { px(g, bx, gy - 1 - y, '#2a1a10'); px(g, bx + 1, gy - 1 - y, '#1a100a'); }
    const tiers = Math.floor(h / 7);
    for (let k = 0; k < tiers; k++) {
      const ty = gy - 4 - k * 6, w = Math.max(2, Math.floor((tiers - k) * 2.2 + 2));
      for (let r = 0; r < 8; r++) {
        const half = Math.floor(w * (r / 8)), yy = ty - 8 + r;
        for (let x = -half; x <= half + 1; x++) {
          let col = dark ? '#0a1d1b' : '#0e2a26';
          if (x === -half) col = dark ? '#0f2a26' : '#1a4a40';
          if (!dark && x === half + 1 && bx < SPW / 2) col = '#4a2a18';           // warm rim, fire side
          if (!dark && x === -half && bx > SPW / 2) col = '#4a2a18';
          px(g, bx + x, yy, col);
        }
      }
    }
    for (let y = 0; y < 3; y++) px(g, bx, gy - 4 - tiers * 6 - 8 - y, dark ? '#0f2a26' : '#1a4a40');
  };
  [[.03, 40, 1], [.1, 34, 1], [.9, 38, 1], [.97, 30, 1]].forEach(([p, h, d]) => pine(Math.floor(SPW * p), h, d));
  [[.06, 30, 0], [.15, 44, 0], [.85, 42, 0], [.94, 28, 0]].forEach(([p, h, d]) => pine(Math.floor(SPW * p), h, d));
  // wooden observation tower (left)
  const tx = Math.floor(SPW * .24), tg = groundTop(tx), th = 56;
  const W3 = WOOD.map(c => `rgb(${c.join(',')})`);
  for (let y = 0; y < th; y++) { px(g, tx, tg - 1 - y, W3[3]); px(g, tx + 1, tg - 1 - y, W3[1]); px(g, tx + 12, tg - 1 - y, W3[3]); px(g, tx + 13, tg - 1 - y, W3[1]); }
  for (let k = 0; k < 4; k++) for (let i = 0; i < 11; i++) { const y0 = tg - 6 - k * 12; px(g, tx + 2 + i, y0 - i, W3[4]); px(g, tx + 2 + i, y0 - 10 + i, W3[2]); }
  for (let x = -2; x < 16; x++) { px(g, tx + x, tg - th - 1, W3[6]); px(g, tx + x, tg - th, W3[3]); px(g, tx + x, tg - th + 1, W3[1]); }
  for (let r = 0; r < 7; r++) for (let x = -2 + r; x < 16 - r; x++) px(g, tx + x, tg - th - 8 + r, r === 6 ? W3[2] : r % 2 ? W3[4] : W3[5]);
  for (let y = 0; y < th; y += 3) { px(g, tx + 16, tg - th + y, '#a08a5a'); px(g, tx + 18, tg - th + y, '#a08a5a'); if (y % 6 === 0) { px(g, tx + 17, tg - th + y, '#7a6440'); } }
  // launch pad + small rocket (right)
  const lx = Math.floor(SPW * .74), lg = groundTop(lx);
  for (let x = -4; x < 22; x++) { px(g, lx + x, lg - 6, W3[5]); px(g, lx + x, lg - 5, W3[2]); }
  for (const lxx of [-3, 8, 20]) for (let y = 0; y < 5; y++) px(g, lx + lxx, lg - 1 - y, W3[3]);
  const rx = lx + 6;
  for (let y = 0; y < 18; y++) for (let x = 0; x < 5; x++) px(g, rx + x, lg - 7 - y, x === 0 ? '#e9e3d2' : x === 4 ? '#8a8272' : '#c9c2b0');
  for (let r = 0; r < 4; r++) for (let x = r; x < 5 - r; x++) px(g, rx + x, lg - 25 - r, r === 3 ? '#e8a33d' : '#d15a3a');
  px(g, rx + 2, lg - 19, '#6fd3ff'); px(g, rx + 2, lg - 18, '#2a6b8a');
  for (let y = 0; y < 4; y++) { px(g, rx - 1, lg - 7 - y, '#d15a3a'); px(g, rx + 5, lg - 7 - y, '#8a3322'); }
  for (let y = 0; y < 20; y++) px(g, rx + 9, lg - 7 - y, W3[2]);                 // gantry
  for (let y = 0; y < 20; y += 4) { px(g, rx + 7, lg - 7 - y, W3[3]); px(g, rx + 8, lg - 7 - y, W3[3]); }
  spaceStatic = c;
  gasSprite = buildPlanet(28, (x, y) => ['#c9824a', '#e0a86a', '#9c5a36', '#d9b58a', '#b0703f', '#e8c9a0'][((Math.floor((y + 28) / 6 + Math.sin(x * .2) * .6) % 6) + 6) % 6]
    .replace(/.*/, m => (Math.hypot(x - 8, (y - 5) * 1.8) < 5 ? '#7a3322' : m)));
  // ringed ocean world: deep teal with drifting cloud swirls; the ring is drawn live (behind + in front)
  oceanSprite = buildPlanet(16, (x, y) => (vnoise(x / 4 + 20, y / 2.5) > .62 ? '#d8f4f0' : vnoise(x / 6, y / 5 + 9) > .5 ? '#2f8f96' : '#1d6a78'));
  // twin sand worlds and a small rusty one
  twinA = buildPlanet(6, (x, y) => (hash(x + 40, y) < .15 ? '#b8864a' : '#e0b070'));
  twinB = buildPlanet(5, (x, y) => (hash(x + 70, y) < .15 ? '#a8703a' : '#d49a58'));
  redSprite = buildPlanet(7, (x, y) => (Math.hypot(x + 2, y - 1) < 2 ? '#7a2e1c' : hash(x, y + 5) < .12 ? '#a8442a' : '#c65a36'));
  moonSprite = buildPlanet(8, (x, y) => (Math.hypot(x + 3, y - 2) < 2 || Math.hypot(x - 3, y + 3) < 1.5 || Math.hypot(x - 1, y - 5) < 1.2 ? '#5c5d6a' : '#9a9bab'));
}

/* sun, with the 22-minute supernova loop */
const LOOP = 22 * 60;
let loopStart = null;
window.supernova = () => { loopStart = performance.now() / 1000 - (LOOP - 20); };   // preview: runs the last 20s
function sunState(e) {
  const base = 9;
  if (e < LOOP - 75) return { r: base, core: '#fff3c4', mid: '#ffc857', edge: '#ff9a3c' };
  if (e < LOOP - 5) { const k = (e - (LOOP - 75)) / 70; return { r: base * (1 + k * 1.3), core: mixHex('#fff3c4', '#ffb070', k), mid: mixHex('#ffc857', '#ff6a3a', k), edge: mixHex('#ff9a3c', '#c2331f', k) }; }
  if (e < LOOP - 2) { const k = (e - (LOOP - 5)) / 3; return { r: Math.max(1, base * 2.3 * (1 - k)), core: '#ffffff', mid: '#fff0e0', edge: '#ffb070' }; }
  return { r: 1, core: '#ffffff', mid: '#dff0ff', edge: '#dff0ff' };
}
function drawSun(g, cx, cy, s, t) {
  const R = s.r, C = R * 1.9;
  for (let y = -Math.ceil(C); y <= C; y++) for (let x = -Math.ceil(C); x <= C; x++) {
    const d = Math.hypot(x, y);
    if (d <= R) px(g, cx + x, cy + y, d < R * .45 ? s.core : d < R * .8 ? s.mid : s.edge);
    else if (d < C && bayer(cx + x, cy + y) < (1 - (d - R) / (C - R)) * (.45 + .08 * Math.sin(t * 2))) px(g, cx + x, cy + y, s.edge + '66');
  }
}

/* campfire: flames, embers, warm light */
const embers = Array.from({ length: 16 }, (_, i) => ({ x: 0, y: -99, vy: 0, life: 0, seed: i }));
function drawFire(g, t) {
  const fx = FIRE.x, fy = FIRE.y;
  FIRE.pulse = (FIRE.pulse || 0) * .9;
  FIRE.level = reduce ? .9 : .85 + .15 * vnoise(t * 3, 0) + FIRE.pulse * .25;
  for (let y = -26; y <= 8; y++) for (let x = -40; x <= 40; x++) {             // warm pool of light
    const d = Math.hypot(x, y * 1.6);
    const k = Math.max(0, 1 - d / 42) * FIRE.level;
    if (k > 0 && bayer(fx + x, fy + y) < k * .5) px(g, fx + x, fy + y, 'rgba(255,150,70,.16)');
  }
  [[-6, 0], [-4, 1], [4, 1], [6, 0], [-5, -1], [5, -1]].forEach(([x, y]) => { px(g, fx + x, fy + y, '#6a6a74'); px(g, fx + x, fy + y - 1, '#9a9aa6'); });
  for (let i = -4; i <= 4; i++) { px(g, fx + i, fy - Math.floor((i + 4) / 3), '#5a3620'); px(g, fx + i, fy - Math.floor((4 - i) / 3), '#3f2817'); }
  const tq = reduce ? 0 : Math.floor(t * 14);
  for (let c = -4; c <= 4; c++) {
    const h = Math.round((7.5 - Math.abs(c) * 1.3) * (.7 + .35 * vnoise(c * .9, reduce ? 0 : t * 6)));
    for (let dy = 0; dy < h; dy++) {
      if (dy > h - 3 && hash(c * 7 + dy, tq) < .25) continue;
      const k = dy / h;
      px(g, fx + c, fy - 3 - dy, Math.abs(c) < 2 && k < .45 ? '#fff1a8' : k < .7 ? '#ffb238' : '#e2552a');
    }
  }
  // marshmallow on a stick, leaning in from the left
  for (let i = 0; i < 11; i++) px(g, fx - 13 + i, fy - 2 - Math.floor(i * .7), '#6e4829');
  px(g, fx - 2, fy - 10, '#f4efe6'); px(g, fx - 1, fy - 10, '#f4efe6'); px(g, fx - 2, fy - 9, '#c98a4a'); px(g, fx - 1, fy - 9, '#e6d3b0');
  if (!reduce) embers.forEach(e => {
    if (e.life <= 0) { e.x = fx + (hash(e.seed, t) - .5) * 6; e.y = fy - 6; e.vy = .25 + hash(e.seed, t + 1) * .35; e.life = 40 + hash(e.seed, t + 2) * 50; }
    e.y -= e.vy; e.x += Math.sin((e.y + e.seed * 10) * .15) * .25; e.life--;
    px(g, Math.round(e.x), Math.round(e.y), e.life > 30 ? '#ffb238' : '#e2552a99');
  });
}

/* ship-log trail between monitors, in career order: EY -> Hanu -> Insight */
function monitorPoint(id) {
  const l = lcds.find(q => q.j.id === id), r = l.cv.getBoundingClientRect(), s = scene.getBoundingClientRect();
  return [Math.round((r.left + r.width / 2 - s.left) / SPS), Math.round((r.top - s.top) / SPS) - 10];
}
function drawTrail(g, t) {
  const pts = ['ey', 'hanu', 'insight'].map(monitorPoint), years = ['2022', '2023'];
  for (let i = 1; i < pts.length; i++) {
    const [a, b] = [pts[i - 1], pts[i]], n = Math.max(Math.abs(b[0] - a[0]), Math.abs(b[1] - a[1]));
    for (let k = 0; k <= n; k++) {
      if (((k - (reduce ? 0 : t * 10)) % 7 + 7) % 7 < 3.5) px(g, Math.round(a[0] + (b[0] - a[0]) * k / n), Math.round(a[1] + (b[1] - a[1]) * k / n), AMBER);
    }
    const at = i === 1 ? .42 : .5, mx = Math.round(a[0] + (b[0] - a[0]) * at), my = Math.round(a[1] + (b[1] - a[1]) * at);
    g.font = '8px "Silkscreen"'; g.textBaseline = 'middle'; g.textAlign = 'center';
    const w = g.measureText(years[i - 1]).width + 6;
    g.fillStyle = '#0b0a08'; g.fillRect(mx - w / 2, my - 5, w, 10);
    g.fillStyle = AMBER; g.fillRect(mx - w / 2, my - 5, w, 1); g.fillRect(mx - w / 2, my + 4, w, 1);
    g.fillText(years[i - 1], mx, my);
  }
}

/* Shooting stars: a thin streak with a bright head and a fading tail, gone in under a second.
   Every 6-14s on their own, or one per bar while the campfire music plays. */
const meteors = [];
let nextMeteor = 4;
function spawnMeteor(t) {
  if (reduce || meteors.length >= 2) return;
  const x = SPW * (.1 + Math.random() * .8), y = SPH * (.03 + Math.random() * .12), dir = Math.random() < .5 ? -1 : 1;
  meteors.push({ x, y, vx: dir * (70 + Math.random() * 50), vy: 25 + Math.random() * 20, t0: t, life: .7 + Math.random() * .4 });
}
function drawMeteors(g, t) {
  if (!music.on && t >= nextMeteor) { spawnMeteor(t); nextMeteor = t + 6 + Math.random() * 8; }
  for (let i = meteors.length - 1; i >= 0; i--) {
    const m = meteors[i], a = t - m.t0;
    if (a >= m.life) { meteors.splice(i, 1); continue; }
    const fade = Math.min(1, a / .08, (m.life - a) / .25), hx = m.x + m.vx * a, hy = m.y + m.vy * a;
    for (let k = 0; k < 14; k++) {                                   // tail: back along the path, dimming
      const f = k / 14;
      g.fillStyle = `rgba(${k < 3 ? '255,250,235' : '170,210,255'},${((1 - f) * .9 * fade).toFixed(3)})`;
      g.fillRect(Math.round(hx - m.vx * .012 * k), Math.round(hy - m.vy * .012 * k), 1, 1);
    }
    g.fillStyle = `rgba(255,255,255,${fade.toFixed(3)})`; g.fillRect(Math.round(hx), Math.round(hy), 1, 1);
  }
}

/* Campfire music: opt-in, generated in the browser (an original banjo-ish pluck over a soft bass,
   G - Em - C - D at 84 bpm). Never autoplays. Each bar launches a shooting star; beats pulse fire + stars. */
const music = { on: false, ctx: null, timer: 0, step: 0, next: 0 };
const CHORDS = [[55, 59, 62, 67], [52, 55, 59, 64], [48, 52, 55, 60], [50, 54, 57, 62]];   // MIDI: G, Em, C, D
const PATTERN = [0, 2, 1, 3, 2, 1, 3, 2];
const midi = m => 440 * Math.pow(2, (m - 69) / 12);
function pluck(ctx, out, freq, time, vel) {
  const o1 = ctx.createOscillator(), o2 = ctx.createOscillator(), g = ctx.createGain(), f = ctx.createBiquadFilter();
  o1.type = 'triangle'; o2.type = 'square'; o1.frequency.value = freq; o2.frequency.value = freq * 2.005;
  f.type = 'lowpass'; f.frequency.setValueAtTime(3200, time); f.frequency.exponentialRampToValueAtTime(700, time + .35);
  const g2 = ctx.createGain(); g2.gain.value = .18;
  o1.connect(g); o2.connect(g2); g2.connect(g); g.connect(f); f.connect(out);
  g.gain.setValueAtTime(.0001, time); g.gain.exponentialRampToValueAtTime(vel, time + .006); g.gain.exponentialRampToValueAtTime(.0001, time + .7);
  o1.start(time); o2.start(time); o1.stop(time + .75); o2.stop(time + .75);
}
function bass(ctx, out, freq, time) {
  const o = ctx.createOscillator(), g = ctx.createGain(); o.type = 'sine'; o.frequency.value = freq;
  o.connect(g); g.connect(out);
  g.gain.setValueAtTime(.0001, time); g.gain.exponentialRampToValueAtTime(.35, time + .02); g.gain.exponentialRampToValueAtTime(.0001, time + 1.1);
  o.start(time); o.stop(time + 1.2);
}
function schedule() {
  const { ctx } = music, eighth = 60 / 84 / 2;
  while (music.next < ctx.currentTime + .12) {
    const bar = Math.floor(music.step / 8) % 4, i = music.step % 8, chord = CHORDS[bar];
    pluck(ctx, music.out, midi(chord[PATTERN[i]] + 12), music.next, i % 2 ? .22 : .32);
    if (i === 0 || i === 4) bass(ctx, music.out, midi(chord[0] - 12), music.next);
    const when = (music.next - ctx.currentTime) * 1000;
    if (i % 2 === 0) setTimeout(() => { FIRE.pulse = 1; }, when);
    if (i === 0) setTimeout(() => spawnMeteor(performance.now() / 1000), when);
    music.next += eighth; music.step++;
  }
}
function toggleMusic() {
  const btn = $id('music');
  if (music.on) {
    music.on = false; clearInterval(music.timer); music.ctx?.close(); music.ctx = null;
  } else {
    const Ctx = window.AudioContext || window.webkitAudioContext; if (!Ctx) return;
    music.ctx = new Ctx(); music.out = music.ctx.createGain(); music.out.gain.value = .5; music.out.connect(music.ctx.destination);
    music.on = true; music.step = 0; music.next = music.ctx.currentTime + .05; schedule(); music.timer = setInterval(schedule, 25);
  }
  btn.setAttribute('aria-pressed', String(music.on)); btn.textContent = music.on ? '♪ Campfire: on' : '♪ Campfire';
}
$id('music').addEventListener('click', toggleMusic);

function drawSpace(t) {
  if (!spaceStatic) return;
  if (loopStart === null) loopStart = t;
  let e = t - loopStart;
  if (!reduce && e > LOOP + 8) { loopStart = t; e = 0; }
  const g = xg;
  g.drawImage(spaceStatic, 0, 0);
  // The planet turns: we stay put, the sky slides past and bends with the horizon's curve.
  const BW = spaceBand.width, off = reduce ? 0 : (t * 3.5) % BW;
  const drop = x => Math.round(16 * ((x - SPW / 2) / (SPW / 2)) ** 2);
  const toView = bx => { let x = bx - off; x = ((x % BW) + BW) % BW; return x; };
  for (let x = 0; x < SPW; x++) g.drawImage(spaceBand, Math.floor((x + off) % BW), 0, 1, SPH, x, drop(x), 1, SPH);
  const beat = FIRE.pulse || 0;
  if (!reduce) twinkles.forEach(s2 => {
    const x = toView(s2.x);
    if (x < SPW && Math.sin(t * s2.sp + s2.ph) > .6 - beat * .5) px(g, Math.round(x), s2.y + drop(x), '#ffffff');
  });
  // bodies ride the same sky
  const body = (sprite, bx, y) => { const x = toView(bx); if (x < SPW + sprite.width) g.drawImage(sprite, Math.round(x - sprite.width / 2), y + drop(x)); };
  body(gasSprite, BW * .18, Math.round(SPH * .8));                           // huge, rising over the horizon
  // ringed ocean world: back half of the ring, planet, front half
  {
    const x = toView(BW * .4), cx = Math.round(x), cy = Math.round(SPH * .07) + drop(x);
    if (x < SPW + 40) {
      const ring = front => { for (let a = 0; a < 120; a++) { const an = a / 120 * Math.PI * 2, rx = Math.cos(an) * 28, ry = Math.sin(an) * 7, tilt = rx * .22;
        if ((ry > 0) === front) px(g, cx + Math.round(rx), cy + Math.round(ry + tilt), a % 3 ? '#c9b8e8' : '#8a7ab8'); } };
      ring(false); g.drawImage(oceanSprite, cx - 16, cy - 16); ring(true);
    }
  }
  // twin worlds circling each other
  {
    const x = toView(BW * .74), ang = t * .6, cy = Math.round(SPH * .74) + drop(x);
    if (x < SPW + 30) {
      const ax = Math.round(x + Math.cos(ang) * 9), ay = Math.round(cy + Math.sin(ang) * 3), bx = Math.round(x - Math.cos(ang) * 9), by = Math.round(cy - Math.sin(ang) * 3);
      const order = Math.sin(ang) > 0 ? [[twinB, bx, by, 5], [twinA, ax, ay, 6]] : [[twinA, ax, ay, 6], [twinB, bx, by, 5]];
      order.forEach(([spr, px2, py2, r]) => g.drawImage(spr, px2 - r, py2 - r));
    }
  }
  body(redSprite, BW * .93, Math.round(SPH * .05));
  body(moonSprite, BW * .6, Math.round(SPH * .04 + Math.sin(t * .05) * 3));
  const sunX = Math.round(toView(BW * .9)), sunY = Math.floor(SPH * .05 + 10) + drop(sunX);
  drawSun(g, sunX, sunY, reduce ? sunState(0) : sunState(e), t);
  // comet: its own slow pass every 80s
  const ck = reduce ? .35 : (t % 80) / 80, cx = Math.round(-30 + (SPW + 60) * ck), cy = Math.round(SPH * .34 - ck * SPH * .18);
  for (let i = 1; i < 24; i++) if (bayer(cx - i, cy + i * .3) < (1 - i / 24) * .9) px(g, cx - i, Math.round(cy + i * .35), i < 6 ? '#e8fbff' : '#7fd8e8');
  px(g, cx, cy, '#ffffff'); px(g, cx + 1, cy, '#ffffff'); px(g, cx, cy - 1, '#cfefff');
  drawMeteors(g, t);
  g.drawImage(spaceGround, 0, 0);
  // campfire, centre of the ground
  FIRE.x = Math.round(SPW / 2); FIRE.y = groundTop(FIRE.x) - 1;
  drawFire(g, t);
  drawTrail(g, t);
  // supernova shockwave, then quiet reset
  if (!reduce && e > LOOP - 2) {
    const k = (e - (LOOP - 2)) / 8, R = k * Math.hypot(SPW, SPH) * 1.2;
    if (e < LOOP + 6) {
      g.fillStyle = `rgba(223,240,255,${Math.min(.85, k * 1.1).toFixed(3)})`;
      g.beginPath(); g.arc(sunX, sunY, R, 0, 7); g.fill();
      g.strokeStyle = '#cfe8ff'; g.lineWidth = 3; g.beginPath(); g.arc(sunX, sunY, R, 0, 7); g.stroke();
    } else {
      g.fillStyle = `rgba(4,6,12,${(1 - (e - (LOOP + 6)) / 2).toFixed(3)})`; g.fillRect(0, 0, SPW, SPH);
    }
  }
  const clock = $id('loopClock');
  if (clock) { const r = Math.max(0, Math.floor(LOOP - e)); clock.textContent = `${String(Math.floor(r / 60)).padStart(2, '0')}:${String(r % 60).padStart(2, '0')}`; }
}

/* Signalscope: hovering a monitor tunes into its frequency */
const SCOPE_HZ = { insight: 1.7, hanu: 2.6, ey: 3.9 };
function drawScopes(t) {
  lcds.forEach(l => {
    if (!l.tuned) return;
    const g = l.scopeG, W = 84, H = 14;
    g.fillStyle = '#07100f'; g.fillRect(0, 0, W, H);
    g.fillStyle = AMBER; g.fillRect(0, 0, W, 1); g.fillRect(0, H - 1, W, 1); g.fillRect(0, 0, 1, H); g.fillRect(W - 1, 0, 1, H);
    g.font = '8px "Silkscreen"'; g.textBaseline = 'middle'; g.fillStyle = AMBER; g.fillText(l.j.mono, 3, H / 2 + 1);
    for (let x = 18; x < W - 3; x++) {
      const v = Math.sin((x * .35 + t * 6) * SCOPE_HZ[l.j.id] * .4) * 3.2 * (0.7 + .3 * Math.sin(t * 3 + x * .1)) + (hash(x, Math.floor(t * 20)) - .5);
      px(g, x, Math.round(H / 2 + v), '#7fe0d0');
    }
  });
}

/* ---------------- loop ---------------- */
// Draw only the sections on screen; the rest of the page costs nothing while scrolled away.
const vis = { hero: true, scene: true };
const io = new IntersectionObserver(entries => entries.forEach(e => { vis[e.target.classList.contains('hero') ? 'hero' : 'scene'] = e.isIntersecting; }), { rootMargin: '120px' });
io.observe(root.querySelector('.hero')); io.observe(root.querySelector('.work'));
function frame(ms) {
  if (stopped) return;
  const t = ms / 1000;
  if (vis.hero) { drawSky(t); drawTVs(t); }
  if (vis.scene) { drawLCDs(t); drawSpace(t); drawScopes(t); }
  if (!reduce) (raf = requestAnimationFrame(frame));
}
document.fonts.ready.then(() => {
  if (stopped) return;
  renderNow(); attractAt = performance.now() / 1000; sizeTVs(); on(window, 'resize', sizeTVs);
  buildSpace(); ro = new ResizeObserver(() => buildSpace()); ro.observe(scene);
  (raf = requestAnimationFrame(frame));
  if (reduce) setTimeout(() => (raf = requestAnimationFrame(frame)), 50);
});

return () => {
  stopped = true; cancelAnimationFrame(raf); offs.forEach(f => f()); ro?.disconnect(); io.disconnect();
  if (music.on) { clearInterval(music.timer); music.ctx?.close(); }
  Object.values(clips).forEach(c => { c.video.pause(); c.video.removeAttribute('src'); c.video.load(); });
  delete window.supernova; delete window.lightning; delete window.planes;
  $id('stage').querySelectorAll('.tv').forEach(n => n.remove()); $id('lcds').innerHTML = ''; $id('now').innerHTML = ''; $id('jobs').innerHTML = '';
};
}
