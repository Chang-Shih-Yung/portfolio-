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

/**
 * DonutSplit — part-to-whole donut (conic-gradient + ink ring) with a big
 * centre figure and a swatch legend (e.g. 700+ stores = 臺東 630 / 花蓮 100).
 */
export function DonutSplit({
  center,
  centerLabel,
  segments,
  note,
}: {
  /** big figure in the donut hole, e.g. "700+" */
  center: string
  /** small label under the centre figure */
  centerLabel?: string
  /** slices in draw order; pct must sum to ~100 */
  segments: { label: string; value: string; pct: number; color: string }[]
  note?: string
}) {
  let acc = 0
  const stops = segments
    .map((s) => {
      const from = acc
      acc += s.pct
      return `${s.color} ${from}% ${acc}%`
    })
    .join(', ')
  const aria =
    note ?? segments.map((s) => `${s.label} ${s.value}`).join('，')
  return (
    <div className="donutsplit" role="img" aria-label={`${center}：${aria}`}>
      <div
        className="donutsplit-ring"
        style={{ background: `conic-gradient(${stops})` }}
        aria-hidden="true"
      >
        <span className="donutsplit-center">
          <strong>{center}</strong>
          {centerLabel && <em>{centerLabel}</em>}
        </span>
      </div>
      <div className="donutsplit-legend" aria-hidden="true">
        {segments.map((s) => (
          <p key={s.label} className="donutsplit-key">
            <span
              className="donutsplit-swatch"
              style={{ background: s.color }}
            />
            {s.label} <strong>{s.value}</strong>
          </p>
        ))}
        {note && <p className="chart-note">{note}</p>}
      </div>
    </div>
  )
}

/**
 * BridgeFlow — a two-node interop diagram (A →互通→ B). Flow language on
 * purpose: this portfolio sells systems thinking, so even the marketing
 * dashboards speak in flows.
 */
export function BridgeFlow({
  from,
  to,
  via,
  note,
}: {
  from: { title: string; sub?: string }
  to: { title: string; sub?: string }
  /** label on the connector, e.g. "城市幣互通" */
  via: string
  note?: string
}) {
  return (
    <div
      className="bridgeflow"
      role="img"
      aria-label={`${from.title}（${from.sub ?? ''}）透過${via}連到${to.title}（${to.sub ?? ''}）`}
    >
      <div className="bridgeflow-row" aria-hidden="true">
        <span className="bridgeflow-node">
          <strong>{from.title}</strong>
          {from.sub && <em>{from.sub}</em>}
        </span>
        <span className="bridgeflow-link">
          <span className="bridgeflow-via">{via}</span>
          <span className="bridgeflow-arrow">→</span>
        </span>
        <span className="bridgeflow-node is-to">
          <strong>{to.title}</strong>
          {to.sub && <em>{to.sub}</em>}
        </span>
      </div>
      {note && <p className="chart-note">{note}</p>}
    </div>
  )
}

/**
 * FanOut — one-to-many spread diagram (hub → pill cluster), for "expansion"
 * narratives (e.g. 雲林幣 2.0 → 台東/南投/彰化/台中/嘉義 觀摩縣市).
 */
export function FanOut({
  from,
  to,
  via,
  note,
}: {
  from: { title: string; sub?: string }
  /** the spread targets, rendered as outline pills */
  to: string[]
  /** label on the connector, e.g. "跨縣市觀摩" */
  via?: string
  note?: string
}) {
  return (
    <div
      className="fanout"
      role="img"
      aria-label={`${from.title}${via ? `透過${via}` : ''}擴散至${to.join('、')}`}
    >
      <div className="fanout-row" aria-hidden="true">
        <span className="fanout-node">
          <strong>{from.title}</strong>
          {from.sub && <em>{from.sub}</em>}
        </span>
        <span className="fanout-link">
          {via && <span className="fanout-via">{via}</span>}
          <span className="fanout-arrow">→</span>
        </span>
        <span className="fanout-targets">
          {to.map((t) => (
            <span key={t} className="fanout-pill">
              {t}
            </span>
          ))}
        </span>
      </div>
      {note && <p className="chart-note">{note}</p>}
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
