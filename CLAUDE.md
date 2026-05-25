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

1. **`DESIGN.md`** — 設計系統 v2 (Cabinet Grotesk + DM Sans + pastel cards + 大圓角)
2. **`WIREFRAME.md`** — 網站 IA、sitemap、頁面 wireframe、Case Study 8 章節模板
3. **`CLAUDE.md`** (本檔) — 給 AI agent 的指南

**任何 visual / UI 決策前必須讀 DESIGN.md。** 不符合者要 flag,不要 silently deviate。

## Memorable thing

> **"This person thinks in systems — and is human enough to work with."**

所有設計決策都要服務這句話。Friendly visual language + UX-led 結構。Process artifact > final UI mockup。

## Language

- **對話 / 解釋 / 摘要:** 繁體中文
- **Identifiers (檔名、變數、function、token name):** 英文
- **內容文字 (case study body, hero tagline 等):**
  - 南投案內容用繁體中文 (台灣政府 context)
  - Hero tagline / About 用英文 (international HM audience)
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
