// Ilustraciones SVG semi-realistas (gradientes, brillos y sombras), sin imágenes externas.
const Sombra = ({ cy = 108, rx = 34 }) => (
  <ellipse cx="60" cy={cy} rx={rx} ry="6" fill="#2b3a42" opacity="0.18" />
);

function Cafe() {
  return (
    <>
      <defs>
        <linearGradient id="cafe-bolsa" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#7b4a28" />
          <stop offset="0.45" stopColor="#bb8350" />
          <stop offset="1" stopColor="#6c4023" />
        </linearGradient>
        <linearGradient id="cafe-tapa" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5a381e" />
          <stop offset="1" stopColor="#80502c" />
        </linearGradient>
      </defs>
      <Sombra />
      <path d="M31 30h58l5 72q-34 9-68 0z" fill="url(#cafe-bolsa)" />
      <path d="M31 30h58l-2-11H33z" fill="url(#cafe-tapa)" />
      <path d="M33 19h54" stroke="#3f2713" strokeWidth="2" strokeLinecap="round" />
      <path d="M31 30h58" stroke="#4a2c16" strokeWidth="2" />
      <rect x="40" y="46" width="40" height="42" rx="5" fill="#f6eddb" />
      <path d="M40 77h40v6a5 5 0 0 1-5 5H45a5 5 0 0 1-5-5z" fill="#2f6f55" />
      <g transform="translate(60 59) rotate(-25)">
        <ellipse rx="9.5" ry="6.8" fill="#5a3418" />
        <path d="M-8 0Q-3 -3 0 0T8 0" stroke="#f6eddb" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </g>
      <text x="60" y="74" textAnchor="middle" fontSize="7.5" fontWeight="700" fill="#4a2c16" fontFamily="Georgia, serif">HUILA</text>
      <path d="M36 36l3 62" stroke="#fff" strokeOpacity="0.25" strokeWidth="4" strokeLinecap="round" />
      <ellipse cx="26" cy="107" rx="4" ry="2.8" fill="#4d2d15" transform="rotate(-20 26 107)" />
      <ellipse cx="96" cy="106" rx="4" ry="2.8" fill="#4d2d15" transform="rotate(25 96 106)" />
    </>
  );
}

function Panela() {
  return (
    <>
      <defs>
        <linearGradient id="pan-top" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#efb85e" />
          <stop offset="1" stopColor="#d58f33" />
        </linearGradient>
        <linearGradient id="pan-front" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#b9701f" />
          <stop offset="1" stopColor="#995512" />
        </linearGradient>
        <linearGradient id="pan-side" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#97550f" />
          <stop offset="1" stopColor="#74400a" />
        </linearGradient>
      </defs>
      <Sombra cy="104" rx="42" />
      <polygon points="20,52 52,66 52,98 20,84" fill="url(#pan-front)" />
      <polygon points="52,66 100,50 100,82 52,98" fill="url(#pan-side)" />
      <polygon points="20,52 68,36 100,50 52,66" fill="url(#pan-top)" />
      <polygon points="20,52 68,36 100,50 52,66" fill="none" stroke="#fff" strokeOpacity="0.35" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M26 58l22 9M26 70l22 9" stroke="#7b440c" strokeOpacity="0.35" strokeWidth="1.4" />
      <path d="M58 72l36-12M58 84l36-12" stroke="#4d2a06" strokeOpacity="0.3" strokeWidth="1.4" />
      <g fill="#fff" opacity="0.4">
        <circle cx="48" cy="52" r="1.3" />
        <circle cx="62" cy="46" r="1" />
        <circle cx="76" cy="52" r="1.2" />
        <circle cx="58" cy="56" r="0.9" />
      </g>
      <path d="M24 55l24 9" stroke="#fff" strokeOpacity="0.3" strokeWidth="2.5" strokeLinecap="round" />
    </>
  );
}

function Arepa({ cx, cy }) {
  return (
    <g>
      <ellipse cx={cx} cy={cy + 5} rx="22" ry="10.5" fill="#bf821a" />
      <ellipse cx={cx} cy={cy} rx="22" ry="10.5" fill="url(#are-dorado)" />
      <ellipse cx={cx} cy={cy} rx="22" ry="10.5" fill="none" stroke="#fff" strokeOpacity="0.25" />
      <g fill="#a8681a" opacity="0.55">
        <circle cx={cx - 9} cy={cy - 2} r="1.8" />
        <circle cx={cx + 4} cy={cy - 4} r="1.4" />
        <circle cx={cx + 11} cy={cy + 1} r="1.9" />
        <circle cx={cx - 2} cy={cy + 3} r="1.5" />
        <circle cx={cx - 13} cy={cy + 3} r="1.1" />
      </g>
    </g>
  );
}

function ArepaChoclo() {
  return (
    <>
      <defs>
        <radialGradient id="are-dorado" cx="0.4" cy="0.35" r="0.8">
          <stop offset="0" stopColor="#f8dc78" />
          <stop offset="1" stopColor="#dca42d" />
        </radialGradient>
      </defs>
      <ellipse cx="60" cy="94" rx="47" ry="14" fill="#2b3a42" opacity="0.15" />
      <ellipse cx="60" cy="90" rx="46" ry="14" fill="#e4dfd3" />
      <ellipse cx="60" cy="88" rx="38" ry="10.5" fill="#f7f4ec" />
      <Arepa cx="60" cy="62" />
      <Arepa cx="40" cy="76" />
      <Arepa cx="80" cy="76" />
      <path d="M52 24q-5 6 0 12t0 12" stroke="#fff" strokeOpacity="0.7" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <path d="M64 20q-5 6 0 12t0 12" stroke="#fff" strokeOpacity="0.5" strokeWidth="2.2" fill="none" strokeLinecap="round" />
    </>
  );
}

function Chocolate() {
  const segmentos = [];
  for (let f = 0; f < 2; f++) {
    for (let c = 0; c < 4; c++) {
      segmentos.push({ x: 26 + c * 17, y: 44 + f * 20, k: `${f}${c}` });
    }
  }
  return (
    <>
      <defs>
        <linearGradient id="cho-barra" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5c3422" />
          <stop offset="1" stopColor="#33190d" />
        </linearGradient>
        <linearGradient id="cho-segmento" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#6a3d28" />
          <stop offset="1" stopColor="#442313" />
        </linearGradient>
      </defs>
      <Sombra cy="104" rx="40" />
      <g transform="rotate(-10 60 62)">
        <rect x="22" y="40" width="78" height="46" rx="5" fill="url(#cho-barra)" />
        {segmentos.map((s) => (
          <g key={s.k}>
            <rect x={s.x} y={s.y} width="15" height="18" rx="2.5" fill="url(#cho-segmento)" />
            <path d={`M${s.x + 1.5} ${s.y + 16}V${s.y + 3}Q${s.x + 1.5} ${s.y + 1.5} ${s.x + 3} ${s.y + 1.5}H${s.x + 13}`} stroke="#a0674a" strokeOpacity="0.55" strokeWidth="1" fill="none" />
          </g>
        ))}
        <path d="M74 38h26v50H74l4-6-4-6 4-6-4-6 4-6-4-6 4-6z" fill="#efe2c4" />
        <rect x="85" y="38" width="8" height="50" fill="#b5463c" />
        <path d="M74 38l4 6-4 6" stroke="#d8c8a2" strokeWidth="1" fill="none" />
      </g>
    </>
  );
}

function Bocadillo() {
  const venas = [];
  for (let i = 0; i < 5; i++) {
    venas.push(`M${26 + i * 11} 66l-6-14`, `M${26 + i * 11} 66l-6 14`);
  }
  return (
    <>
      <defs>
        <linearGradient id="boc-hoja" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4d9a5f" />
          <stop offset="1" stopColor="#2a6540" />
        </linearGradient>
        <linearGradient id="boc-guayaba" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#d9546f" />
          <stop offset="1" stopColor="#8d1f3b" />
        </linearGradient>
      </defs>
      <Sombra cy="102" rx="44" />
      <rect x="14" y="44" width="68" height="46" rx="10" fill="url(#boc-hoja)" />
      <path d="M18 67h60" stroke="#a6dcb0" strokeOpacity="0.6" strokeWidth="1.4" />
      <path d={venas.join("")} stroke="#a6dcb0" strokeOpacity="0.4" strokeWidth="1" fill="none" />
      <path d="M44 44v46M62 44v46" stroke="#c9a566" strokeWidth="2.6" />
      <rect x="64" y="56" width="32" height="26" rx="5" fill="#a8304b" />
      <rect x="72" y="66" width="34" height="26" rx="5" fill="url(#boc-guayaba)" />
      <path d="M76 70h14" stroke="#fff" strokeOpacity="0.45" strokeWidth="3" strokeLinecap="round" />
      <g fill="#f6d9a8" opacity="0.85">
        <circle cx="86" cy="82" r="1.1" />
        <circle cx="95" cy="75" r="1" />
        <circle cx="99" cy="85" r="1.1" />
        <circle cx="91" cy="87" r="0.9" />
      </g>
    </>
  );
}

function Aguardiente() {
  const forma =
    "M52 40q-22 6-22 26V100q0 8 8 8H82q8 0 8-8V66q0-20-22-26Z";
  return (
    <>
      <defs>
        <linearGradient id="agu-vidrio" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#c9e6df" />
          <stop offset="0.5" stopColor="#e9f6f2" />
          <stop offset="1" stopColor="#a9d2c6" />
        </linearGradient>
        <linearGradient id="agu-tapa" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#b8892a" />
          <stop offset="0.5" stopColor="#f0cf6e" />
          <stop offset="1" stopColor="#a47a22" />
        </linearGradient>
      </defs>
      <Sombra cy="109" rx="30" />
      <rect x="52" y="14" width="16" height="28" rx="3" fill="url(#agu-vidrio)" />
      <path d={forma} fill="url(#agu-vidrio)" stroke="#8dbcb0" strokeWidth="1.2" />
      <path d="M32 70v28" stroke="#fff" strokeOpacity="0.8" strokeWidth="3.5" strokeLinecap="round" />
      <rect x="50" y="7" width="20" height="11" rx="3" fill="url(#agu-tapa)" />
      <path d="M54 8v9M58 8v9M62 8v9M66 8v9" stroke="#7d5a14" strokeOpacity="0.4" strokeWidth="1" />
      <rect x="37" y="62" width="46" height="36" rx="3" fill="#fbf8f0" />
      <rect x="37" y="62" width="46" height="5" rx="2" fill="#2f6f55" />
      <text x="60" y="77" textAnchor="middle" fontSize="5.3" fontWeight="700" fill="#2b3a42" fontFamily="Georgia, serif">AGUARDIENTE</text>
      <polygon points="60,80 62,85 67,85 63,88 65,93 60,90 55,93 57,88 53,85 58,85" fill="#8a5a2b" />
      <text x="60" y="97" textAnchor="middle" fontSize="4.8" fill="#5d6d75" fontFamily="Georgia, serif">750 ml</text>
    </>
  );
}

const DIBUJOS = {
  1: Cafe,
  2: Panela,
  3: ArepaChoclo,
  4: Chocolate,
  5: Bocadillo,
  6: Aguardiente,
};

export default function ProductoIlustracion({ id, className = "", onAnimationEnd }) {
  const Dibujo = DIBUJOS[id];
  if (!Dibujo) return null;
  return (
    <svg
      className={className}
      viewBox="0 0 120 120"
      width="100%"
      height="100%"
      aria-hidden="true"
      focusable="false"
      onAnimationEnd={onAnimationEnd}
    >
      <Dibujo />
    </svg>
  );
}
