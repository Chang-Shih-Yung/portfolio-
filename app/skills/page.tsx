import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '技能 — Giselle Lai',
  description: '資深數位行銷的能力範圍:策略、活動、內容、數據 — 加上 UX/UI 這兩張外掛。',
}

type SkillGroup = {
  label: string
  title: string
  items: string[]
  color: 'mint' | 'peach' | 'butter' | 'lavender'
}

const groups: SkillGroup[] = [
  {
    label: 'Strategy',
    title: '數位行銷策略',
    items: [
      '全漏斗行銷規劃(曝光 → 名單 → 轉換 → 回訪)',
      '活動檔期、預算與資源配置',
      '市場與受眾洞察、競品盤點',
      '店家合作流程設計',
    ],
    color: 'mint',
  },
  {
    label: 'Campaign',
    title: '活動企劃與執行',
    items: [
      '大型活動企劃與執行管理',
      '活動視覺策略與製作物整合',
      '跨單位溝通與專案協調',
      '設計資源整合與製作流程管理',
    ],
    color: 'peach',
  },
  {
    label: 'Bonus · Research',
    title: 'UX 研究與服務設計',
    items: [
      '使用者訪談與易用性測試',
      'Persona 與旅程地圖',
      '資訊架構與 User Flow',
      'Service Blueprint(民眾 / 商家 / 後台三端)',
      '把研究發現轉譯成行銷策略',
    ],
    color: 'mint',
  },
  {
    label: 'Bonus · Design',
    title: 'UI 設計與設計系統',
    items: [
      'Figma UI 設計與互動原型',
      'Design System(Token / 元件庫)',
      '三端一致的介面規範',
      '品牌視覺延伸與規範化',
      '與 PM / 工程的交付協作',
    ],
    color: 'peach',
  },
]

const tools = [
  'GA4', 'Google Search Console', 'Google Ads', 'Meta 廣告管理員', 'SEO 工具',
  'Figma', 'FigJam', 'Illustrator', 'Photoshop', 'Canva', 'Notion',
]

export default function SkillsPage() {
  return (
    <div className="container skills-page">
      <header className="skills-hero">
        <p className="section-label">Skills · 技能</p>
        <h1 className="display-l skills-headline">
          行銷是我的主場,<br />設計是我的外掛。
        </h1>
        <p className="skills-intro">
          從行銷策略、活動規劃、內容執行,到最後成效檢視,我都有實際參與。再加上 UX/UI 的實作經驗,
          我不只是提出企劃,而是能一路把想法落實成真正上線、可以營運,也能持續追蹤成效的數位服務。
        </p>
      </header>

      <section className="skills-grid">
        {groups.map((g) => (
          <article key={g.title} className={`skill-card skill-card--${g.color}`}>
            <p className="skill-card-label">{g.label}</p>
            <h2 className="h2 skill-card-title">{g.title}</h2>
            <ul className="skill-card-list">
              {g.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="tools-section">
        <p className="section-label">Tooling · 工具</p>
        <h2 className="h1 tools-headline">我用的工具。</h2>
        <ul className="tools-chips">
          {tools.map((t) => (
            <li key={t} className="tool-chip">{t}</li>
          ))}
        </ul>
      </section>

      <style>{`
        .skills-page { padding-top: 80px; padding-bottom: 128px; }

        .skills-hero { max-width: 720px; margin-bottom: 80px; }
        .skills-headline { margin: 24px 0 28px; }
        .skills-intro {
          font-size: 19px;
          line-height: 1.7;
          color: var(--text-muted);
          max-width: 56ch;
        }

        .skills-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
          margin-bottom: 96px;
        }
        .skill-card {
          padding: 40px;
          border-radius: var(--r-lg);
          border: 1px solid var(--border);
          transition: border-color 120ms linear;
        }
        .skill-card:hover { border-color: var(--border-strong); }
        .skill-card--mint     { background: var(--card-mint); }
        .skill-card--peach    { background: var(--card-peach); }
        .skill-card--butter   { background: var(--card-butter); }
        .skill-card--lavender { background: var(--card-lavender); }

        .skill-card-label {
          font-family: var(--font-mono-stack);
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 16px;
        }
        .skill-card-title { margin-bottom: 16px; }
        .skill-card-blurb {
          font-size: 16px;
          line-height: 1.6;
          color: var(--text);
          opacity: 0.78;
          margin-bottom: 24px;
          max-width: 44ch;
        }
        .skill-card-list { display: flex; flex-direction: column; gap: 10px; }
        .skill-card-list li {
          font-size: 15px;
          line-height: 1.5;
          padding-left: 18px;
          position: relative;
        }
        .skill-card-list li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 9px;
          width: 6px;
          height: 6px;
          border-radius: var(--r-full);
          background: var(--text);
          opacity: 0.55;
        }

        .tools-section { padding-top: 24px; }
        .tools-headline { margin: 20px 0 32px; }
        .tools-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .tool-chip {
          font-family: var(--font-mono-stack);
          font-size: 12px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--text);
          background: var(--surface);
          border: 1px solid var(--border);
          padding: 10px 18px;
          border-radius: var(--r-full);
          transition: border-color 120ms linear;
        }
        .tool-chip:hover {
          border-color: var(--border-strong);
        }

        @media (max-width: 900px) {
          .skills-grid { grid-template-columns: 1fr; }
          .skill-card { padding: 32px; }
        }
        @media (max-width: 768px) {
          .skills-page { padding-top: 56px; }
          .skills-hero { margin-bottom: 56px; }
        }
      `}</style>
    </div>
  )
}
