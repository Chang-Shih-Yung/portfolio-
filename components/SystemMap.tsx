/**
 * 南投數位生活點數平台 · System map
 *
 * 純手寫 SVG ── 棄用 Mermaid 因為:
 *   - Mermaid 11 對 CJK label measure 不穩定 (foreignObject width=80 truncate)
 *   - 同步 measure/render 字體有 known issue
 *   - 對單一靜態 system map,hand-rolled SVG 給更好的視覺控制
 *
 * 所有顏色 / 字型 / 邊距走 design token (var(--card-*) / var(--text) / var(--space-*))。
 * 純 server component ── 無 state、無 effect。
 */

type RoleNode = { id: string; label: string; cx: number; cy: number }
type PageNode = {
  id: string
  label: string
  x: number
  y: number
  variant: 'page' | 'merchant'
}
type EdgeShape = {
  id: string
  d: string
  label?: { text: string; x: number; y: number }
  dashed?: boolean
}

const ROLES: RoleNode[] = [
  { id: 'visitor', label: '訪客', cx: 460, cy: 70 },
  { id: 'merchant-role', label: '合作商家', cx: 1100, cy: 70 },
  { id: 'member', label: '居民會員', cx: 440, cy: 360 },
]

const PAGES: PageNode[] = [
  // Row 1 (visitor reachable)
  { id: 'login', label: '登入 / 註冊', x: 260, y: 180, variant: 'page' },
  { id: 'visitor-preview', label: '訪客模式預覽', x: 500, y: 180, variant: 'page' },
  { id: 'merchant-apply', label: '特店申請', x: 1020, y: 180, variant: 'merchant' },
  // Row 2 (member entries)
  { id: 'home', label: '首頁與點數', x: 60, y: 470, variant: 'page' },
  { id: 'news', label: '縣政消息', x: 240, y: 470, variant: 'page' },
  { id: 'tasks', label: '賺點任務', x: 420, y: 470, variant: 'page' },
  { id: 'map', label: '好康地圖', x: 640, y: 470, variant: 'page' },
  { id: 'settings', label: '會員設定', x: 840, y: 470, variant: 'page' },
]

const NODE_W = 160
const NODE_H = 60
const ROLE_R = 44

// Edge geometry — Bézier curves for visual flow
const EDGES: EdgeShape[] = [
  // Visitor → login (labeled "註冊")
  {
    id: 'visitor-login',
    d: 'M 440,108 C 400,140 340,150 340,180',
    label: { text: '註冊', x: 360, y: 150 },
  },
  // Visitor → visitor-preview (labeled "瀏覽")
  {
    id: 'visitor-preview',
    d: 'M 480,108 C 520,140 580,150 580,180',
    label: { text: '瀏覽', x: 560, y: 150 },
  },
  // Login → member
  {
    id: 'login-member',
    d: 'M 340,240 C 340,290 440,290 440,316',
  },
  // Merchant role → merchant apply (straight down)
  {
    id: 'merchantrole-apply',
    d: 'M 1100,114 L 1100,180',
  },
  // Member → 5 pages
  {
    id: 'member-home',
    d: 'M 410,395 C 350,430 140,440 140,470',
  },
  {
    id: 'member-news',
    d: 'M 420,402 C 400,440 320,450 320,470',
  },
  {
    id: 'member-tasks',
    d: 'M 440,404 L 500,470',
  },
  {
    id: 'member-map',
    d: 'M 470,400 C 510,440 720,450 720,470',
  },
  {
    id: 'member-settings',
    d: 'M 478,390 C 530,425 920,445 920,470',
  },
  // Merchant apply ⇢ map (dashed, labeled)
  {
    id: 'apply-map',
    d: 'M 1080,240 C 1080,370 720,420 720,470',
    dashed: true,
    label: { text: '上架的店家進入', x: 880, y: 380 },
  },
]

export default function SystemMap() {
  return (
    <figure className="system-map-figure">
      <svg
        viewBox="0 0 1200 600"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="南投數位生活點數平台 system map — 8 page × 3 role"
        className="system-map-svg"
      >
        <defs>
          <marker
            id="arrow"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" className="arrow-head" />
          </marker>
        </defs>

        {/* Edges (drawn first so nodes overlap nicely) */}
        {EDGES.map((e) => (
          <g key={e.id} className={`edge${e.dashed ? ' edge-dashed' : ''}`}>
            <path d={e.d} markerEnd="url(#arrow)" />
            {e.label && (
              <g className="edge-label">
                {/* Background pill — width auto-fitted via text length is non-trivial in static SVG;
                    we render a fixed-width pill that comfortably fits short labels. */}
                <rect
                  x={e.label.x - measureWidth(e.label.text) / 2 - 8}
                  y={e.label.y - 10}
                  width={measureWidth(e.label.text) + 16}
                  height={20}
                  rx={10}
                />
                <text x={e.label.x} y={e.label.y + 4} textAnchor="middle">
                  {e.label.text}
                </text>
              </g>
            )}
          </g>
        ))}

        {/* Role circles */}
        {ROLES.map((r) => (
          <g key={r.id} className="node node-role">
            <circle cx={r.cx} cy={r.cy} r={ROLE_R} />
            <text x={r.cx} y={r.cy + 5} textAnchor="middle">
              {r.label}
            </text>
          </g>
        ))}

        {/* Page rectangles */}
        {PAGES.map((p) => (
          <g key={p.id} className={`node node-${p.variant}`}>
            <rect x={p.x} y={p.y} width={NODE_W} height={NODE_H} rx={12} />
            <text x={p.x + NODE_W / 2} y={p.y + NODE_H / 2 + 5} textAnchor="middle">
              {p.label}
            </text>
          </g>
        ))}
      </svg>
      <figcaption className="system-map-caption">
        System map · 8 page × 3 role
      </figcaption>

      <style>{`
        .system-map-figure {
          margin: var(--space-lg) 0;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--r-lg);
          padding: var(--space-lg);
        }
        .system-map-svg {
          width: 100%;
          height: auto;
          display: block;
          font-family: var(--font-body), "PingFang TC", "Heiti TC", "Microsoft JhengHei", sans-serif;
        }

        /* ─── Nodes ─── */
        .node circle,
        .node rect {
          stroke: var(--text);
          stroke-width: 1.2;
        }
        .node-role circle { fill: var(--card-peach); }
        .node-page rect { fill: var(--card-mint); }
        .node-merchant rect { fill: var(--card-lavender); }
        .node text {
          fill: var(--text);
          font-size: 15px;
          font-weight: 500;
        }

        /* ─── Edges ─── */
        .edge path {
          fill: none;
          stroke: var(--text-muted);
          stroke-width: 1.5;
        }
        .edge-dashed path { stroke-dasharray: 4 4; }
        .arrow-head {
          fill: var(--text-muted);
          stroke: none;
        }

        /* Edge labels — pill background + mono uppercase text */
        .edge-label rect {
          fill: var(--bg);
          stroke: var(--border);
          stroke-width: 1;
        }
        .edge-label text {
          font-family: var(--font-mono), ui-monospace, monospace;
          font-size: 11px;
          fill: var(--text-muted);
          letter-spacing: 0.04em;
        }

        /* ─── Caption ─── */
        .system-map-caption {
          margin-top: var(--space-md);
          text-align: center;
          font-family: var(--font-mono), ui-monospace, monospace;
          font-size: 12px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--text-muted);
        }

        @media (max-width: 640px) {
          .system-map-figure { padding: var(--space-md); }
          .node text { font-size: 13px; }
        }
      `}</style>
    </figure>
  )
}

/**
 * Rough CJK-aware width estimate for label pill backgrounds.
 * Mixed Latin + CJK: count CJK chars at 14px, Latin at 7px.
 */
function measureWidth(text: string): number {
  let width = 0
  for (const ch of text) {
    // CJK Unified Ideographs + Hiragana + Katakana + Hangul ranges
    const code = ch.codePointAt(0) ?? 0
    if (
      (code >= 0x4e00 && code <= 0x9fff) ||
      (code >= 0x3040 && code <= 0x30ff) ||
      (code >= 0xac00 && code <= 0xd7af)
    ) {
      width += 14
    } else {
      width += 7
    }
  }
  return width
}
