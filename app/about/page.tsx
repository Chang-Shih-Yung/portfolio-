import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '關於 — Henry Chen',
  description: '產品設計師,專注於 UX 系統與資訊架構。',
}

// ─── Stats (overview snapshot) ─────────────────────────────
const stats = [
  { value: '8', unit: '年', label: '產品設計年資' },
  { value: '50萬+', unit: '人', label: '服務的居民規模' },
  { value: '7', unit: '個', label: '同步交付的服務模組' },
  { value: '40%', unit: '↓', label: '減少的 spec 釐清會議' },
]

// ─── Career timeline (CV-style) ───────────────────────────
type TimelineKind = 'role' | 'project' | 'skill' | 'milestone'
type TimelineItem = {
  year: string
  kind: TimelineKind
  title: string
  body: string
}

const timeline: TimelineItem[] = [
  {
    year: '2017',
    kind: 'role',
    title: '進入產品設計',
    body: '從 UI 視覺起步,在新創團隊負責 App 介面與 marketing site,第一次接觸 design token 跟 component thinking。',
  },
  {
    year: '2018',
    kind: 'skill',
    title: '系統思考的轉折',
    body: '開始用 Figma component + auto layout 取代散裝畫面;意識到「畫得快」不重要,「畫得能被工程實作」才重要。',
  },
  {
    year: '2019',
    kind: 'project',
    title: 'B2B SaaS Dashboard',
    body: '主導一個 B2B 後台改版,從零建立第一套 design system。學到 dashboard 的真正 UX 不是「漂亮」,是 information density 跟 scan-ability。',
  },
  {
    year: '2020',
    kind: 'skill',
    title: '深化 IA 與使用者研究',
    body: '系統性學 information architecture、tree testing、card sorting。開始把 user interview 跟 heuristic eval 變成日常,而不是 project 起點才做。',
  },
  {
    year: '2021',
    kind: 'project',
    title: 'Enterprise portal · UX lead',
    body: '帶 2 位設計師交付 5 個內部 portal,引入 X.Y.Z 編號系統。發現工程的 spec 釐清會議減少約 40%,從此這個 convention 變成 default。',
  },
  {
    year: '2022',
    kind: 'milestone',
    title: '跨團隊協作 framework',
    body: '不再只是「畫稿子」 — 開始參與 product roadmap、跟 PM 一起做 prioritization、跟工程一起決定技術可行性的 trade-off。',
  },
  {
    year: '2023',
    kind: 'skill',
    title: 'Design system as governance',
    body: '把 design system 從「component 倉庫」升級成「跨團隊治理工具」 — token 同步、component versioning、deprecation flow 都納入。',
  },
  {
    year: '2024',
    kind: 'project',
    title: '南投數位生活點數平台',
    body: '主導 6 個月 UX,8 條 user flow 串連訪客 + 居民 + 商家三種角色,服務 50 萬+ 縣民。是「會想 system」這件事可被驗證的最完整 case。',
  },
  {
    year: '2025',
    kind: 'milestone',
    title: '反思與下一步',
    body: '整理 8 年的 design playbook、寫出 SPEC + DESIGN + WIREFRAME 三份治理檔。從「會做」往「會教會傳承」推一步。',
  },
  {
    year: '2026',
    kind: 'role',
    title: '尋找下一個系統挑戰',
    body: '對下一個位置的期待:有 system 可以被建,有跨團隊需要被串,有真實使用者規模值得認真設計。',
  },
]

const kindLabel: Record<TimelineKind, string> = {
  role: '職涯',
  project: '專案',
  skill: '技能',
  milestone: '里程碑',
}

export default function AboutPage() {
  return (
    <div className="container about-page">
      <p className="section-label about-section-label">About · 關於</p>
      <h1 className="display-l about-headline">
        我做的不只是漂亮畫面,<br />是能撐住的系統。
      </h1>

      <div className="about-body">
        <p>
          我是 Henry Chen,擁有 8 年產品設計經驗,專注於公共服務與 B2B 平台的 UX 系統建構。
          最近一個案子是主導一個縣級點數平台的設計,服務 50 萬+ 居民、橫跨 7 個服務模組。
        </p>
        <p>
          我的工作方式是 system-first。每個畫面都用 <code>X.Y.Z</code> 編號,讓 PM 與工程師可以無歧義 reference 任何 state。
          我特別在意邊界情境 — 那些大家都覺得「之後再做」的場景,因為那才是使用者真正感受到產品的時刻。
        </p>
        <p>
          工作以外,我在咖啡廳讀非虛構,玩底片相機,還在慢慢試著學廣東話。
        </p>
      </div>

      <div className="about-cta">
        <a href="/skills" className="about-cta-link about-cta-accent">看我的技能</a>
        <a href="#" className="about-cta-link">履歷 (PDF)</a>
        <a href="#" className="about-cta-link">LinkedIn</a>
      </div>

      {/* ─── Stats overview ─── */}
      <section className="about-stats">
        <p className="section-label">Numbers · 數字一覽</p>
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
          <p className="section-label">Timeline · 職涯與技能</p>
          <h2 className="h1 about-timeline-headline">
            這 8 年我做過什麼、<br />學過什麼。
          </h2>
          <p className="about-timeline-intro">
            從 UI 視覺起步,到主導跨團隊的系統設計 — 這條時間軸記錄每一年的轉折、每一次學到的東西、每一個能放上 portfolio 的專案。是個人 CV,也是設計師的成長地圖。
          </p>
        </div>

        {/* 倒序顯示 — 最新在最上面,使用者第一眼看到最近的工作 */}
        <ol className="timeline">
          {[...timeline].reverse().map((item) => (
            <li key={item.year} className={`timeline-item timeline-item--${item.kind}`}>
              <div className="timeline-marker">
                <span className="timeline-dot" aria-hidden />
                <span className="timeline-year">{item.year}</span>
              </div>
              <div className="timeline-content">
                <span className={`timeline-chip timeline-chip--${item.kind}`}>{kindLabel[item.kind]}</span>
                <h3 className="timeline-title">{item.title}</h3>
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
          border-radius: var(--r-lg);
          border: 1px solid var(--border);
          background: var(--surface);
          transition: transform 220ms var(--ease-out), border-color 220ms var(--ease-out);
        }
        .stat-card:hover { transform: translateY(-3px); border-color: var(--text); }
        .stat-card:nth-child(1) { background: var(--card-mint); border-color: transparent; }
        .stat-card:nth-child(2) { background: var(--card-peach); border-color: transparent; }
        .stat-card:nth-child(3) { background: var(--card-butter); border-color: transparent; }
        .stat-card:nth-child(4) { background: var(--card-lavender); border-color: transparent; }
        .stat-value { display: flex; align-items: baseline; gap: 6px; margin-bottom: 8px; }
        .stat-num {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 44px;
          line-height: 1;
          letter-spacing: -0.03em;
          color: var(--text);
        }
        .stat-unit {
          font-family: var(--font-mono), ui-monospace, monospace;
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
          width: 2px;
          transform: translateX(-50%);
          background: linear-gradient(
            to bottom,
            var(--border) 0%,
            var(--border) 92%,
            transparent 100%
          );
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
          box-shadow: 0 0 0 4px var(--bg);
        }
        .timeline-year {
          font-family: var(--font-mono), ui-monospace, monospace;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.04em;
          color: var(--text);
        }
        .timeline-item--role     .timeline-dot { background: var(--accent); border-color: var(--accent); }
        .timeline-item--project  .timeline-dot { background: var(--text); border-color: var(--text); }
        .timeline-item--skill    .timeline-dot { background: var(--card-mint); border-color: var(--text); }
        .timeline-item--milestone .timeline-dot { background: var(--card-peach); border-color: var(--text); }

        .timeline-content {
          padding: 20px 24px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--r-lg);
          transition: transform 220ms var(--ease-out), border-color 220ms var(--ease-out);
        }
        .timeline-content:hover { transform: translateY(-2px); border-color: var(--text); }

        .timeline-chip {
          display: inline-block;
          font-family: var(--font-mono), ui-monospace, monospace;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.06em;
          padding: 4px 10px;
          border-radius: var(--r-full);
          margin-bottom: 10px;
        }
        .timeline-chip--role     { background: var(--accent); color: var(--bg); }
        .timeline-chip--project  { background: var(--text); color: var(--bg); }
        .timeline-chip--skill    { background: var(--card-mint); color: var(--text); }
        .timeline-chip--milestone { background: var(--card-peach); color: var(--text); }

        .timeline-title {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 20px;
          line-height: 1.3;
          letter-spacing: -0.012em;
          margin-bottom: 8px;
          color: var(--text);
        }
        .timeline-body {
          font-size: 15px;
          line-height: 1.65;
          color: var(--text-muted);
        }

        /* ─── Colophon banner ─── */
        .colophon-banner {
          margin-top: var(--space-4xl);
          padding: var(--space-2xl);
          background: var(--card-lavender);
          border-radius: var(--r-xl);
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
          transition: transform 200ms var(--ease-out);
        }
        .colophon-banner-cta:hover { transform: translateY(-2px); }

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
