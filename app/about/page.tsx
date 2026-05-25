import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About — Henry Chen',
  description: 'Product Designer focused on UX systems and flows.',
}

export default function AboutPage() {
  return (
    <div className="container about-page">
      <p className="section-label about-section-label">About</p>
      <h1 className="display-l about-headline">
        I help teams<br />ship systems<br />that hold up.
      </h1>

      <div className="about-body">
        <p>
          I&rsquo;m Henry Chen, a Product Designer with 8 years of experience
          building UX systems for civic tech and B2B portals. Most recently I led
          UX on a county-scale rewards platform serving 500,000+ residents across
          7 service modules.
        </p>
        <p>
          My approach is system-first. I number every screen with{' '}
          <code>X.Y.Z</code> semantics so PMs and engineers can reference any
          state without ambiguity. I care about the edge cases everyone forgets
          to handle, because those are the moments users actually feel the
          product.
        </p>
        <p>
          Outside of work, I read non-fiction at coffee shops, play with film
          cameras, and slowly fail at learning Cantonese.
        </p>
      </div>

      <div className="about-cta">
        <a href="#" className="about-cta-link">Resume (PDF)</a>
        <a href="#" className="about-cta-link">LinkedIn</a>
        <a href="mailto:hi@henry.design" className="about-cta-link about-cta-accent">
          Email me
        </a>
      </div>

      <style>{`
        .about-page { padding-top: 96px; padding-bottom: 128px; max-width: 800px; }
        .about-section-label { margin-bottom: 32px; }
        .about-headline { margin-bottom: 64px; }
        .about-body { display: flex; flex-direction: column; gap: 24px; max-width: 60ch; margin-bottom: 64px; }
        .about-body p { font-size: 19px; line-height: 1.6; }
        .about-body code {
          font-family: var(--font-mono), ui-monospace, monospace;
          font-size: 0.9em;
          background: var(--surface);
          border: 1px solid var(--border);
          padding: 2px 8px;
          border-radius: var(--r-sm);
        }
        .about-cta { display: flex; gap: 12px; flex-wrap: wrap; }
        .about-cta-link {
          font-size: 15px;
          font-weight: 600;
          padding: 12px 22px;
          border-radius: var(--r-full);
          border: 1px solid var(--border);
          transition: all 200ms var(--ease-out);
        }
        .about-cta-link:hover { border-color: var(--text); transform: translateY(-2px); }
        .about-cta-accent {
          background: var(--accent);
          color: var(--bg);
          border-color: var(--accent);
        }
        @media (max-width: 768px) {
          .about-page { padding-top: 64px; }
          .about-headline { margin-bottom: 48px; }
        }
      `}</style>
    </div>
  )
}
