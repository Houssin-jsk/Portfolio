type MotifProps = { className?: string };

// All motifs use currentColor; their size and tone belong to the page's CSS tokens.
export function PalmShadow({ className }: MotifProps) {
  return (
    <svg className={className} viewBox="0 0 500 500" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M490 10C350 90 260 222 133 467l7 3C280 228 355 112 490 10Z" />
      {Array.from({ length: 12 }, (_, i) => (
        <g key={i} transform={`translate(${420 - i * 22} ${66 + i * 29}) rotate(${i * 2 - 25})`}>
          <path d="M0 0C-40-37-105-50-172-37C-117-35-46-13 0 0Z" />
          <path d="M0 0C55 7 107 51 128 103C96 64 49 22 0 0Z" />
        </g>
      ))}
    </svg>
  );
}

export function OliveBranch({ className }: MotifProps) {
  return (
    <svg className={className} viewBox="0 0 260 320" fill="none" aria-hidden="true" focusable="false">
      <path d="M39 297C85 248 105 198 129 149S174 64 227 22" stroke="currentColor" strokeWidth="1.6" />
      <g fill="currentColor">
        <path d="M70 258C25 244 22 207 27 183C55 192 75 220 70 258Z" />
        <path d="M86 226C99 187 133 183 157 188C143 216 116 232 86 226Z" />
        <path d="M108 189C71 178 61 149 65 123C94 133 114 158 108 189Z" />
        <path d="M128 149C145 117 174 113 199 120C183 145 158 158 128 149Z" />
        <path d="M150 111C118 98 119 67 126 46C150 62 160 82 150 111Z" />
        <path d="M179 73C194 49 224 48 246 57C225 77 202 82 179 73Z" />
        <path d="M208 38C200 19 217 6 235 3C235 20 225 32 208 38Z" />
        <ellipse cx="99" cy="245" rx="6" ry="9" transform="rotate(30 99 245)" />
        <ellipse cx="140" cy="170" rx="5" ry="8" transform="rotate(30 140 170)" />
      </g>
    </svg>
  );
}

export function WaveLines({ className }: MotifProps) {
  return (
    <svg className={className} viewBox="0 0 500 400" fill="none" aria-hidden="true" focusable="false">
      {Array.from({ length: 10 }, (_, i) => (
        <path key={i} d={`M-30 ${190 + i * 15}C105 ${15 + i * 13} 183 ${425 + i * 6} 320 ${226 + i * 8}S459 ${78 + i * 13} 535 ${130 + i * 16}`} stroke="currentColor" strokeWidth="1.2" />
      ))}
    </svg>
  );
}
