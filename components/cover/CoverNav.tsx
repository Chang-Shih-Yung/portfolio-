'use client'

import { useEffect, useState } from 'react'
import { BRAND, NAV_LINKS } from '@/lib/brand'

/* NOTE: cover nav uses plain <a>, not next/link <Link>. styled-jsx only attaches
   its scope class to lowercase host elements — a capitalized <Link> renders an
   <a> WITHOUT the scope class, so none of this component's .cv-* styles would
   apply to it. Plain <a> (full-page nav) keeps every styled-jsx rule working. */

/**
 * CoverNav — the cover navigation.
 *
 * DESKTOP / TABLET (>=768): a transparent top bar OVERLAID on the hero
 *   (position:absolute, z var(--cv-z-nav)). Brand lockup left, a single row of
 *   main links + a white logo pill on the right. No dot.
 *
 * MOBILE (<768): the top bar collapses to a CENTERED brand only (links + logo
 *   hidden), and the main links move to a FIXED BOTTOM TAB BAR — mirroring the
 *   reference site (koyama-sendai.org).
 */

// Main nav = shared brand config (single source of truth with SiteNav). The
// mobile tab bar reuses it with the last item relabelled 更多 (matches the
// koyama reference's bottom-tab convention).
const mainLinks = NAV_LINKS
const tabLinks = NAV_LINKS.map((link, i) =>
  i === NAV_LINKS.length - 1 ? { ...link, label: '更多' } : link,
)

export default function CoverNav() {
  // sticky header: transparent + borderless over the hero, gains a solid beige
  // background + black hairline once the page is scrolled (mirrors the reference).
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header className={`cv-nav${scrolled ? ' is-scrolled' : ''}`} role="banner">
        <div className="cv-nav__row">
          {/* brand lockup */}
          <a href="/" className="cv-brand" aria-label="Giselle Lai — 回到首頁">
            <span className="cv-brand__name">{BRAND.name}</span>
            <span className="cv-brand__role">{BRAND.role}</span>
          </a>

          {/* right cluster — hidden on mobile */}
          <div className="cv-nav__right">
            <nav className="cv-nav__menu" aria-label="主要導覽">
              <ul className="cv-nav__main">
                {mainLinks.map((link, i) => (
                  <li key={link.label} className="cv-nav__item">
                    {i > 0 && (
                      <span className="cv-nav__sep" aria-hidden="true">·</span>
                    )}
                    <a className="cv-nav__main-link" href={link.href}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="cv-logo" aria-hidden="true">
              <span className="cv-logo__mark" aria-hidden="true">
                <svg viewBox="0 0 32 32" width="100%" height="100%" focusable="false">
                  <circle cx="16" cy="16" r="15" className="cv-logo__circle" />
                  <text
                    x="16"
                    y="16"
                    textAnchor="middle"
                    dominantBaseline="central"
                    className="cv-logo__letter"
                  >
                    G
                  </text>
                </svg>
              </span>
              <span className="cv-logo__text">{BRAND.name}</span>
            </div>
          </div>
        </div>
      </header>

      {/* mobile-only fixed bottom tab bar (mirrors the reference) */}
      <nav className="cv-tabbar" aria-label="導覽">
        {tabLinks.map((link) => (
          <a key={link.label} className="cv-tabbar__item" href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>

      <style jsx>{`
        .cv-nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: var(--cv-z-nav);
          height: var(--cv-nav-h);
          pointer-events: none;
          border-bottom: 1px solid transparent;
          transition: background var(--cv-dur-base) ease,
            border-color var(--cv-dur-base) ease;
        }
        /* scrolled: solid beige bar + black hairline (blends with hero at top) */
        .cv-nav.is-scrolled {
          background: var(--cv-bg);
          border-bottom-color: var(--cv-ink);
          pointer-events: auto;
        }
        .cv-nav__row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: var(--space-lg);
          max-width: var(--cv-maxw);
          height: 100%;
          margin: 0 auto;
          padding: var(--space-lg) var(--space-lg) 0;
          box-sizing: border-box;
        }
        .cv-nav__row :global(a) {
          pointer-events: auto;
        }

        /* brand */
        .cv-brand {
          display: inline-flex;
          flex-direction: column;
          gap: var(--space-2xs);
          text-decoration: none;
          line-height: 1.1;
        }
        .cv-brand__name {
          font-family: var(--cv-font-display);
          font-weight: 900;
          font-size: 22px;
          letter-spacing: -0.01em;
          color: var(--cv-ink);
        }
        .cv-brand__role {
          font-family: var(--cv-font-mono);
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: var(--cv-ink-soft);
          white-space: nowrap;
        }

        /* right cluster */
        .cv-nav__right {
          display: flex;
          align-items: center;
          gap: var(--space-lg);
        }
        .cv-nav__menu {
          display: flex;
          align-items: center;
        }
        .cv-nav__main {
          display: flex;
          align-items: center;
          gap: var(--space-xs);
          margin: 0;
          padding: 0;
          list-style: none;
        }
        .cv-nav__item {
          display: inline-flex;
          align-items: center;
          gap: var(--space-xs);
        }
        .cv-nav__sep {
          color: var(--cv-line);
          user-select: none;
        }
        .cv-nav__main-link {
          font-family: var(--cv-font-body);
          font-weight: 700;
          font-size: 15px;
          color: var(--cv-ink);
          text-decoration: none;
          transition: opacity var(--cv-dur-fast) ease-out;
        }
        .cv-nav__main-link:hover {
          opacity: 0.62;
        }

        /* logo pill */
        .cv-logo {
          display: inline-flex;
          align-items: center;
          gap: var(--space-sm);
          padding: var(--space-2xs) var(--space-md) var(--space-2xs)
            var(--space-2xs);
          background: var(--cv-paper);
          border-radius: var(--cv-r-logo);
          box-shadow: var(--cv-shadow-pill);
          text-decoration: none;
          white-space: nowrap;
        }
        .cv-logo__mark {
          display: inline-flex;
          width: 32px;
          height: 32px;
          flex: 0 0 auto;
        }
        .cv-logo :global(.cv-logo__circle) {
          fill: var(--cv-ink);
        }
        .cv-logo :global(.cv-logo__letter) {
          fill: var(--cv-paper);
          font-family: var(--cv-font-display);
          font-weight: 900;
          font-size: 17px;
        }
        .cv-logo__text {
          font-family: var(--cv-font-display);
          font-weight: 700;
          font-size: 15px;
          color: var(--cv-ink);
        }

        /* bottom tab bar — hidden on >=768 */
        .cv-tabbar {
          display: none;
        }

        /* ── TABLET 768–1023 ── */
        @media (max-width: 1023px) {
          .cv-nav__row {
            padding: var(--space-md) var(--space-md) 0;
            gap: var(--space-md);
          }
          .cv-brand__name {
            font-size: 19px;
          }
          .cv-brand__role {
            font-size: 11px;
          }
          .cv-nav__right {
            gap: var(--space-md);
          }
          .cv-nav__main {
            gap: var(--space-2xs);
          }
          .cv-nav__main-link {
            font-size: 13.5px;
          }
          .cv-logo {
            padding: var(--space-2xs) var(--space-sm) var(--space-2xs)
              var(--space-2xs);
          }
          .cv-logo__text {
            font-size: 13px;
          }
        }

        /* ── MOBILE <768: centered brand only, links → bottom tab bar ── */
        @media (max-width: 767px) {
          /* mobile header is ALSO fixed (like the reference): transparent over
             the hero, beige + hairline on scroll. 72px tall. */
          .cv-nav {
            height: 72px;
            pointer-events: auto;
          }
          .cv-nav__row {
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: var(--space-2xs);
            padding: 0 var(--space-md);
          }
          .cv-brand {
            align-items: center;
            text-align: center;
          }
          .cv-brand__name {
            font-size: 20px;
          }
          .cv-nav__right {
            display: none;
          }

          .cv-tabbar {
            display: flex;
            position: fixed;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: var(--cv-z-nav);
            height: var(--cv-tabbar-h);
            background: var(--cv-paper);
            border-top: 1px solid var(--cv-line);
            box-shadow: 0 -2px 14px rgba(28, 26, 23, 0.07);
            align-items: stretch;
          }
          .cv-tabbar__item {
            flex: 1 1 0;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: var(--cv-font-body);
            font-weight: 700;
            font-size: 13px;
            color: var(--cv-ink);
            text-decoration: none;
          }
          .cv-tabbar__item:active {
            background: var(--cv-bg-2);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .cv-logo,
          .cv-nav__main-link {
            transition: none;
          }
        }
      `}</style>
    </>
  )
}
