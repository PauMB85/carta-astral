// Reusable astral chart wheel — concentric rings, divisions, planet markers + 12 zodiac SVG sigils

// Each sigil is hand-drawn as SVG paths in a centered 24x24 viewBox.
// Stroke-only, no fills — they pick up gold from currentColor.
const ZODIAC_SIGILS = [
  // Aries (ram horns)
  { name: 'Aries',       paths: ['M 4 18 Q 4 8 12 8 Q 20 8 20 18', 'M 4 18 Q 4 14 7 14', 'M 20 18 Q 20 14 17 14'] },
  // Taurus (circle + horns)
  { name: 'Tauro',       paths: ['M 12 18 m -5 0 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0', 'M 7 13 Q 4 6 9 6', 'M 17 13 Q 20 6 15 6'] },
  // Gemini (II with caps)
  { name: 'Géminis',     paths: ['M 8 6 L 8 18', 'M 16 6 L 16 18', 'M 6 6 L 18 6', 'M 6 18 L 18 18'] },
  // Cancer (69)
  { name: 'Cáncer',      paths: ['M 5 10 a 3 3 0 1 1 6 0 a 3 3 0 1 1 -6 0', 'M 13 14 a 3 3 0 1 1 6 0 a 3 3 0 1 1 -6 0', 'M 5 10 Q 5 5 10 5', 'M 19 14 Q 19 19 14 19'] },
  // Leo (loop with tail)
  { name: 'Leo',         paths: ['M 9 13 a 3 3 0 1 1 6 0 a 3 3 0 1 1 -6 0', 'M 12 10 Q 12 5 7 5 Q 4 5 4 9', 'M 15 13 Q 18 16 18 19 Q 18 21 16 21'] },
  // Virgo (M with crossed loop)
  { name: 'Virgo',       paths: ['M 4 6 L 4 18', 'M 4 6 Q 6 12 8 18', 'M 8 18 Q 10 12 12 6 L 12 18', 'M 12 6 Q 14 12 16 18', 'M 16 18 Q 18 18 18 14 Q 18 10 14 12'] },
  // Libra (scales)
  { name: 'Libra',       paths: ['M 4 19 L 20 19', 'M 6 16 L 18 16', 'M 7 16 Q 7 9 12 9 Q 17 9 17 16'] },
  // Scorpio (M with arrow)
  { name: 'Escorpio',    paths: ['M 4 6 L 4 18', 'M 4 6 Q 6 12 8 18', 'M 8 18 Q 10 12 12 6 L 12 18', 'M 12 6 Q 14 12 16 18', 'M 16 18 L 21 13', 'M 21 13 L 18 12', 'M 21 13 L 20 16'] },
  // Sagittarius (arrow)
  { name: 'Sagitario',   paths: ['M 4 20 L 20 4', 'M 20 4 L 14 4', 'M 20 4 L 20 10', 'M 8 12 L 14 18'] },
  // Capricorn (V + loop)
  { name: 'Capricornio', paths: ['M 4 6 L 8 14 L 12 6 L 16 16', 'M 16 16 a 3 2.5 0 1 1 0 -5 a 4 4 0 0 0 -4 0'] },
  // Aquarius (waves)
  { name: 'Acuario',     paths: ['M 4 9 L 7 7 L 10 9 L 13 7 L 16 9 L 19 7', 'M 4 14 L 7 12 L 10 14 L 13 12 L 16 14 L 19 12'] },
  // Pisces (two arcs + bar)
  { name: 'Piscis',      paths: ['M 5 6 Q 9 12 5 18', 'M 19 6 Q 15 12 19 18', 'M 7 12 L 17 12'] },
];

function ZodiacSigil({ index, size = 18, color = 'currentColor', strokeWidth = 1.2 }) {
  const sigil = ZODIAC_SIGILS[index];
  return (
    <g>
      {sigil.paths.map((d, i) => (
        <path key={i} d={d} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" transform={`scale(${size / 24})`} />
      ))}
    </g>
  );
}

function NatalWheel({ size = 520, gold = '#c9a55a', goldBright = '#e7c97a', dark = '#0b0a08', cream = '#f5ecd6', spin = true }) {
  const cx = size / 2;
  const cy = size / 2;
  const R  = size / 2 - 4;
  const rOuter = R;
  const rZodiac = R * 0.86;
  const rInner = R * 0.72;
  const rCenter = R * 0.34;

  const polar = (angleDeg, radius) => {
    const a = (angleDeg - 90) * Math.PI / 180;
    return [cx + Math.cos(a) * radius, cy + Math.sin(a) * radius];
  };

  // 12 zodiac division lines (outer band)
  const divisions = [];
  for (let i = 0; i < 12; i++) {
    const a = i * 30;
    const [x1, y1] = polar(a, rInner);
    const [x2, y2] = polar(a, rOuter);
    divisions.push(<line key={`div-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={gold} strokeWidth="0.6" opacity="0.7" />);
  }

  // 12 zodiac sigils placed at midpoints of each 30° section, on the zodiac band
  const zodiacSigils = [];
  const sigilSize = size * 0.052;
  for (let i = 0; i < 12; i++) {
    const a = i * 30 + 15;
    const rSigil = (rOuter + rZodiac) / 2;
    const [sx, sy] = polar(a, rSigil);
    zodiacSigils.push(
      <g key={`z-${i}`} transform={`translate(${sx - sigilSize / 2}, ${sy - sigilSize / 2})`} style={{ color: goldBright }}>
        <ZodiacSigil index={i} size={sigilSize} color={goldBright} strokeWidth={0.9} />
      </g>
    );
  }

  // Tick marks within zodiac band — 3 sub-ticks per 30° section (degree marks)
  const ticks = [];
  for (let i = 0; i < 36; i++) {
    if (i % 3 === 0) continue;
    const a = i * 10;
    const [x1, y1] = polar(a, rZodiac);
    const [x2, y2] = polar(a, rZodiac + (rOuter - rZodiac) * 0.4);
    ticks.push(<line key={`tick-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={gold} strokeWidth="0.4" opacity="0.5" />);
  }

  // Small Roman-numeral-style ticks at each 30° (just longer ticks, no text)
  const majorTicks = [];
  for (let i = 0; i < 12; i++) {
    const a = i * 30;
    // small dot at midpoint of each band
    const [px, py] = polar(a + 15, (rOuter + rZodiac) / 2);
    majorTicks.push(<circle key={`mt-${i}`} cx={px} cy={py} r={size * 0.006} fill={goldBright} opacity="0.85" />);
  }

  // House lines (interior cross + radial guides every 30°)
  const houseLines = [];
  for (let i = 0; i < 12; i++) {
    const a = i * 30;
    const [x1, y1] = polar(a, rCenter);
    const [x2, y2] = polar(a, rInner);
    houseLines.push(<line key={`h-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={gold} strokeWidth="0.4" opacity="0.4" />);
  }

  // Aspect lines crossing center (geometric web — these show planetary aspects abstractly)
  const aspects = [];
  const aspectAngles = [[0, 120], [60, 240], [30, 210], [90, 200], [150, 330]];
  aspectAngles.forEach(([a1, a2], i) => {
    const [x1, y1] = polar(a1, rCenter * 0.95);
    const [x2, y2] = polar(a2, rCenter * 0.95);
    aspects.push(<line key={`a-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={gold} strokeWidth="0.5" opacity="0.45" />);
  });

  // "Planet" markers — abstract geometric points (small filled circles) at varied radii
  // No glyphs, just the kind of markers you'd see in a real astrolabe diagram
  const PLANET_POINTS = [
    { angle: 24,  r: 0.62 },
    { angle: 88,  r: 0.55 },
    { angle: 142, r: 0.66 },
    { angle: 200, r: 0.58 },
    { angle: 268, r: 0.64 },
    { angle: 312, r: 0.56 },
    { angle: 18,  r: 0.50 },
  ];

  const planetMarkers = PLANET_POINTS.map((p, i) => {
    const [px, py] = polar(p.angle, R * p.r);
    const ms = size * 0.012;
    return (
      <g key={`p-${i}`}>
        {/* outer ring */}
        <circle cx={px} cy={py} r={ms * 1.6} fill="none" stroke={goldBright} strokeWidth="0.6" opacity="0.7" />
        {/* inner dot */}
        <circle cx={px} cy={py} r={ms * 0.6} fill={goldBright} />
      </g>
    );
  });

  // Tiny dots at zodiac midpoints just inside the inner ring (degree markers)
  const innerDots = [];
  for (let i = 0; i < 12; i++) {
    const a = i * 30 + 15;
    const [dx, dy] = polar(a, rInner * 0.97);
    innerDots.push(<circle key={`id-${i}`} cx={dx} cy={dy} r={size * 0.004} fill={gold} opacity="0.6" />);
  }

  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} style={{ display: 'block', overflow: 'visible' }}>
      <defs>
        <radialGradient id="wheel-bg" cx="0.5" cy="0.5" r="0.6">
          <stop offset="0%"  stopColor="#1a160d" />
          <stop offset="70%" stopColor="#0b0a08" />
          <stop offset="100%" stopColor="#000" />
        </radialGradient>
        <filter id="wheel-glow">
          <feGaussianBlur stdDeviation="1.2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g style={spin ? { transformOrigin: `${cx}px ${cy}px`, animation: 'wheel-spin 240s linear infinite' } : {}}>
        {/* concentric rings */}
        <circle cx={cx} cy={cy} r={rOuter} fill="url(#wheel-bg)" stroke={gold} strokeWidth="1" />
        <circle cx={cx} cy={cy} r={rOuter - 4} fill="none" stroke={gold} strokeWidth="0.4" opacity="0.5" />
        <circle cx={cx} cy={cy} r={rZodiac} fill="none" stroke={gold} strokeWidth="0.8" />
        <circle cx={cx} cy={cy} r={rInner} fill="none" stroke={gold} strokeWidth="0.6" />
        <circle cx={cx} cy={cy} r={rInner * 0.88} fill="none" stroke={gold} strokeWidth="0.3" opacity="0.5" />
        <circle cx={cx} cy={cy} r={rCenter} fill="none" stroke={gold} strokeWidth="0.6" opacity="0.7" />
        <circle cx={cx} cy={cy} r={rCenter * 0.7} fill="none" stroke={gold} strokeWidth="0.4" opacity="0.5" />

        {divisions}
        {ticks}
        {majorTicks}
        {zodiacSigils}
        {houseLines}
        {aspects}
        {innerDots}
        <g filter="url(#wheel-glow)">{planetMarkers}</g>

        {/* Central geometric mark — a small diamond + circle, abstract */}
        <g transform={`translate(${cx}, ${cy})`}>
          <circle r={rCenter * 0.18} fill="none" stroke={goldBright} strokeWidth="0.6" />
          <circle r={size * 0.005} fill={goldBright} />
          {/* 4 cardinal radial markers */}
          {[0, 90, 180, 270].map(a => {
            const [x, y] = polar(a, rCenter * 0.45);
            return <circle key={a} cx={x - cx} cy={y - cy} r={size * 0.003} fill={goldBright} opacity="0.8" />;
          })}
        </g>
      </g>

      <style>{`
        @keyframes wheel-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </svg>
  );
}

window.NatalWheel = NatalWheel;
