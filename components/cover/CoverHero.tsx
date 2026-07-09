"use client";

import ProjectCarousel from "@/components/cover/ProjectCarousel";

/**
 * CoverHero — the portfolio COVER, a faithful layout clone of the
 * koyama-sendai.org "kv" (key visual), re-skinned with Giselle's warm palette
 * and Traditional-Chinese copy.
 *
 * DESKTOP (>=768):
 *   - a full-bleed row of CAPSULE phones (ProjectCarousel) scrolls left, 580px tall
 *   - a fixed-width text CARD (var(--cv-kv-data-w)) is absolutely placed at
 *     left:var(--cv-kv-data-left) over the phones; an opaque ::before block hides
 *     the phones passing behind the text so it stays readable
 *   - the hanging-figures illustration (illust-top.png) decorates above the card
 *   - the cityscape illustration (illust-bottom.png) repeats across the bottom,
 *     in front of the phones so their lower ends tuck behind it
 *
 * MOBILE (<768): a clean vertical STACK — centered brand (CoverNav), text (no
 *   card / no figures), a row of smaller capsules, then the cityscape. Nav links
 *   live in a fixed bottom tab bar (CoverNav).
 *
 * Layering: phones (1) < scrim (5) < illustration (10) < text (15) < nav (40).
 * The cover always uses its warm palette regardless of [data-theme].
 */
export default function CoverHero() {
  return (
    <section className="cv-hero" aria-label="Giselle Lai — 作品集封面">
      <div className="cv-hero__stage">
        {/* hanging-figures illustration (decorates above the card) */}
        <div className="cv-hero__figures" aria-hidden="true" />

        {/* full-bleed capsule-phone marquee */}
        <div className="cv-hero__slide" aria-hidden="true">
          <ProjectCarousel />
        </div>

        {/* text card — opaque ::before occludes the phones behind it */}
        <div className="cv-hero__data">
          <div className="cv-hero__detail">
            <h1 className="cv-hero__heading">
              <span className="cv-hero__line cv-hero__line--1">在這裡，遇見</span>
              <span className="cv-hero__line cv-hero__line--2">好設計</span>
            </h1>
            <span className="cv-hero__badge">把複雜，設計得簡單</span>
            <p className="cv-hero__lead">
              這裡是首頁主視覺的開場白，用兩三句話介紹這個網站或這個人是做什麼的，以及為什麼值得繼續往下看。目前為示意文字，之後可隨時換成你自己的內容。
            </p>
          </div>
        </div>
      </div>

      {/* cityscape illustration — repeats across the bottom, in front of phones */}
      <div className="cv-hero__city" aria-hidden="true" />

      <style jsx>{`
        .cv-hero {
          position: relative;
          background: var(--cv-bg);
          overflow: hidden;
          isolation: isolate;
          font-family: var(--cv-font-body);
          color: var(--cv-ink);
          /* natural height, content top-aligned (like the reference kv) — NOT a
             forced 100svh. Top padding clears the absolute nav. */
          padding-top: calc(var(--cv-nav-h) + var(--space-2xl));
          padding-bottom: var(--space-3xl);
        }

        /* ── stage: holds the phone row + text card, 580px tall ──────────── */
        .cv-hero__stage {
          position: relative;
          width: 100%;
          height: var(--cv-kv-h);
        }

        /* ── hanging figures (green branch): pinned to the FAR LEFT, top of the
              kv — matches reference .illust-top { left:-10px; top:0 } ──────── */
        .cv-hero__figures {
          position: absolute;
          top: 0;
          left: -10px;
          width: var(--cv-illust-top-w);
          height: var(--cv-illust-top-h);
          background-image: url("/cover/illust-top.png");
          background-size: contain;
          background-repeat: no-repeat;
          background-position: left top;
          z-index: var(--cv-z-illust);
          pointer-events: none;
        }

        /* ── phone marquee: full-bleed, fills the stage ──────────────────── */
        .cv-hero__slide {
          position: absolute;
          inset: 0;
          z-index: var(--cv-z-slide);
          overflow: hidden;
          pointer-events: none;
        }

        /* ── text card: fixed width; ::before opaquely hides phones behind ─ */
        .cv-hero__data {
          position: absolute;
          top: 0;
          bottom: 0;
          left: var(--cv-kv-data-left);
          width: var(--cv-kv-data-w);
          padding: var(--cv-kv-data-pad);
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .cv-hero__data::before {
          content: "";
          position: absolute;
          inset: 0;
          background: var(--cv-kv-scrim);
          z-index: var(--cv-z-scrim);
        }
        .cv-hero__detail {
          position: relative;
          z-index: var(--cv-z-detail);
        }

        .cv-hero__heading {
          display: flex;
          flex-direction: column;
          font-family: var(--cv-font-display);
          font-weight: 900;
          line-height: 1.04;
          letter-spacing: -0.01em;
          color: var(--cv-ink);
          margin: 0 0 var(--space-md);
        }
        .cv-hero__line {
          display: block;
        }
        .cv-hero__line--1 {
          font-size: var(--cv-display-1);
        }
        .cv-hero__line--2 {
          font-size: var(--cv-display-2);
          line-height: 0.96;
        }
        /* black chip — sharp top-left corner like the reference ttl chip */
        .cv-hero__badge {
          align-self: flex-start;
          background: var(--cv-pill-bg);
          color: var(--cv-pill-ink);
          font-family: var(--cv-font-body);
          font-size: 14px;
          font-weight: 700;
          line-height: 1;
          padding: 10px 16px;
          border-radius: 0 var(--cv-r-pill) var(--cv-r-pill) var(--cv-r-pill);
          white-space: nowrap;
        }
        .cv-hero__lead {
          margin-top: var(--space-lg);
          font-family: var(--cv-font-body);
          font-size: 16px;
          line-height: 1.9;
          letter-spacing: -0.02em;
          color: var(--cv-ink);
        }

        /* ── cityscape: repeats across the bottom, in front of phones ────── */
        .cv-hero__city {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: var(--cv-illust-bottom-h);
          background-image: url("/cover/illust-bottom.png");
          background-size: auto var(--cv-illust-bottom-h);
          background-position: center bottom;
          background-repeat: repeat-x;
          z-index: var(--cv-z-illust);
          pointer-events: none;
        }

        /* ════ ≤1200: green branch tucks further left (reference) ════ */
        @media (max-width: 1200px) {
          .cv-hero__figures {
            left: -110px;
          }
        }

        /* ════ TABLET / SMALL DESKTOP 768–1023 ════ */
        @media (max-width: 1023px) {
          .cv-hero {
            --cv-kv-data-left: 6vw;
            --cv-kv-data-w: 380px;
            --cv-kv-data-pad: 40px;
          }
        }

        /* ════ MOBILE <768: vertical STACK ════ */
        @media (max-width: 767px) {
          .cv-hero {
            display: flex;
            flex-direction: column;
            /* reserve space for the fixed 72px mobile header */
            padding-top: 72px;
            padding-bottom: var(--cv-tabbar-h);
            --cv-phone-w: 155px;
            --cv-phone-h: 290px;
            --cv-phone-gap: 6px;
            --cv-display-1: clamp(28px, 8vw, 34px);
            --cv-display-2: clamp(44px, 13vw, 56px);
          }
          .cv-hero__stage {
            height: auto;
            margin-top: 0;
            display: flex;
            flex-direction: column;
            gap: var(--space-lg);
          }
          .cv-hero__figures {
            display: none;
          }
          /* text first, phone row second */
          .cv-hero__data {
            position: static;
            order: 1;
            width: auto;
            padding: var(--space-md) var(--space-lg) 0;
            display: block;
          }
          .cv-hero__data::before {
            content: none;
          }
          .cv-hero__slide {
            position: static;
            order: 2;
            height: auto;
            overflow: hidden;
          }
          /* let the marquee size to the small phones instead of stretching */
          .cv-hero__slide :global(.pc-viewport) {
            height: auto;
          }
          .cv-hero__lead {
            max-width: 42ch;
          }
          .cv-hero__city {
            position: relative;
            height: 82px;
            background-size: auto 82px;
            margin-top: -20px;
            /* same as the footer band: frame from the scene's left edge on
               mobile instead of an arbitrary centre crop */
            background-position: left bottom;
          }
        }
      `}</style>
    </section>
  );
}
