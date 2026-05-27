import type { Metadata } from 'next'
import {
  TypeRamp,
  ColorTokens,
  ComponentDemo,
  SpacingScale,
  RadiusScale,
} from '@/components/DesignTokens'

export const metadata: Metadata = {
  title: 'Colophon · 裝幀說明 — Giselle Lai',
  description: '這個 portfolio 的設計筆記、UI system、token 視覺化。',
}

// ─── Site notes (UX rationale,從 /about 搬過來) ────────────────
type SiteNote = { num: string; title: string; body: string }

const siteNotes: SiteNote[] = [
  {
    num: '01',
    title: 'IA 對齊 HM 真正的閱讀順序',
    body: '作品放最前 — HM 第一個看的是案例,不是我的故事。關於在中間,技能在後 — 確認 fit 才會被翻到。沒有 /case-studies 列表頁,首頁就是列表頁,少一層點擊。',
  },
  {
    num: '02',
    title: 'Hero 故意短',
    body: '大部分 portfolio 用「Hi, I\'m X, a passionate designer with 8 years of experience...」開場 — HM 看到第三個就 skip。我的 hero 只有一句招呼 + 一行 tagline + 一條 meta chip,兩秒內讓 HM 知道 who / what / focus,把 prime real estate 讓給作品。',
  },
  {
    num: '03',
    title: '旗艦案縮圖露 flow,不露 UI',
    body: '大部分 portfolio 縮圖放漂亮 UI hero shot。但 HM 已經看過五十張長一樣的 UI shot — 他真正稀缺的訊號是「這個人會想 system」。所以縮圖直接露 user flow / IA / system map。Anti-pretty,but more honest。',
  },
  {
    num: '04',
    title: 'Case Study 用固定 5 章節模板',
    body: 'Overview → Discovery → IA → Flow → Solution。每個 case 都長一樣,HM 看第二個 case 就知道怎麼讀,認知負擔不會隨 case 數量增長。Context / Iteration / Impact 是可選擴充,沒有真實數據時不放,避免 generic placeholder 稀釋主旋律。',
  },
  {
    num: '05',
    title: 'Sticky side nav + Flow chip nav',
    body: '單一 case study 內容很長 (4000+ 字)。Side nav 永遠在,HM 跳到他關心的章節不用 scroll。Flow 章節再加一層 chip nav,10+ flows 也能瞬間導航,不會迷路。',
  },
  {
    num: '06',
    title: '視覺系統:溫暖、友善、克制',
    body: 'Cabinet Grotesk (display) + DM Sans (body) + Geist Mono (meta) — 沒用 Inter / Roboto / system-ui。配色不是純白純黑,是 warm off-white + warm orange accent,搭 mint / peach / butter / lavender 四色 pastel cards 給 case grid 視覺節奏。Orange 永遠克制使用,像強調筆不是螢光筆。',
  },
  {
    num: '07',
    title: '節奏靠 pastel 輪替,不靠動畫',
    body: 'Case study 跟 Skills 頁面用 pastel cards 輪替 (mint → peach → butter → lavender),靠顏色循環給 scroll 視覺節奏。沒有 parallax,沒有 scroll-jacking,沒有 decorative blob animation — 內容自己撐場。',
  },
  {
    num: '08',
    title: 'Dark mode 第一天就上',
    body: '不是 nice-to-have。設計師讀 portfolio 多在晚上或暗環境。所有 visual decision 在 light + dark 兩種模式都驗過才上線,共用同一套 design token。',
  },
  {
    num: '09',
    title: 'X.Y.Z 編號 = 共通詞彙',
    body: '每個 case 內的畫面用 X.Y.Z 編號 (module . sub-flow . state)。PM / 工程 / 設計三方可以無歧義 reference 任何畫面 — 1.2.5 = 帳號模組 · 註冊子流程 · 驗證碼錯誤 state。這個 convention 在實際專案減少了大約 40% 的 spec 釐清會議。',
  },
  {
    num: '10',
    title: 'Process > Polish',
    body: '任何 senior designer 都能畫漂亮 UI。真正稀缺的是「為什麼這樣畫」。所以這站 70% 篇幅在 talk about process,30% 才放 final UI。Decisions 都寫成「為什麼這樣 / 而不是那樣」,不寫 what,只寫 why。',
  },
]

type Section = { num: string; label: string; title: string; intro: string; children: React.ReactNode }

function SectionBlock({ num, label, title, intro, children }: Section) {
  return (
    <section className="colophon-section">
      <header className="colophon-section-head">
        <p className="section-label">{label}</p>
        <h2 className="h1 colophon-section-title">{title}</h2>
        <p className="colophon-section-intro">{intro}</p>
      </header>
      <div className="colophon-section-body">{children}</div>
    </section>
  )
}

export default function ColophonPage() {
  return (
    <div className="container colophon-page">
      <header className="colophon-hero">
        <p className="section-label">Colophon · 裝幀說明</p>
        <h1 className="display-l colophon-headline">
          這個 portfolio<br />是怎麼蓋起來的。
        </h1>
        <p className="colophon-intro">
          Colophon 是出版術語,出版物末頁標註字體、紙張、印刷工藝的地方。
          設計師看到這頁通常會多停 30 秒 — 因為這節決定的不是「這人作品好不好」,而是「這人對細節有沒有講究」。
          以下是這個網站每個視覺與結構決策背後的 UX 思考,以及整個 UI system 的 token 視覺化。
        </p>
      </header>

      <SectionBlock
        num="01"
        label="§1 · Design notes"
        title="為什麼每個選擇都這樣做。"
        intro="10 條設計筆記。不是工程細節,而是這個網站每一個 UX 決策的 why。如果你是讀這段的設計師,這節是判斷我們是不是同 wavelength 的最快入口。"
      >
        <ol className="notes-list">
          {siteNotes.map((n) => (
            <li key={n.num} className="note">
              <span className="note-num">{n.num}</span>
              <div className="note-body">
                <h3 className="note-title">{n.title}</h3>
                <p className="note-text">{n.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </SectionBlock>

      <SectionBlock
        num="02"
        label="§2 · Typography"
        title="Cabinet Grotesk × DM Sans × Geist Mono."
        intro="三套字型,各司其職。Cabinet Grotesk 給 hero 充足 personality;DM Sans 圓潤 body;Geist Mono 給 meta chip 一點結構感。三套都不在 overused list (no Inter / Roboto / Poppins / Space Grotesk)。"
      >
        <TypeRamp />
      </SectionBlock>

      <SectionBlock
        num="03"
        label="§3 · Color"
        title="Warm neutrals + pastel cards + sparse orange."
        intro="Backgrounds + text 保持 warm 不純白純黑。新增 pastel card 色票給 grid 視覺節奏。橘色 accent 仍然用得少 — CTA + hover only,像強調筆不是螢光筆。"
      >
        <ColorTokens />
      </SectionBlock>

      <SectionBlock
        num="04"
        label="§4 · Components"
        title="Pills, chips, cards, inputs."
        intro="Border-radius 全面放大 — button / chip / input 都走 pill 或 large radius。仍然 no bubble feel (image / case thumbnail 用 r-md 不是 r-xl)。"
      >
        <ComponentDemo />
      </SectionBlock>

      <SectionBlock
        num="05"
        label="§5 · Spacing"
        title="4 倍數 spacing scale。"
        intro="所有 padding / margin / gap 都從這 9 階 token 取。沒有 one-off 數字。設計師看 spacing 一眼就知道走的是哪個 token,工程實作也不會出現 17px / 23px 這種對不齊的值。"
      >
        <SpacingScale />
      </SectionBlock>

      <SectionBlock
        num="06"
        label="§6 · Radius"
        title="5 階圓角,從 12 到 pill。"
        intro="Card outer 大、image inner 小一級。Button / chip / nav-pill 走 full pill。Image inside card 故意用 r-md (不是 r-xl),避免 bubble feel。"
      >
        <RadiusScale />
      </SectionBlock>

      <footer className="colophon-end">
        <p className="section-label">End of colophon</p>
        <h2 className="h2 colophon-end-title">看完了。回作品吧。</h2>
        <div className="colophon-end-cta">
          <a href="/" className="colophon-cta colophon-cta-accent">回首頁看作品 →</a>
          <a href="/skills" className="colophon-cta">看技能</a>
        </div>
      </footer>

      <style>{`
        .colophon-page { padding-top: var(--space-3xl); padding-bottom: var(--space-4xl); }

        /* ─── Hero ─── */
        .colophon-hero { max-width: 720px; margin-bottom: var(--space-4xl); }
        .colophon-headline { margin: var(--space-md) 0 var(--space-md); }
        .colophon-intro {
          font-size: 18px;
          line-height: 1.7;
          color: var(--text-muted);
        }

        /* ─── Section wrapper ─── */
        .colophon-section {
          padding-top: var(--space-3xl);
          padding-bottom: var(--space-3xl);
          border-top: 1px solid var(--border-soft);
        }
        .colophon-section:first-of-type { border-top: none; padding-top: 0; }
        .colophon-section-head { margin-bottom: var(--space-2xl); max-width: 60ch; }
        .colophon-section-title { margin: var(--space-sm) 0 var(--space-md); }
        .colophon-section-intro {
          font-size: 17px;
          line-height: 1.65;
          color: var(--text-muted);
        }

        /* ─── Notes list ─── */
        .notes-list {
          display: flex;
          flex-direction: column;
          gap: var(--space-xs);
        }
        .note {
          display: grid;
          grid-template-columns: 80px 1fr;
          gap: var(--space-md);
          padding: var(--space-lg);
          border-radius: var(--r-lg);
          border: 1px solid var(--border);
          background: var(--surface);
          transition: border-color 200ms var(--ease-out), transform 200ms var(--ease-out);
        }
        .note:hover { border-color: var(--text); transform: translateY(-2px); }
        .note-num {
          font-family: var(--font-mono), ui-monospace, monospace;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.08em;
          color: var(--accent);
          padding-top: 4px;
        }
        .note-body { min-width: 0; }
        .note-title {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 20px;
          line-height: 1.3;
          letter-spacing: -0.012em;
          margin-bottom: var(--space-xs);
          color: var(--text);
        }
        .note-text {
          font-size: 15.5px;
          line-height: 1.7;
          color: var(--text-muted);
        }

        /* ─── End CTA ─── */
        .colophon-end {
          margin-top: var(--space-4xl);
          padding-top: var(--space-2xl);
          border-top: 1px solid var(--border-soft);
        }
        .colophon-end-title { margin: var(--space-sm) 0 var(--space-lg); }
        .colophon-end-cta { display: flex; gap: var(--space-xs); flex-wrap: wrap; }
        .colophon-cta {
          font-size: 15px;
          font-weight: 600;
          padding: 12px 22px;
          border-radius: var(--r-full);
          border: 1px solid var(--border);
          transition: all 200ms var(--ease-out);
        }
        .colophon-cta:hover { border-color: var(--text); transform: translateY(-2px); }
        .colophon-cta-accent {
          background: var(--accent);
          color: var(--bg);
          border-color: var(--accent);
        }

        @media (max-width: 768px) {
          .colophon-page { padding-top: var(--space-2xl); }
          .colophon-hero { margin-bottom: var(--space-3xl); }
          .colophon-section {
            padding-top: var(--space-2xl);
            padding-bottom: var(--space-2xl);
          }
          .note {
            grid-template-columns: 1fr;
            gap: var(--space-xs);
            padding: var(--space-md);
          }
          .note-num { padding-top: 0; }
        }
      `}</style>
    </div>
  )
}
