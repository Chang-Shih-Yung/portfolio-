/**
 * CaseDiagrams — bespoke hand-rolled SVG/CSS diagrams for UX case studies.
 * Hand-written on purpose (Mermaid was dropped: CJK label measuring is
 * unstable — see the old SystemMap notes); static SVG gives full visual
 * control. koyama language throughout: pastel fills, 2px ink outlines,
 * offset sticker shadows, mono annotations. Server components, no state.
 */

/* ── ConvergenceMap ──────────────────────────────────────────────────────
   Insights → root cause → strategies: N problem nodes funnel into ONE
   root-cause sticker, which fans out into strategy nodes. The visual
   argument of the whole case: scattered symptoms, one diagnosis, three
   moves. Fixed 5→1→3 layout (matches the nantou-2.0 content). */

const PROBLEMS = [
  '登入流程複雜',
  '任務資訊不足',
  '商家流程不透明',
  '通知機制薄弱',
  '後台操作成本高',
]

const STRATEGIES: { en: string; zh: string; fill: string }[] = [
  { en: 'Flow Simplification', zh: '流程簡化', fill: 'var(--cv-shape-blue)' },
  { en: 'Information Clarity', zh: '資訊透明', fill: 'var(--card-butter)' },
  { en: 'System Consistency', zh: '系統一致', fill: 'var(--card-lavender)' },
]

const P_X = 20
const P_W = 250
const P_H = 60
const P_YS = [22, 126, 230, 334, 438] // node tops; centers +30

const ROOT = { x: 452, y: 190, w: 292, h: 130 }
const S_X = 884
const S_W = 274
const S_H = 84
const S_YS = [56, 218, 380] // centers 98 / 260 / 422

export function ConvergenceMap() {
  const rootCy = ROOT.y + ROOT.h / 2
  // problem edges converge onto the root's left edge, fanned vertically
  const inYs = [rootCy - 44, rootCy - 22, rootCy, rootCy + 22, rootCy + 44]
  // root's right edge fans out to the three strategies
  const outYs = [rootCy - 30, rootCy, rootCy + 30]

  return (
    <figure className="convmap">
      <svg
        viewBox="0 0 1180 560"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label={`五大問題（${PROBLEMS.join('、')}）收斂為單一根因「資訊透明度不足＋流程缺乏回饋」，再展開為三條設計策略（${STRATEGIES.map((s) => s.zh).join('、')}）`}
      >
        <defs>
          <marker
            id="conv-arrow"
            viewBox="0 0 10 10"
            refX="8.5"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" className="convmap-arrowhead" />
          </marker>
        </defs>

        {/* edges first, nodes overlap them */}
        {P_YS.map((y, i) => (
          <path
            key={`in-${i}`}
            className="convmap-edge"
            d={`M ${P_X + P_W},${y + P_H / 2} C ${P_X + P_W + 90},${y + P_H / 2} ${ROOT.x - 90},${inYs[i]} ${ROOT.x - 4},${inYs[i]}`}
            markerEnd="url(#conv-arrow)"
          />
        ))}
        {S_YS.map((y, i) => (
          <path
            key={`out-${i}`}
            className="convmap-edge is-out"
            d={`M ${ROOT.x + ROOT.w},${outYs[i]} C ${ROOT.x + ROOT.w + 70},${outYs[i]} ${S_X - 70},${y + S_H / 2} ${S_X - 4},${y + S_H / 2}`}
            markerEnd="url(#conv-arrow)"
          />
        ))}

        {/* column headers */}
        <text x={P_X + P_W / 2} y={12} textAnchor="middle" className="convmap-col">
          INSIGHTS · 五大問題
        </text>
        <text x={ROOT.x + ROOT.w / 2} y={ROOT.y - 22} textAnchor="middle" className="convmap-col">
          ROOT CAUSE · 根因
        </text>
        <text x={S_X + S_W / 2} y={28} textAnchor="middle" className="convmap-col">
          STRATEGY · 設計策略
        </text>

        {/* problem nodes — white cards with a coral index dot */}
        {PROBLEMS.map((label, i) => (
          <g key={label} className="convmap-problem">
            <rect x={P_X} y={P_YS[i]} width={P_W} height={P_H} rx={16} />
            <circle cx={P_X + 34} cy={P_YS[i] + P_H / 2} r={14} />
            <text x={P_X + 34} y={P_YS[i] + P_H / 2 + 4.5} textAnchor="middle" className="convmap-idx">
              {String(i + 1).padStart(2, '0')}
            </text>
            <text x={P_X + 62} y={P_YS[i] + P_H / 2 + 5.5} className="convmap-label">
              {label}
            </text>
          </g>
        ))}

        {/* root cause — the koyama sticker (offset shadow + butter… no: coral) */}
        <g className="convmap-root">
          <rect x={ROOT.x + 7} y={ROOT.y + 7} width={ROOT.w} height={ROOT.h} rx={16} className="convmap-root-shadow" />
          <rect x={ROOT.x} y={ROOT.y} width={ROOT.w} height={ROOT.h} rx={16} className="convmap-root-card" />
          <text x={ROOT.x + ROOT.w / 2} y={ROOT.y + 52} textAnchor="middle" className="convmap-root-line">
            資訊透明度不足
          </text>
          <text x={ROOT.x + ROOT.w / 2} y={ROOT.y + 90} textAnchor="middle" className="convmap-root-line">
            ＋ 流程缺乏回饋
          </text>
        </g>

        {/* strategy nodes — pastel fills, numbered */}
        {STRATEGIES.map((s, i) => (
          <g key={s.zh} className="convmap-strategy">
            <rect x={S_X} y={S_YS[i]} width={S_W} height={S_H} rx={16} style={{ fill: s.fill }} />
            <text x={S_X + 24} y={S_YS[i] + 34} className="convmap-strat-en">
              {String(i + 1).padStart(2, '0')} · {s.en}
            </text>
            <text x={S_X + 24} y={S_YS[i] + 62} className="convmap-strat-zh">
              {s.zh}
            </text>
          </g>
        ))}
      </svg>
      <figcaption className="convmap-caption">Insights → Root cause → Strategy</figcaption>
    </figure>
  )
}

/* ── FlowCompare ─────────────────────────────────────────────────────────
   Before/After flow-shape comparison: the old journey is a long chain of
   mute steps; the new one is shorter and every step answers back. Steps are
   deliberately ABSTRACT (unlabeled cells) — the diagram shows the pattern
   (fewer steps + feedback), not invented screen names. */

export function FlowCompare({
  beforeSteps = 6,
  afterSteps = 3,
  note,
}: {
  beforeSteps?: number
  afterSteps?: number
  note?: string
}) {
  return (
    <div
      className="flowcompare"
      role="img"
      aria-label={
        note ??
        `原流程 ${beforeSteps} 步、缺乏回饋；新流程 ${afterSteps} 步、每一步都有狀態回饋`
      }
    >
      <div className="flowcompare-lane is-before" aria-hidden="true">
        <div className="flowcompare-head">
          <span className="flowcompare-tag">BEFORE</span>
          <span className="flowcompare-desc">步驟多・沒有回饋</span>
        </div>
        <div className="flowcompare-track">
          {Array.from({ length: beforeSteps }, (_, i) => (
            <span key={i} className="flowcompare-step" />
          ))}
        </div>
      </div>
      <div className="flowcompare-lane is-after" aria-hidden="true">
        <div className="flowcompare-head">
          <span className="flowcompare-tag">AFTER</span>
          <span className="flowcompare-desc">步驟少・每步有回饋</span>
        </div>
        <div className="flowcompare-track">
          {Array.from({ length: afterSteps }, (_, i) => (
            <span key={i} className="flowcompare-stepwrap">
              <span className="flowcompare-step" />
              <span className="flowcompare-tick">✓</span>
            </span>
          ))}
        </div>
      </div>
      {note && <p className="chart-note">{note}</p>}
    </div>
  )
}
