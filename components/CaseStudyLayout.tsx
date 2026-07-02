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
        <Link href="/" className="case-back-link">← 返回首頁</Link>
      </div>

      <header className="case-hero container">
        <p className="section-label">{meta.eyebrow ?? (meta.featured ? 'Case study · 旗艦案' : 'Case study')}</p>
        <h1 className="display-l case-title">{meta.title}</h1>
        <p className="case-subtitle">{meta.subtitle}</p>

        <dl className="case-meta">
          {(meta.metaItems ?? [
            { label: '角色', value: meta.role },
            { label: '團隊', value: meta.team },
            { label: '期程', value: meta.timeline },
            { label: '階段', value: meta.stage },
          ]).map((m) => (
            <div key={m.label}><dt>{m.label}</dt><dd>{m.value}</dd></div>
          ))}
        </dl>
      </header>

      {meta.cover && (
        <div className="case-cover container">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <div className="case-cover-placeholder wf-placeholder" role="img" aria-label={`${meta.title} — cover`}>
            <span className="wf-label">COVER</span>
          </div>
        </div>
      )}

      <div className="case-body container">
        <CaseStudySideNav sections={meta.sections} />
        <article className="prose case-content">
          {children}
        </article>
      </div>

      <div className="case-next container">
        <p className="case-next-label">下一步</p>
        <p className="case-next-title">更多案例陸續上架中。</p>
        <div className="case-next-cta">
          <Link href="/skills" className="cta-accent">看我的技能 →</Link>
          <Link href="/" className="cta-secondary">查看所有作品</Link>
        </div>
      </div>

      <style>{`
        .case-study { padding-top: 32px; padding-bottom: 96px; }
        .case-back { padding-top: 24px; padding-bottom: 24px; }
        .case-back-link {
          font-family: var(--font-mono-stack);
          font-size: 12px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--text-muted);
          transition: color 120ms linear;
        }
        .case-back-link:hover { color: var(--text); }

        .case-hero { padding-top: 32px; padding-bottom: 40px; }
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
          font-family: var(--font-mono-stack);
          font-size: 11px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--text-muted);
        }
        .case-meta dd { font-size: 15px; font-weight: 500; }

        .case-cover {
          padding-top: 32px;
          padding-bottom: 16px;
        }
        .case-cover-placeholder {
          width: 100%;
          aspect-ratio: 16 / 7;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--r-md);
          border: 1px solid var(--placeholder-border);
          background-color: var(--placeholder-fill);
          background-image:
            linear-gradient(to top right, transparent calc(50% - 0.5px), var(--placeholder-border) calc(50% - 0.5px), var(--placeholder-border) calc(50% + 0.5px), transparent calc(50% + 0.5px)),
            linear-gradient(to top left, transparent calc(50% - 0.5px), var(--placeholder-border) calc(50% - 0.5px), var(--placeholder-border) calc(50% + 0.5px), transparent calc(50% + 0.5px));
        }
        .case-cover-placeholder .wf-label {
          font-family: var(--font-mono-stack);
          font-size: 12px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-muted);
          background: var(--placeholder-fill);
          padding: 4px 8px;
        }

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
          font-family: var(--font-mono-stack);
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
          letter-spacing: 0;
          margin-bottom: 32px;
        }
        .case-next-cta { display: flex; gap: 12px; flex-wrap: wrap; }
        .cta-accent, .cta-secondary {
          font-size: 15px;
          font-weight: 600;
          padding: 12px 22px;
          border-radius: var(--r-full);
          transition: border-color 120ms linear, color 120ms linear;
        }
        .cta-accent {
          background: var(--accent);
          color: var(--bg);
        }
        .cta-secondary {
          border: 1px solid var(--border);
          color: var(--text);
        }
        .cta-secondary:hover { border-color: var(--border-strong); }

        @media (max-width: 900px) {
          .case-meta { grid-template-columns: repeat(2, 1fr); }
          .case-body { grid-template-columns: 1fr; gap: 32px; }
          .case-cover { padding-top: 24px; }
          .case-cover-placeholder { border-radius: var(--r-md); }
        }
      `}</style>
    </div>
  )
}
