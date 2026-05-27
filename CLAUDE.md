# Henry Chen Portfolio — Project Instructions

## Project context

這是 Henry Chen 的個人作品集網站 (UI/UX 設計師,著重 UX + Product)。

- **目標受眾:** Hiring Manager / 求職市場
- **旗艦案:** 南投數位生活點數平台 (`/work/nantou-points`)
- **未來案例:** 預留擴充 slot,套用同 Case Study 模板
- **部署:** 本地 build,未來部署 (預設 Vercel)
- **設計系統:** v2 — Friendly System (詳見 DESIGN.md)

## Source of truth files

讀取順序 (新 session 開始時):

1. **`SPEC.md`** — 治理層:design philosophy、dev patterns、showcase architecture、out-of-scope (north star)
2. **`DESIGN.md`** — 設計系統 v2 (Cabinet Grotesk + DM Sans + pastel cards + 大圓角)
3. **`WIREFRAME.md`** — 網站 IA、sitemap、頁面 wireframe、Case Study 8 章節模板
4. **`CLAUDE.md`** (本檔) — 給 AI agent 的指南

**任何 visual / UI 決策前必須讀 DESIGN.md。任何架構 / scope 決策前必須讀 SPEC.md。** 不符合者要 flag,不要 silently deviate。

## Memorable thing

> **"This person thinks in systems — and is human enough to work with."**

所有設計決策都要服務這句話。Friendly visual language + UX-led 結構。Process artifact > final UI mockup。

## Language

- **對話 / 解釋 / 摘要:** 繁體中文
- **Identifiers (檔名、變數、function、token name):** 英文
- **內容文字 (case study body, hero tagline 等):**
  - **全站介面 + body 一律繁體中文** (2026-05-26 update — 原本 Hero/About 英文,使用者要求全翻繁中)
  - Section labels / chips 仍可保留英文 mono uppercase (作為 visual chrome)
  - 國際 proper noun (Figma / Notion / WCAG / B2B 等) 保留英文
  - 雙語切換 = 未來功能,v1 不做

## Tech stack (preferences for `/design-html`)

- **Framework:** Next.js App Router (預設) 或 Astro (如果偏靜態)
- **Styling:** CSS custom properties 直接走 DESIGN.md tokens,不需要 Tailwind
- **Content:** MDX (case study 內頁) + frontmatter (featured / order / domain)
- **Hosting:** Vercel
- **Fonts:**
  - Cabinet Grotesk via Fontshare CDN
  - DM Sans + Geist Mono via Google Fonts

## Skill routing

When the user's request matches an available skill, invoke it via the Skill tool.

- 設計實作 → `/design-html`
- 設計系統迭代 → `/design-consultation` (update mode)
- 設計 review (plan-mode) → `/plan-design-review`
- 設計 review (live site) → `/design-review`
- QA / 測試網站 → `/qa` 或 `/qa-only`
- Code review → `/review`
- Ship / deploy → `/ship`
- Bugs / errors → `/investigate`

## Design system rules (hard)

讀 DESIGN.md 完整版。摘要:

### Never do
- 用 Inter / Roboto / Space Grotesk / Poppins / system-ui 當 primary font
- 用 `#FFFFFF` / `#000000` (用 warm `#FAFAF7` / `#0B0B0A`)
- 用 紫/藍/綠 accent (我們用 warm orange `#E04E1F`)
- 同色相鄰 cards (mint + mint 並排 NO,要 alternate)
- 全部 card 用同一 radius (image inside card 要比 outer 小一級)
- Pastel + orange 同時大面積出現 (orange 仍要 sparse)
- 用 parallax / scroll-jacking / decorative blob animation
- "Hi, I'm [name], passionate designer..." 開頭的 essay hero (我們用「Hi, I'm Henry.」短招呼)
- 3-column feature grid with icons in colored circles
- 3D illustrated mascots / 卡通 hero
- Featured Case 縮圖放漂亮 UI hero shot (**必須露 flow / IA / system map**)
- **任何 emoji 使用** (hero / chips / about / case study 都不放 — Y2K vibe 對 senior product designer 是扣分項)

### Always do
- Sticky side nav for Case Study (內容長,navigation 必須)
- Featured Case 縮圖優先露 process artifact (flow / IA / system map)
- Geist Mono uppercase + letter-spacing 0.06em for meta chips (但用量克制)
- Cabinet Grotesk Bold 700 for display headings
- DM Sans for all body / paragraph
- 4 / 8 / 16 / 24 / 32 / 40 / 56 / 80 spacing scale (4 倍數)
- Container max-width 1280 px
- Pill shape for buttons / nav items / chips (`--r-full`)
- Card hover lift `translateY(-4px)` + 320ms ease-out
- Light + dark mode 都驗證過再 commit

### QA checklist

任何 UI 變更 (PR / commit) 必須驗證:
- [ ] 字體只用 Cabinet Grotesk / DM Sans / Geist Mono (沒有 fallback 到 system)
- [ ] 顏色只引用 DESIGN.md 定義的 token (沒有 hardcoded hex)
- [ ] Spacing 是 4 倍數
- [ ] Border-radius 來自 token (sm 12 / md 20 / lg 28 / xl 40 / full 9999)
- [ ] 相鄰 cards 不同色
- [ ] Image inside card radius 比 outer card 小一級
- [ ] 沒有違反 anti-patterns section
- [ ] Light + dark mode 都看過

## Auto Mode preferences (this user)

- 使用者習慣 Auto Mode,**不要過度問 clarifying questions**
- 推斷可推斷的事,真不確定才 ask
- 視覺 taste / 不可逆決定 才 ask
- AskUserQuestion 用繁體中文,選項用英文+中文 mix OK

## File naming conventions

- Component files: `PascalCase.tsx`
- Content files: `kebab-case.mdx` (e.g. `nantou-points.mdx`)
- Style tokens: 全寫進 `globals.css` 的 `:root`,不分散
- Public assets: `public/work/[case-slug]/[asset].png|svg|gif`

## Decisions Log

| Date | Decision | Reference |
|------|----------|-----------|
| 2026-05-25 | Initial wireframe + DESIGN.md v1 created | `WIREFRAME.md`, `DESIGN.md` |
| 2026-05-25 | **DESIGN.md upgraded v1 → v2 (Friendly System)** | User reference 偏 pastel modular,不是 editorial serif |
| 2026-05-25 | **整個 design system 移除 emoji** | User explicit · friendly signal 由 typography + radius + pastel 已足夠 |
| 2026-05-25 | UX-led 結構 + WIREFRAME.md 保留不變 | IA / sitemap / Case Study template 不受視覺改動影響 |
| 2026-05-25 | 旗艦案: 南投數位生活點數平台 | `/work/nantou-points` (Tier 1) |
| 2026-05-25 | Case 2/3 預留 slot,未來補 | Sitemap 已備位置 |
| 2026-05-26 | **全站介面翻繁中** (Hero / About / Skills / SiteNav / CaseStudy 全翻) | 原本 Hero/About 用英文,使用者明確要求全翻 |
| 2026-05-26 | **About 頁面加 stats + CV-style timeline + site notes** | 個人成長視覺化,圖像呈現職涯與技能習得 |
| 2026-05-26 | **南投案 8 個 flow 真實內容** (page 0-7,基於 Figma 截圖 + PDF) | flow 2 = 首頁/通知/掃碼/點數紀錄; flow 6 = 會員; flow 7 = 特店申請 |
| 2026-05-26 | **Design system Figma node 確認為 5-9777** | 不是原推測的 2-6810 (2-6810 是特店申請 flow) |
| 2026-05-26 | **Case study Hero 加 cover banner** | meta 新增 `cover` 欄位,CaseStudyLayout 渲染 |
| 2026-05-26 | **Context section 改 grid card,sub-sections 用灰線分隔** | 視覺結構化,Stakeholders + Constraints + Why-it-matters 三 cell |
| 2026-05-26 | **prose table style 加進 globals.css** | mdx 內 markdown table 有 border/thead/hover style |
| 2026-05-26 | **Case Study 8 → 5 章節** (移除 Context/Iteration/Impact) | 沒真實數據的章節變成 generic placeholder,稀釋主旋律 |
| 2026-05-26 | **About hero 句子口語化** | 「我做的不只是漂亮畫面,是能撐住的系統」 |
| 2026-05-26 | **About timeline 倒序顯示 + dot 對齊 line 重構** | 最新在上 · marker flex column align-center 解決 3px 對齊偏差 |
| 2026-05-26 | **`/colophon` 獨立頁建檔** (從 About 拆出設計筆記 + UI system 視覺化) | 標題用「Colophon · 裝幀說明」(出版術語對設計師有 signal) |
| 2026-05-26 | **DesignTokens.tsx 共用視覺化 component** (TypeRamp / ColorTokens / ComponentDemo / SpacingScale / RadiusScale) | Colophon 用全套,case study §Solution 用 ColorTokens + RadiusScale 子集 |
| 2026-05-26 | **CasesGrid 改 hero full-width + horizontal scroll-snap carousel** | 移除 placeholder 補滿 6 cards 的 demo 邏輯;empty state 顯示一個說明卡 |
| 2026-05-26 | **`--site-nav-h` / `--sticky-offset` layout token** | 解決 mobile FlowsShowcase chip nav 跟 SiteNav 重疊;所有 sticky 元素引用 token |
| 2026-05-26 | **CasesGrid 回 bento grid + placeholder 補滿 6** | 使用者要求維持原本「假資料卡牌」視覺;horizontal carousel 概念暫不使用 |
| 2026-05-26 | **mdx Solution 移除 Pastel 色票 + Radius scale 縮影** | 簡化 §Solution 視覺,只留 Figma frame 嵌入;完整 token 視覺化集中在 /colophon |
| 2026-05-26 | **加 Mermaid 套件 + Mermaid.tsx component (lazy load)** | 用 design token CSS var 注入 themeVariables,light/dark mode 自動 re-render |
| 2026-05-26 | **南投案 IA system map 改 Mermaid 渲染** | 取代 text-based 階層列表 + placeholder TODO,直接 inline 渲染 flowchart |
| 2026-05-26 | **mdx 刪 Naming convention + Why this matters + Research placeholder** | 「40% 減少 spec 會議」沒真實數據佐證;Research 是純 TODO 沒實質內容 |
| 2026-05-26 | **Discovery 章節 bullet 改 numbered insight cards** | 結構化視覺,跟 about/colophon 的 site notes 一致 |
| 2026-05-26 | **CaseStudySideNav 改 scroll-driven active detection** | IntersectionObserver 對短 section 不穩定;改成「viewport top + offset 為 active line」可靠 |
| 2026-05-26 | **Mermaid component fontFamily 加 CJK fallback + SVG inner polish CSS** | DM Sans 不含繁中導致中文字被切;加 PingFang/JhengHei 修字寬;CSS polish node 圓角/edge label pill |
| 2026-05-26 | **Mermaid `htmlLabels: false` (純 SVG text)** | foreignObject 對 CJK width 量錯,整段 label 被 truncate;改純 SVG text 用實際 glyph 寬度 |
| 2026-05-26 | **Mermaid 加 classDef 分類配色** (role peach / page mint / merchant lavender) | Chart 視覺自帶 grouping,讀者一眼分辨 B2C vs B2B + 角色 vs 頁面 |
| 2026-05-26 | **Mermaid layout 增加 rankSpacing (60→100)** | 給 edge label 喘息空間,不再被 node 覆蓋 |
| 2026-05-26 | **Mermaid caption 拿掉複數 s**:`8 page × 3 role` | Schema 風格 caption,英文 s 在 design label 多餘 |
| 2026-05-26 | **Header 縮高:`--site-nav-h` 76→64,chip nav padding 12→6** | 合計 sticky header 從 128→100px,viewport 還給內容約 22% |
| 2026-05-26 | **SideNav tag 移除 `§` 符號**:`§1` → `1` | silcrow 對中文讀者陌生 (像「奇怪 s」),改純數字 |
| 2026-05-26 | **Mermaid font measure / render 同步修正** | CJK 字體 stack 放最前面,CSS 不再 `!important` override font-family,避免 measure / render 用不同字體導致 label 被切 |
| 2026-05-26 | **Mermaid label 拿掉 `N · ` prefix** | 縮短 label,降低被切風險;number 隱含在 graph 結構順序 |
