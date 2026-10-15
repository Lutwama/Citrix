// Laptop running a vector design app with the Citrix identity on its
// artboards. Illustrator-style layout (tools, artboards, layers, swatches)
// without any third-party product logos. Animated with CSS; motion is
// switched off for visitors who prefer reduced motion.

const C = {
  blue: "#004E9B",
  cyan: "#0091B9",
  teal: "#115B70",
  ice: "#BAE4F0",
  ink: "#0B2540",
  white: "#FFFFFF",
  // app chrome
  bar: "#2B2B2B",
  panel: "#323232",
  canvas: "#535353",
  line: "#444444",
  text: "#BDBDBD",
  muted: "#8A8A8A",
  select: "#2D8CFF",
  // hardware
  key: "#2A2E33",
};

const LOGO = "/brand/citrix-logo.png";
const LOGO_RATIO = 620 / 196;

const CSS = `
.lm-board { opacity: 0; animation: lm-in .9s cubic-bezier(.22,1,.36,1) forwards; transform-box: fill-box; }
@keyframes lm-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
.lm-ants { stroke-dasharray: 4 3; animation: lm-ants 1s linear infinite; }
@keyframes lm-ants { to { stroke-dashoffset: -14; } }
.lm-pen { stroke-dasharray: 100; stroke-dashoffset: 100; animation: lm-draw 5s ease-in-out infinite; }
@keyframes lm-draw { 0%, 5% { stroke-dashoffset: 100; } 60%, 90% { stroke-dashoffset: 0; } 100% { stroke-dashoffset: 0; opacity: 0; } }
.lm-end { opacity: 0; animation: lm-end 5s ease-in-out infinite; }
@keyframes lm-end { 0%, 58% { opacity: 0; } 62%, 92% { opacity: 1; } 100% { opacity: 0; } }
.lm-cursor { animation: lm-cursor 5s ease-in-out infinite; }
@keyframes lm-cursor {
  0%, 5% { transform: translate(328px, 320px); opacity: 1; }
  18% { transform: translate(356px, 311px); }
  32% { transform: translate(383px, 318px); }
  46% { transform: translate(410px, 325px); }
  60%, 88% { transform: translate(438px, 314px); opacity: 1; }
  96% { transform: translate(438px, 314px); opacity: 0; }
  100% { transform: translate(328px, 320px); opacity: 0; }
}
.lm-layer { animation: lm-layer 9s steps(6) infinite; }
@keyframes lm-layer { to { transform: translateY(84px); } }
.lm-cycle { animation: lm-cycle 9s ease-in-out infinite; }
@keyframes lm-cycle { 0%, 100% { fill: #0091B9; } 33% { fill: #004E9B; } 66% { fill: #115B70; } }
.lm-shine { animation: lm-shine 4.5s ease-in-out infinite; }
@keyframes lm-shine { 0% { transform: translateX(-90px); } 45%, 100% { transform: translateX(170px); } }
.lm-key { animation: lm-type 3.6s linear infinite; }
@keyframes lm-type { 0%, 100% { fill: ${C.key}; } 4% { fill: #0091B9; } 12% { fill: ${C.key}; } }
@media (prefers-reduced-motion: reduce) {
  .lm * { animation: none !important; }
  .lm .lm-board, .lm .lm-end { opacity: 1; }
  .lm .lm-pen { stroke-dashoffset: 0; }
  .lm .lm-cursor { transform: translate(438px, 314px); }
}
`;

function Handles({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  const pts = [
    [x, y],
    [x + w / 2, y],
    [x + w, y],
    [x, y + h / 2],
    [x + w, y + h / 2],
    [x, y + h],
    [x + w / 2, y + h],
    [x + w, y + h],
  ];
  return (
    <g>
      <rect className="lm-ants" x={x} y={y} width={w} height={h} fill="none" stroke={C.select} strokeWidth="0.8" />
      {pts.map(([px, py], i) => (
        <rect key={i} x={px - 2} y={py - 2} width="4" height="4" fill={C.white} stroke={C.select} strokeWidth="0.8" />
      ))}
    </g>
  );
}

function Label({ x, y, children }: { x: number; y: number; children: string }) {
  return (
    <text x={x} y={y} style={{ fontSize: 5.5 }} fill={C.text}>
      {children}
    </text>
  );
}

/** The official logo artwork; `white` recolours it for dark backgrounds. */
function Logo({ x, y, width, white = false }: { x: number; y: number; width: number; white?: boolean }) {
  return (
    <image
      href={LOGO}
      x={x}
      y={y}
      width={width}
      height={width / LOGO_RATIO}
      preserveAspectRatio="xMidYMid meet"
      filter={white ? "url(#lm-white)" : undefined}
    />
  );
}

const TOOLS = [
  // selection arrow
  <path key="sel" d="M-3 -4 L3 1 L0 1.5 L1.5 4.5 L0.5 5 L-1 2 L-3 4 Z" fill={C.text} />,
  // direct selection
  <path
    key="dsel"
    d="M-3 -4 L3 1 L0 1.5 L1.5 4.5 L0.5 5 L-1 2 L-3 4 Z"
    fill="none"
    stroke={C.text}
    strokeWidth="0.8"
  />,
  // pen
  <path key="pen" d="M0 -4 L3 1 L0 4 L-3 1 Z M0 -1 V2" fill="none" stroke={C.text} strokeWidth="0.9" />,
  // type
  <text key="type" x="0" y="3.5" style={{ fontSize: 10 }} fontWeight="700" fill={C.text} textAnchor="middle">
    T
  </text>,
  // rectangle
  <rect key="rect" x="-3.5" y="-3" width="7" height="6" fill="none" stroke={C.text} strokeWidth="0.9" />,
  // ellipse
  <circle key="ell" r="3.5" fill="none" stroke={C.text} strokeWidth="0.9" />,
  // brush
  <path key="brush" d="M-3 4 Q-1 0 3 -4" fill="none" stroke={C.text} strokeWidth="1.2" strokeLinecap="round" />,
  // eyedropper
  <path key="eye" d="M-3 4 L1 0 M0 -1 L2 -3 L3 -2 L1 0 Z" fill="none" stroke={C.text} strokeWidth="0.9" />,
  // hand
  <circle key="hand" r="3" fill={C.text} opacity="0.6" />,
  // zoom
  <g key="zoom">
    <circle r="2.6" cx="-0.5" cy="-0.5" fill="none" stroke={C.text} strokeWidth="0.9" />
    <path d="M1.5 1.5 L3.5 3.5" stroke={C.text} strokeWidth="1" />
  </g>,
];

const SWATCHES = [C.blue, C.cyan, C.teal, C.ice, C.ink, C.white, "#F2B33D", "#E2574C"];

// Keyboard deck in perspective: a trapezoid from the hinge (narrow) to the
// front edge (wide). P maps (u across, v down) in 0..1 onto the deck.
const DECK = { top: 370, bottom: 470, xlTop: 34, xlBottom: -26, xrTop: 606, xrBottom: 666 };
function P(u: number, v: number) {
  const y = DECK.top + (DECK.bottom - DECK.top) * v;
  const xl = DECK.xlTop + (DECK.xlBottom - DECK.xlTop) * v;
  const xr = DECK.xrTop + (DECK.xrBottom - DECK.xrTop) * v;
  return `${(xl + (xr - xl) * u).toFixed(1)},${y.toFixed(1)}`;
}
function quad(u0: number, v0: number, u1: number, v1: number) {
  return [P(u0, v0), P(u1, v0), P(u1, v1), P(u0, v1)].join(" ");
}

// Key widths per row, in key units; each row spans the same total width.
const ROWS = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
  [1.5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.5],
  [1.75, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2.25],
  [2.25, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2.75],
  [1.25, 1.25, 1.25, 6.25, 1.25, 1.25, 1.25, 1.25],
];
const TYPING = new Set(["1-3", "2-5", "1-7", "3-4", "2-9", "1-2", "4-3", "2-2"]);

function Keyboard() {
  const left = 0.09;
  const right = 0.91;
  const rowTop = 0.07;
  const rowH = 0.1;
  const gap = 0.018;
  let typed = 0;
  return (
    <g>
      {/* keyboard well */}
      <polygon
        points={quad(left - 0.012, rowTop - 0.025, right + 0.012, rowTop + ROWS.length * (rowH + gap))}
        fill="#C4CDD4"
      />
      {ROWS.map((row, r) => {
        const total = row.reduce((a, b) => a + b, 0);
        let u = left;
        const v0 = rowTop + r * (rowH + gap);
        return row.map((w, k) => {
          const kw = ((right - left) * w) / total;
          const id = `${r}-${k}`;
          const typing = TYPING.has(id);
          const style = typing ? { animationDelay: `${(typed++ * 0.45).toFixed(2)}s` } : undefined;
          const pts = quad(u + 0.003, v0, u + kw - 0.003, v0 + rowH);
          u += kw;
          return <polygon key={id} points={pts} fill={C.key} className={typing ? "lm-key" : undefined} style={style} />;
        });
      })}
      {/* trackpad */}
      <polygon points={quad(0.37, 0.7, 0.63, 0.93)} fill="#D3DAE0" stroke="#B9C3CB" strokeWidth="0.8" />
    </g>
  );
}

export function LaptopMockup() {
  // Screen area
  const sx = 56;
  const sy = 26;
  const sw = 528;
  const sh = 328;
  // Canvas area (between tools and panels)
  const cx = sx + 22;
  const cy = sy + 32;
  const cw = sw - 22 - 112;
  const ch = sh - 32;
  const px = cx + cw; // right panel x

  const card = { x: cx + 252, y: cy + 14, w: 124, h: 72 };
  const post = { x: cx + 252, y: cy + 100, w: 124, h: 52 };

  return (
    <svg
      className="lm"
      viewBox="-30 0 700 490"
      width="100%"
      role="img"
      aria-label="Laptop showing the Citrix Solutions brand being designed"
      style={{ display: "block", fontFamily: "system-ui, sans-serif", overflow: "visible" }}
    >
      <style>{CSS}</style>
      <defs>
        <linearGradient id="lm-deck" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E9EEF2" />
          <stop offset="1" stopColor="#C9D2D9" />
        </linearGradient>
        <linearGradient id="lm-edge" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#B4BEC6" />
          <stop offset="1" stopColor="#8E99A3" />
        </linearGradient>
        <linearGradient id="lm-glare" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={C.white} stopOpacity="0.14" />
          <stop offset="0.45" stopColor={C.white} stopOpacity="0" />
        </linearGradient>
        <linearGradient id="lm-shine-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={C.white} stopOpacity="0" />
          <stop offset="0.5" stopColor={C.white} stopOpacity="0.35" />
          <stop offset="1" stopColor={C.white} stopOpacity="0" />
        </linearGradient>
        <filter id="lm-white" colorInterpolationFilters="sRGB">
          <feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1 0" />
        </filter>
        <clipPath id="lm-screen">
          <rect x={sx} y={sy} width={sw} height={sh} />
        </clipPath>
        <clipPath id="lm-card">
          <rect x={card.x} y={card.y} width={card.w} height={card.h} rx="1" />
        </clipPath>
      </defs>

      {/* shadow */}
      <ellipse cx="320" cy="482" rx="350" ry="10" fill={C.ink} opacity="0.35" />

      {/* keyboard deck */}
      <polygon
        points={`${DECK.xlTop},${DECK.top} ${DECK.xrTop},${DECK.top} ${DECK.xrBottom},${DECK.bottom} ${DECK.xlBottom},${DECK.bottom}`}
        fill="url(#lm-deck)"
      />
      <path
        d={`M${DECK.xlBottom} ${DECK.bottom} H${DECK.xrBottom} V${DECK.bottom + 6} Q${DECK.xrBottom} ${DECK.bottom + 12} ${DECK.xrBottom - 8} ${DECK.bottom + 12} H${DECK.xlBottom + 8} Q${DECK.xlBottom} ${DECK.bottom + 12} ${DECK.xlBottom} ${DECK.bottom + 6} Z`}
        fill="url(#lm-edge)"
      />
      <path
        d={`M270 ${DECK.bottom} H370 Q370 ${DECK.bottom + 6} 362 ${DECK.bottom + 6} H278 Q270 ${DECK.bottom + 6} 270 ${DECK.bottom} Z`}
        fill="#9AA6B0"
      />
      <Keyboard />
      {/* hinge */}
      <rect x="30" y="366" width="580" height="7" rx="3" fill="#8E99A3" />

      {/* lid */}
      <rect x="40" y="10" width="560" height="360" rx="14" fill="#1A1D21" />
      <rect x="44" y="14" width="552" height="352" rx="11" fill="#0E1013" />
      <circle cx="320" cy="20" r="2" fill="#2E3238" />

      <g clipPath="url(#lm-screen)">
        {/* menu bar */}
        <rect x={sx} y={sy} width={sw} height="16" fill={C.bar} />
        <circle cx={sx + 9} cy={sy + 8} r="2.6" fill="#FF5F57" />
        <circle cx={sx + 17} cy={sy + 8} r="2.6" fill="#FEBC2E" />
        <circle cx={sx + 25} cy={sy + 8} r="2.6" fill="#28C840" />
        {["File", "Edit", "Object", "Type", "Select", "Effect", "View", "Window"].map((m, i) => (
          <text key={m} x={sx + 40 + i * 28} y={sy + 10.5} style={{ fontSize: 6 }} fill={C.text}>
            {m}
          </text>
        ))}
        {/* document tab + control bar */}
        <rect x={sx} y={sy + 16} width={sw} height="16" fill={C.panel} />
        <rect x={cx} y={sy + 18} width="118" height="14" fill={C.canvas} />
        <text x={cx + 6} y={sy + 27.5} style={{ fontSize: 6 }} fill={C.white}>
          citrix-brand-identity.ai @ 100%
        </text>
        <text x={cx + 128} y={sy + 27.5} style={{ fontSize: 6 }} fill={C.muted}>
          social-kit.ai
        </text>

        {/* tools */}
        <rect x={sx} y={sy + 32} width="22" height={sh - 32} fill={C.bar} />
        {TOOLS.map((t, i) => (
          <g key={i} transform={`translate(${sx + 11} ${sy + 46 + i * 17})`}>
            {i === 2 && <rect x="-8" y="-8" width="16" height="16" rx="2" fill={C.canvas} />}
            {t}
          </g>
        ))}
        <rect className="lm-cycle" x={sx + 4} y={sy + 46 + 10 * 17} width="9" height="9" fill={C.cyan} />
        <rect x={sx + 9} y={sy + 51 + 10 * 17} width="9" height="9" fill="none" stroke={C.cyan} strokeWidth="2" />

        {/* canvas */}
        <rect x={cx} y={cy} width={cw} height={ch} fill={C.canvas} />

        {/* artboard 1: logo */}
        <g className="lm-board" style={{ animationDelay: "0.2s" }}>
          <Label x={cx + 14} y={cy + 11}>
            01 · Primary logo
          </Label>
          <rect x={cx + 14} y={cy + 14} width="226" height="138" fill={C.white} />
          <Logo x={cx + 34} y={cy + 52} width={186} />
          <Handles x={cx + 32} y={cy + 50} w={190} h={62.8} />
        </g>

        {/* artboard 2: business card */}
        <g className="lm-board" style={{ animationDelay: "0.45s" }}>
          <Label x={card.x} y={cy + 11}>
            02 · Business card
          </Label>
          <rect x={card.x} y={card.y} width={card.w} height={card.h} rx="1" fill={C.blue} />
          <Logo x={card.x + 14} y={card.y + 14} width={96} white />
          <rect x={card.x + 14} y={card.y + 52} width="54" height="3" rx="1.5" fill={C.ice} opacity="0.8" />
          <rect x={card.x + 14} y={card.y + 59} width="40" height="3" rx="1.5" fill={C.ice} opacity="0.6" />
          <g clipPath="url(#lm-card)">
            <rect
              className="lm-shine"
              x={card.x - 30}
              y={card.y - 10}
              width="40"
              height={card.h + 20}
              fill="url(#lm-shine-grad)"
            />
          </g>
        </g>

        {/* artboard 3: social post */}
        <g className="lm-board" style={{ animationDelay: "0.7s" }}>
          <Label x={post.x} y={cy + 97}>
            03 · Social post
          </Label>
          <rect className="lm-cycle" x={post.x} y={post.y} width={post.w} height={post.h} fill={C.cyan} />
          <circle cx={post.x + 104} cy={post.y + 36} r="24" fill={C.white} opacity="0.14" />
          <Logo x={post.x + 8} y={post.y + 7} width={62} white />
          <text x={post.x + 8} y={post.y + 36} style={{ fontSize: 7.5 }} fontWeight="700" fill={C.white}>
            Print · Brand · Web · Events
          </text>
          <rect x={post.x + 8} y={post.y + 41} width="34" height="7" rx="3.5" fill={C.white} />
        </g>

        {/* artboard 4: colour palette */}
        <g className="lm-board" style={{ animationDelay: "0.95s" }}>
          <Label x={cx + 14} y={cy + 165}>
            04 · Colour & type
          </Label>
          <rect x={cx + 14} y={cy + 168} width="362" height="112" fill={C.white} />
          {[
            [C.blue, "#004E9B"],
            [C.cyan, "#0091B9"],
            [C.teal, "#115B70"],
            [C.ice, "#BAE4F0"],
          ].map(([fill, hex], i) => (
            <g key={hex}>
              <rect x={cx + 26 + i * 52} y={cy + 180} width="44" height="44" rx="3" fill={fill} />
              <text x={cx + 26 + i * 52} y={cy + 234} style={{ fontSize: 6 }} fill={C.ink}>
                {hex}
              </text>
            </g>
          ))}
          <text x={cx + 240} y={cy + 214} style={{ fontSize: 34 }} fontWeight="700" fill={C.blue}>
            Aa
          </text>
          <text x={cx + 290} y={cy + 196} style={{ fontSize: 7 }} fontWeight="700" fill={C.ink}>
            Exo — Headings
          </text>
          <text x={cx + 290} y={cy + 208} style={{ fontSize: 7 }} fill={C.ink}>
            Clear Sans — Body
          </text>
          <rect x={cx + 26} y={cy + 246} width="338" height="5" rx="2.5" fill={C.ice} />
          <rect x={cx + 26} y={cy + 257} width="250" height="5" rx="2.5" fill={C.ice} />
        </g>

        {/* pen path being drawn, with anchor points */}
        <path
          className="lm-pen"
          pathLength={100}
          d={`M${cx + 250} ${cy + 262} C ${cx + 290} ${cy + 232}, ${cx + 320} ${cy + 290}, ${cx + 360} ${cy + 256}`}
          fill="none"
          stroke={C.select}
          strokeWidth="1.2"
        />
        <rect x={cx + 248} y={cy + 260} width="4" height="4" fill={C.white} stroke={C.select} strokeWidth="0.8" />
        <g className="lm-end">
          <line x1={cx + 340} y1={cy + 240} x2={cx + 380} y2={cy + 272} stroke={C.select} strokeWidth="0.6" />
          <circle cx={cx + 340} cy={cy + 240} r="1.8" fill={C.select} />
          <circle cx={cx + 380} cy={cy + 272} r="1.8" fill={C.select} />
          <rect x={cx + 358} y={cy + 254} width="4" height="4" fill={C.white} stroke={C.select} strokeWidth="0.8" />
        </g>
        {/* pen cursor; its tip follows the path (positions are absolute) */}
        <g className="lm-cursor">
          <path d="M0 0 L6 12 L0 16 L-6 12 Z" fill={C.ink} stroke={C.white} strokeWidth="0.8" />
          <circle cx="0" cy="9" r="1.2" fill={C.white} />
        </g>

        {/* right panels */}
        <rect x={px} y={cy} width="112" height={ch} fill={C.panel} />
        <rect x={px} y={cy} width="112" height="14" fill={C.bar} />
        <text x={px + 8} y={cy + 9.5} style={{ fontSize: 6 }} fontWeight="700" fill={C.white}>
          Properties
        </text>
        <text x={px + 50} y={cy + 9.5} style={{ fontSize: 6 }} fill={C.muted}>
          Layers
        </text>
        <text x={px + 8} y={cy + 26} style={{ fontSize: 5.5 }} fill={C.muted}>
          Fill
        </text>
        <rect
          className="lm-cycle"
          x={px + 26}
          y={cy + 20}
          width="9"
          height="9"
          fill={C.cyan}
          stroke={C.text}
          strokeWidth="0.5"
        />
        <text x={px + 40} y={cy + 26.5} style={{ fontSize: 5.5 }} fill={C.text}>
          Brand colour
        </text>
        <text x={px + 8} y={cy + 40} style={{ fontSize: 5.5 }} fill={C.muted}>
          Stroke
        </text>
        <rect x={px + 32} y={cy + 34} width="9" height="9" fill="none" stroke={C.cyan} strokeWidth="1.6" />
        <text x={px + 46} y={cy + 40.5} style={{ fontSize: 5.5 }} fill={C.text}>
          1 pt
        </text>
        <line x1={px} y1={cy + 50} x2={px + 112} y2={cy + 50} stroke={C.line} />

        <text x={px + 8} y={cy + 62} style={{ fontSize: 6 }} fontWeight="700" fill={C.white}>
          Layers
        </text>
        <rect className="lm-layer" x={px + 4} y={cy + 68} width="104" height="12" fill="#3F5B7A" />
        {["Logo mark", "Wordmark", "Tagline", "Business card", "Social post", "Palette"].map((l, i) => (
          <g key={l}>
            <rect
              x={px + 8}
              y={cy + 71 + i * 14}
              width="3"
              height="6"
              fill={[C.cyan, C.blue, C.teal, "#F2B33D", C.ice, "#E2574C"][i]}
            />
            <text x={px + 16} y={cy + 76.5 + i * 14} style={{ fontSize: 5.8 }} fill={C.text}>
              {l}
            </text>
          </g>
        ))}
        <line x1={px} y1={cy + 156} x2={px + 112} y2={cy + 156} stroke={C.line} />

        <text x={px + 8} y={cy + 168} style={{ fontSize: 6 }} fontWeight="700" fill={C.white}>
          Swatches
        </text>
        {SWATCHES.map((s, i) => (
          <rect
            key={s}
            x={px + 8 + (i % 4) * 24}
            y={cy + 174 + Math.floor(i / 4) * 24}
            width="20"
            height="20"
            rx="2"
            fill={s}
            stroke={C.line}
            strokeWidth="0.6"
          />
        ))}
        <line x1={px} y1={cy + 228} x2={px + 112} y2={cy + 228} stroke={C.line} />
        <text x={px + 8} y={cy + 240} style={{ fontSize: 6 }} fontWeight="700" fill={C.white}>
          Artboards
        </text>
        {["01 Primary logo", "02 Business card", "03 Social post", "04 Colour & type"].map((a, i) => (
          <text key={a} x={px + 8} y={cy + 252 + i * 10} style={{ fontSize: 5.5 }} fill={C.text}>
            {a}
          </text>
        ))}

        {/* glass glare */}
        <rect x={sx} y={sy} width={sw} height={sh} fill="url(#lm-glare)" />
      </g>
    </svg>
  );
}
