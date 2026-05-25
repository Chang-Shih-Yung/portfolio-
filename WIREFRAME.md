# Wireframe v1.0 — Henry Chen Portfolio

> Site structure, IA, user flow, page anatomy.
> Created via `/product-management:brainstorm` discussion · 2026-05-25
> Pair with: `DESIGN.md` (visual tokens), `CLAUDE.md` (AI agent guide)

---

## Design Principles (P1-P6)

| ID | Principle | How it lands |
|---|---|---|
| **P1** | Process > Polish | Featured Case 縮圖優先露 flow/IA 圖,不露 UI hero shot |
| **P2** | HM 30 秒不離站,5 分鐘想點開,15 分鐘想聯絡 | 三層內容深度對應 scanner / evaluator / decision-maker |
| **P3** | 每個 Case Study 是同一個模板的 instance | Template-driven,新增案例不重畫網站 |
| **P4** | Edge case / decision rationale > final mockup | Case Study 70% 篇幅在拆解過程,不在展示成果 |
| **P5** | No hero scroll · No "Hi, I'm..." essay | 身份用一行 + meta,把 prime real estate 讓給作品 |
| **P6** | Mobile responsive,但桌面優先 | HM 90% 用 desktop 評估,但 reference 連結會被手機點開 |

---

## Memorable Thing

> **"This person thinks in systems, not screens."**

每個 wireframe 決策都要可追溯回這句話。

---

## Sitemap

```
作品集網站
│
├─ /                                   首頁 (single-page scroll)
│   ├─ Hero
│   ├─ Featured Case (旗艦)
│   ├─ More Work (預留擴充)
│   ├─ Explorations (可選)
│   └─ Footer
│
├─ /work
│   ├─ /work/nantou-points              ★ 旗艦案 (Tier 1)
│   ├─ /work/[case-2]                   ⊕ 預留 slot
│   ├─ /work/[case-3]                   ⊕ 預留 slot
│   └─ /work/[case-N]                   ⊕ 預留 slot
│
├─ /about                                極簡版,1 屏內結束
│
└─ Footer (Contact)                      不做獨立 page,走 footer + mailto:

⊕ 標記 = 模板已備,等內容
★ 標記 = 旗艦案 (最強案放第一,不按時間倒序)
```

### 結構決策

- **沒有 `/case-studies` 列表頁** — 首頁就是列表頁,少一層 click
- **About 獨立 page** — 敘事節奏不同,塞首頁會稀釋作品集中感
- **Contact 走 footer-anchor** — 一頁 Contact 等於白費載入,放 footer + sticky CTA 就好

---

## Information Architecture (IA)

| 區塊 | 內容類型 | Modular? | 擴充規則 |
|---|---|---|---|
| 首頁 / Hero | Identity + Tagline + Meta | 靜態 | 一次設定 |
| 首頁 / Featured Case | 1 個案例 + 大縮圖 + meta chips | **Modular** | 改 `featured: true` flag |
| 首頁 / More Cases | N 個案例卡片 | **Modular · grid** | 新增案例自動 append |
| 首頁 / Explorations | 圖牆 | **Modular · masonry** | 隨時補小作品 |
| Case Study 內頁 | 8 個固定章節 (§1-§8) | **Template** | 套用同 template |
| About | 一張照片 + 3 段 + 履歷下載 | 靜態 | 半年更一次 |
| Footer | Email + Social + Sitemap mini | 靜態 | — |

**關鍵:Case Study 8 章節是 template,新案例只填內容、不動結構。**

---

## UX Flow — HM 的三條路徑

不是設計給「一種 HM」,是設計給**同一個 HM 的三個時間段**。

```
路徑 A · Scanner (30 秒)
進站 ──▶ Hero 看到身份+定位 ──▶ Featured Case 縮圖 ──▶ 決定要不要繼續
        (Identity)            (Process artifact)      ╲
                                                       ╲
                                          50% 在這裡離開(這是正常)

路徑 B · Evaluator (5 分鐘)
進站 ──▶ Hero ──▶ Featured Case ──▶ 點入旗艦 Case Study ──▶ 滑到「Solution + Impact」
                                    (深讀 3-5 分鐘)

路徑 C · Decision-maker (15 分鐘+)
進站 ──▶ Hero ──▶ 旗艦案 (深讀) ──▶ More Cases (掃 2-3 個) ──▶ About ──▶ Contact
                                                                          ▼
                                                                       發信
```

### 設計含意

- **路徑 A 的目標不是留人,是「讓走的人留下正確印象」** — 30 秒內 anchor「這是有 system thinking 的 UX designer」
- **路徑 B 是真正關鍵** — 旗艦 Case Study 必須在 5 分鐘內能掃完核心訊息(透過 sticky side nav + section anchor)
- **路徑 C 才需要 About / Contact** — 不要在 A 路徑就 push Contact CTA

---

## UI Flow (畫面轉場)

```
[首頁] ──點 Featured Hero──▶ [Case Study 旗艦]
   │                              │
   ├──點 More Cases 卡片──▶ [Case Study N]
   │                              │
   ├──點 About──▶ [About]         │
   │                              ▼
   │                         [Sticky Side Nav] ── 章節 anchor
   │                              │
   └──點 Email/Footer──▶ mailto: 或 contact form modal

返回路徑:
  Case Study 頁面 → 左上 ← Back to Home (固定 sticky)
                  → 末段 Next/Prev Case 卡片(可選)
                  → Footer "View all work" → / (首頁 anchor)
```

### 互動規則

- Case Study 內**必須有 sticky side nav**,8 章節跳轉
- **不要 modal lightbox 看圖** — 直接 inline,讓 scroll 不被打斷
- **首頁不要 horizontal scroll**
- ESC 鍵在 modal 內必須關閉,並 return focus 到觸發元素

---

## 首頁 Wireframe

```
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║  [Henry 左]                              [Work][About][Email]║  ← Nav · sticky
║                                                              ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║   Henry Chen                                                 ║  ← Display 72 (Fraunces)
║   Product Designer focused on UX systems & flows.            ║  ← Body L 19 (Geist)
║                                                              ║
║   8 YRS · B2B PORTALS · CIVIC TECH              [Email →]    ║  ← Caption (Geist Mono)
║                                                              ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║   FEATURED                                                   ║  ← Caption (label)
║                                                              ║
║   ┌──────────────────────────┐  南投數位生活點數平台          ║
║   │ [Flow diagram crop      │  Designing a county-scale     ║
║   │  with screens + arrows] │  rewards system for 500K+     ║  ← Display 56
║   │  ID labels 1.1.1, 2.0.1 │  residents across 7 modules.  ║
║   │  注意:故意不放 UI hero  │                                ║
║   └──────────────────────────┘  [Lead UX][4 modules][2024]   ║
║                                  [Read case →]               ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║   MORE WORK                                                  ║
║                                                              ║
║   ┌──────────────────┐  ┌──────────────────┐                 ║
║   │ ⊕ Coming soon    │  │ ⊕ Coming soon    │                 ║  ← 預留 slot
║   │ Case 02          │  │ Case 03          │                 ║
║   └──────────────────┘  └──────────────────┘                 ║
║                                                              ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║   EXPLORATIONS (可選 section,有素材再開啟)                   ║
║   [小圖] [小圖] [小圖] [小圖] [小圖] [小圖]                    ║
║                                                              ║
╠══════════════════════════════════════════════════════════════╣
║   Footer                                                     ║
║   © 2026 Henry Chen          Email · LinkedIn · Resume       ║
╚══════════════════════════════════════════════════════════════╝
```

### 反直覺重點

**Featured Case 的縮圖故意露 flow / system map 局部,不露漂亮 UI hero shot。** 這是 UX-led portfolio 的 signature move — HM 第一眼 anchor「賣的是思考,不是裝飾」。

---

## Case Study 內頁 Wireframe (★ 可擴充模板)

```
╔════════════════════════════════════════════════════════════════╗
║  [← Back to Home]                              [About][Email]  ║  ← Sticky top
╠═══════════════╦════════════════════════════════════════════════╣
║               ║                                                ║
║  STICKY       ║   南投數位生活點數平台                          ║
║  SIDE NAV     ║   Designing a county-scale rewards platform    ║
║               ║                                                ║
║  ─ Overview   ║   Role:    Lead UX Designer                    ║
║  ─ Context    ║   Team:    2 designers + 4 engineers           ║
║  ─ Discovery  ║   Time:    6 months · 2024                     ║
║  ─ IA         ║   Stage:   Shipped to 500K+ users              ║
║  ─ Flow       ║                                                ║
║  ─ Iteration  ║   [Hero artifact: flow / IA 高清版]            ║
║  ─ Solution   ║                                                ║
║  ─ Impact     ║                                                ║
╚═══════════════╩════════════════════════════════════════════════╝
```

### 8 章節結構

#### §1 Overview
- One-line summary (problem + audience + outcome)
- "The challenge in one sentence —" 一句精煉的挑戰描述
- 5 秒掃完

#### §2 Context & Constraints
- Stakeholder map
- Business / 政府採購 / 技術限制
- 為什麼這件事重要

#### §3 Discovery `[TBD · placeholder until research is added]`
- User interview highlights (N=?)
- Persona / Journey map
- Heuristic eval / competitor analysis
- Key insights (3-5 個)
- **目前用 placeholder card 占位,有 research 後直接填入**

#### §4 Information Architecture
- **App map / system map** (放編號 1.1.1 / 1.2.1 / 4.1.1 的全圖)
- Naming convention 解釋:`X.Y.Z = Module.SubFlow.State`
- Why this matters: 減少 spec 釐清會議 ~40%

#### §5 UX Flow & Decision Logic
- Sub-flow 5.1: 登入 / 註冊 (含 decision tree)
- Sub-flow 5.2: 賺點任務 (5 種任務類型)
- Sub-flow 5.3: 縣政消息訂閱
- **Key decisions**: 為什麼分訪客模式?為什麼 popup 不 inline disable?(說明 alternative 被淘汰的原因)

#### §6 Wireframe → Iteration
- Lo-fi → Mid-fi → Hi-fi 演進
- 2-3 個關鍵畫面的演進
- 1-2 個 before/after 設計決策

#### §7 Solution (UI 只放在這裡 · 30% 篇幅)
- 3-5 個 hero screen
- 1-2 個 micro-interaction GIF
- Design system token snapshot

#### §8 Impact & Reflection
- Quantitative outcomes
- Qualitative feedback (stakeholder quote)
- What I'd do differently next time

### 模板擴充規則

```
新案例新增 SOP:
Step 1: 在 /work/ 建新檔 (例 /work/case-2.mdx)
Step 2: 套用 §1-§8 template,填內容
Step 3: 首頁 More Work grid 自動列出 (資料驅動)
Step 4: 把 Coming Soon placeholder card 換成新 case 卡

如果新 case 比南投還強 →
Step 5: 把 featured flag 從南投移到新 case
        (旗艦輪替,不要永遠是南投)
```

**規則:不要 hard-code 任何 case 名稱在 layout 裡。**用 frontmatter `featured: true` / `order: 1` 自動排序。

---

## About / Contact

### /about (極簡)

```
[Photo, 圓形 240px]                  [3 段文字, max-width 600px]
                                     ┌─ 1 段: 你是誰 + 怎麼定位
                                     ├─ 2 段: design philosophy
                                     └─ 3 段: 興趣 (讓 HM 看到你是人)

[Resume PDF 下載 ●]  [LinkedIn ↗]    不做 contact form,直接 mailto:
```

About 在 UX-led 作品集是次要 — 作品已經說完話。半年更新一次。

### Contact

不做獨立頁。Footer + sticky `[Email →]` 按鈕 + Case Study 末尾 CTA 三點觸發。

---

## Trade-offs 紀錄

| 選擇 | Why this | 反過來的情況 |
|---|---|---|
| Featured Case 縮圖露 flow 不露 UI | UX-led 的訊號最強的位置 | 如果想對沖 UI 工作機會,改露 UI |
| Single-page scroll 首頁 vs Multi-page | 30 秒 scanner 不會點兩次 | 作品超過 6 個再分頁 |
| About 獨立頁 vs 塞首頁 | 敘事節奏不同 | 想極簡可塞首頁底 |
| 不做 Contact form,只 mailto: | HM 不填表,直接 email | 想 spam 過濾再做 |
| Case Study 用 sticky side nav | UX 內容長,navigation 必須 | 案例都很短可省 |

---

## 下一步

1. **`/design-html`** — 把這份 wireframe + DESIGN.md 落地成 Pretext-native HTML
2. **填南投 case 內容**(§1-§8) — 結構已備,placeholder 換真實內容
3. **補 Research artifact**(§3) — 之後做 user interview / heuristic eval
4. **新增 Case 2/3** — 套用同 template
