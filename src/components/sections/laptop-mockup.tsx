// Laptop running a vector design app with the Citrix identity on its
// artboards. Illustrator-style layout (tools, artboards, layers, swatches)
// without any third-party product logos.

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
};

function Mark({ x, y, r, a = C.blue, b = C.cyan }: { x: number; y: number; r: number; a?: string; b?: string }) {
  return (
    <g transform={`translate(${x - r} ${y - r}) scale(${r / 50})`}>
      <path d="M50 4 A46 46 0 0 0 50 96 A23 23 0 0 1 50 50 A23 23 0 0 0 50 4 Z" fill={a} />
      <path d="M50 96 A46 46 0 0 0 50 4 A23 23 0 0 1 50 50 A23 23 0 0 0 50 96 Z" fill={b} />
    </g>
  );
}

function Handles({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  const pts = [
    [x, y], [x + w / 2, y], [x + w, y],
    [x, y + h / 2], [x + w, y + h / 2],
    [x, y + h], [x + w / 2, y + h], [x + w, y + h],
  ];
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill="none" stroke={C.select} strokeWidth="0.8" />
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

const TOOLS = [
  // selection arrow
  <path key="sel" d="M-3 -4 L3 1 L0 1.5 L1.5 4.5 L0.5 5 L-1 2 L-3 4 Z" fill={C.text} />,
  // direct selection
  <path key="dsel" d="M-3 -4 L3 1 L0 1.5 L1.5 4.5 L0.5 5 L-1 2 L-3 4 Z" fill="none" stroke={C.text} strokeWidth="0.8" />,
  // pen
  <path key="pen" d="M0 -4 L3 1 L0 4 L-3 1 Z M0 -1 V2" fill="none" stroke={C.text} strokeWidth="0.9" />,
  // type
  <text key="type" x="0" y="3.5" style={{ fontSize: 10 }} fontWeight="700" fill={C.text} textAnchor="middle">T</text>,
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
  <g key="zoom"><circle r="2.6" cx="-0.5" cy="-0.5" fill="none" stroke={C.text} strokeWidth="0.9" /><path d="M1.5 1.5 L3.5 3.5" stroke={C.text} strokeWidth="1" /></g>,
];

const SWATCHES = [C.blue, C.cyan, C.teal, C.ice, C.ink, C.white, "#F2B33D", "#E2574C"];

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

  return (
    <svg viewBox="0 0 640 410" width="100%" role="img" aria-label="Laptop showing the Citrix Solutions brand being designed" style={{ display: "block", fontFamily: "system-ui, sans-serif", overflow: "visible" }}>
      <defs>
        <linearGradient id="lm-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E6EDF2" />
          <stop offset="1" stopColor="#AEB9C2" />
        </linearGradient>
        <linearGradient id="lm-glare" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={C.white} stopOpacity="0.14" />
          <stop offset="0.45" stopColor={C.white} stopOpacity="0" />
        </linearGradient>
        <clipPath id="lm-screen">
          <rect x={sx} y={sy} width={sw} height={sh} />
        </clipPath>
      </defs>

      {/* shadow */}
      <ellipse cx="320" cy="400" rx="300" ry="10" fill={C.ink} opacity="0.35" />

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
        <rect x={sx + 4} y={sy + 46 + 10 * 17} width="9" height="9" fill={C.blue} />
        <rect x={sx + 9} y={sy + 51 + 10 * 17} width="9" height="9" fill="none" stroke={C.cyan} strokeWidth="2" />

        {/* canvas */}
        <rect x={cx} y={cy} width={cw} height={ch} fill={C.canvas} />

        {/* artboard 1: logo */}
        <Label x={cx + 14} y={cy + 11}>01 · Primary logo</Label>
        <rect x={cx + 14} y={cy + 14} width="226" height="138" fill={C.white} />
        <image href="/brand/citrix-logo.png" x={cx + 34} y={cy + 52} width="186" height="58.8" preserveAspectRatio="xMidYMid meet" />
        <Handles x={cx + 32} y={cy + 50} w={190} h={62.8} />

        {/* artboard 2: business card */}
        <Label x={cx + 252} y={cy + 11}>02 · Business card</Label>
        <rect x={cx + 252} y={cy + 14} width="124" height="72" rx="1" fill={C.blue} />
        <Mark x={cx + 314} y={cy + 42} r={15} a={C.white} b={C.ice} />
        <text x={cx + 314} y={cy + 72} style={{ fontSize: 7 }} fontWeight="700" fill={C.white} textAnchor="middle">
          CITRIX SOLUTIONS
        </text>

        {/* artboard 3: social post */}
        <Label x={cx + 252} y={cy + 97}>03 · Social post</Label>
        <rect x={cx + 252} y={cy + 100} width="124" height="52" fill={C.cyan} />
        <circle cx={cx + 350} cy={cy + 126} r="26" fill={C.white} opacity="0.18" />
        <text x={cx + 262} y={cy + 119} style={{ fontSize: 8.5 }} fontWeight="700" fill={C.white}>
          Print · Brand
        </text>
        <text x={cx + 262} y={cy + 130} style={{ fontSize: 8.5 }} fontWeight="700" fill={C.white}>
          Web · Events
        </text>
        <rect x={cx + 262} y={cy + 137} width="36" height="8" rx="4" fill={C.white} />
        <Mark x={cx + 352} y={cy + 126} r={11} a={C.white} b={C.ice} />

        {/* artboard 4: colour palette */}
        <Label x={cx + 14} y={cy + 165}>04 · Colour & type</Label>
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

        {/* pen path being drawn, with anchor points */}
        <path d={`M${cx + 250} ${cy + 262} C ${cx + 290} ${cy + 232}, ${cx + 320} ${cy + 290}, ${cx + 360} ${cy + 256}`} fill="none" stroke={C.select} strokeWidth="1" />
        <line x1={cx + 340} y1={cy + 240} x2={cx + 380} y2={cy + 272} stroke={C.select} strokeWidth="0.6" />
        <circle cx={cx + 340} cy={cy + 240} r="1.8" fill={C.select} />
        <circle cx={cx + 380} cy={cy + 272} r="1.8" fill={C.select} />
        {[
          [cx + 250, cy + 262],
          [cx + 360, cy + 256],
        ].map(([x, y]) => (
          <rect key={x} x={x - 2} y={y - 2} width="4" height="4" fill={C.white} stroke={C.select} strokeWidth="0.8" />
        ))}
        {/* pen cursor */}
        <g transform={`translate(${cx + 384} ${cy + 276})`}>
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
        <rect x={px + 26} y={cy + 20} width="9" height="9" fill={C.blue} stroke={C.text} strokeWidth="0.5" />
        <text x={px + 40} y={cy + 26.5} style={{ fontSize: 5.5 }} fill={C.text}>
          #004E9B
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
        {["Logo mark", "Wordmark", "Tagline", "Business card", "Social post", "Palette"].map((l, i) => (
          <g key={l}>
            <rect x={px + 4} y={cy + 68 + i * 14} width="104" height="12" fill={i === 0 ? "#3F5B7A" : "transparent"} />
            <rect x={px + 8} y={cy + 71 + i * 14} width="3" height="6" fill={[C.cyan, C.blue, C.teal, "#F2B33D", C.ice, "#E2574C"][i]} />
            <text x={px + 16} y={cy + 76.5 + i * 14} style={{ fontSize: 5.8 }} fill={i === 0 ? C.white : C.text}>
              {l}
            </text>
          </g>
        ))}
        <line x1={px} y1={cy + 156} x2={px + 112} y2={cy + 156} stroke={C.line} />

        <text x={px + 8} y={cy + 168} style={{ fontSize: 6 }} fontWeight="700" fill={C.white}>
          Swatches
        </text>
        {SWATCHES.map((s, i) => (
          <rect key={s} x={px + 8 + (i % 4) * 24} y={cy + 174 + Math.floor(i / 4) * 24} width="20" height="20" rx="2" fill={s} stroke={C.line} strokeWidth="0.6" />
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

      {/* base */}
      <path d="M8 370 H632 L640 388 Q640 396 630 396 H10 Q0 396 0 388 Z" fill="url(#lm-body)" />
      <path d="M270 370 H370 Q370 378 360 378 H280 Q270 378 270 370 Z" fill="#9AA6B0" />
      <rect x="0" y="388" width="640" height="2" fill={C.white} opacity="0.4" />
    </svg>
  );
}
