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

/* ── CampaignLoop ────────────────────────────────────────────────────────
   The hualien-sustainable signature: a 5-stage participation funnel
   (Awareness → Engagement → Action → Reward → Retention) whose node heights
   shrink like a funnel, closed by a dashed re-marketing arc from Retention
   back to Awareness — the visual claim that campaigns are a LOOP, not a
   broadcast. Fixed content on purpose (it matches the case narrative). */

const STAGES: { en: string; zh: string; fill: string }[] = [
  { en: 'AWARENESS', zh: '活動曝光', fill: 'var(--cv-shape-blue)' },
  { en: 'ENGAGEMENT', zh: '理解與參與', fill: 'var(--card-butter)' },
  { en: 'ACTION', zh: '任務完成', fill: 'var(--card-peach)' },
  { en: 'REWARD', zh: '點數回饋', fill: 'var(--cv-shape-green)' },
  { en: 'RETENTION', zh: '持續參與', fill: 'var(--card-lavender)' },
]

const ST_W = 196
const ST_XS = [52, 272, 492, 712, 932]
const ST_HS = [216, 188, 160, 132, 104] // funnel: each stage narrower
const ST_CY = 200 // vertical center of every node

export function CampaignLoop() {
  return (
    <figure className="cmploop">
      <svg
        viewBox="0 0 1180 340"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label={`參與轉換循環：${STAGES.map((s) => s.zh).join(' → ')}，再由通知再行銷回到下一個活動`}
      >
        <defs>
          <marker
            id="loop-arrow"
            viewBox="0 0 10 10"
            refX="8.5"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" className="cmploop-arrowhead" />
          </marker>
        </defs>

        {/* forward arrows between stages */}
        {ST_XS.slice(0, -1).map((x, i) => (
          <path
            key={`fwd-${i}`}
            className="cmploop-edge"
            d={`M ${x + ST_W + 2},${ST_CY} L ${ST_XS[i + 1] - 6},${ST_CY}`}
            markerEnd="url(#loop-arrow)"
          />
        ))}

        {/* re-marketing return arc: Retention → Awareness */}
        <path
          className="cmploop-edge is-return"
          d={`M ${ST_XS[4] + ST_W / 2},${ST_CY - ST_HS[4] / 2 - 6} C ${ST_XS[4] + ST_W / 2},36 ${ST_XS[0] + ST_W / 2},36 ${ST_XS[0] + ST_W / 2},${ST_CY - ST_HS[0] / 2 - 8}`}
          markerEnd="url(#loop-arrow)"
        />
        <g className="cmploop-return-label">
          <rect x={492} y={18} width={196} height={30} rx={15} />
          <text x={590} y={38} textAnchor="middle">
            通知再行銷 · 下一個活動
          </text>
        </g>

        {/* stage nodes — funnel heights, pastel fills */}
        {STAGES.map((s, i) => {
          const h = ST_HS[i]
          const y = ST_CY - h / 2
          return (
            <g key={s.en} className="cmploop-stage">
              <rect x={ST_XS[i]} y={y} width={ST_W} height={h} rx={16} style={{ fill: s.fill }} />
              <text x={ST_XS[i] + ST_W / 2} y={ST_CY - 8} textAnchor="middle" className="cmploop-en">
                {String(i + 1).padStart(2, '0')} · {s.en}
              </text>
              <text x={ST_XS[i] + ST_W / 2} y={ST_CY + 22} textAnchor="middle" className="cmploop-zh">
                {s.zh}
              </text>
            </g>
          )
        })}
      </svg>
      <figcaption className="cmploop-caption">
        Campaign Journey · 參與轉換循環 — 漏斗收窄，但回饋把人帶回來
      </figcaption>
    </figure>
  )
}

/* ── PlatformHub ─────────────────────────────────────────────────────────
   The yunlin-platform signature: Digital Identity as the hub sticker in the
   centre, four service domains at the corners, BIDIRECTIONAL spokes — the
   visual claim that this is platform integration (one identity, every
   service two-way connected), not a feature pile. Fixed content on purpose. */

const HUB_DOMAINS: { en: string; zh: string; fill: string; x: number; y: number }[] = [
  { en: 'PUBLIC SERVICES', zh: '公共服務', fill: 'var(--cv-shape-blue)', x: 80, y: 60 },
  { en: 'YUNLIN COIN', zh: '點數服務', fill: 'var(--card-peach)', x: 840, y: 60 },
  { en: 'LOCAL ECOSYSTEM', zh: '在地生活', fill: 'var(--cv-shape-green)', x: 80, y: 364 },
  { en: 'CONTINUOUS EXP.', zh: '持續使用', fill: 'var(--card-lavender)', x: 840, y: 364 },
]

const HUB_W = 260
const HUB_H = 96
const HUB_CENTER = { x: 470, y: 205, w: 240, h: 110 }

const HUB_SPOKES = [
  'M 348,132 L 470,208', // top-left ↔ centre
  'M 832,132 L 710,208', // top-right ↔ centre
  'M 348,388 L 470,312', // bottom-left ↔ centre
  'M 832,388 L 710,312', // bottom-right ↔ centre
]

export function PlatformHub() {
  const c = HUB_CENTER
  return (
    <figure className="phub">
      <svg
        viewBox="0 0 1180 520"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label={`平台架構：數位身份為單一核心，雙向串聯${HUB_DOMAINS.map((d) => d.zh).join('、')}四大服務域`}
      >
        <defs>
          <marker
            id="hub-arrow"
            viewBox="0 0 10 10"
            refX="8.5"
            refY="5"
            markerWidth="6.5"
            markerHeight="6.5"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" className="phub-arrowhead" />
          </marker>
        </defs>

        {/* bidirectional spokes */}
        {HUB_SPOKES.map((d, i) => (
          <path
            key={i}
            className="phub-spoke"
            d={d}
            markerStart="url(#hub-arrow)"
            markerEnd="url(#hub-arrow)"
          />
        ))}

        {/* centre hub — koyama sticker */}
        <g className="phub-center">
          <rect x={c.x + 7} y={c.y + 7} width={c.w} height={c.h} rx={16} className="phub-center-shadow" />
          <rect x={c.x} y={c.y} width={c.w} height={c.h} rx={16} className="phub-center-card" />
          <text x={c.x + c.w / 2} y={c.y + 34} textAnchor="middle" className="phub-en">
            DIGITAL IDENTITY
          </text>
          <text x={c.x + c.w / 2} y={c.y + 66} textAnchor="middle" className="phub-zh">
            數位身份
          </text>
          <text x={c.x + c.w / 2} y={c.y + 92} textAnchor="middle" className="phub-sub">
            單一身份 · 服務整合入口
          </text>
        </g>

        {/* domain nodes */}
        {HUB_DOMAINS.map((d, i) => (
          <g key={d.zh} className="phub-domain">
            <rect x={d.x} y={d.y} width={HUB_W} height={HUB_H} rx={16} style={{ fill: d.fill }} />
            <text x={d.x + HUB_W / 2} y={d.y + 40} textAnchor="middle" className="phub-en">
              {String(i + 1).padStart(2, '0')} · {d.en}
            </text>
            <text x={d.x + HUB_W / 2} y={d.y + 72} textAnchor="middle" className="phub-zh">
              {d.zh}
            </text>
          </g>
        ))}
      </svg>
      <figcaption className="phub-caption">
        Platform Architecture · 單一身份，雙向串聯全服務
      </figcaption>
    </figure>
  )
}

/* ── SystemStack ─────────────────────────────────────────────────────────
   Design-system layer cake: Foundation is the widest base, Components sit
   on it, Patterns on top — each narrower because each is built FROM the
   layer below. Item lists ride along the right edge of each layer. */

const STACK_LAYERS: {
  en: string
  zh: string
  fill: string
  x: number
  w: number
  items: [string, string]
}[] = [
  {
    en: 'DESIGN PATTERNS',
    zh: '設計模式',
    fill: 'var(--card-peach)',
    x: 260,
    w: 660,
    items: ['登入 · 點數 · 交易 · 任務 · 通知', 'Empty · Loading · Error State'],
  },
  {
    en: 'COMPONENTS',
    zh: '元件系統',
    fill: 'var(--card-butter)',
    x: 170,
    w: 840,
    items: ['Buttons · Cards · Input · Navigation', 'Bottom Sheet · Dialogs · Badges · Lists'],
  },
  {
    en: 'FOUNDATION',
    zh: '設計基礎',
    fill: 'var(--cv-shape-blue)',
    x: 80,
    w: 1020,
    items: ['Color · Typography · Spacing', 'Grid · Elevation · Radius'],
  },
]

const LAYER_H = 100
const LAYER_YS = [36, 152, 268]

export function SystemStack() {
  return (
    <figure className="sysstack">
      <svg
        viewBox="0 0 1180 420"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label={`設計系統三層堆疊：設計基礎（${STACK_LAYERS[2].items.join('、')}）之上是元件系統，最上層是設計模式`}
      >
        {STACK_LAYERS.map((l, i) => {
          const y = LAYER_YS[i]
          const num = String(3 - i).padStart(2, '0')
          return (
            <g key={l.en} className="sysstack-layer">
              <rect x={l.x} y={y} width={l.w} height={LAYER_H} rx={16} style={{ fill: l.fill }} />
              <text x={l.x + 28} y={y + 42} className="sysstack-en">
                {num} · {l.en}
              </text>
              <text x={l.x + 28} y={y + 74} className="sysstack-zh">
                {l.zh}
              </text>
              <text x={l.x + l.w - 28} y={y + 42} textAnchor="end" className="sysstack-items">
                {l.items[0]}
              </text>
              <text x={l.x + l.w - 28} y={y + 68} textAnchor="end" className="sysstack-items">
                {l.items[1]}
              </text>
            </g>
          )
        })}
      </svg>
      <figcaption className="sysstack-caption">
        Design System · 由基礎向上長出的三層
      </figcaption>
    </figure>
  )
}

/* ── BlueprintLanes ──────────────────────────────────────────────────────
   The miaoli-points signature: a three-lane service blueprint. Each role
   (citizen / merchant / admin) runs its own step chain, and a dashed
   integration rail on the right ties all three lanes to one cross-system
   boundary (API sync) — the visual claim that the three flows are ONE
   platform, not three products. Fixed content on purpose. */

export interface BlueprintLane {
  en: string
  zh: string
  fill: string
  steps: string[]
}

const BP_LANES: BlueprintLane[] = [
  { en: 'CITIZEN', zh: '民眾端', fill: 'var(--cv-shape-blue)', steps: ['觸發', '參與', '累積', '使用', '回饋'] },
  { en: 'MERCHANT', zh: '店家端', fill: 'var(--cv-shape-green)', steps: ['接入', '核銷', '管理', '結算'] },
  { en: 'ADMIN', zh: '政府後台', fill: 'var(--card-lavender)', steps: ['配置', '管理', '監控', '分析'] },
]

const BP_LANE_YS = [40, 205, 370]
const BP_LANE_H = 110
const BP_STEP_X0 = 210
const BP_STEP_W = 148
const BP_STEP_H = 56
const BP_STEP_GAP = 32
const BP_RAIL_X = 1108

export function BlueprintLanes({ lanes = BP_LANES }: { lanes?: BlueprintLane[] }) {
  return (
    <figure className="bplanes">
      <svg
        viewBox="0 0 1180 520"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label={`三端服務藍圖：${lanes.map((l) => `${l.zh}（${l.steps.join('→')}）`).join('；')}，右側虛線為跨系統 API 串接邊界`}
      >
        <defs>
          <marker
            id="bp-arrow"
            viewBox="0 0 10 10"
            refX="8.5"
            refY="5"
            markerWidth="6.5"
            markerHeight="6.5"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" className="bplanes-arrowhead" />
          </marker>
        </defs>

        {/* integration rail — one dashed boundary all lanes sync through */}
        <path
          className="bplanes-rail"
          d={`M ${BP_RAIL_X},${BP_LANE_YS[0] + BP_LANE_H / 2} L ${BP_RAIL_X},${BP_LANE_YS[2] + BP_LANE_H / 2}`}
        />
        <text
          className="bplanes-rail-label"
          transform={`translate(1150 260) rotate(90)`}
          textAnchor="middle"
        >
          跨系統串接 · API SYNC
        </text>

        {lanes.map((lane, li) => {
          const laneY = BP_LANE_YS[li]
          const cy = laneY + BP_LANE_H / 2
          const stepY = laneY + (BP_LANE_H - BP_STEP_H) / 2
          const lastRight =
            BP_STEP_X0 + lane.steps.length * BP_STEP_W + (lane.steps.length - 1) * BP_STEP_GAP
          return (
            <g key={lane.en}>
              {/* role sticker */}
              <g className="bplanes-role">
                <rect x={25} y={laneY + 22} width={160} height={76} rx={16} className="bplanes-role-shadow" style={{ fill: lane.fill }} />
                <rect x={20} y={laneY + 17} width={160} height={76} rx={16} className="bplanes-role-card" />
                <text x={100} y={laneY + 47} textAnchor="middle" className="bplanes-en">
                  {String(li + 1).padStart(2, '0')} · {lane.en}
                </text>
                <text x={100} y={laneY + 76} textAnchor="middle" className="bplanes-zh">
                  {lane.zh}
                </text>
              </g>

              {/* step chain */}
              {lane.steps.map((s, i) => {
                const x = BP_STEP_X0 + i * (BP_STEP_W + BP_STEP_GAP)
                return (
                  <g key={s + i} className="bplanes-step">
                    <rect x={x} y={stepY} width={BP_STEP_W} height={BP_STEP_H} rx={14} style={{ fill: lane.fill }} />
                    <text x={x + BP_STEP_W / 2} y={cy + 5.5} textAnchor="middle" className="bplanes-step-label">
                      {s}
                    </text>
                    {i < lane.steps.length - 1 && (
                      <path
                        className="bplanes-edge"
                        d={`M ${x + BP_STEP_W + 4},${cy} L ${x + BP_STEP_W + BP_STEP_GAP - 6},${cy}`}
                        markerEnd="url(#bp-arrow)"
                      />
                    )}
                  </g>
                )
              })}

              {/* stub from the lane's last step to the integration rail */}
              <path
                className="bplanes-stub"
                d={`M ${lastRight + 4},${cy} L ${BP_RAIL_X - 2},${cy}`}
              />
            </g>
          )
        })}
      </svg>
      <figcaption className="bplanes-caption">
        Service Blueprint · 三端流程，一個平台邊界
      </figcaption>
    </figure>
  )
}

/* ── CarbonCycle ─────────────────────────────────────────────────────────
   The taichung-carbon signature: five everyday low-carbon behaviors fan IN
   to the carbon account sticker, convert into reward points, get redeemed
   at the mall — and a dashed arc loops the redemption back to daily
   behavior. Fan-in + chain + loop: behavior becomes a renewable asset.
   Fixed content on purpose. */

const CC_BEHAVIORS = ['搭乘大眾運輸', '健康步行計步', '電子書借閱', '廢電池回收', '線上申辦服務']

const CC_PILL = { x: 30, w: 230, h: 56 }
const CC_PILL_YS = [100, 200, 300, 400, 500]
const CC_CY = 328
const CC_ACCOUNT = { x: 400, y: 263, w: 230, h: 130 }
const CC_POINT = { x: 720, y: 280, w: 190, h: 96 }
const CC_MALL = { x: 970, y: 280, w: 190, h: 96 }

export function CarbonCycle() {
  const inYs = [CC_CY - 40, CC_CY - 20, CC_CY, CC_CY + 20, CC_CY + 40]
  return (
    <figure className="ccycle">
      <svg
        viewBox="0 0 1180 600"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label={`減碳獎勵循環：${CC_BEHAVIORS.join('、')}等日常行為累積進減碳存摺，轉為點數獎勵、於商城兌換，再回到日常行為持續參與`}
      >
        <defs>
          <marker
            id="cc-arrow"
            viewBox="0 0 10 10"
            refX="8.5"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" className="ccycle-arrowhead" />
          </marker>
        </defs>

        {/* fan-in: behaviors → carbon account */}
        {CC_PILL_YS.map((y, i) => (
          <path
            key={`in-${i}`}
            className="ccycle-edge is-in"
            d={`M ${CC_PILL.x + CC_PILL.w},${y + CC_PILL.h / 2} C ${CC_PILL.x + CC_PILL.w + 70},${y + CC_PILL.h / 2} ${CC_ACCOUNT.x - 70},${inYs[i]} ${CC_ACCOUNT.x - 4},${inYs[i]}`}
            markerEnd="url(#cc-arrow)"
          />
        ))}

        {/* chain: account → points → mall */}
        <path
          className="ccycle-edge"
          d={`M ${CC_ACCOUNT.x + CC_ACCOUNT.w + 2},${CC_CY} L ${CC_POINT.x - 6},${CC_CY}`}
          markerEnd="url(#cc-arrow)"
        />
        <path
          className="ccycle-edge"
          d={`M ${CC_POINT.x + CC_POINT.w + 2},${CC_CY} L ${CC_MALL.x - 6},${CC_CY}`}
          markerEnd="url(#cc-arrow)"
        />

        {/* return arc: redemption → back to daily behavior */}
        <path
          className="ccycle-edge is-return"
          d={`M ${CC_MALL.x + CC_MALL.w / 2},${CC_MALL.y - 6} C ${CC_MALL.x + CC_MALL.w / 2},40 ${CC_PILL.x + CC_PILL.w / 2},40 ${CC_PILL.x + CC_PILL.w / 2},${CC_PILL_YS[0] - 10}`}
          markerEnd="url(#cc-arrow)"
        />
        <g className="ccycle-return-label">
          <rect x={490} y={24} width={210} height={30} rx={15} />
          <text x={595} y={44} textAnchor="middle">
            持續參與 · 回到日常行為
          </text>
        </g>

        {/* column caption */}
        <text x={CC_PILL.x + CC_PILL.w / 2} y={82} textAnchor="middle" className="ccycle-col">
          日常低碳行為
        </text>

        {/* behavior pills */}
        {CC_BEHAVIORS.map((b, i) => (
          <g key={b} className="ccycle-behavior">
            <rect x={CC_PILL.x} y={CC_PILL_YS[i]} width={CC_PILL.w} height={CC_PILL.h} rx={16} />
            <circle cx={CC_PILL.x + 32} cy={CC_PILL_YS[i] + CC_PILL.h / 2} r={13} />
            <text x={CC_PILL.x + 32} y={CC_PILL_YS[i] + CC_PILL.h / 2 + 4.5} textAnchor="middle" className="ccycle-idx">
              {String(i + 1).padStart(2, '0')}
            </text>
            <text x={CC_PILL.x + 58} y={CC_PILL_YS[i] + CC_PILL.h / 2 + 5.5} className="ccycle-label">
              {b}
            </text>
          </g>
        ))}

        {/* carbon account — the sticker hub */}
        <g className="ccycle-account">
          <rect x={CC_ACCOUNT.x + 7} y={CC_ACCOUNT.y + 7} width={CC_ACCOUNT.w} height={CC_ACCOUNT.h} rx={16} className="ccycle-account-shadow" />
          <rect x={CC_ACCOUNT.x} y={CC_ACCOUNT.y} width={CC_ACCOUNT.w} height={CC_ACCOUNT.h} rx={16} className="ccycle-account-card" />
          <text x={CC_ACCOUNT.x + CC_ACCOUNT.w / 2} y={CC_ACCOUNT.y + 42} textAnchor="middle" className="ccycle-en">
            CARBON ACCOUNT
          </text>
          <text x={CC_ACCOUNT.x + CC_ACCOUNT.w / 2} y={CC_ACCOUNT.y + 78} textAnchor="middle" className="ccycle-zh">
            減碳存摺
          </text>
          <text x={CC_ACCOUNT.x + CC_ACCOUNT.w / 2} y={CC_ACCOUNT.y + 106} textAnchor="middle" className="ccycle-sub">
            可累積的數位資產
          </text>
        </g>

        {/* points + mall nodes */}
        {[
          { ...CC_POINT, en: 'REWARD POINT', zh: '點數獎勵', fill: 'var(--card-butter)' },
          { ...CC_MALL, en: 'REWARD MALL', zh: '商城兌換', fill: 'var(--card-peach)' },
        ].map((n) => (
          <g key={n.en} className="ccycle-node">
            <rect x={n.x} y={n.y} width={n.w} height={n.h} rx={16} style={{ fill: n.fill }} />
            <text x={n.x + n.w / 2} y={n.y + 40} textAnchor="middle" className="ccycle-en">
              {n.en}
            </text>
            <text x={n.x + n.w / 2} y={n.y + 72} textAnchor="middle" className="ccycle-zh-sm">
              {n.zh}
            </text>
          </g>
        ))}
      </svg>
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
