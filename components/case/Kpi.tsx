import * as React from 'react'

/**
 * Kpi — the case-study outcome dashboard (§Results): a grid of cards,
 * each led by a big figure, then a title + supporting line. Server-safe;
 * styled by .kpi-* rules in app/globals.css.
 */
export function KpiGrid({ children }: { children: React.ReactNode }) {
  return <div className="kpi-grid">{children}</div>
}

export function KpiCard({
  figure,
  title,
  children,
}: {
  /** the big number / headline figure, e.g. "近 12 萬" */
  figure: string
  /** short outcome title */
  title: string
  /** supporting sentence(s) */
  children: React.ReactNode
}) {
  return (
    <div className="kpi-card">
      <p className="kpi-figure">{figure}</p>
      <h3 className="kpi-title">{title}</h3>
      <div className="kpi-body">{children}</div>
    </div>
  )
}
