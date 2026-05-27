import type { Flow } from '@/components/FlowsShowcase'

/**
 * 南投數位生活點數平台 · Flows (Figma page 0-7)
 *
 * 全部 8 個 page 對應 7 個 service module + 訪客模式:
 *   page 0 · 訪客模式預覽       (整體訪客體驗串連)
 *   page 1 · 登入註冊 / 忘記密碼  (一般登入 / 註冊 / 忘記密碼)
 *   page 2 · 首頁 / 通知 / 掃碼 / 點數紀錄
 *   page 3 · 縣政消息            (我的訂閱 / 縣政消息 / 公告詳情)
 *   page 4 · 賺點任務            (有獎問答 / 問卷 / 看影片 / 集章 / 專屬)
 *   page 5 · 好康地圖            (特店列表 / 特店地圖 / 特店詳情)
 *   page 6 · 會員                (編輯資料 / 通知設定 / 服務條款 / 規則 / 客服 / 登出)
 *   page 7 · 特店申請 / 管理     (店家申請 / 後台 / 交易紀錄 / 對帳 / 權限 / 金流)
 *
 * 編號慣例 X.Y.Z = page . sub-flow . state
 */

const FILE = 'BjJENYyLv9zQKLsxZhVKrl'
const NAME = 'Portfolio-Lai'

export const flows: Flow[] = [
  // ─── Flow 0 ─────────────────────────────────────────────
  {
    id: 'visitor-preview',
    number: '0',
    title: '訪客模式預覽',
    chipLabel: '訪客模式',
    blurb:
      '未登入用戶能看到什麼?完整訪客瀏覽路徑 + 各 module 進入點分布,讓「不註冊也能 hook 住」這件事被 explicitly 設計 — 而不是 paywall 完事。',
    figma: { fileKey: FILE, nodeId: '2-2006', fileName: NAME },
    decisions: [
      '政府服務的入口必須低摩擦 — 訪客可瀏覽所有 module 內容、看商家、看任務、看好康,只在「真的要操作」才彈出登入',
      '擋下時機刻意延後到「要領點 / 收藏 / 核銷」才 trigger 登入 popup,降低 first-visit bounce',
      '訪客模式跟登入模式共用同一套 component,差別只在 action button state — 不維護兩套 UI',
      '從訪客到註冊的所有轉換點明確標示 (圖中紅底註解卡),後續可量化每個進入點的轉換率',
    ],
  },

  // ─── Flow 1 ─────────────────────────────────────────────
  {
    id: 'login-signup',
    number: '1',
    title: '登入 / 註冊 / 忘記密碼',
    chipLabel: '登入註冊',
    blurb:
      '手機號碼為主鍵,涵蓋一般登入、註冊、忘記密碼三條 sub-flow,含驗證碼錯誤 / 次數爆 / 重設密碼 / 條款同意 / OS dark mode 各 state。',
    figma: { fileKey: FILE, nodeId: '2-2535', fileName: NAME },
    decisions: [
      '為什麼用手機號碼而不是 email — 南投居民 email 普及率不高,手機是 universal identifier',
      '驗證碼錯誤分「次數內」跟「次數爆」兩個 state — 後者強制 timeout,既降低 brute-force 風險,也提供客服 fallback',
      '忘記密碼獨立成 sub-flow 而不是埋在登入頁深處 — 政府服務的使用者忘記密碼率比 consumer app 高,要更顯眼',
      '同意條款不放在最後一步當阻塞 — 提前放在註冊起點,避免填到一半才發現條款問題',
      'Dark mode 從註冊 onboarding 就驗 — OS-level 跟隨,不在 app 內提供 toggle (政府服務遵從系統設定,降低設定面)',
    ],
  },

  // ─── Flow 2 ─────────────────────────────────────────────
  {
    id: 'home-notification-scan',
    number: '2',
    title: '首頁 / 通知 / 掃碼 / 點數紀錄',
    chipLabel: '首頁與點數',
    blurb:
      '登入後的核心瀏覽軸:首頁 banner + 各 module 入口、通知中心、條碼掃描、點數紀錄。每個 entry 的 priority + 位置都要回答「這個會員會多常點」。',
    figma: { fileKey: FILE, nodeId: '2-3266', fileName: NAME },
    decisions: [
      '「掃碼」做成獨立 entry 而不是埋在點數頁深處 — 實體店家核銷頻率高,要 1-tap 可達',
      '通知中心跟首頁 banner 分開 — banner 賣政策推廣,通知中心存個人 reward / 系統訊息,語意不混',
      '點數紀錄獨立 entry,以時間軸 + 收支對沖呈現 — 「我為什麼還沒收到點」是 #1 客訴,要有 audit trail 可查',
      '首頁 module 入口排序按「使用頻率 × 政策推廣權重」加權,不是按字母也不是建立順序',
    ],
  },

  // ─── Flow 3 ─────────────────────────────────────────────
  {
    id: 'news-subscription',
    number: '3',
    title: '縣政消息',
    chipLabel: '縣政消息',
    blurb:
      '訂閱主題分類 → 我的訂閱 → 縣政消息列表 → 公告詳情。對應編號 3.0.1 / 3.0.2 / 3.0.3 / 3.0.4。讓「政府公告」不是 spam,而是用戶主動 opt-in。',
    figma: { fileKey: FILE, nodeId: '2-4162', fileName: NAME },
    decisions: [
      '新用戶 onboarding 階段預設訂閱 0 個主題,而不是全選 — 避免被通知淹沒就刪 app,把選擇權交回使用者',
      '主題用 chip toggle 而不是 checkbox list — 降低勾選成本,鼓勵多選 (chip 一眼掃完,checkbox 要逐項對眼)',
      '公告詳情提供「收藏」action — 重要消息 (停電通知 / 補助開放) 可隨時翻回,降低翻訊息列表的 cost',
      '「我的訂閱」跟「縣政消息全列表」是兩個獨立 entry — 訂閱是已篩選的 personalized feed,全列表是 explorable archive',
    ],
  },

  // ─── Flow 4 ─────────────────────────────────────────────
  {
    id: 'task-system',
    number: '4',
    title: '賺點任務系統',
    chipLabel: '賺點任務',
    blurb:
      '5 種任務類型 (有獎問答 / 問卷 / 看影片 / 集章 / 專屬任務),每種的進入點、完成條件、領點時機都要 explicitly 設計,避免「任務做完不知道有沒有領到點」這種最大客訴。',
    figma: { fileKey: FILE, nodeId: '2-4327', fileName: NAME },
    decisions: [
      '集章任務跟一次性任務分開 entry — 集章是 retention loop (要回來累積),要在任務列表更顯眼;一次性是 acquisition loop',
      '領點時機統一在「完成 action 後立即發放」,不延遲不批次 — 即時 reward 對留存影響最大,延遲領點會稀釋動機',
      '「專屬任務」攜帶 personalization signal — 根據用戶 profile / 行為投放,不是所有人看到同一份任務列表',
      '看影片任務有「最低觀看秒數」門檻 + 焦點驗證 — 防範把 app 放著自動領點;但門檻不過嚴,避免合理使用者被擋',
      '問卷類任務分頁 + 進度條 — 長問卷會棄填,讓使用者知道「還有多少」',
    ],
  },

  // ─── Flow 5 ─────────────────────────────────────────────
  {
    id: 'merchant-map',
    number: '5',
    title: '好康地圖',
    chipLabel: '好康地圖',
    blurb:
      '特店列表 / 特店地圖 / 特店詳情三段 sub-flow,8 種商家分類 (餐飲 / 住宿 / 零售購物 / 學習運動 / 休閒景點 / 保健醫材 / 美容業 / 運動休息) × 全南投縣 13 鄉鎮市篩選。',
    figma: { fileKey: FILE, nodeId: '2-5957', fileName: NAME },
    decisions: [
      '預設視圖在「特店列表」而不是地圖 — Map 對長者不友善,列表 + 距離排序更直覺;地圖留給「在地導覽」情境作為次要切換',
      '搜尋關鍵字 / 分類 / 地區三軸篩選共存,不擇一 — 使用者可能只記得店名,也可能只記得「我家附近的餐廳」',
      '店家詳情用大圖 grid 強化「視覺評估」,文字資訊是 secondary — 商家照片是核銷意願的決定性因素',
      '「點數特店」chip 標籤顯眼顯示 — 一眼分辨「這家能用點」vs 「只是合作店家」,降低核銷流程的期望落差',
    ],
  },

  // ─── Flow 6 ─────────────────────────────────────────────
  {
    id: 'member-settings',
    number: '6',
    title: '會員',
    chipLabel: '會員',
    blurb:
      '會員設定 + 帳戶管理的 6 大入口:編輯會員資料 / 通知設定 / 服務條款與隱私權政策 / 關於點點投與點數規則 / 聯絡客服 / 登出。低使用頻率但要可達。',
    figma: { fileKey: FILE, nodeId: '2-6315', fileName: NAME },
    decisions: [
      '通知設定 granular toggle — 政府公告 / 個人 reward / 系統訊息分軌,不是一鍵全開全關',
      '「關於點點投與點數規則」獨立 entry,而不是埋在 FAQ — 點數機制是黑盒最大來源,要顯眼透明化',
      '聯絡客服獨立 entry,不能埋 deep — 政府服務的客訴 fallback,使用者找不到客服等於 churn',
      '登出放最底但仍要可達 — 公用 device / 借用情境需要,但不在主軸動線上',
      '服務條款 + 隱私權政策一個入口兩個檔 — 法規要求都要可讀,但合併路徑降低設定面複雜度',
    ],
  },

  // ─── Flow 7 ─────────────────────────────────────────────
  {
    id: 'merchant-onboarding',
    number: '7',
    title: '特店申請 / 管理',
    chipLabel: '特店申請',
    blurb:
      'B2B 商家後台,跟 B2C 居民端完全不同 IA。6 個 sub-flow:我的店家申請 / 特店管理後台 / 交易紀錄 / 對帳報表 / 權限管理 / 金流綁定。涵蓋申請審核流轉到日常營運。',
    figma: { fileKey: FILE, nodeId: '2-6810', fileName: NAME },
    decisions: [
      'B2B 介面跟 B2C 居民端用同一套 design token 但 IA 完全分離 — 商家心智模型 (我要管店) 跟居民 (我要領點) 不能混用導覽',
      '申請流程含 status 流轉狀態 (申請中 / 審核中 / 已通過 / 已退件 + 退件原因) — 透明化政府審核黑盒,降低「為什麼沒下文」客訴',
      '對帳報表 vs 交易紀錄分開 — 對帳是會計月底 use case (匯出 CSV),交易紀錄是日常 ops (即時查單),時間軸跟密度不同',
      '權限管理區分「老闆 / 店員」role — 老闆有對帳 + 金流權限,店員只能查詢 + 核銷,避免單一帳號被借用造成風險',
      '金流綁定獨立 step + 二次驗證 — 高敏感操作,刻意 isolate 出主流程,需要明確意圖才會進入',
    ],
  },
]
