export default function Hero() {
  return (
    <section className="hero">
      <div>
        <h1 className="display-xl hero-greeting">
          Hi,<br />I&rsquo;m Henry.
        </h1>
        <p className="hero-tagline">
          Product Designer building UX systems for civic tech &amp; B2B portals.
        </p>
        <div className="hero-meta">
          <span>8 YRS</span>
          <span className="dot">·</span>
          <span>B2B Portals</span>
          <span className="dot">·</span>
          <span>Civic Tech</span>
        </div>
      </div>
      <a href="mailto:hi@henry.design" className="hero-email">
        Email me <span aria-hidden>→</span>
      </a>

      <style>{`
        .hero {
          display: grid;
          grid-template-columns: 1fr auto;
          align-items: end;
          gap: 32px;
          padding: 80px 0 64px;
        }
        .hero-greeting { margin-bottom: 28px; }
        .hero-tagline {
          font-size: 22px;
          line-height: 1.45;
          max-width: 36ch;
          margin-bottom: 32px;
        }
        .hero-meta {
          display: inline-flex;
          gap: 8px;
          align-items: center;
          font-family: var(--font-mono), ui-monospace, monospace;
          font-size: 12px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--text-muted);
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--r-full);
          padding: 8px 18px;
        }
        .hero-meta .dot { color: var(--text-subtle); padding: 0 4px; }
        .hero-email {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 15px;
          font-weight: 600;
          color: var(--bg);
          background: var(--accent);
          padding: 14px 24px;
          border-radius: var(--r-full);
          transition: transform 200ms var(--ease-out);
          white-space: nowrap;
        }
        .hero-email:hover { transform: translateY(-2px); }
        @media (max-width: 768px) {
          .hero { grid-template-columns: 1fr; padding: 48px 0 40px; }
          .hero-tagline { font-size: 19px; }
        }
      `}</style>
    </section>
  )
}
