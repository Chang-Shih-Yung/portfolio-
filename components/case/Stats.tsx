import * as React from 'react'

/**
 * Stats — the case-study "dashboard" stat cards (§Highlights): a big
 * figure + growth delta + a YoY horizontal-bar comparison. Server-safe
 * (no hooks); styled by .stats-grid / .stat-* rules in app/globals.css.
 */
export interface StatBarDatum {
  /** row label, e.g. "2022" */
  year: string
  /** value label shown at the row end, e.g. "約 4,000" */
  value: string
  /** bar width in percent of the widest bar (0–100) */
  pct: number
  /** mark the current-period row (ink bar) */
  now?: boolean
}

export function StatsGrid({ children }: { children: React.ReactNode }) {
  return <div className="stats-grid">{children}</div>
}

export function StatCard({
  label,
  value,
  delta,
  bars,
  ariaLabel,
}: {
  /** mono uppercase metric name */
  label: string
  /** the big display figure */
  value: string
  /** growth sentence under the figure */
  delta: string
  /** comparison rows, e.g. 2022 vs 2024 */
  bars: StatBarDatum[]
  /** screen-reader summary of the comparison */
  ariaLabel?: string
}) {
  return (
    <div className="stat-card">
      <p className="stat-label">{label}</p>
      <p className="stat-num">{value}</p>
      <p className="stat-delta">{delta}</p>
      <div className="stat-bars" role="img" aria-label={ariaLabel ?? `${label}：${delta}`}>
        {bars.map((b) => (
          <div key={b.year} className={`stat-bar${b.now ? ' is-now' : ''}`}>
            <span className="stat-bar-year">{b.year}</span>
            <span className="stat-bar-track">
              <span className="stat-bar-fill" style={{ width: `${b.pct}%` }} />
            </span>
            <span className="stat-bar-val">{b.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
