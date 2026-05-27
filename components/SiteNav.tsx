'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ThemeToggle from './ThemeToggle'

const links = [
  { href: '/', label: '作品' },
  { href: '/about', label: '關於' },
  { href: '/skills', label: '技能' },
]

export default function SiteNav() {
  const pathname = usePathname()

  function isActive(href: string) {
    if (href === '/') return pathname === '/' || pathname.startsWith('/work')
    return pathname === href
  }

  return (
    <nav className="site-nav-wrapper">
      <div className="site-nav container">
        <Link href="/" className="brand">henry.</Link>

        <ul className="nav-pill">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`nav-link${isActive(link.href) ? ' active' : ''}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li><ThemeToggle /></li>
        </ul>
      </div>

      <style>{`
        .site-nav-wrapper {
          position: sticky;
          top: 0;
          z-index: 50;
          background: color-mix(in srgb, var(--bg) 80%, transparent);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border-soft);
        }
        .site-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 10px;
          padding-bottom: 10px;
          min-height: var(--site-nav-h);
        }
        .brand {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 22px;
          letter-spacing: -0.02em;
        }
        .nav-pill {
          display: flex;
          gap: 4px;
          align-items: center;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--r-full);
          padding: 5px;
        }
        .nav-link {
          display: block;
          font-size: 14px;
          font-weight: 500;
          padding: 8px 16px;
          border-radius: var(--r-full);
          transition: background 180ms var(--ease-out), color 180ms var(--ease-out);
        }
        .nav-link:hover { background: var(--card-mint); }
        .nav-link.active { background: var(--text); color: var(--bg); }
      `}</style>
    </nav>
  )
}
