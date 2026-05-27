# Spec — Henry Chen Portfolio

> The governance layer. 把 DESIGN.md (視覺) + WIREFRAME.md (IA) 串成一個系統,定下開發模式跟內容架構的不可違反規則。
> 任何貢獻者 (人或 agent) 開工前讀完這份 + DESIGN.md + WIREFRAME.md = ready。
> Last updated: 2026-05-26

---

## 0. Reading order for new contributors

讀完這 4 份檔案 = 完整 context:

1. **`SPEC.md`** (本檔) — Philosophy, governance, dev patterns, out-of-scope
2. **`DESIGN.md`** — Visual system tokens, typography, color, spacing
3. **`WIREFRAME.md`** — Site IA, sitemap, page anatomy, case study template
4. **`CLAUDE.md`** — AI agent operating guide

---

## 1. Design philosophy (不可違反)

### 1.1 Memorable thing

> **"This person thinks in systems — and is human enough to work with."**

所有設計、文案、互動決策都要服務這句話。如果某個改動讓網站變得更「漂亮」但稀釋這個 signal,那個改動不上。

### 1.2 三個 immutable 信念

| # | 信念 | 它怎麼落地 |
|---|------|----------|
| **A** | Process > Polish | Featured case 縮圖露 flow / IA / system map,不露 UI hero shot。Case Study 70% 篇幅拆過程,30% 展示成果 |
| **B** | System > Screen | 任何 visual decision 必先過 DESIGN.md token。沒有 one-off 顏色、字級、間距 |
| **C** | Signal > Volume | 短 hero、短 tagline、短 CTA。Long-form 留給 case body |

### 1.3 Anti-patterns (一律不做)

- ❌ 寫 essay 式 hero ("Hi, I'm [name], a passionate designer with X years...")
- ❌ Featured case 縮圖放漂亮 UI hero shot — **必須露 process artifact**
- ❌ 在內容區用 emoji (任何頁面都不放,包含 hero / chips / about / case study)
- ❌ Inter / Roboto / Poppins / Space Grotesk / system-ui 當 primary font
- ❌ 純 `#FFFFFF` / `#000000` — 用 warm `#FAFAF7` / `#0B0B0A`
- ❌ Parallax / scroll-jacking / decorative blob animation
- ❌ 3-column feature grid with icons in colored circles
- ❌ 3D illustrated mascots / 卡通 hero
- ❌ "Coming soon" placeholder 留在 production (用 ghost card 標 TODO,但要 explicitly 寫出補什麼)

### 1.4 Tone of voice

| 場合 | 語氣 |
|------|------|
| Hero / About / Skills | English, declarative, short. 不誇張不自貶 |
| Case body (南投案) | 繁體中文 (台灣政府 context),口語化但 professional |
| Section labels / chips | English uppercase, mono font, 0.06em letter-spacing |
| Decisions / rationale | 第一人稱,explain "why",不 explain "what" (what 看 UI 就知道) |

---

## 2. Development patterns (技術上的固定 pattern)

### 2.1 Source of truth 分層

```
visual tokens          → app/globals.css :root
design system spec     → DESIGN.md
IA / sitemap spec      → WIREFRAME.md
case meta + prose      → content/cases/<slug>.mdx
case structured data   → content/cases/<slug>.flows.ts (or similar)
case registry          → lib/cases.ts
shared components      → components/*.tsx
page layouts           → app/<route>/page.tsx
```

新增任何東西前,先問:「這該屬於哪一層?」放錯層 = 將來找不到。

### 2.2 Styling rules

- 全域 token 一律走 `app/globals.css` 的 `:root` 變數
- Component 局部 style 用 inline `<style>{...}</style>` (見 Hero.tsx / FlowsShowcase.tsx)
- 永遠引用 token (`var(--accent)`),不硬寫 hex
- Spacing 必是 4 倍數 (4 / 8 / 16 / 24 / 32 / 40 / 56 / 80)
- Radius 從 token 取 (sm 12 / md 20 / lg 28 / xl 40 / full 9999)
- 相鄰 cards 不同色 (cycle mint → peach → butter → lavender)

### 2.3 Naming conventions

| 物件 | 規則 |
|------|------|
| Component files | `PascalCase.tsx` |
| Content files | `kebab-case.mdx` |
| Sibling data files | `<case-slug>.<purpose>.ts` (e.g. `nantou-points.flows.ts`) |
| HTML anchor ids | `kebab-case` |
| CSS class names | `kebab-case` with component prefix (`flow-card-title`, not `flowCardTitle`) |
| Case study screen ids | `X.Y.Z` (module . sub-flow . state) |
| Flow numbers | `0`, `1.1`, `4.2` (使用情境決定 depth) |

### 2.4 Add a new case (SOP)

1. `content/cases/<slug>.mdx` — `export const meta` (含 slug, title, subtitle, featured, order, role, team, timeline, stage, domain, year, cardColor)
2. (optional) `content/cases/<slug>.flows.ts` — 結構化 flows 資料
3. Import 進 `lib/cases.ts` 並 push 進 `cases` array
4. Done — 首頁 grid 與 `/work/<slug>` route 自動處理

### 2.5 Add a new flow to existing case (SOP)

1. 在 Figma 把該 flow frame 設為 "Anyone with the link can view"
2. 抄 `fileKey` + `nodeId`
3. Push 一筆 Flow object 進該 case 的 `<slug>.flows.ts`
4. Done — FlowsShowcase 自動 render + chip nav 自動更新

### 2.6 Add a new page (SOP)

1. 確認該頁屬於 sitemap (見 WIREFRAME.md);不在 sitemap 的,先談是否擴 IA
2. `app/<route>/page.tsx` — server component 優先,client only if 真需要 (state / effect)
3. Metadata export 必填 (title + description)
4. Container max-width 1280 (`.container` class)
5. Light + dark mode 都測過

---

## 3. Showcase architecture (內容架構,不可走偏)

### 3.1 Site IA (對齊 SiteNav)

```
Work (/)            — Featured case (full-width hero) + supporting carousel
About (/about)      — Self intro + stats + CV timeline + → Colophon CTA banner
Skills (/skills)    — Capabilities, tooling, collaboration
Colophon (/colophon) — Design notes + UI system token 視覺化 (footer link only)
```

未來如果加 Writing / Blog / Resume,**必先回 SPEC.md** 重新思考 IA,不是直接加 nav link。Colophon 故意不放主 nav (避免擁擠),只在 footer + about CTA banner 暴露。

### 3.2 Case Study 模板 (5 章節核心 + 3 可選擴充)

**核心 5 章節 (mandatory · sticky nav 永遠顯示):**

```
§1 Overview       — Elevator pitch + challenge in one sentence + shape of the system
§2 Discovery      — Research artifacts + key insights driving decisions
§3 IA             — System map + naming convention + why it matters
§4 Flow           — FlowsShowcase (sticky chip nav + flow cards)
§5 Solution       — Hero screens + design system snapshot
```

**可選擴充章節 (optional · 看 case 需要才放):**

- **Context** — Stakeholders / constraints / why it matters。Civic tech / 跨組織 case 通常需要,純 product case 可省
- **Iteration** — Lo-fi → Hi-fi 演進 / before-after 決策對比。如果 process 本身是賣點才放
- **Impact** — Quantitative + qualitative outcomes + 反思。需要真實數字才放,沒有就略過

側邊 sticky nav 預設只列核心 5 章節 (見 CaseStudySideNav.tsx)。可選擴充章節如果出現在 mdx,heading 仍可被掃描,但 sidenav 不主動列出,避免「點 §6 結果跳到空 placeholder」的破窗體驗。

**為什麼從 8 砍到 5:** Context / Iteration / Impact 本質是「supporting evidence」,沒有真實數據或研究就會變成 generic placeholder,稀釋 case 主旋律。設計師主軸是 IA + Flow + Solution,前面 Overview + Discovery 鋪陳,5 章節閉環完整。

### 3.3 Hero pattern (homepage + about)

統一形狀,不寫 essay:

```
[Section label / "About"]
[Display headline — 短到 1-3 行,大字 Cabinet Grotesk Bold]
[Tagline / blurb — 1 句話,DM Sans, max 56ch]
[Meta chip — 8 YRS · Civic Tech · ... — Geist Mono uppercase, 克制]
[1 顆主 CTA] (可選)
```

### 3.4 Card thumbnail pattern (Featured case)

縮圖是 portfolio 最 critical 的 30 秒。**永遠優先露:**

1. Flow diagram / user journey
2. IA / system map
3. Numbered screen grid (1.1 / 1.2 / 4.2 ...)
4. Design token comparison
5. Before/after iteration

**永遠不放:**

- 漂亮的單張 UI hero shot (HM 每天看 50 張,記不住)
- 純 logo / brand mark
- 抽象裝飾圖 (gradient / 3D blob)

### 3.5 Flow chapter pattern (case §5)

```
[Sticky chip nav — 所有 flow 的 number + short label]
[Flow card · cycle mint/peach/butter/lavender]
  [Flow · number chip]
  [Title — Cabinet Grotesk]
  [Blurb — 1-2 sentence]
  [Figma live embed iframe]
  [Key decisions — 2-4 bullets]
```

10+ flows 都長同樣,visual rhythm 靠 pastel cycle + spacing,不靠 hero 大圖。

### 3.6 Voice template for "Key decisions"

每個 decision 寫成 **「為什麼這樣 / 而不是那樣」** 形式。不寫 what,只寫 why:

- ✅ "驗證碼錯誤分『次數內』跟『次數爆』兩個 state — 後者強制 timeout,降低 brute-force 風險"
- ❌ "我們設計了驗證碼錯誤的 state"

---

## 4. Out of scope (避免 scope creep)

**短期內不做:**

- Blog / writing section (現在沒有持續產出能力,空頁面比沒有更扣分)
- Newsletter signup
- 互動 3D / WebGL / canvas
- Animation library (Framer Motion / GSAP) — `<style>` + CSS transition 夠用
- i18n language switcher — v1 不做 (繁中只在 case body,介面全英)
- Contact form / engagement features — Email 已拿掉,用 LinkedIn / Resume CTA
- 真實 CMS — MDX 對單人作品集 over-deliver

**永遠不做:**

- Pop-up modals 推薦自己 / "Hire me" 訂閱表單
- Visitor tracking / heatmap 在頁面顯示

任何「我想加 X」的提案,先檢查 X 是否在 out-of-scope 內。在 → 需要明確理由翻案。

---

## 5. Definition of Done (任何 PR / commit)

UI 變動上線前必須過這個 checklist:

- [ ] 引用 token,沒 hardcoded hex / px
- [ ] Spacing 是 4 倍數
- [ ] Border-radius 從 token 取
- [ ] 字體只用 Cabinet Grotesk / DM Sans / Geist Mono
- [ ] 相鄰 cards 不同色
- [ ] Image inside card radius 比 outer card 小一級
- [ ] 沒有違反 §1.3 anti-patterns
- [ ] Light + dark mode 都驗
- [ ] Mobile (≤768px) 不破版
- [ ] `npx tsc --noEmit` 沒新增錯誤
- [ ] 沒留 console.log / TODO 而不做標記

---

## 6. Decisions Log (跨 spec 級的決定)

| Date | Decision | Reference |
|------|----------|-----------|
| 2026-05-25 | Memorable thing 定為「thinks in systems + human enough to work with」 | CLAUDE.md |
| 2026-05-25 | 全站移除 emoji | DESIGN.md v2 |
| 2026-05-25 | DESIGN.md v1 → v2 Friendly System (pastel cards + Cabinet Grotesk) | DESIGN.md |
| 2026-05-25 | Case Study 固定 8 章節模板 | WIREFRAME.md |
| 2026-05-26 | Email 功能整站移除,主 CTA 改 `/skills` | Hero / SiteNav / SiteFooter / About / CaseStudyLayout |
| 2026-05-26 | 新增 `/skills` 頁 (6 group + tools chips) | app/skills/page.tsx |
| 2026-05-26 | Flow chapter 改用 FlowsShowcase + sticky chip nav + Figma live embed | components/FlowsShowcase.tsx |
| 2026-05-26 | SPEC.md 建檔 (治理層) | SPEC.md (本檔) |
| 2026-05-26 | **Case Study 模板從 8 → 5 章節** (Context/Iteration/Impact 改為可選) | 沒真實數據的章節變成 generic placeholder,稀釋主旋律 |
| 2026-05-26 | **About hero 句子口語化** | 「我幫團隊把系統做到撐得住」→「我做的不只是漂亮畫面,是能撐住的系統」 |
| 2026-05-26 | **About timeline 倒序 + dot 對齊 line 重構** | 最新在最上 (使用者第一眼看到最近) · marker flex column align-center 解決 dot/line 對齊偏差 |
| 2026-05-26 | **`/colophon` 獨立頁** + `components/DesignTokens.tsx` 共用 visualization | 從 About 拆出設計筆記,加上 type/color/component/spacing/radius 全套 token 視覺化 |
| 2026-05-26 | **CasesGrid 改 hero full-width + horizontal scroll-snap carousel** | 移除 placeholder 補滿 6 cards 邏輯,empty state 改單一說明卡 |
| 2026-05-26 | **`--site-nav-h` / `--sticky-offset` layout token** | 解決 mobile sticky chip nav 跟 SiteNav 重疊;所有 sticky 元素 ref token |
| 2026-05-26 | **加 Mermaid 套件,IA system map 改 Mermaid 渲染** | DSL 寫圖,免費 open source,lazy load 避免 first-load 衝擊 |
| 2026-05-26 | **CasesGrid 維持 bento grid 假資料補滿** | 短期內只有 1 旗艦案,假卡片提供「未來擴充」視覺暗示 |
| 2026-05-26 | **CaseStudySideNav 改 scroll-driven** | IntersectionObserver 對短 section 不穩定,改 RAF + viewport offset 邏輯 |
| 2026-05-26 | **Mermaid CJK fontFamily + SVG polish** | 修中文字被切;加 node 圓角 + edge label pill,跳脫 mermaid 預設「線框感」 |
| 2026-05-26 | **Discovery 章節改 insight cards 結構** | 取代 plain bullet,跟 site notes 視覺一致 |
| 2026-05-26 | **Mermaid `htmlLabels: false` + classDef 分類配色** | 修中文 truncate;chart 視覺自帶 grouping |
| 2026-05-26 | **Sticky header 縮高 22%** | `--site-nav-h` 76→64 · chip nav padding 12→6 · 還給內容 viewport |
