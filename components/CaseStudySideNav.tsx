'use client'

import { useEffect, useState } from 'react'

const sections = [
  { id: 'overview', label: 'Overview', tag: '§1' },
  { id: 'context', label: 'Context', tag: '§2' },
  { id: 'discovery', label: 'Discovery', tag: '§3' },
  { id: 'ia', label: 'IA', tag: '§4' },
  { id: 'flow', label: 'Flow', tag: '§5' },
  { id: 'iteration', label: 'Iteration', tag: '§6' },
  { id: 'solution', label: 'Solution', tag: '§7' },
  { id: 'impact', label: 'Impact', tag: '§8' },
]

export default function CaseStudySideNav() {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const headings = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null)

    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-100px 0px -60% 0px', threshold: 0 }
    )

    for (const h of headings) observer.observe(h)
    return () => observer.disconnect()
  }, [])

  return (
    <aside className="case-sidenav">
      <nav>
        <ul>
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className={`sidenav-link${active === s.id ? ' is-active' : ''}`}
              >
                <span className="sidenav-tag">{s.tag}</span>
                <span className="sidenav-label">{s.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <style>{`
        .case-sidenav { position: sticky; top: 88px; align-self: start; height: fit-content; }
        .case-sidenav ul { display: flex; flex-direction: column; gap: 4px; }
        .sidenav-link {
          display: flex;
          align-items: baseline;
          gap: 12px;
          padding: 8px 14px;
          border-radius: var(--r-sm);
          font-size: 14px;
          color: var(--text-muted);
          transition: color 180ms var(--ease-out), background 180ms var(--ease-out);
        }
        .sidenav-link:hover { color: var(--text); }
        .sidenav-link.is-active {
          color: var(--text);
          background: var(--card-mint);
          font-weight: 500;
        }
        .sidenav-tag {
          font-family: var(--font-mono), ui-monospace, monospace;
          font-size: 11px;
          letter-spacing: 0.04em;
          color: var(--text-subtle);
        }
        .sidenav-link.is-active .sidenav-tag { color: var(--accent); }
        @media (max-width: 900px) {
          .case-sidenav { position: relative; top: 0; }
          .case-sidenav ul {
            flex-direction: row;
            flex-wrap: wrap;
            overflow-x: auto;
            padding-bottom: 8px;
          }
          .sidenav-link { padding: 6px 12px; white-space: nowrap; }
        }
      `}</style>
    </aside>
  )
}
