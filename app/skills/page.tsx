import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '技能 — Giselle Lai',
  description: '資深數位行銷的能力範圍:策略、活動、內容、數據 — 加上 UX/UI 這兩張外掛。',
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
    label: 'Strategy',
    title: '數位行銷策略',
    blurb:
      '先想清楚人從哪裡來、為什麼留下,再決定預算和渠道怎麼擺 — 付費流量和自有陣地要互相接力,不是各打各的。',
    items: [
      '全漏斗行銷規劃(曝光 → 名單 → 轉換 → 回訪)',
      '付費與自有媒體的整合佈局',
      '活動檔期、預算與資源配置',
      '市場與受眾洞察、競品盤點',
      'B2B 商機開發的節奏設計',
    ],
    color: 'mint',
  },
  {
    label: 'Campaign',
    title: '活動企劃與執行',
    blurb:
      '從一頁企劃書到活動當天的現場,中間每個環節我都顧過 — 記者會、城市嘉年華、跨縣市合作案,都辦得起來。',
    items: [
      '大型活動統籌(企劃 / 時程 / 預算 / 現場)',
      '記者會與媒體溝通操作',
      '主視覺方向與輸出物審核',
      '政府跨局處與多方窗口協調',
      '外包與供應商管理',
    ],
    color: 'peach',
  },
  {
    label: 'Content',
    title: '內容與品牌經營',
    blurb:
      '把產品價值講成一般人聽得懂、搜尋得到的話 — 官網、活動頁、社群到部落格,內容是會自己長大的資產。',
    items: [
      '品牌敘事與文案方向',
      '官網與 Landing Page 內容規劃',
      '社群素材企劃與調性管理',
      '搜尋能見度與內容佈局(SEO)',
      '把政策、產品「翻譯成人話」的能力',
    ],
    color: 'butter',
  },
  {
    label: 'Analytics',
    title: '數據與成效優化',
    blurb:
      '每檔活動結束都要能回答:錢花去哪、帶回了什麼。用數據複盤,下一次的策略和資源才有依據。',
    items: [
      '成效指標設計(名單品質 / 轉換成本 / 留存)',
      '網站流量與廣告數據判讀',
      '活動成效複盤與報告',
      '依成效調整策略與預算配置',
      '漏斗診斷與轉換率優化',
    ],
    color: 'lavender',
  },
  {
    label: 'Bonus · Research',
    title: 'UX 研究與服務設計',
    blurb:
      '加分項一:我自己會做研究。訪談、易用性測試、服務藍圖 — 行銷洞察不用等外包,直接從使用者身上長出來。',
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
    blurb:
      '加分項二:我自己會把介面做出來。企劃不會停在簡報 — 原型、設計系統、跟工程對接,一路推到上線。',
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
          從策略、活動、內容到成效複盤,行銷這條鏈我整段都跑過;再加上一手 UX/UI 的實作能力,
          企劃到我手上不會停在簡報 — 會變成上線、能營運、有數字可以檢核的東西。
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
