export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container site-footer-inner">
        <span>© 2026 Henry Chen</span>
        <span className="site-footer-links">
          <a href="mailto:hi@henry.design">Email</a>
          <a href="#">LinkedIn</a>
          <a href="#">Resume</a>
        </span>
      </div>

      <style>{`
        .site-footer {
          border-top: 1px solid var(--border-soft);
          padding: 32px 0;
          font-family: var(--font-mono), ui-monospace, monospace;
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
        .site-footer a { transition: color 180ms var(--ease-out); }
        .site-footer a:hover { color: var(--accent); }
      `}</style>
    </footer>
  )
}
