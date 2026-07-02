'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BRAND, NAV_LINKS } from '@/lib/brand'

/**
 * SiteNav — global header for the inner pages (case study / about / skills /
 * colophon). Carries the same koyama brand identity as the homepage CoverNav
 * (Giselle Lai lockup + G logo pill + main links) but as a SOLID sticky bar,
 * since inner pages scroll and have no hero to overlay. Brand + link set come
 * from the shared lib/brand config so the two navs never drift. Uses the global
 * --cv-* tokens (defined in globals.css :root, available everywhere). Light only.
 */
export default function SiteNav() {
  const pathname = usePathname()

  // The homepage cover ships its own CoverNav (full-bleed), so the global nav
  // must not render on "/".
  if (pathname === '/') return null

  const isActive = (href: string) => {
    // 首頁 is a plain "go home" link — never highlighted as the current page.
    if (href === '/') return false
    if (href === '/#work') return pathname.startsWith('/work')
    return pathname === href
  }

  return (
    <header className="sn" role="banner">
      <div className="sn-row">
        <Link href="/" className="sn-brand" aria-label={`${BRAND.name} — 回到首頁`}>
          <span className="sn-name">{BRAND.name}</span>
          <span className="sn-role">{BRAND.role}</span>
        </Link>

        <div className="sn-right">
          <nav className="sn-menu" aria-label="主要導覽">
            <ul>
              {NAV_LINKS.map((link, i) => (
                <li key={link.label}>
                  {i > 0 && (
                    <span className="sn-sep" aria-hidden="true">·</span>
                  )}
                  <Link
                    href={link.href}
                    className={`sn-link${isActive(link.href) ? ' is-active' : ''}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <Link href="/" className="sn-logo" aria-label={BRAND.name}>
            <span className="sn-logo-mark" aria-hidden="true">
              <svg viewBox="0 0 32 32" width="100%" height="100%" focusable="false">
                <circle cx="16" cy="16" r="15" className="sn-logo-circle" />
                <text
                  x="16"
                  y="16"
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="sn-logo-letter"
                >
                  G
                </text>
              </svg>
            </span>
            <span className="sn-logo-text">{BRAND.name}</span>
          </Link>
        </div>
      </div>

      <style>{`
        .sn {
          position: sticky;
          top: 0;
          z-index: 50;
          background: var(--cv-bg);
          border-bottom: 1px solid var(--cv-ink);
        }
        .sn-row {
          max-width: var(--maxw);
          margin: 0 auto;
          padding: 14px var(--space-lg);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          min-height: var(--site-nav-h);
          box-sizing: border-box;
        }
        .sn-brand {
          display: inline-flex;
          flex-direction: column;
          gap: 2px;
          line-height: 1.1;
          text-decoration: none;
        }
        .sn-name {
          font-family: var(--cv-font-display), 'Noto Sans TC', sans-serif;
          font-weight: 900;
          font-size: 21px;
          letter-spacing: -0.01em;
          color: var(--cv-ink);
        }
        .sn-role {
          font-family: var(--font-mono-stack);
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: var(--cv-ink-soft);
          white-space: nowrap;
        }
        .sn-right {
          display: flex;
          align-items: center;
          gap: 24px;
        }
        .sn-menu ul {
          display: flex;
          align-items: center;
          gap: 8px;
          margin: 0;
          padding: 0;
          list-style: none;
        }
        .sn-menu li {
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .sn-sep {
          color: var(--cv-line);
          user-select: none;
        }
        .sn-link {
          font-family: var(--cv-font-body), 'Noto Sans TC', sans-serif;
          font-weight: 700;
          font-size: 15px;
          color: var(--cv-ink);
          text-decoration: none;
          transition: opacity 160ms ease-out;
        }
        .sn-link:hover { opacity: 0.6; }
        .sn-link.is-active {
          text-decoration: underline;
          text-underline-offset: 5px;
          text-decoration-thickness: 2px;
        }
        .sn-logo {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 4px 16px 4px 4px;
          background: var(--cv-paper);
          border-radius: 9999px;
          box-shadow: var(--cv-shadow-pill);
          text-decoration: none;
          white-space: nowrap;
          transition: transform 240ms ease-out;
        }
        .sn-logo:hover { transform: translateY(-2px); }
        .sn-logo-mark {
          display: inline-flex;
          width: 30px;
          height: 30px;
          flex: 0 0 auto;
        }
        .sn-logo-circle { fill: var(--cv-ink); }
        .sn-logo-letter {
          fill: var(--cv-paper);
          font-family: var(--cv-font-display), 'Noto Sans TC', sans-serif;
          font-weight: 900;
          font-size: 16px;
        }
        .sn-logo-text {
          font-family: var(--cv-font-display), 'Noto Sans TC', sans-serif;
          font-weight: 700;
          font-size: 14px;
          color: var(--cv-ink);
        }
        @media (max-width: 900px) {
          .sn-role { display: none; }
          .sn-logo-text { display: none; }
          .sn-right { gap: 14px; }
          .sn-menu ul { gap: 4px; }
          .sn-link { font-size: 13.5px; }
        }
        @media (max-width: 560px) {
          .sn-row { gap: 12px; }
          .sn-logo { display: none; }
          .sn-menu ul { overflow-x: auto; scrollbar-width: none; }
          .sn-menu ul::-webkit-scrollbar { display: none; }
        }
      `}</style>
    </header>
  )
}
