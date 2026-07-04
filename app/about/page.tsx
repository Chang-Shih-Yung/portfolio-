import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '關於 — Giselle Lai',
  description: '資深行銷人員 · 政府數位行銷與活動統籌，用 UX 方法把聲量變成留存。',
}

// ─── Stats (overview snapshot) — 全部來自九個專案的真實數字 ─────
const stats = [
  { value: '7', unit: '縣市', label: '政府行銷與數位平台專案落地縣市' },
  { value: '9', unit: '個', label: '完整專案 — 4 場大型行銷活動 + 5 座城市數位平台' },
  { value: '1,200+', unit: '家', label: '各案累計串聯的特約店家' },
  { value: '×3.5', unit: '倍', label: '單場活動人次成長（東岸舖食節 14,148 人次）' },
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

// 陣列順序 = 編號 01–09;頁面倒序渲染,行銷專案(06–09)排最前
const timeline: TimelineItem[] = [
  {
    year: '01',
    kind: 'project',
    title: '南投縣數位生活點數平台 2.0',
    body: '從真實使用者回饋重新優化民眾、商家與後台三端流程。行銷把人導進來之後,靠體驗把流失點一個一個補掉 — Research → Insights → Strategy 的完整轉換。',
    href: '/work/nantou-points',
  },
  {
    year: '02',
    kind: 'project',
    title: '花蓮永續生活數位服務平台',
    body: '用行銷人的漏斗思維(Awareness → Retention)設計產品:活動參與 → 點數累積 → 商家使用的行為閉環,讓政策活動變成會自己轉的循環。',
    href: '/work/hualien-sustainable',
  },
  {
    year: '03',
    kind: 'project',
    title: '雲林數位縣民平台(雲林幣 2.0)',
    body: '品牌語言 + 設計系統,讓縣政服務在同一個品牌體驗下持續擴充 — 品牌一致性,就是最長期的行銷資產。',
    href: '/work/yunlin-platform',
  },
  {
    year: '04',
    kind: 'project',
    title: '苗栗縣數位點數平台',
    body: 'Service Blueprint 串起民眾、店家、政府三端 — 行銷不只做前台聲量,把核銷、請款、營運流程一起設計進去,合作店家才留得住。',
    href: '/work/miaoli-points',
  },
  {
    year: '05',
    kind: 'project',
    title: '台中減碳存摺平台',
    body: '把減碳政策轉譯成日常行為循環:低碳行為 → 數位資產 → 回饋兌換。政策推廣從單次宣導,變成長期的習慣養成。',
    href: '/work/taichung-carbon',
  },
  {
    year: '06',
    kind: 'role',
    title: '2024 第四屆東岸舖食節',
    body: '主視覺、場地動線、輔銷物一手統籌 — 14,148 人次、較上屆成長 ×3.5,約 580 萬枚臺東金幣在場內流動,沉睡點數被活動喚醒。',
    href: '/work/dongan-food-festival',
  },
  {
    year: '07',
    kind: 'role',
    title: '2024 花蓮「數位有購力・振興拚經濟」記者會',
    body: '花蓮縣府 × 臺東縣府 × TTPush 三方溝通窗口 — 700+ 特約店家、首波 2,000 萬枚城市幣、民間加碼 200 萬元,震後觀光的振興敘事。',
    href: '/work/hualien-digital',
  },
  {
    year: '08',
    kind: 'role',
    title: '2024 雲林「智慧雲林幣 2.0」記者會',
    body: '平台升級的發表行銷:視覺統籌 + 媒體溝通,近 9 萬會員的平台升級發表,台東、南投、彰化、台中、嘉義五縣市代表到場觀摩。',
    href: '/work/yunlin-coin',
  },
  {
    year: '09',
    kind: 'role',
    title: '2024 桃園火鍋嘉年華',
    body: '衛生局年度指標活動:470 家美食券店家把單日人潮拉成月度消費循環,「桃食安心資訊平台」累積 100 萬+ 瀏覽 — 活動效益不是辦完就歸零。',
    href: '/work/taoyuan-hotpot',
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
        我做的不只是活動聲量,<br />是能持續轉換的行為循環。
      </h1>

      <div className="about-body">
        <p>
          我是 Giselle Lai,資深行銷人員,深耕政府與地方數位行銷。7 個縣市、9 個完整專案:一手操盤記者會、城市嘉年華等大型活動 —
          從行銷策略、主視覺統籌、跨部門協調到現場執行;一手打造承接活動流量的城市數位點數平台,讓每一波聲量都有地方沉澱。
        </p>
        <p>
          我的差異點,是用 UX 的方法做行銷。活動不是辦完就結束 — 我用漏斗與行為循環設計參與旅程(Awareness → Retention),
          用點數機制把單日人潮變成月度消費(桃園 470 家美食券、使用期延伸一整個月),用使用者研究讓政策訊息說人話。
          聲量是起點,轉換與留存才是我交付的東西。
        </p>
        <p>
          因為同時具備 App UI/UX 的實作能力,我能把行銷企劃直接落成產品:資訊架構、服務藍圖、設計系統 —
          活動導進來的每一個人,都有一個留得住他們的地方。這讓我在行銷團隊裡,是那個能把「企劃案」推進到「上線且能營運」的人。
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

      {/* ─── Career timeline ─── */}
      <section className="about-timeline-section">
        <div className="about-timeline-head">
          <p className="section-label">Projects · 專案軌跡</p>
          <h2 className="h1 about-timeline-headline">
            行銷把人帶進來,<br />體驗把人留下來。
          </h2>
          <p className="about-timeline-intro">
            4 場政府大型行銷活動 + 5 座城市數位平台 — 同一套邏輯貫穿:先用活動與敘事創造聲量,再用點數機制與體驗設計,把聲量沉澱成可持續的轉換與留存。每一張卡片都能點進完整 case study。
          </p>
        </div>

        {/* 倒序顯示 — 行銷專案(06–09)在最上,對應應徵職位的主軸 */}
        <ol className="timeline">
          {[...timeline].reverse().map((item) => (
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

      {/* ─── Colophon CTA banner (replaces inline site notes) ─── */}
      <section className="colophon-banner">
        <div className="colophon-banner-body">
          <p className="section-label">Colophon · 裝幀說明</p>
          <h2 className="h1 colophon-banner-headline">
            想看這個 portfolio<br />是怎麼蓋起來的?
          </h2>
          <p className="colophon-banner-intro">
            10 條設計筆記 + 完整 UI system token 視覺化 — 字型 / 色彩 / 元件 / spacing / radius 都拆給你看。
          </p>
        </div>
        <a href="/colophon" className="colophon-banner-cta">
          看設計筆記 <span aria-hidden>→</span>
        </a>
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

        /* ─── Colophon banner ─── */
        .colophon-banner {
          margin-top: var(--space-4xl);
          padding: var(--space-2xl);
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 0;
          display: grid;
          grid-template-columns: 1fr auto;
          align-items: end;
          gap: var(--space-lg);
        }
        .colophon-banner-body { max-width: 50ch; }
        .colophon-banner-headline { margin: var(--space-sm) 0 var(--space-md); }
        .colophon-banner-intro {
          font-size: 16px;
          line-height: 1.6;
          color: var(--text);
          opacity: 0.78;
        }
        .colophon-banner-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 15px;
          font-weight: 600;
          color: var(--bg);
          background: var(--text);
          padding: 14px 24px;
          border-radius: var(--r-full);
          white-space: nowrap;
          transition: opacity 120ms linear;
        }
        .colophon-banner-cta:hover { opacity: 0.85; }

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
          .colophon-banner {
            grid-template-columns: 1fr;
            padding: var(--space-xl);
            margin-top: var(--space-3xl);
          }
          .colophon-banner-cta { justify-self: start; }
        }
      `}</style>
    </div>
  )
}
