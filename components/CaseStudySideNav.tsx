'use client'

import { useEffect, useState } from 'react'

// Case Study 5 章節核心模板 (2026-05-26: 從 8 章節精簡至 5,Context/Iteration/Impact 移除)
// tag 不用 §符號 (silcrow 對中文讀者陌生),只用純數字
const sections = [
  { id: 'overview', label: 'Overview', tag: '1' },
  { id: 'discovery', label: 'Discovery', tag: '2' },
  { id: 'ia', label: 'IA', tag: '3' },
  { id: 'flow', label: 'Flow', tag: '4' },
  { id: 'solution', label: 'Solution', tag: '5' },
]

/**
 * Scroll-driven active section detection.
 *
 * Why not IntersectionObserver:
 * - Short sections (e.g. Discovery with only 6 insights) can fall below the
 *   observer's effective detection window, causing the active state to skip.
 * - Scroll-driven logic picks "the last heading whose top is above the
 *   active line", which is stable regardless of section height.
 *
 * The active line = viewport top + offset (matches sticky SiteNav height + buffer).
 */
export default function CaseStudySideNav() {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const headings = sections
      .map((s) => ({ id: s.id, el: document.getElementById(s.id) }))
      .filter((h): h is { id: string; el: HTMLElement } => h.el !== null)

    if (headings.length === 0) return

    let frame = 0
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        // active line = top of viewport + offset (site-nav height + visual buffer)
        const offset = 160
        let current = headings[0].id
        for (const h of headings) {
          const top = h.el.getBoundingClientRect().top
          if (top <= offset) current = h.id
          else break
        }
        setActive(current)
      })
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
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
        .case-sidenav { position: sticky; top: calc(var(--site-nav-h) + 12px); align-self: start; height: fit-content; }
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
