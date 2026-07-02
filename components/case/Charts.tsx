import * as React from 'react'

/**
 * Charts — small playful data-viz primitives for the case-study dashboards
 * (koyama language: pastel fills, 2px ink outlines, mono annotations).
 * Server-safe (no hooks); styled by .dotmatrix / .ratiosplit / .comparebar
 * rules in app/globals.css. Every visual encodes REAL numbers only.
 */

/** DotMatrix — "one dot = one unit" pictogram grid (e.g. 70 partner stores). */
export function DotMatrix({
  count,
  perRow = 10,
  overflow = false,
  note,
}: {
  /** number of dots to draw */
  count: number
  perRow?: number
  /** append a "+" tile after the last dot (e.g. for "70+") */
  overflow?: boolean
  /** annotation under the grid, also the aria description */
  note: string
}) {
  return (
    <div className="dotmatrix" role="img" aria-label={note}>
      <div
        className="dotmatrix-grid"
        style={{ gridTemplateColumns: `repeat(${perRow}, 1fr)` }}
        aria-hidden="true"
      >
        {Array.from({ length: count }, (_, i) => (
          <span key={i} className="dotmatrix-dot" />
        ))}
        {overflow && <span className="dotmatrix-plus">+</span>}
      </div>
      <p className="chart-note">{note}</p>
    </div>
  )
}

/** RatioSplit — a capsule split by real proportions (e.g. 消費500 / 回饋500). */
export function RatioSplit({
  left,
  right,
  note,
}: {
  left: { label: string; pct?: number }
  right: { label: string; pct?: number }
  note: string
}) {
  const l = left.pct ?? 50
  const r = right.pct ?? 100 - l
  return (
    <div className="ratiosplit" role="img" aria-label={note}>
      <div className="ratiosplit-pill" aria-hidden="true">
        <span className="ratiosplit-left" style={{ width: `${l}%` }}>
          {left.label}
        </span>
        <span className="ratiosplit-right" style={{ width: `${r}%` }}>
          {right.label}
        </span>
      </div>
      <p className="chart-note">{note}</p>
    </div>
  )
}

export interface CompareRowDatum {
  label: string
  /** value label at the end of the bar */
  value: string
  /** bar length in percent of the longest row (0–100) */
  pct: number
  /** pastel-filled emphasis row (others stay muted) */
  now?: boolean
}

/** CompareBar — horizontal magnitude comparison (e.g. 已消費 vs 待使用). */
export function CompareBar({
  rows,
  note,
}: {
  rows: CompareRowDatum[]
  note?: string
}) {
  return (
    <div
      className="comparebar"
      role="img"
      aria-label={note ?? rows.map((r) => `${r.label} ${r.value}`).join('，')}
    >
      {rows.map((r) => (
        <div key={r.label} className="comparebar-row" aria-hidden="true">
          <span className="comparebar-label">{r.label}</span>
          <span className="comparebar-track">
            <span
              className={`comparebar-fill${r.now ? ' is-now' : ''}`}
              style={{ width: `${r.pct}%` }}
            />
          </span>
          <span className="comparebar-val">{r.value}</span>
        </div>
      ))}
      {note && <p className="chart-note">{note}</p>}
    </div>
  )
}
