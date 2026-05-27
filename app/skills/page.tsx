import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '技能 — Henry Chen',
  description: '產品設計師的能力範圍:研究、IA、UI 系統、原型、協作。',
}

type SkillGroup = {
  label: string
  title: string
  blurb: string
  items: string[]
  color: 'mint' | 'peach' | 'butter' | 'lavender'
}

const groups: SkillGroup[] = [
  {
    label: 'Discovery',
    title: '研究與策略',
    blurb:
      '從問題開始,不從像素開始。先跟使用者談、把系統 audit 過、把限制條件攤開,才動手畫。',
    items: [
      '使用者訪談 & 脈絡觀察 (Contextual inquiry)',
      'Heuristic & 競品評估',
      'Jobs-to-be-done 框架運用',
      '利害關係人 alignment workshop',
      '機會評估 & 成效指標設計',
    ],
    color: 'mint',
  },
  {
    label: 'Architecture',
    title: '資訊架構 & 流程',
    blurb:
      'App 的成敗在結構。我用 X.Y.Z 編號每個畫面,讓 PM、工程、QA 三方都能指著同一個 artifact 討論。',
    items: [
      '使用者流程 & state diagram',
      '網站 / App 資訊架構',
      'Service blueprint',
      '內容模型 & 分類學',
      '邊界 & 錯誤狀態 mapping',
    ],
    color: 'peach',
  },
  {
    label: 'Craft',
    title: 'UI 與互動設計',
    blurb:
      'Native-feeling 的 App 從小細節做起:點擊範圍、轉場、空狀態、micro-feedback。',
    items: [
      'Mobile UI 設計 (iOS HIG / Material 3)',
      'Responsive 與 adaptive layout',
      'Motion 與 micro-interaction',
      '無障礙 (WCAG 2.2 AA)',
      'Dark mode 與主題系統',
    ],
    color: 'butter',
  },
  {
    label: 'Systems',
    title: 'Design System',
    blurb:
      'Design system 是與工程的契約。Token 是 API、Component 是 implementation。',
    items: [
      'Design token (顏色 / 字體 / 間距 / 圓角)',
      'Figma 元件庫建構',
      '文件與使用指南撰寫',
      '版本控管與 deprecation 流程',
      'Swift / Kotlin / React handoff 規格',
    ],
    color: 'lavender',
  },
  {
    label: 'Validation',
    title: '原型與測試',
    blurb:
      '便宜的原型可以省下昂貴的爭論。根據要回答的問題,選對應的 fidelity 來做 prototype。',
    items: [
      'Figma interactive prototype',
      'Code prototype (HTML / React)',
      '有 / 無人主持的可用性測試',
      'A/B test 設計與埋點',
      'Analytics 檢視與漏斗診斷',
    ],
    color: 'mint',
  },
  {
    label: 'Collaboration',
    title: '跨團隊協作',
    blurb:
      '設計透過人交付。清楚的 spec、早期 review、共同詞彙,勝過英雄式 redesign。',
    items: [
      'Design critique 與 review ritual',
      '工程交付的 spec 撰寫',
      '與 PM 共同 roadmap 與 scope',
      '與 QA 共同 acceptance criteria',
      'Mentor 較資淺設計師',
    ],
    color: 'peach',
  },
]

const tools = [
  'Figma', 'FigJam', 'Sketch', 'Principle', 'ProtoPie',
  'Maze', 'Dovetail', 'Notion', 'Linear', 'GitHub',
  'Lottie', 'After Effects', 'Whimsical', 'Miro',
]

export default function SkillsPage() {
  return (
    <div className="container skills-page">
      <header className="skills-hero">
        <p className="section-label">Skills · 技能</p>
        <h1 className="display-l skills-headline">
          能 cover 的範圍,<br />從問題到上線。
        </h1>
        <p className="skills-intro">
          八年產品設計經驗,涵蓋 mobile 與 web、公共服務與 B2B 平台。
          從模糊的問題定義到 ship 出去、被埋點、被文件化的完整 feature loop,都做過、也想要繼續做。
        </p>
      </header>

      <section className="skills-grid">
        {groups.map((g) => (
          <article key={g.title} className={`skill-card skill-card--${g.color}`}>
            <p className="skill-card-label">{g.label}</p>
            <h2 className="h2 skill-card-title">{g.title}</h2>
            <p className="skill-card-blurb">{g.blurb}</p>
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
          transition: transform 320ms var(--ease-out);
        }
        .skill-card:hover { transform: translateY(-4px); }
        .skill-card--mint     { background: var(--card-mint); }
        .skill-card--peach    { background: var(--card-peach); }
        .skill-card--butter   { background: var(--card-butter); }
        .skill-card--lavender { background: var(--card-lavender); }

        .skill-card-label {
          font-family: var(--font-mono), ui-monospace, monospace;
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
          font-family: var(--font-mono), ui-monospace, monospace;
          font-size: 12px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--text);
          background: var(--surface);
          border: 1px solid var(--border);
          padding: 10px 18px;
          border-radius: var(--r-full);
          transition: border-color 200ms var(--ease-out), transform 200ms var(--ease-out);
        }
        .tool-chip:hover {
          border-color: var(--text);
          transform: translateY(-2px);
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
