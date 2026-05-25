import Link from 'next/link'
import CaseStudySideNav from './CaseStudySideNav'
import type { CaseMeta } from '@/lib/cases'

export default function CaseStudyLayout({
  meta,
  children,
}: {
  meta: CaseMeta
  children: React.ReactNode
}) {
  return (
    <div className="case-study">
      <div className="case-back container">
        <Link href="/" className="case-back-link">← Back to home</Link>
      </div>

      <header className="case-hero container">
        <p className="section-label">Case study · 旗艦案</p>
        <h1 className="display-l case-title">{meta.title}</h1>
        <p className="case-subtitle">{meta.subtitle}</p>

        <dl className="case-meta">
          <div><dt>Role</dt><dd>{meta.role}</dd></div>
          <div><dt>Team</dt><dd>{meta.team}</dd></div>
          <div><dt>Timeline</dt><dd>{meta.timeline}</dd></div>
          <div><dt>Stage</dt><dd>{meta.stage}</dd></div>
        </dl>
      </header>

      <div className="case-body container">
        <CaseStudySideNav />
        <article className="prose case-content">
          {children}
        </article>
      </div>

      <div className="case-next container">
        <p className="case-next-label">Next</p>
        <p className="case-next-title">More cases coming soon.</p>
        <div className="case-next-cta">
          <a href="mailto:hi@henry.design" className="cta-accent">Email me →</a>
          <Link href="/" className="cta-secondary">View all work</Link>
        </div>
      </div>

      <style>{`
        .case-study { padding-top: 32px; padding-bottom: 96px; }
        .case-back { padding-top: 24px; padding-bottom: 24px; }
        .case-back-link {
          font-family: var(--font-mono), ui-monospace, monospace;
          font-size: 12px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--text-muted);
          transition: color 180ms var(--ease-out);
        }
        .case-back-link:hover { color: var(--text); }

        .case-hero { padding-top: 32px; padding-bottom: 56px; }
        .case-title { margin: 16px 0 24px; }
        .case-subtitle {
          font-size: 22px;
          line-height: 1.5;
          color: var(--text-muted);
          max-width: 50ch;
          margin-bottom: 48px;
        }
        .case-meta {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          padding: 24px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--r-lg);
        }
        .case-meta div { display: flex; flex-direction: column; gap: 6px; }
        .case-meta dt {
          font-family: var(--font-mono), ui-monospace, monospace;
          font-size: 11px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--text-muted);
        }
        .case-meta dd { font-size: 15px; font-weight: 500; }

        .case-body {
          display: grid;
          grid-template-columns: 200px 1fr;
          gap: 64px;
          padding-top: 64px;
        }
        .case-content { min-width: 0; }

        .case-next {
          margin-top: 96px;
          padding-top: 56px;
          padding-bottom: 24px;
          border-top: 1px solid var(--border-soft);
        }
        .case-next-label {
          font-family: var(--font-mono), ui-monospace, monospace;
          font-size: 12px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 12px;
        }
        .case-next-title {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 28px;
          letter-spacing: -0.015em;
          margin-bottom: 32px;
        }
        .case-next-cta { display: flex; gap: 12px; flex-wrap: wrap; }
        .cta-accent, .cta-secondary {
          font-size: 15px;
          font-weight: 600;
          padding: 12px 22px;
          border-radius: var(--r-full);
          transition: transform 200ms var(--ease-out);
        }
        .cta-accent {
          background: var(--accent);
          color: var(--bg);
        }
        .cta-secondary {
          border: 1px solid var(--border);
          color: var(--text);
        }
        .cta-accent:hover, .cta-secondary:hover { transform: translateY(-2px); }

        @media (max-width: 900px) {
          .case-meta { grid-template-columns: repeat(2, 1fr); }
          .case-body { grid-template-columns: 1fr; gap: 32px; }
        }
      `}</style>
    </div>
  )
}
