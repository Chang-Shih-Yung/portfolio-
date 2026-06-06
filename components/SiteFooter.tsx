'use client'

import { usePathname } from 'next/navigation'

export default function SiteFooter() {
  const pathname = usePathname()

  // The homepage cover is full-bleed (its own cityscape footer chrome), so the
  // global SiteFooter must not render on "/".
  if (pathname === '/') return null

  return (
    <footer className="site-footer">
      <div className="container site-footer-inner">
        <span>© 2026 Giselle Lai</span>
        <span className="site-footer-links">
          <a href="/colophon">Colophon</a>
          <a href="#">LinkedIn</a>
          <a href="#">Resume</a>
        </span>
      </div>

      <style>{`
        .site-footer {
          border-top: 1px solid var(--border-soft);
          padding: 32px 0;
          font-family: var(--font-mono-stack);
          font-size: 12px;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: var(--text-muted);
        }
        .site-footer-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .site-footer-links { display: flex; gap: 20px; }
        .site-footer a { transition: color 120ms linear; }
        .site-footer a:hover { color: var(--accent); }
      `}</style>
    </footer>
  )
}
