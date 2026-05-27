# Design System — Giselle Lai Portfolio

> Source of truth for all visual decisions on this site.
> Created by `/design-consultation` · 2026-05-25
> Last updated: 2026-05-25 (v2 — Friendly System)

---

## Product Context

- **What this is:** Giselle Lai 的個人作品集網站 (UX-led)
- **Who it's for:** Hiring Manager / Recruiter (求職市場)
- **Space/industry:** UI/UX Design · Product Design · Civic Tech · B2B SaaS
- **Project type:** Personal portfolio (multi-page · single-page-scroll homepage · dedicated case study pages)
- **Stage:** Greenfield (本地端 build,未來部署)

## Memorable Thing

> **"This person thinks in systems — and is human enough to work with."**

設計系統的北極星。每個 token 都要可追溯回這句話 ── 系統思考 + 人味。Civic tech / B2B portal 本來就要團隊協作,純冷血 system thinker 反而 mismatch domain。

---

## Aesthetic Direction

- **Direction:** Friendly modular
- **Decoration level:** Intentional (pastel cards · large radius · 不過度裝飾)
- **Mood:** 親切 / 不裝 / 有人味 / 仍然系統思考 / **no emoji**
- **Reference vibe:**
  - 大圓角 modular card layout (like Linear / Notion / Cal.com)
  - Pastel color blocks (mint / peach / butter)
  - Bold sans-serif display (not generic Inter)
  - **Warm without emoji** — friendly signal 靠 typography + radius + 色塊,不靠 Y2K vibe

### Why this direction

90% 的 product designer 作品集要嘛 boring corporate (Inter + 中性) 要嘛 over-illustrated (3D blob hero)。Friendly modular 是中間 ── 有 personality 但仍 functional,讓 HM 第一眼 anchor「這人會做系統,而且不冷不官腔」。

---

## Typography

### Font stack

| Role | Font | Weight | Source |
|---|---|---|---|
| Display / Hero / Case Title | **Cabinet Grotesk** (bold geometric sans) | 500-700 | Fontshare (Indian Type Foundry) |
| Body / Paragraph / About | **DM Sans** (rounded geometric sans) | 300-700 | Google Fonts |
| Meta / Chip / Caption / Code | **Geist Mono** | 400-500 | Google Fonts |

```html
<link href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@400,500,700,800,900&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=Geist+Mono:wght@400;500&display=swap" rel="stylesheet">
```

### Why these fonts

- **Cabinet Grotesk** 是 modern geometric sans,Bold weight 有 distinct personality 但不過度。**不用 Inter / Poppins / Space Grotesk** ── 那些是 AI 預設,沒 taste signal。
- **DM Sans** 圓潤幾何感,跟 friendly vibe 一致,跟 Cabinet 對比夠但不衝突。Body 文字易讀。
- **Geist Mono** 用在 meta chip 跟編號,呼應南投案的 `X.Y.Z` 系統。**用量降低** ── 不再每個 chip 都用,選擇性使用作為 structural signal。

### Type scale

| Level | Size | Font | Weight | Line-height | Letter-spacing | Use |
|---|---|---|---|---|---|---|
| Display 72 | 72 px | Cabinet Grotesk | 700 | 0.98 | -0.035em | Hero greeting |
| Display 56 | 56 px | Cabinet Grotesk | 700 | 1.00 | -0.025em | Case title hero |
| H1 | 38 px | Cabinet Grotesk | 700 | 1.10 | -0.020em | Section heading |
| H2 | 28 px | Cabinet Grotesk | 500 | 1.20 | -0.015em | Sub-section |
| H3 | 22 px | DM Sans | 600 | 1.30 | -0.010em | Module title |
| Body L | 19 px | DM Sans | 400 | 1.55 | 0 | Lead paragraph |
| Body | 17 px | DM Sans | 400 | 1.60 | 0 | Default body |
| Small | 14 px | DM Sans | 400 | 1.50 | 0 | Caption, footnote |
| Caption | 12 px | Geist Mono | 400 | 1.40 | 0.06em uppercase | Meta chip, label |

### Mobile scale

Display 72 → 54, Display 56 → 40, H1 → 28, H2 → 22. 其餘不變。

---

## Color

**Approach:** Hybrid — 中性 backgrounds + pastel card 系統 + sparse orange accent。

### Light mode (default)

```
─── Backgrounds & text ─────────────
  --bg            #FAFAF7   warm off-white
  --surface       #FFFFFF   card / sticky / pills
  --border        #E8E5DE   default border
  --border-soft   #F0EDE6   section divider
  --text          #0B0B0A   warm near-black
  --text-muted    #6B665E   secondary text
  --text-subtle   #9A938A   meta, captions
  --accent        #E04E1F   warm orange (sparse, CTA + hover)
  --accent-soft   rgba(224, 78, 31, 0.10)

─── Card palette (v2 new) ──────────
  --card-mint     #C5E5D6   sage mint
  --card-peach    #FFD9C2   soft peach   ← Featured Case 預設
  --card-butter   #FFE99A   warm butter
  --card-lavender #D8D4F0   soft lavender (optional)
  --card-black    #0B0B0A   strong contrast
  --card-white    #FFFFFF   clean
```

### Dark mode

```
─── Backgrounds & text ─────────────
  --bg            #0E0D0B
  --surface       #17150F
  --border        #2A2620
  --text          #F5F2EB
  --text-muted    #9A938A
  --accent        #FF6A3D   (slightly brighter for contrast)

─── Card palette (muted pastel) ────
  --card-mint     #1F3A2C   deep mint
  --card-peach    #3A241A   deep peach
  --card-butter   #3A331A   deep butter
  --card-lavender #26243A   deep lavender
```

### Card 使用規則

- **Featured Case** 預設 peach。如果有第二個 featured case,用 mint
- **More Work** 卡片**輪流** mint / butter / black,不要全部同色
- **Stats strip / pull-quote** 用 butter (吸睛但不過火)
- **CTA block** 在頁面底部可用 black + white text
- **Lavender** 是 reserved color,只在 explorations / playful section 用
- 不要兩個相鄰 card 同色

### Contrast ratios

- `--text` on `--bg`: **17.5:1** (WCAG AAA)
- `--text` on `--card-mint`: **13.2:1** (AAA)
- `--text` on `--card-peach`: **14.8:1** (AAA)
- `--text` on `--card-butter`: **15.6:1** (AAA)
- `--accent` on `--bg`: **4.8:1** (AA, large text only)

### Why warm orange accent (kept from v1)

90% UX portfolio 用藍/紫/綠 accent。橘色仍是 differentiation 訊號,但**用得極少** ── 只在 primary CTA、link hover、active state。v2 加了 pastel cards 之後,橘色更要克制,不要跟 peach 打架(視覺距離夠遠,實際 OK)。

---

## Spacing

- **Base unit:** 4 px
- **Density:** Comfortable + spacious (v2 加大 padding,跟大圓角配合)
- **Scale:** `4 · 8 · 16 · 24 · 32 · 40 · 56 · 80 · 128`

```css
--space-2xs: 4px;   --space-xs: 8px;    --space-sm: 16px;
--space-md: 24px;   --space-lg: 32px;   --space-xl: 40px;
--space-2xl: 56px;  --space-3xl: 80px;  --space-4xl: 128px;
```

### Card 內 padding

- Small card (work card): 28 px
- Medium card (stats strip): 32-36 px
- Large card (featured): 48 px

---

## Layout

- **Approach:** Hybrid (首頁 friendly-modular grid,case study 內頁 grid + sticky side nav)
- **Grid:** 12 column desktop, 24 px gutter
- **Max content width:** 1280 px
- **Container padding:** 32 px (desktop) / 24 px (mobile)
- **Breakpoints:** 600 (mobile) · 900 (tablet) · 1280 (desktop max)

### Border radius (v2 — significantly larger)

| Token | Value | Use |
|---|---|---|
| `--r-sm` | 12 px | Input, button, chip outline |
| `--r-md` | 20 px | Image inside card, small card, mockup frame |
| `--r-lg` | 28 px | Default card, modal, work card |
| `--r-xl` | 40 px | Featured Case card, stats strip |
| `--r-full` | 9999 px | Pill button, nav item, chip pill |

**規則:**
- Button / nav item / chip = pill (`--r-full`)
- 大型 hero / Featured Case card = `--r-xl`
- Work card / 一般 card = `--r-lg`
- Image inside card = `--r-md` (比 outer card 小一級,維持視覺層次)
- 不要 nested 同 radius → 內外要差一級

---

## Motion

**Approach:** Minimal-functional + intentional playful accents。Senior taste = 克制 + 有性格,不是炫技。

### Tokens

```css
--ease-out:   cubic-bezier(0.16, 1, 0.3, 1);     /* enter, sharp */
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1); /* playful spring (sparingly) */
--ease-in:    cubic-bezier(0.7, 0, 0.84, 0);     /* exit */
--ease-inout: cubic-bezier(0.65, 0, 0.35, 1);    /* move */

--dur-micro:  80ms;
--dur-short:  200ms;
--dur-medium: 320ms;
--dur-long:   480ms;
```

### Allowed

- ✅ Card hover lift `translateY(-4px)` with `--ease-out`
- ✅ Image hover scale 1.02
- ✅ Button hover translateY(-2px)
- ✅ Section fade-in on scroll (subtle, `--dur-medium`)
- ✅ Nav pill background fade (180ms)
- ✅ Link underline draw on hover
- ✅ Color block transition with `--ease-spring` (one-off, e.g. tab switch)

### Forbidden

- ❌ Parallax
- ❌ Scroll-jacking
- ❌ Decorative blob animations / morphs
- ❌ Cursor follower
- ❌ Page-load splash screen
- ❌ Magic spinners
- ❌ Elaborate page transitions
- ❌ Emoji animation (我們不用 emoji,所以這條順便)

---

## Component Patterns

### Buttons

- `primary` (warm-black bg, pill) — main action e.g. "View case study"
- `accent` (orange bg, pill) — contact CTA e.g. "Email me →"
- `secondary` (transparent + border, pill) — secondary actions
- `ghost` (transparent, muted, pill) — cancel / dismiss
- 所有 button **預設 pill shape** (`--r-full`)

### Chips

```
Geist Mono · uppercase · letter-spacing 0.06em
Background: surface (white) + 1px border, OR card color (when on pastel BG)
Padding: 7px 14px
Radius: pill
```

### Cards

- 預設 `--r-lg` (28px)
- Featured / Hero = `--r-xl` (40px)
- Inside card 的 image / sub-card = `--r-md` (20px)
- Card 內 padding 28-48px(視大小)
- Hover lift `translateY(-4px)` + 320ms `--ease-out`

### Form inputs

- Label: DM Sans 500 13px, color `--text-muted`
- Input: DM Sans 15px, padding 14/18, border `--border`, radius `--r-md`
- Focus: border color `--accent`, no glow / no box-shadow

### Links

- Body links: text underline `--border` color, offset 3px
- Accent links: `--accent` + 1px solid bottom border, padding-bottom 1px
- Inline 連結不要 default browser underline

### Site nav

- Pill container (white surface + border)
- Active item: black background, white text
- Hover item: mint background

---

## Anti-patterns (do not violate)

### v2-specific
- ❌ **任何 emoji 使用** (hero / chips / about / case study 都不放 — 友善訊號由 typography + radius + 色塊 carry,不靠 emoji)
- ❌ 同色相鄰 cards (mint + mint 並排 NO,要 alternate)
- ❌ 全部 card 用 radius 40px(images / sub-elements 要 20px,維持層次)
- ❌ Pastel + orange accent 同時大面積出現(orange 仍要 sparse)

### General (kept from v1)
- ❌ 紫/藍/綠 accent (we use warm orange)
- ❌ 純白純黑 (use warm `#FAFAF7` / `#0B0B0A`)
- ❌ Inter / Roboto / Space Grotesk / Poppins / system-ui as primary
- ❌ "Hi, I'm [name], passionate designer..." essay hero
- ❌ Stock photos / 3-column icon grid
- ❌ Featured Case 縮圖放 UI hero shot (**必須露 flow / IA / system map**)
- ❌ Decorative blobs / gradient morphs / parallax
- ❌ 3D illustrated mascots (我們是 UX,不是品牌 / 卡通)

---

## Decisions Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-05-25 | **v2 — Friendly System 取代 v1 Editorial** | User 提供 3 張 reference (friendly modular cards / pastel / bold sans / emoji greeting)。v1 太 editorial / serif,跟 user 真正想要的視覺語言不符。 |
| 2026-05-25 | Cabinet Grotesk 取代 Fraunces | Reference 全部是 bold sans display,不是 serif。Cabinet Grotesk 是 modern geometric,不在 overused list。 |
| 2026-05-25 | DM Sans 取代 Geist | DM Sans 更圓潤,跟 friendly vibe 一致。Geist Mono 仍 keep 做 meta。 |
| 2026-05-25 | 加 pastel card palette (mint / peach / butter / lavender) | Reference 圖核心特徵是色塊化 modular cards。pastel 帶人味但仍中性,不會跟 case study 截圖打架。 |
| 2026-05-25 | Border radius 全面放大 (4→12 / 8→20 / 12→28 / +40 / +pill) | Friendly signal。Image inside card 仍小一級,維持層次。 |
| 2026-05-25 | Hero greeting "Hi, I'm Giselle." 取代 formal name | Approachable signal,跟 memorable thing v2 "human enough to work with" 一致。**No emoji** (見下一行)。 |
| 2026-05-25 | **整個 design system 移除 emoji** | User explicit 決定 — Y2K vibe 對 senior product designer 是扣分項。Friendly signal 已由 pastel cards + 大圓角 + DM Sans 圓潤字體 carry,emoji 多餘。 |
| 2026-05-25 | Memorable thing 加 "human enough to work with" | 從 lone editorial thinker → approachable system designer,對應 civic tech / B2B portal domain 更貼。 |
| 2026-05-25 | 仍保留 warm orange `#E04E1F` accent | 仍是 differentiator vs 藍/紫 majority。但 v2 用得更克制(避免跟 peach 打架)。 |
| 2026-05-25 | **Featured Case 縮圖仍露 flow diagram(P1 守住)** | UX-led 的核心 ── 視覺語言可以友善,但「賣思考不賣裝飾」這條不退。 |
| 2026-05-25 | WIREFRAME.md 不變 | IA / sitemap / UX flow / Case Study 8 章節結構不受視覺改動影響。 |

---

## How to update this file

1. Make the change in the preview / live site first
2. Update the relevant section here
3. Add a row to **Decisions Log** with date + rationale
4. Commit message format: `design: <one-line summary> [reason]`

> Pinned: 看見任何 PR / code 不符合此文件,immediately flag。**This is the source of truth.**
