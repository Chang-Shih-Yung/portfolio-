import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '關於 — Giselle Lai',
  description: '資深數位行銷 · 從活動聲量到商機轉換，懂店家痛點、能把企劃推到上線的行銷人。',
}

// ─── Stats (overview snapshot) — 全部來自九個專案的真實數字 ─────
const stats = [
  { value: '7', unit: '縣市', label: '跑過的縣市 — 行銷活動與數位平台都落了地' },
  { value: '9', unit: '個', label: '從頭做到尾的專案 — 4 場大型活動 + 5 座城市平台' },
  { value: '1,200+', unit: '家', label: '串聯過的在地店家 — 核銷、請款、來客都設計過' },
  { value: '×3.5', unit: '倍', label: '單場活動人次成長（東岸舖食節 14,148 人次）' },
]

// ─── Skills — 對照數位行銷職務的核心能力 ────────────────────
const skills = [
  {
    title: '整合行銷策略',
    body: '活動、內容、平台排成同一條漏斗 — 曝光、參與、轉換、回訪，聲量跟商機一起長，不是各做各的。',
  },
  {
    title: '成效與數據思維',
    body: '人次、店家數、瀏覽量、轉換 — 每檔活動都拉數字複盤，成效說話，策略跟資源再跟著調。',
  },
  {
    title: '內容與品牌敘事',
    body: '官網、活動頁、社群素材、記者會敘事一手統籌，把政策和產品的價值講成一般人聽得懂的話。',
  },
  {
    title: '跨部門溝通協作',
    body: '政府跨局處、三方單位、PM 跟工程 — 多方窗口的節奏我拿得住，事情能往前推才算溝通。',
  },
  {
    title: 'UX × 產品落地',
    body: '研究、資訊架構、服務藍圖到設計系統 — 行銷企劃到我手上，可以一路推進成上線且能營運的產品。',
  },
]

// ─── Project track record (portfolio-backed) ───────────────
type TimelineKind = 'role' | 'project' | 'skill' | 'milestone'
type TimelineItem = {
  year: string
  kind: TimelineKind
  title: string
  body: string
  href?: string
}

// 陣列順序 = 顯示順序（1→9，由上而下）：行銷專案在前、數位平台在後
const timeline: TimelineItem[] = [
  {
    year: '01',
    kind: 'role',
    title: '2024 桃園火鍋嘉年華',
    body: '衛生局的年度指標活動:470 家美食券店家把單日人潮拉成一整個月的消費,「桃食安心資訊平台」衝破 100 萬瀏覽 — 活動效益不是辦完就歸零。',
    href: '/work/taoyuan-hotpot',
  },
  {
    year: '02',
    kind: 'role',
    title: '2024 花蓮「數位有購力・振興拚經濟」記者會',
    body: '花蓮縣府、臺東縣府、TTPush 三邊的溝通窗口都是我 — 700+ 特約店家、首波 2,000 萬枚城市幣,還拉到民間加碼 200 萬,把震後振興的故事說出去。',
    href: '/work/hualien-digital',
  },
  {
    year: '03',
    kind: 'role',
    title: '2024 第四屆東岸舖食節',
    body: '主視覺、場地動線、輔銷物一手統籌 — 14,148 人次進場、比上一屆多 3.5 倍,將近 580 萬枚金幣在場內流動,連沉睡的點數都被活動叫醒。',
    href: '/work/dongan-food-festival',
  },
  {
    year: '04',
    kind: 'role',
    title: '2024 雲林「智慧雲林幣 2.0」記者會',
    body: '平台升級的發表行銷:視覺統籌加媒體溝通,近 9 萬會員的平台 2.0 上線,台東、南投、彰化、台中、嘉義五個縣市都派人來觀摩。',
    href: '/work/yunlin-coin',
  },
  {
    year: '05',
    kind: 'project',
    title: '雲林數位縣民平台(雲林幣 2.0)',
    body: '幫縣政服務建立一套品牌語言和設計系統,之後不管加什麼新服務,長出來都是同一個樣子 — 品牌一致性,就是最耐用的行銷資產。',
    href: '/work/yunlin-platform',
  },
  {
    year: '06',
    kind: 'project',
    title: '台中減碳存摺平台',
    body: '把減碳政策翻譯成日常的行為循環:搭車、走路、回收都能存進「減碳存摺」換回饋 — 政策推廣從一次性宣導,變成每天都在發生的習慣。',
    href: '/work/taichung-carbon',
  },
  {
    year: '07',
    kind: 'project',
    title: '花蓮永續生活數位服務平台',
    body: '用行銷人的漏斗腦做產品:活動參與 → 點數累積 → 商家使用,接成一個會自己轉的循環 — 政策活動不再辦一次算一次。',
    href: '/work/hualien-sustainable',
  },
  {
    year: '08',
    kind: 'project',
    title: '苗栗縣數位點數平台',
    body: '用 Service Blueprint 把民眾、店家、政府三端串在一起 — 行銷不能只做前台的熱鬧,核銷、請款、營運流程一起設計好,店家才會留下來。',
    href: '/work/miaoli-points',
  },
  {
    year: '09',
    kind: 'project',
    title: '南投縣數位生活點數平台 2.0',
    body: '平台上線一年後,回頭聽使用者真實的聲音,把民眾、商家、後台三端的流失點一個一個補掉 — 行銷把人帶進來,體驗負責讓人留下來。',
    href: '/work/nantou-points',
  },
]

const kindLabel: Record<TimelineKind, string> = {
  role: '行銷專案',
  project: '數位平台',
  skill: '方法',
  milestone: '里程碑',
}

export default function AboutPage() {
  return (
    <div className="container about-page">
      <p className="section-label about-section-label">About · 關於</p>
      <h1 className="display-l about-headline">
        把人帶進來只是開始,<br />留得下來才是行銷。
      </h1>

      <div className="about-body">
        <p>
          嗨,我是 Giselle。這幾年我參與了 7 個縣市、9 個政府專案,從大型活動的行銷策略、主視覺規劃、跨部門協作,
          到活動執行都實際參與。活動結束後,再透過城市點數平台承接流量,讓每一次曝光都能轉化為持續的使用與回訪。
        </p>
        <p>
          我習慣用行銷漏斗的角度思考,每一個階段都希望有數據可以驗證成果。像桃園美食券專案,成功將 470 家店家的活動人潮延續成長期客;
          花蓮平台則把使用者從認識、參與到回訪的歷程,整合成一套完整的數位服務。
        </p>
        <p>
          另外,我也具備 App UI/UX 的實作經驗,參與過 5 座城市平台從 0 到 1 建置,以及後續 2.0 的優化迭代。
          因此,我不只是規劃行銷,更能把策略一路落地成真正可上線、可營運、持續成長的數位服務。
        </p>
      </div>

      <div className="about-cta">
        <a href="/skills" className="about-cta-link about-cta-accent">看我的技能</a>
        <a href="#" className="about-cta-link">履歷 (PDF)</a>
        <a href="#" className="about-cta-link">LinkedIn</a>
      </div>

      {/* ─── Stats overview ─── */}
      <section className="about-stats">
        <p className="section-label">Numbers · 成績單</p>
        <div className="stats-grid">
          {stats.map((s) => (
            <div key={s.label} className="stat-card">
              <div className="stat-value">
                <span className="stat-num">{s.value}</span>
                <span className="stat-unit">{s.unit}</span>
              </div>
              <p className="stat-label">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Skills — 對照數位行銷職務的核心能力 ─── */}
      <section className="about-skills">
        <p className="section-label">Skills · 我拿手的事</p>
        <div className="skills-grid">
          {skills.map((s) => (
            <div key={s.title} className="skill-card">
              <h3 className="skill-title">{s.title}</h3>
              <p className="skill-body">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Career timeline ─── */}
      <section className="about-timeline-section">
        <div className="about-timeline-head">
          <p className="section-label">Projects · 專案軌跡</p>
          <h2 className="h1 about-timeline-headline">
            行銷把人帶進來,<br />體驗把人留下來。
          </h2>
          <p className="about-timeline-intro">
            4 場政府大型活動 + 5 座城市平台,玩法其實是同一套:先用活動和故事把聲量做起來,再用點數機制和體驗設計把人留下來。每一張卡片都可以點進去看完整的 case study。
          </p>
        </div>

        {/* array order == display order (1→9, marketing first) */}
        <ol className="timeline">
          {timeline.map((item) => (
            <li key={item.year} className={`timeline-item timeline-item--${item.kind}`}>
              <div className="timeline-marker">
                <span className="timeline-dot" aria-hidden />
                <span className="timeline-year">{item.year}</span>
              </div>
              <div className="timeline-content">
                <span className={`timeline-chip timeline-chip--${item.kind}`}>{kindLabel[item.kind]}</span>
                <h3 className="timeline-title">
                  {item.href ? (
                    <Link href={item.href} className="timeline-title-link">
                      {item.title} <span aria-hidden="true">→</span>
                    </Link>
                  ) : (
                    item.title
                  )}
                </h3>
                <p className="timeline-body">{item.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <style>{`
        .about-page { padding-top: 96px; padding-bottom: 128px; max-width: 920px; }
        .about-section-label { margin-bottom: 32px; }
        .about-headline { margin-bottom: 64px; }
        .about-body { display: flex; flex-direction: column; gap: 24px; max-width: 60ch; margin-bottom: 48px; }
        .about-body p { font-size: 19px; line-height: 1.7; }
        .about-body code {
          font-family: var(--font-mono-stack);
          font-size: 0.9em;
          background: var(--surface);
          border: 1px solid var(--border);
          padding: 2px 8px;
          border-radius: 0;
        }
        .about-cta { display: flex; gap: 12px; flex-wrap: wrap; }
        .about-cta-link {
          font-size: 15px;
          font-weight: 600;
          padding: 12px 22px;
          border-radius: var(--r-full);
          border: 1px solid var(--border);
          transition: border-color 120ms linear;
        }
        .about-cta-link:hover { border-color: var(--text); }
        .about-cta-accent {
          background: var(--accent);
          color: var(--bg);
          border-color: var(--accent);
        }

        /* ─── Stats grid ─── */
        .about-stats { margin-top: 96px; }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-top: 24px;
        }
        .stat-card {
          padding: 28px 24px;
          border-radius: 0;
          border: 1px solid var(--border);
          background: var(--surface);
          transition: border-color 120ms linear;
        }
        .stat-card:hover { border-color: var(--text); }
        .stat-card:nth-child(1) { background: var(--surface); border-color: var(--border); }
        .stat-card:nth-child(2) { background: var(--surface); border-color: var(--border); }
        .stat-card:nth-child(3) { background: var(--surface); border-color: var(--border); }
        .stat-card:nth-child(4) { background: var(--surface); border-color: var(--border); }
        .stat-value { display: flex; align-items: baseline; gap: 6px; margin-bottom: 8px; }
        .stat-num {
          font-family: var(--font-sans);
          font-weight: 700;
          font-size: 44px;
          line-height: 1;
          letter-spacing: 0;
          color: var(--text);
        }
        .stat-unit {
          font-family: var(--font-mono-stack);
          font-size: 13px;
          color: var(--text);
          opacity: 0.7;
        }
        .stat-label {
          font-size: 13.5px;
          color: var(--text);
          opacity: 0.78;
          line-height: 1.45;
        }

        /* ─── Timeline ─── */
        .about-timeline-section { margin-top: 128px; }
        .about-timeline-head { margin-bottom: 56px; max-width: 60ch; }
        .about-timeline-headline { margin: 20px 0 24px; }
        .about-timeline-intro {
          font-size: 18px;
          line-height: 1.65;
          color: var(--text-muted);
        }
        .timeline {
          position: relative;
        }
        /* line 垂直通過 marker column 的水平中心 (40px),用 translateX(-50%) 自我置中 */
        .timeline::before {
          content: '';
          position: absolute;
          left: 40px;
          top: 18px;
          bottom: 18px;
          width: 1px;
          transform: translateX(-50%);
          background: var(--border);
        }
        .timeline-item {
          display: grid;
          grid-template-columns: 80px 1fr;
          gap: 28px;
          padding-bottom: 28px;
          align-items: start;
        }
        /* marker 80px column,dot + year 垂直堆疊水平置中 → 自然落在 line 中心 */
        .timeline-marker {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          padding-top: 10px;
          width: 80px;
        }
        .timeline-dot {
          width: 14px;
          height: 14px;
          border-radius: var(--r-full);
          background: var(--surface);
          border: 2px solid var(--text);
          position: relative;
          z-index: 2;
          flex-shrink: 0;
        }
        .timeline-year {
          font-family: var(--font-mono-stack);
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.04em;
          color: var(--text);
        }
        .timeline-item--role     .timeline-dot { background: var(--accent); border-color: var(--accent); }
        .timeline-item--project  .timeline-dot { background: var(--text); border-color: var(--text); }
        .timeline-item--skill    .timeline-dot { background: var(--surface); border-color: var(--text); }
        .timeline-item--milestone .timeline-dot { background: var(--bg); border-color: var(--text); }

        .timeline-content {
          padding: 20px 24px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 0;
          transition: border-color 120ms linear;
        }
        .timeline-content:hover { border-color: var(--text); }

        .timeline-chip {
          display: inline-block;
          font-family: var(--font-mono-stack);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.06em;
          padding: 4px 10px;
          border-radius: var(--r-full);
          margin-bottom: 10px;
        }
        .timeline-chip--role     { background: var(--accent); color: var(--bg); }
        .timeline-chip--project  { background: var(--text); color: var(--bg); }
        .timeline-chip--skill    { background: var(--surface); color: var(--text); border: 1px solid var(--border-strong); }
        .timeline-chip--milestone { background: var(--bg); color: var(--text); border: 1px solid var(--border-strong); }

        .timeline-title {
          font-family: var(--font-sans);
          font-weight: 700;
          font-size: 20px;
          line-height: 1.3;
          letter-spacing: 0;
          margin-bottom: 8px;
          color: var(--text);
        }
        .timeline-title-link { color: inherit; }
        .timeline-title-link:hover { text-decoration: underline; text-underline-offset: 4px; }
        .timeline-body {
          font-size: 15px;
          line-height: 1.65;
          color: var(--text-muted);
        }

        /* ─── Skills grid ─── */
        .about-skills { margin-top: 96px; }
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-top: 24px;
        }
        .skill-card {
          padding: 24px;
          border: 1px solid var(--border);
          background: var(--surface);
          transition: border-color 120ms linear;
        }
        .skill-card:hover { border-color: var(--text); }
        .skill-title {
          font-family: var(--font-sans);
          font-weight: 700;
          font-size: 17px;
          margin-bottom: 10px;
          color: var(--text);
        }
        .skill-body {
          font-size: 14px;
          line-height: 1.65;
          color: var(--text-muted);
        }

        @media (max-width: 768px) {
          .about-page { padding-top: 64px; }
          .about-headline { margin-bottom: 48px; }
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
          .about-timeline-section { margin-top: 96px; }
          /* mobile: marker column 縮到 44px,line 中心對齊 22px,dot 仍 align-center 在 marker 內 */
          .timeline::before { left: 22px; }
          .timeline-item {
            grid-template-columns: 44px 1fr;
            gap: 16px;
            padding-bottom: 24px;
          }
          .timeline-marker { width: 44px; gap: 6px; padding-top: 8px; }
          .timeline-year { font-size: 11px; }
          .skills-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  )
}
