import * as React from 'react'

/**
 * Stats — the case-study §Highlights dashboard: per-metric cards with a big
 * figure, a coral "×N" sticker chip, and a playful two-column YoY chart
 * (pastel fill + 2px ink outline, grow-up animation). Server-safe; styled by
 * .stats-grid / .stat-* rules in app/globals.css. Column colors rotate per
 * card via --stat-accent (koyama shape palette).
 */
export interface StatColumnDatum {
  /** column label under the baseline, e.g. "2022" */
  year: string
  /** value label above the column, e.g. "約 4,000" */
  value: string
  /** column height in percent of the tallest column (0–100) */
  pct: number
  /** mark the current-period column (pastel fill; others stay muted) */
  now?: boolean
}

export function StatsGrid({ children }: { children: React.ReactNode }) {
  return <div className="stats-grid">{children}</div>
}

/**
 * StatStrip — one horizontal big-number band (§Highlights variant for cases
 * without YoY data): N cells separated by hairlines inside a single koyama
 * card. Acts as the visual rest-stop between Overview and the body.
 */
export function StatStrip({
  items,
}: {
  items: { value: string; label: string; sub?: string }[]
}) {
  return (
    <div className="stat-strip">
      {items.map((it) => (
        <div key={it.label} className="stat-strip-cell">
          <p className="stat-strip-value">{it.value}</p>
          <p className="stat-strip-label">{it.label}</p>
          {it.sub && <p className="stat-strip-sub">{it.sub}</p>}
        </div>
      ))}
    </div>
  )
}

export function StatCard({
  label,
  value,
  chip,
  delta,
  bars,
  ariaLabel,
}: {
  /** mono uppercase metric name */
  label: string
  /** the big display figure */
  value: string
  /** short multiplier sticker, e.g. "×3.5" (coral chip beside the figure) */
  chip?: string
  /** growth sentence under the figure */
  delta: string
  /** YoY columns, e.g. 2022 vs 2024 */
  bars: StatColumnDatum[]
  /** screen-reader summary of the comparison */
  ariaLabel?: string
}) {
  return (
    <div className="stat-card">
      <p className="stat-label">{label}</p>
      <div className="stat-headline">
        <p className="stat-num">{value}</p>
        {chip && (
          <span className="stat-chip" aria-hidden="true">
            {chip}
          </span>
        )}
      </div>
      <p className="stat-delta">{delta}</p>
      <div
        className="stat-cols"
        role="img"
        aria-label={ariaLabel ?? `${label}：${delta}`}
      >
        {bars.map((b) => (
          <div key={b.year} className="stat-col">
            <span className="stat-col-val">{b.value}</span>
            <span
              className={`stat-col-bar${b.now ? ' is-now' : ''}`}
              style={{ height: `${b.pct}%` }}
            />
            <span className="stat-col-year">{b.year}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
