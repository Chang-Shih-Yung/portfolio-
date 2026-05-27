# Giselle Lai Portfolio

UX-led 個人作品集網站,以南投數位生活點數平台為旗艦案。

## Tech stack

- Next.js 15 App Router
- TypeScript
- MDX for case study content
- CSS custom properties (no Tailwind)
- Cabinet Grotesk + DM Sans + Geist Mono

## Source of truth

新 session 進來時務必先讀這幾份文件:

1. **[DESIGN.md](DESIGN.md)** ── 設計系統 v2 Friendly System (token 定義)
2. **[WIREFRAME.md](WIREFRAME.md)** ── IA / sitemap / Case Study 8 章節模板
3. **[CLAUDE.md](CLAUDE.md)** ── AI agent 指南 + Never/Always do 規則

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000

## File structure

```
portfolio/
├── DESIGN.md              # 設計系統 source of truth
├── WIREFRAME.md           # IA + Case Study 模板
├── CLAUDE.md              # AI agent 指南
├── app/
│   ├── layout.tsx         # Root layout + fonts + theme
│   ├── page.tsx           # 首頁 (single-page scroll)
│   ├── globals.css        # 所有 design tokens → :root
│   ├── work/[slug]/page.tsx  # Case study 動態路由
│   └── about/page.tsx     # About 極簡版
├── components/
│   ├── SiteNav.tsx
│   ├── Hero.tsx
│   ├── FeaturedCase.tsx
│   ├── WorkGrid.tsx
│   ├── StatsStrip.tsx
│   ├── SiteFooter.tsx
│   ├── ThemeToggle.tsx
│   ├── CaseStudyLayout.tsx
│   ├── CaseStudySideNav.tsx
│   ├── FlowDiagram.tsx    # SVG flow diagram for case thumbnails
│   └── Chip.tsx
├── content/
│   └── cases/
│       └── nantou-points.mdx  # 南投案 (§1-§8 placeholder 結構)
└── lib/
    └── cases.ts            # Case loader + 排序邏輯
```

## 新增 Case Study SOP

1. 建 `content/cases/<your-case-slug>.mdx`
2. 在 `lib/cases.ts` import 並加進 `cases` array
3. 套用 §1-§8 template (參考 nantou-points.mdx)
4. `featured: true` 設定旗艦,自動上首頁;`order` 控制 More Work grid 順序

## 編輯南投 case 內容

直接編輯 [content/cases/nantou-points.mdx](content/cases/nantou-points.mdx),裡面 §1-§8 都有 placeholder。

## 設計守則速記

讀 [DESIGN.md](DESIGN.md) 完整版。摘要:

- 字體只用 Cabinet Grotesk / DM Sans / Geist Mono
- 顏色只引用 globals.css 的 CSS variables,不要 hardcoded hex
- Featured Case 縮圖**必須露 flow diagram**,不能放 UI hero shot
- 沒有 emoji,任何位置都不要
- 圓角從 token 走 (--r-sm/md/lg/xl/full)
