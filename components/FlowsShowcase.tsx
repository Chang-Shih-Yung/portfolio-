'use client'

import { useEffect, useState } from 'react'
import FigmaEmbed from './FigmaEmbed'

export type Flow = {
  /** anchor id, used by chip nav scroll-to */
  id: string
  /** display number, e.g. "0", "1.1", "4.2" */
  number: string
  /** flow title */
  title: string
  /** 1-2 sentence subtitle / blurb */
  blurb: string
  /** chip label (short, optional — falls back to title) */
  chipLabel?: string
  /** Figma embed config; pass null for placeholder flow without artifact yet */
  figma: {
    fileKey: string
    nodeId: string
    fileName?: string
  } | null
  /** key UX decisions worth calling out (2-4 bullets) */
  decisions: string[]
}

const COLOR_CYCLE = ['mint', 'peach', 'butter', 'lavender'] as const
type CardColor = (typeof COLOR_CYCLE)[number]

export default function FlowsShowcase({ flows }: { flows: Flow[] }) {
  const [active, setActive] = useState<string | null>(flows[0]?.id ?? null)

  useEffect(() => {
    const targets = flows
      .map((f) => document.getElementById(f.id))
      .filter((el): el is HTMLElement => el !== null)
    if (targets.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-160px 0px -60% 0px', threshold: 0 }
    )

    for (const t of targets) observer.observe(t)
    return () => observer.disconnect()
  }, [flows])

  function scrollTo(id: string) {
    const el = document.getElementById(id)
    if (!el) return
    const y = el.getBoundingClientRect().top + window.scrollY - 96
    window.scrollTo({ top: y, behavior: 'smooth' })
  }

  return (
    <div className="flows">
      {/* ─── Sticky chip nav: 10+ flows 不會迷路 ─── */}
      <nav className="flows-nav" aria-label="Flow index">
        <div className="flows-nav-scroll">
          {flows.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => scrollTo(f.id)}
              className={`flow-chip${active === f.id ? ' is-active' : ''}`}
            >
              <span className="flow-chip-num">{f.number}</span>
              <span className="flow-chip-label">{f.chipLabel ?? f.title}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* ─── Flow cards ─── */}
      <div className="flow-list">
        {flows.map((f, i) => {
          const color: CardColor = COLOR_CYCLE[i % COLOR_CYCLE.length]
          return (
            <article
              key={f.id}
              id={f.id}
              className={`flow-card flow-card--${color}`}
            >
              <header className="flow-card-head">
                <span className="flow-card-num">Flow · {f.number}</span>
                <h3 className="flow-card-title">{f.title}</h3>
                <p className="flow-card-blurb">{f.blurb}</p>
              </header>

              {f.figma ? (
                <div className="flow-card-embed">
                  <FigmaEmbed
                    fileKey={f.figma.fileKey}
                    nodeId={f.figma.nodeId}
                    fileName={f.figma.fileName}
                    title={`${f.number} ${f.title}`}
                  />
                </div>
              ) : (
                <div className="flow-card-placeholder">
                  <strong>TODO · Figma flow</strong>
                  待補上 Figma node — 在 nantou-points.flows.ts 把 figma: null 換成{' '}
                  {`{ fileKey, nodeId, fileName }`}
                </div>
              )}

              {f.decisions.length > 0 && (
                <div className="flow-card-decisions">
                  <p className="flow-card-decisions-label">Key decisions</p>
                  <ul>
                    {f.decisions.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </div>
              )}
            </article>
          )
        })}
      </div>

      <style>{`
        .flows { margin-top: var(--space-md); }

        /* ─── Sticky chip nav (compact,跟 SiteNav 合計約 100px) ─── */
        .flows-nav {
          position: sticky;
          top: var(--sticky-offset);
          z-index: 20;
          margin: 0 calc(var(--space-md) * -1) var(--space-xl);
          padding: 6px var(--space-md);
          background: color-mix(in srgb, var(--bg) 88%, transparent);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border-soft);
        }
        .flows-nav-scroll {
          display: flex;
          gap: 6px;
          overflow-x: auto;
          scrollbar-width: none;
          scroll-snap-type: x proximity;
        }
        .flows-nav-scroll::-webkit-scrollbar { display: none; }

        .flow-chip {
          display: inline-flex;
          align-items: baseline;
          gap: 7px;
          flex-shrink: 0;
          padding: 5px 12px;
          border-radius: var(--r-full);
          border: 1px solid var(--border);
          background: var(--surface);
          color: var(--text-muted);
          font-size: 12.5px;
          font-weight: 500;
          scroll-snap-align: start;
          transition: all 200ms var(--ease-out);
          cursor: pointer;
        }
        .flow-chip:hover {
          color: var(--text);
          border-color: var(--text);
        }
        .flow-chip.is-active {
          background: var(--text);
          color: var(--bg);
          border-color: var(--text);
        }
        .flow-chip-num {
          font-family: var(--font-mono), ui-monospace, monospace;
          font-size: 11px;
          letter-spacing: 0.04em;
        }
        .flow-chip.is-active .flow-chip-num {
          color: var(--accent);
        }

        /* ─── Flow card list ─── */
        .flow-list { display: flex; flex-direction: column; gap: var(--space-xl); }

        .flow-card {
          padding: var(--space-xl);
          border-radius: var(--r-xl);
          border: 1px solid var(--border);
          scroll-margin-top: 140px;
        }
        .flow-card--mint     { background: var(--card-mint); }
        .flow-card--peach    { background: var(--card-peach); }
        .flow-card--butter   { background: var(--card-butter); }
        .flow-card--lavender { background: var(--card-lavender); }

        .flow-card-head { margin-bottom: var(--space-lg); max-width: 60ch; }
        .flow-card-num {
          display: inline-block;
          font-family: var(--font-mono), ui-monospace, monospace;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text);
          opacity: 0.7;
          background: color-mix(in srgb, var(--bg) 60%, transparent);
          padding: 6px 12px;
          border-radius: var(--r-full);
          margin-bottom: var(--space-sm);
        }
        .flow-card-title {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 30px;
          line-height: 1.15;
          letter-spacing: -0.018em;
          margin-bottom: var(--space-sm);
          color: var(--text);
        }
        .flow-card-blurb {
          font-size: 17px;
          line-height: 1.55;
          color: var(--text);
          opacity: 0.78;
        }

        .flow-card-embed { margin-bottom: var(--space-lg); }

        .flow-card-placeholder {
          background: color-mix(in srgb, var(--bg) 70%, transparent);
          border: 1px dashed var(--border);
          border-radius: var(--r-lg);
          padding: var(--space-lg);
          color: var(--text-muted);
          font-size: 14px;
          margin-bottom: var(--space-lg);
        }
        .flow-card-placeholder strong {
          display: block;
          color: var(--text);
          margin-bottom: var(--space-xs);
          font-family: var(--font-mono), ui-monospace, monospace;
          font-size: 12px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .flow-card-decisions {
          background: color-mix(in srgb, var(--bg) 55%, transparent);
          border-radius: var(--r-md);
          padding: var(--space-md) var(--space-lg);
        }
        .flow-card-decisions-label {
          font-family: var(--font-mono), ui-monospace, monospace;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text);
          opacity: 0.7;
          margin-bottom: var(--space-sm);
        }
        .flow-card-decisions ul {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .flow-card-decisions li {
          font-size: 15px;
          line-height: 1.55;
          padding-left: 18px;
          position: relative;
          color: var(--text);
          list-style: none;
        }
        .flow-card-decisions li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 9px;
          width: 6px;
          height: 6px;
          border-radius: var(--r-full);
          background: var(--text);
          opacity: 0.6;
        }

        @media (max-width: 900px) {
          .flow-card { padding: var(--space-lg); border-radius: var(--r-lg); }
          .flow-card-title { font-size: 24px; }
        }
      `}</style>
    </div>
  )
}
