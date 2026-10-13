import type { ProjectArtKind } from "@/lib/types";

// Branded illustrations used in place of photos until real project images are
// uploaded. Pure SVG in the brand palette; `label` is printed on the artwork.

const C = {
  blue: "#004E9B",
  cyan: "#0091B9",
  teal: "#115B70",
  ice: "#BAE4F0",
  mist: "#EAF6FB",
  ink: "#0B2540",
  white: "#FFFFFF",
};

const BACKGROUNDS: Record<ProjectArtKind, [string, string]> = {
  cards: [C.blue, C.cyan],
  packaging: [C.teal, C.cyan],
  web: [C.blue, C.teal],
  event: [C.ink, C.blue],
  stand: [C.cyan, C.ice],
  signage: [C.teal, C.blue],
  social: [C.cyan, C.blue],
  campaign: [C.blue, C.ice],
};

function Mark({ x, y, r, a = C.blue, b = C.cyan }: { x: number; y: number; r: number; a?: string; b?: string }) {
  // Simplified two-tone swirl, echoing the Citrix mark.
  return (
    <g transform={`translate(${x - r} ${y - r}) scale(${r / 50})`}>
      <path d="M50 4 A46 46 0 0 0 50 96 A23 23 0 0 1 50 50 A23 23 0 0 0 50 4 Z" fill={a} />
      <path d="M50 96 A46 46 0 0 0 50 4 A23 23 0 0 1 50 50 A23 23 0 0 0 50 96 Z" fill={b} />
    </g>
  );
}

function Lines({ x, y, w, n, gap = 14, color = C.ice, h = 6 }: { x: number; y: number; w: number; n: number; gap?: number; color?: string; h?: number }) {
  return (
    <g fill={color}>
      {Array.from({ length: n }, (_, i) => (
        <rect key={i} x={x} y={y + i * gap} width={i === n - 1 ? w * 0.6 : w} height={h} rx={h / 2} />
      ))}
    </g>
  );
}

function Scene({ kind, label }: { kind: ProjectArtKind; label: string }) {
  switch (kind) {
    case "cards":
      return (
        <g>
          {/* letterhead */}
          <g transform="rotate(-8 400 300)">
            <rect x="250" y="90" width="300" height="420" rx="8" fill={C.white} opacity="0.95" />
            <Mark x={300} y={140} r={22} />
            <text x="335" y="148" fontSize="20" fontWeight="700" fill={C.blue}>{label}</text>
            <Lines x={280} y={210} w={240} n={6} gap={22} />
            <rect x="250" y="470" width="300" height="40" fill={C.blue} />
          </g>
          {/* business cards */}
          <g transform="rotate(10 560 400)">
            <rect x="430" y="330" width="280" height="165" rx="10" fill={C.ink} opacity="0.25" transform="translate(8 10)" />
            <rect x="430" y="330" width="280" height="165" rx="10" fill={C.blue} />
            <Mark x={570} y={395} r={34} a={C.white} b={C.ice} />
            <text x="570" y="465" fontSize="18" fontWeight="700" fill={C.white} textAnchor="middle">{label}</text>
          </g>
          <g transform="rotate(-14 230 430)">
            <rect x="90" y="360" width="280" height="165" rx="10" fill={C.ink} opacity="0.25" transform="translate(8 10)" />
            <rect x="90" y="360" width="280" height="165" rx="10" fill={C.white} />
            <Mark x={140} y={410} r={24} />
            <text x="120" y="470" fontSize="17" fontWeight="700" fill={C.blue}>{label}</text>
            <Lines x={120} y={485} w={150} n={2} gap={14} h={5} />
          </g>
        </g>
      );
    case "packaging":
      return (
        <g>
          <ellipse cx="400" cy="520" rx="300" ry="26" fill={C.ink} opacity="0.2" />
          {/* box */}
          <polygon points="170,240 380,200 380,500 170,520" fill={C.white} />
          <polygon points="380,200 520,240 520,520 380,500" fill={C.ice} />
          <polygon points="170,240 380,200 520,240 310,280" fill={C.mist} />
          <Mark x={275} y={340} r={46} />
          <text x="275" y="430" fontSize="20" fontWeight="700" fill={C.blue} textAnchor="middle">{label}</text>
          <rect x="190" y="455" width="170" height="10" rx="5" fill={C.cyan} />
          {/* bottle */}
          <rect x="590" y="150" width="40" height="50" rx="8" fill={C.blue} />
          <path d="M575 200 h70 q25 30 25 70 v230 q0 20 -20 20 h-80 q-20 0 -20 -20 v-230 q0 -40 25 -70 z" fill={C.mist} opacity="0.95" />
          <rect x="555" y="300" width="110" height="130" fill={C.blue} />
          <Mark x={610} y={345} r={22} a={C.white} b={C.ice} />
          <text x="610" y="400" fontSize="13" fontWeight="700" fill={C.white} textAnchor="middle">{label.slice(0, 14)}</text>
        </g>
      );
    case "web":
      return (
        <g>
          {/* laptop */}
          <rect x="120" y="110" width="480" height="310" rx="14" fill={C.ink} />
          <rect x="136" y="126" width="448" height="278" rx="4" fill={C.white} />
          <rect x="136" y="126" width="448" height="26" fill={C.mist} />
          <circle cx="152" cy="139" r="5" fill={C.cyan} />
          <circle cx="168" cy="139" r="5" fill={C.ice} />
          <rect x="136" y="152" width="448" height="120" fill={C.blue} />
          <Mark x={175} y={190} r={16} a={C.white} b={C.ice} />
          <text x="200" y="197" fontSize="16" fontWeight="700" fill={C.white}>{label}</text>
          <Lines x={160} y={222} w={200} n={2} gap={16} />
          <rect x="160" y="252" width="90" height="12" rx="6" fill={C.cyan} />
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect x={160 + i * 140} y={290} width="120" height="90" rx="8" fill={C.mist} />
              <rect x={172 + i * 140} y={302} width="40" height="40" rx="8" fill={i === 1 ? C.cyan : C.blue} opacity="0.85" />
              <rect x={172 + i * 140} y={352} width="90" height="7" rx="3" fill={C.ice} />
            </g>
          ))}
          <path d="M80 420 h560 l-30 28 h-500 z" fill={C.ice} />
          {/* phone */}
          <rect x="560" y="200" width="150" height="290" rx="22" fill={C.ink} />
          <rect x="570" y="212" width="130" height="266" rx="14" fill={C.white} />
          <rect x="570" y="212" width="130" height="110" rx="14" fill={C.cyan} />
          <Mark x={635} y={255} r={22} a={C.white} b={C.ice} />
          <text x="635" y="305" fontSize="11" fontWeight="700" fill={C.white} textAnchor="middle">{label.slice(0, 18)}</text>
          <Lines x={585} y={340} w={100} n={4} gap={18} h={7} />
          <rect x="585" y="430" width="100" height="26" rx="13" fill={C.blue} />
        </g>
      );
    case "event":
      return (
        <g>
          {/* spotlights */}
          <polygon points="160,0 240,0 330,420 70,420" fill={C.ice} opacity="0.12" />
          <polygon points="560,0 640,0 730,420 470,420" fill={C.ice} opacity="0.12" />
          {/* backdrop */}
          <rect x="170" y="110" width="460" height="260" rx="6" fill={C.blue} />
          <rect x="170" y="110" width="460" height="260" rx="6" fill="url(#swirlDots)" opacity="0.25" />
          <Mark x={400} y={200} r={48} a={C.white} b={C.ice} />
          <text x="400" y="295" fontSize="30" fontWeight="700" fill={C.white} textAnchor="middle">{label}</text>
          <rect x="320" y="315" width="160" height="8" rx="4" fill={C.cyan} />
          {/* stage */}
          <rect x="90" y="370" width="620" height="40" fill={C.teal} />
          <rect x="90" y="410" width="620" height="18" fill={C.ink} opacity="0.6" />
          {/* podium */}
          <path d="M370 330 h60 l-8 40 h-44 z" fill={C.white} />
          {/* pull-ups */}
          {[100, 640].map((x) => (
            <g key={x}>
              <rect x={x} y="160" width="60" height="210" fill={C.white} />
              <Mark x={x + 30} y={200} r={16} />
              <Lines x={x + 10} y={240} w={40} n={5} gap={16} h={5} color={C.ice} />
              <rect x={x - 6} y="370" width="72" height="8" rx="3" fill={C.ice} />
            </g>
          ))}
          {/* audience */}
          {Array.from({ length: 9 }, (_, i) => (
            <circle key={i} cx={130 + i * 68} cy={540} r={26} fill={C.ink} opacity="0.75" />
          ))}
        </g>
      );
    case "stand":
      return (
        <g>
          <polygon points="80,500 720,500 800,600 0,600" fill={C.white} opacity="0.35" />
          {/* back wall */}
          <rect x="180" y="90" width="460" height="330" fill={C.white} />
          <rect x="180" y="90" width="460" height="60" fill={C.blue} />
          <text x="410" y="130" fontSize="26" fontWeight="700" fill={C.white} textAnchor="middle">{label}</text>
          <Mark x={300} y={260} r={60} />
          <rect x="400" y="190" width="200" height="120" rx="6" fill={C.ink} />
          <rect x="410" y="200" width="180" height="100" rx="3" fill={C.cyan} opacity="0.85" />
          <Lines x={400} y={330} w={200} n={3} gap={18} color={C.ice} />
          {/* side wall */}
          <polygon points="120,130 180,90 180,420 120,470" fill={C.ice} />
          {/* counter */}
          <rect x="300" y="380" width="230" height="130" rx="6" fill={C.blue} />
          <rect x="290" y="372" width="250" height="16" rx="4" fill={C.teal} />
          <Mark x={415} y={445} r={28} a={C.white} b={C.ice} />
          {/* brochure stand */}
          <rect x="580" y="380" width="70" height="130" rx="4" fill={C.teal} />
          <rect x="590" y="392" width="50" height="30" rx="3" fill={C.white} />
          <rect x="590" y="430" width="50" height="30" rx="3" fill={C.white} />
        </g>
      );
    case "signage":
      return (
        <g>
          {/* building */}
          <rect x="90" y="80" width="620" height="460" fill={C.mist} />
          <rect x="90" y="80" width="620" height="40" fill={C.ice} />
          {/* sign fascia */}
          <rect x="120" y="150" width="560" height="110" rx="8" fill={C.ink} />
          <rect x="120" y="150" width="560" height="110" rx="8" fill="none" stroke={C.cyan} strokeWidth="4" opacity="0.6" />
          <Mark x={200} y={205} r={36} a={C.cyan} b={C.ice} />
          <text x="255" y="218" fontSize="36" fontWeight="700" fill={C.white}>{label}</text>
          {/* glow */}
          <rect x="120" y="262" width="560" height="14" fill={C.cyan} opacity="0.25" />
          {/* windows and door */}
          <rect x="130" y="310" width="200" height="200" fill={C.blue} opacity="0.85" />
          <rect x="470" y="310" width="200" height="200" fill={C.blue} opacity="0.85" />
          <rect x="350" y="320" width="100" height="220" fill={C.teal} />
          <circle cx="435" cy="430" r="5" fill={C.ice} />
          <Lines x={150} y={340} w={160} n={2} gap={20} color={C.ice} h={8} />
          <Mark x={570} y={410} r={40} a={C.white} b={C.ice} />
          <rect x="60" y="540" width="680" height="16" fill={C.ink} opacity="0.4" />
        </g>
      );
    case "social":
      return (
        <g>
          <rect x="250" y="40" width="300" height="540" rx="40" fill={C.ink} />
          <rect x="266" y="60" width="268" height="500" rx="28" fill={C.white} />
          <Mark x={302} y={100} r={18} />
          <text x="330" y="106" fontSize="16" fontWeight="700" fill={C.blue}>{label.slice(0, 20)}</text>
          <Lines x={286} y={132} w={228} n={1} color={C.mist} h={8} />
          {Array.from({ length: 9 }, (_, i) => {
            const col = i % 3;
            const row = Math.floor(i / 3);
            const fills = [C.blue, C.cyan, C.teal, C.ice];
            return (
              <g key={i}>
                <rect x={282 + col * 82} y={160 + row * 82} width="76" height="76" rx="6" fill={fills[(i + row) % 4]} />
                {i % 4 === 0 && <Mark x={320 + col * 82} y={198 + row * 82} r={18} a={C.white} b={C.ice} />}
                {i % 4 === 2 && <Lines x={292 + col * 82} y={180 + row * 82} w={56} n={3} gap={14} color={C.white} h={6} />}
              </g>
            );
          })}
          <rect x="286" y="420" width="228" height="120" rx="12" fill={C.mist} />
          <Lines x={302} y={440} w={196} n={4} gap={22} color={C.ice} h={8} />
          {/* floating reactions */}
          <circle cx="600" cy="170" r="34" fill={C.white} />
          <path d="M600 190 l-18 -18 a11 11 0 0 1 18 -14 a11 11 0 0 1 18 14 z" fill={C.cyan} />
          <circle cx="190" cy="380" r="30" fill={C.white} />
          <rect x="176" y="368" width="28" height="22" rx="5" fill={C.blue} />
        </g>
      );
    case "campaign":
      return (
        <g>
          {/* billboard */}
          <rect x="250" y="350" width="22" height="230" fill={C.ink} opacity="0.7" />
          <rect x="528" y="350" width="22" height="230" fill={C.ink} opacity="0.7" />
          <rect x="90" y="70" width="620" height="300" rx="6" fill={C.white} />
          <rect x="100" y="80" width="600" height="280" fill={C.blue} />
          <circle cx="600" cy="220" r="120" fill={C.cyan} opacity="0.55" />
          <Mark x={600} y={220} r={70} a={C.white} b={C.ice} />
          <text x="130" y="170" fontSize="40" fontWeight="700" fill={C.white}>{label.slice(0, 16)}</text>
          <Lines x={130} y={200} w={300} n={2} gap={22} color={C.ice} h={10} />
          <rect x="130" y="270" width="150" height="40" rx="20" fill={C.cyan} />
          <rect x="140" y="360" width="80" height="10" fill={C.ink} opacity="0.6" />
          {/* poster */}
          <g transform="rotate(6 690 470)">
            <rect x="620" y="380" width="140" height="190" rx="4" fill={C.white} />
            <rect x="630" y="390" width="120" height="100" fill={C.teal} />
            <Mark x={690} y={440} r={28} a={C.white} b={C.ice} />
            <Lines x={632} y={505} w={110} n={3} gap={16} color={C.ice} h={6} />
          </g>
        </g>
      );
  }
}

export function ProjectArt({ kind, label, seed = "" }: { kind: ProjectArtKind; label: string; seed?: string }) {
  const [from, to] = BACKGROUNDS[kind];
  const id = `art-${kind}-${seed.replace(/[^a-z0-9-]/gi, "")}`;
  return (
    <svg viewBox="0 0 800 600" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" role="img" aria-label={`${label} — illustration`} style={{ display: "block", fontFamily: "inherit" }}>
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={from} />
          <stop offset="1" stopColor={to} />
        </linearGradient>
        <pattern id="swirlDots" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="20" cy="20" r="3" fill={C.white} />
        </pattern>
      </defs>
      <rect width="800" height="600" fill={`url(#${id}-bg)`} />
      <circle cx="720" cy="70" r="160" fill={C.white} opacity="0.06" />
      <circle cx="60" cy="560" r="200" fill={C.white} opacity="0.05" />
      <Scene kind={kind} label={label} />
    </svg>
  );
}
