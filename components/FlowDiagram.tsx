/**
 * Featured Case 縮圖核心 ── 故意露 user flow diagram crop,不是 UI hero shot。
 * 對應 DESIGN.md P1: Process > Polish。
 */
export default function FlowDiagram() {
  return (
    <svg
      viewBox="0 0 480 330"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="User flow diagram showing authentication decision tree and screen states"
      style={{ width: '100%', height: '100%', display: 'block' }}
    >
      {/* Decision diamond */}
      <polygon points="240,30 290,60 240,90 190,60" fill="var(--surface)" stroke="var(--text)" strokeWidth="1.2" />
      <text x="240" y="64" textAnchor="middle" className="flow-id-text">是否登入?</text>

      {/* Arrows */}
      <path d="M 215 80 Q 160 110 130 130" stroke="var(--accent)" strokeWidth="1.4" fill="none" />
      <polygon points="125,125 130,135 137,128" fill="var(--accent)" />
      <text x="148" y="108" className="flow-label-text">否</text>

      <path d="M 265 80 Q 320 110 350 130" stroke="var(--accent)" strokeWidth="1.4" fill="none" />
      <polygon points="354,127 351,138 343,131" fill="var(--accent)" />
      <text x="320" y="108" className="flow-label-text">是</text>

      {/* Left screen — login */}
      <rect x="90" y="130" width="80" height="160" rx="10" fill="#FAFAF7" stroke="var(--text)" strokeWidth="1.2" />
      <line x1="100" y1="145" x2="160" y2="145" stroke="var(--text-muted)" strokeWidth="0.5" opacity="0.4" />
      <rect x="100" y="155" width="60" height="14" rx="3" fill="none" stroke="#9A938A" strokeWidth="0.5" />
      <rect x="100" y="175" width="60" height="14" rx="3" fill="none" stroke="#9A938A" strokeWidth="0.5" />
      <rect x="100" y="200" width="60" height="18" rx="9" fill="var(--text)" />
      <line x1="100" y1="240" x2="160" y2="240" stroke="var(--text-muted)" strokeWidth="0.5" opacity="0.4" />
      <line x1="100" y1="252" x2="140" y2="252" stroke="var(--text-muted)" strokeWidth="0.5" opacity="0.4" />
      <text x="130" y="305" textAnchor="middle" className="flow-id-text">1.1.1</text>

      {/* Right screen — home (with mini pastel cards) */}
      <rect x="310" y="130" width="80" height="160" rx="10" fill="#FAFAF7" stroke="var(--text)" strokeWidth="1.2" />
      <line x1="320" y1="145" x2="380" y2="145" stroke="var(--text-muted)" strokeWidth="0.5" opacity="0.4" />
      <rect x="320" y="155" width="60" height="20" rx="6" fill="#C5E5D6" />
      <rect x="320" y="180" width="28" height="28" rx="6" fill="#FFE99A" />
      <rect x="352" y="180" width="28" height="28" rx="6" fill="#FFD9C2" />
      <rect x="320" y="215" width="60" height="40" rx="6" fill="#D8D4F0" />
      <line x1="320" y1="265" x2="380" y2="265" stroke="var(--text-muted)" strokeWidth="0.5" opacity="0.4" />
      <line x1="320" y1="275" x2="365" y2="275" stroke="var(--text-muted)" strokeWidth="0.5" opacity="0.4" />
      <text x="350" y="305" textAnchor="middle" className="flow-id-text">2.0.1</text>

      {/* Side popup with dotted arrow */}
      <path d="M 175 200 L 230 200" stroke="var(--accent)" strokeWidth="1.4" fill="none" strokeDasharray="3,3" />
      <polygon points="234,197 234,203 240,200" fill="var(--accent)" />
      <rect x="240" y="170" width="60" height="60" rx="10" fill="#FFE99A" stroke="var(--text)" strokeWidth="1" />
      <circle cx="270" cy="186" r="4" stroke="var(--text)" strokeWidth="1" fill="none" />
      <line x1="270" y1="184" x2="270" y2="188" stroke="var(--text)" strokeWidth="1" />
      <circle cx="270" cy="190" r="0.5" fill="var(--text)" />
      <line x1="248" y1="200" x2="292" y2="200" stroke="var(--text-muted)" strokeWidth="0.5" opacity="0.5" />
      <line x1="248" y1="208" x2="282" y2="208" stroke="var(--text-muted)" strokeWidth="0.5" opacity="0.5" />
      <rect x="248" y="217" width="20" height="8" rx="4" fill="none" stroke="#9A938A" strokeWidth="0.5" />
      <rect x="272" y="217" width="20" height="8" rx="4" fill="var(--text)" />
      <text x="205" y="195" className="flow-label-text">未登入</text>

      {/* Footer label */}
      <text x="240" y="320" textAnchor="middle" className="flow-label-text" style={{ fontSize: '7px' }}>
        flow · 1.1 → 2.0 (authentication)
      </text>

      <style>{`
        .flow-id-text {
          font-family: var(--font-mono), ui-monospace, monospace;
          font-size: 6px;
          fill: var(--text-muted);
          letter-spacing: 0.05em;
        }
        .flow-label-text {
          font-family: var(--font-mono), ui-monospace, monospace;
          font-size: 8px;
          fill: var(--accent);
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }
      `}</style>
    </svg>
  )
}
