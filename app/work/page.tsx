import type { Metadata } from 'next'
import { ProjectCard } from '@/components/ProjectCard'
import { getAllCases } from '@/lib/cases'

export const metadata: Metadata = {
  title: '專案 — Giselle Lai',
  description: '九個政府數位行銷與平台專案總覽 — 4 場大型活動 + 5 座城市數位平台。',
}

/**
 * Work index — every project (the header 專案 link lands here), split into
 * two labeled groups: 政府行銷專案 (marketing campaigns) on top, APP數位專案
 * (city platforms) below. Data-driven from lib/cases: compact ProjectCards,
 * five per row on desktop (3 / 2 on smaller screens via .work-grid).
 */
function WorkGrid({ cases }: { cases: ReturnType<typeof getAllCases> }) {
  return (
    <div className="work-grid proj-compact">
      {cases.map((c) => (
        <ProjectCard
          key={c.slug}
          href={`/work/${c.slug}`}
          loc={c.domain}
          name={c.title}
          year={String(c.year)}
          image={
            c.thumb ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={c.thumb} alt="" loading="lazy" draggable={false} />
            ) : (
              <span className="proj-thumb-ph" aria-hidden="true" />
            )
          }
        />
      ))}
    </div>
  )
}

export default function WorkPage() {
  const all = getAllCases()
  const marketing = all.filter((c) => c.domain.startsWith('活動設計'))
  const apps = all.filter((c) => !c.domain.startsWith('活動設計'))

  return (
    <div className="container work-page">
      <p className="section-label">Work · 專案總覽</p>
      <h1 className="display-l work-headline">
        數位行銷專案
      </h1>
      <p className="work-intro">
        4 場政府大型活動、5 座城市數位平台 — 聲量我來做,留存我也包。每一張卡點進去,都是一個完整的故事。
      </p>

      <section className="work-group">
        <h2 className="work-group-title">政府行銷專案</h2>
        <WorkGrid cases={marketing} />
      </section>

      <section className="work-group">
        <h2 className="work-group-title">APP 數位專案</h2>
        <WorkGrid cases={apps} />
      </section>

      <style>{`
        .work-page { padding-top: 80px; padding-bottom: 128px; }
        .work-headline { margin: 24px 0 28px; }
        .work-intro {
          font-size: 19px;
          line-height: 1.7;
          color: var(--text-muted);
          max-width: 56ch;
        }
        .work-group { margin-top: 72px; }
        .work-group-title {
          font-family: var(--font-display);
          font-weight: 900;
          font-size: 28px;
          padding-bottom: 16px;
          border-bottom: 2px solid var(--text);
        }
        .work-group .work-grid { margin-top: 32px; }
        @media (max-width: 768px) {
          .work-page { padding-top: 56px; }
        }
      `}</style>
    </div>
  )
}
