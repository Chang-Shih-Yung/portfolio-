'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BRAND } from '@/lib/brand'

/**
 * SiteFooter — global footer for the inner pages. koyama brand tone (beige base,
 * ink hairline, Giselle Lai lockup) to match SiteNav / the homepage cover. Uses
 * the global --cv-* tokens. Hidden on "/" (the cover ships its own footer).
 */
export default function SiteFooter() {
  const pathname = usePathname()
  if (pathname === '/') return null

  return (
    <footer className="sf" role="contentinfo">
      <div className="sf-row">
        <Link href="/" className="sf-brand" aria-label={`${BRAND.name} — 回到首頁`}>
          {BRAND.name}
        </Link>

        <nav className="sf-nav" aria-label="頁尾導覽">
          <Link href="/about">關於</Link>
          <Link href="/skills">技能</Link>
          <Link href="/colophon">設計系統</Link>
          <a href="#">LinkedIn</a>
        </nav>

        <span className="sf-copy">© 2026 {BRAND.name}</span>
      </div>

      <style>{`
        .sf {
          background: var(--cv-bg);
          border-top: 1px solid var(--cv-ink);
          margin-top: 96px;
        }
        .sf-row {
          max-width: var(--maxw);
          margin: 0 auto;
          padding: 40px var(--space-lg);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          flex-wrap: wrap;
          box-sizing: border-box;
        }
        .sf-brand {
          font-family: var(--cv-font-display), 'Noto Sans TC', sans-serif;
          font-weight: 900;
          font-size: 20px;
          letter-spacing: -0.01em;
          color: var(--cv-ink);
          text-decoration: none;
        }
        .sf-nav {
          display: flex;
          gap: 22px;
          flex-wrap: wrap;
        }
        .sf-nav a {
          font-family: var(--cv-font-body), 'Noto Sans TC', sans-serif;
          font-weight: 700;
          font-size: 14px;
          color: var(--cv-ink);
          text-decoration: none;
          transition: opacity 160ms ease-out;
        }
        .sf-nav a:hover { opacity: 0.6; }
        .sf-copy {
          font-family: var(--font-mono-stack);
          font-size: 11px;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: var(--cv-ink-soft);
        }
        @media (max-width: 640px) {
          .sf-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }
        }
      `}</style>
    </footer>
  )
}
