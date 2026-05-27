import Link from 'next/link'
import FlowDiagram from './FlowDiagram'
import type { CaseRecord } from '@/lib/cases'

const cardBgVar: Record<NonNullable<CaseRecord['cardColor']>, string> = {
  mint: 'var(--card-mint)',
  peach: 'var(--card-peach)',
  butter: 'var(--card-butter)',
  lavender: 'var(--card-lavender)',
  dark: 'var(--card-black)',
}

// 預留擴充 slot 的色彩輪替
const placeholderColors: Array<NonNullable<CaseRecord['cardColor']>> = [
  'mint',
  'butter',
  'dark',
]

/**
 * Unified bento grid ── 所有 case 共處一個 grid。
 * 旗艦 (featured: true) 自動放第一格,大占 col-span 8 / row-span 2。
 * 其他 cases 各占 col-span 4。
 * 視覺 hierarchy 全由「尺寸」做,沒有 "Featured / More Work" 標題分區。
 * Placeholder cards 補滿到 6 格,給「未來會擴充」的視覺暗示。
 */
export default function CasesGrid({ cases }: { cases: CaseRecord[] }) {
  // 旗艦永遠排第一,其他按 order asc
  const sorted = [...cases].sort((a, b) => {
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1
    return a.order - b.order
  })

  // 補滿到 6 cards (1 旗艦 + 5 supporting) ── hero 旁邊 2 個 + 下一行 3 個,
  // demo「一行三個」的視覺 rhythm。User 加新 case 後 placeholder 自動減少。
  const needed = Math.max(0, 6 - sorted.length)
  const placeholders = Array.from({ length: needed }, (_, i) => ({
    key: `placeholder-${i}`,
    color: placeholderColors[i % placeholderColors.length],
  }))

  return (
    <section className="cases-grid">
      {sorted.map((c) => {
        const isHero = c.featured
        const isDark = c.cardColor === 'dark'
        return (
          <Link
            key={c.slug}
            href={`/work/${c.slug}`}
            data-size={isHero ? 'hero' : 'small'}
            className={`case-card${isDark ? ' is-dark' : ''}`}
            style={{ background: cardBgVar[c.cardColor ?? 'mint'] }}
          >
            <div className="thumb">
              {isHero ? (
                <FlowDiagram />
              ) : (
                <span className="thumb-pill">{c.domain}</span>
              )}
            </div>
            <div className="card-content">
              <h2 className="card-title">{c.title}</h2>
              <p className="card-subtitle">{c.subtitle}</p>
              {isHero && (
                <div className="chip-row">
                  <span className="chip">{c.role}</span>
                  <span className="chip">{c.year}</span>
                  <span className="chip chip-accent">閱讀案例 →</span>
                </div>
              )}
            </div>
          </Link>
        )
      })}

      {placeholders.map(({ key, color }) => {
        const isDark = color === 'dark'
        return (
          <div
            key={key}
            data-size="small"
            className={`case-card placeholder${isDark ? ' is-dark' : ''}`}
            style={{ background: cardBgVar[color] }}
            aria-hidden
          >
            <div className="thumb placeholder-thumb">
              <span className="thumb-pill">案例準備中</span>
            </div>
            <div className="card-content">
              <h2 className="card-title">案例 — 標題待補</h2>
              <p className="card-subtitle">案例描述一行字將顯示於此。</p>
            </div>
          </div>
        )
      })}

      <style>{`
        .cases-grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          grid-auto-rows: minmax(280px, auto);
          gap: 20px;
          padding: 56px 0 96px;
        }
        .case-card {
          color: var(--text);
          display: flex;
          flex-direction: column;
          gap: 20px;
          overflow: hidden;
          transition: transform 280ms var(--ease-out);
        }
        .case-card.is-dark { color: var(--on-dark); }
        .case-card:not(.placeholder):hover { transform: translateY(-4px); }
        .case-card.placeholder { cursor: default; }

        /* HERO ── 旗艦案 (col 1-8, row 1-2) */
        .case-card[data-size="hero"] {
          grid-column: span 8;
          grid-row: span 2;
          padding: 40px;
          border-radius: var(--r-xl);
          gap: 28px;
        }
        .case-card[data-size="hero"] .thumb {
          flex: 1;
          min-height: 280px;
          padding: 24px;
        }
        .case-card[data-size="hero"] .card-title {
          font-size: 36px;
          line-height: 1.05;
          letter-spacing: -0.025em;
        }
        .case-card[data-size="hero"] .card-subtitle {
          font-size: 17px;
          max-width: 50ch;
          line-height: 1.55;
        }

        /* SMALL ── 其他案 (col-span 4) */
        .case-card[data-size="small"] {
          grid-column: span 4;
          padding: 28px;
          border-radius: var(--r-lg);
        }
        .case-card[data-size="small"] .card-title {
          font-size: 22px;
          line-height: 1.15;
          letter-spacing: -0.02em;
        }
        .case-card[data-size="small"] .card-subtitle {
          font-size: 14px;
          line-height: 1.5;
        }

        /* THUMB ── 縮圖容器 */
        .thumb {
          flex: 1;
          background: rgba(255, 255, 255, 0.5);
          border-radius: var(--r-md);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .case-card.is-dark .thumb { background: rgba(255, 255, 255, 0.06); }
        .placeholder-thumb {
          background-image: repeating-linear-gradient(
            45deg,
            transparent,
            transparent 8px,
            rgba(0,0,0,0.05) 8px,
            rgba(0,0,0,0.05) 16px
          );
        }
        .case-card.is-dark .placeholder-thumb {
          background-image: repeating-linear-gradient(
            45deg,
            transparent,
            transparent 8px,
            rgba(255,255,255,0.04) 8px,
            rgba(255,255,255,0.04) 16px
          );
        }
        .thumb-pill {
          font-family: var(--font-mono), ui-monospace, monospace;
          font-size: 10px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          background: rgba(255, 255, 255, 0.9);
          color: var(--text);
          padding: 6px 12px;
          border-radius: var(--r-full);
        }

        /* CONTENT */
        .card-content { display: flex; flex-direction: column; gap: 12px; }
        .case-card[data-size="hero"] .card-content { gap: 16px; }
        .card-title {
          font-family: var(--font-display);
          font-weight: 700;
        }
        .card-subtitle { opacity: 0.72; }

        /* CHIPS (only on hero) */
        .chip-row { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 4px; }
        .chip {
          font-family: var(--font-mono), ui-monospace, monospace;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          background: var(--surface);
          color: var(--text);
          padding: 7px 14px;
          border-radius: var(--r-full);
          white-space: nowrap;
        }
        .chip-accent { background: var(--text); color: var(--bg); }

        /* TABLET ── 旗艦縮成 col-span 6,失去 row-span 2 */
        @media (max-width: 1024px) {
          .cases-grid {
            grid-template-columns: repeat(6, 1fr);
            grid-auto-rows: auto;
          }
          .case-card[data-size="hero"] {
            grid-column: span 6;
            grid-row: span 1;
            padding: 36px;
          }
          .case-card[data-size="hero"] .thumb { min-height: 240px; }
          .case-card[data-size="hero"] .card-title { font-size: 32px; }
          .case-card[data-size="small"] { grid-column: span 3; }
        }

        /* MOBILE ── 單欄堆疊 */
        @media (max-width: 640px) {
          .cases-grid {
            grid-template-columns: 1fr;
            gap: 16px;
            padding: 32px 0 64px;
          }
          .case-card[data-size="hero"],
          .case-card[data-size="small"] {
            grid-column: span 1;
            grid-row: span 1;
          }
          .case-card[data-size="hero"] {
            padding: 28px;
            border-radius: var(--r-lg);
          }
          .case-card[data-size="hero"] .card-title { font-size: 28px; }
          .case-card[data-size="hero"] .thumb { min-height: 200px; padding: 16px; }
        }
      `}</style>
    </section>
  )
}
