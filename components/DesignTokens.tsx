/**
 * Design token visualizations — reused in /colophon (full) and case study §Solution (subset).
 * 5 atomic blocks: TypeRamp / ColorTokens / ComponentDemo / SpacingScale / RadiusScale.
 * Each is self-contained with scoped <style> — no global side effects.
 */

// ─── §Typography ─────────────────────────────────────────────
const typeRows = [
  { label: 'Display XL · 76', meta: 'Cabinet Grotesk · 700', sample: '嗨,我是 Henry。', className: 'display-xl' },
  { label: 'Display L · 56', meta: 'Cabinet Grotesk · 700', sample: '南投數位生活點數平台', className: 'display-l' },
  { label: 'H1 · 38', meta: 'Cabinet Grotesk · 700', sample: 'Information Architecture', className: 'h1' },
  { label: 'H2 · 28', meta: 'Cabinet Grotesk · 500', sample: '為什麼這樣做', className: 'h2' },
  { label: 'H3 · 22', meta: 'DM Sans · 600', sample: 'Key decisions', className: 'h3' },
  { label: 'Body L · 19', meta: 'DM Sans · 400', sample: '為 50 萬名南投居民設計整合 7 個服務模組的縣級數位點數平台。', className: 'body-l' },
  { label: 'Body · 17', meta: 'DM Sans · 400', sample: 'Numbering convention X.Y.Z 讓 PM / 工程 / 設計三方無歧義 reference 任何畫面。', className: 'body' },
  { label: 'Small · 14', meta: 'DM Sans · 400', sample: '受訪者 N=15,跨年齡 cohort。', className: 'small' },
  { label: 'Caption · 12', meta: 'Geist Mono · 400 · uppercase', sample: 'ROLE · TIMELINE · TEAM · STAGE', className: 'caption' },
]

export function TypeRamp() {
  return (
    <div className="type-ramp">
      {typeRows.map((r) => (
        <div className="type-row" key={r.label}>
          <div className="type-meta">
            <b>{r.label}</b>
            <span>{r.meta}</span>
          </div>
          <div className={`type-sample ${r.className}`}>{r.sample}</div>
        </div>
      ))}
      <style>{`
        .type-ramp {
          display: flex;
          flex-direction: column;
          border: 1px solid var(--border);
          border-radius: var(--r-lg);
          overflow: hidden;
          background: var(--surface);
        }
        .type-row {
          display: grid;
          grid-template-columns: 200px 1fr;
          gap: var(--space-lg);
          padding: var(--space-md) var(--space-lg);
          border-bottom: 1px solid var(--border-soft);
          align-items: baseline;
        }
        .type-row:last-child { border-bottom: none; }
        .type-meta {
          font-family: var(--font-mono), ui-monospace, monospace;
          font-size: 11px;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: var(--text-muted);
          line-height: 1.5;
        }
        .type-meta b {
          display: block;
          color: var(--text);
          font-weight: 500;
          margin-bottom: 2px;
        }
        .type-sample { color: var(--text); }
        .type-sample.body-l { font-size: 19px; line-height: 1.55; }
        .type-sample.body   { font-size: 17px; line-height: 1.6; }
        .type-sample.small  { font-size: 14px; line-height: 1.5; color: var(--text-muted); }
        @media (max-width: 768px) {
          .type-row {
            grid-template-columns: 1fr;
            gap: var(--space-xs);
            padding: var(--space-sm) var(--space-md);
          }
          .type-sample.display-xl { font-size: 40px; line-height: 1; }
          .type-sample.display-l { font-size: 32px; line-height: 1; }
          .type-sample.h1 { font-size: 26px; }
        }
      `}</style>
    </div>
  )
}

// ─── §Color ──────────────────────────────────────────────────
type Swatch = { name: string; cssVar: string; hex: string; usage: string; onDark?: boolean }

const swatches: Swatch[] = [
  { name: 'Background', cssVar: '--bg', hex: '#FAFAF7', usage: 'Warm white · 主要背景' },
  { name: 'Surface', cssVar: '--surface', hex: '#FFFFFF', usage: 'Card / sheet 上層' },
  { name: 'Text', cssVar: '--text', hex: '#0B0B0A', usage: 'Warm black · 主文字', onDark: true },
  { name: 'Text muted', cssVar: '--text-muted', hex: '#6B665E', usage: '次要文字 / blurb' },
  { name: 'Accent', cssVar: '--accent', hex: '#E04E1F', usage: 'Warm orange · CTA only', onDark: true },
  { name: 'Border', cssVar: '--border', hex: '#E8E5DE', usage: '分隔線 / card border' },
  { name: 'Card · Mint', cssVar: '--card-mint', hex: '#C5E5D6', usage: '沉著 · 推薦 case grid' },
  { name: 'Card · Peach', cssVar: '--card-peach', hex: '#FFD9C2', usage: '溫暖 · 旗艦案' },
  { name: 'Card · Butter', cssVar: '--card-butter', hex: '#FFE99A', usage: '鮮明 · stats' },
  { name: 'Card · Lavender', cssVar: '--card-lavender', hex: '#D8D4F0', usage: 'Optional · misc' },
]

export function ColorTokens({ compact = false }: { compact?: boolean }) {
  const list = compact ? swatches.slice(6) : swatches // compact 只放 4 pastel cards
  return (
    <div className={`swatch-grid${compact ? ' is-compact' : ''}`}>
      {list.map((s) => (
        <div key={s.name} className="swatch">
          <div className={`swatch-color${s.onDark ? ' on-dark' : ''}`} style={{ background: `var(${s.cssVar})` }}>
            <span className="swatch-hex">{s.hex}</span>
          </div>
          <div className="swatch-meta">
            <b>{s.name}</b>
            <span>{s.usage}</span>
          </div>
        </div>
      ))}
      <style>{`
        .swatch-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--space-sm);
        }
        .swatch-grid.is-compact { grid-template-columns: repeat(4, 1fr); }
        .swatch {
          border-radius: var(--r-md);
          overflow: hidden;
          border: 1px solid var(--border);
          background: var(--surface);
        }
        .swatch-color {
          height: 96px;
          display: flex;
          align-items: flex-end;
          justify-content: flex-start;
          padding: var(--space-sm);
        }
        .swatch-hex {
          font-family: var(--font-mono), ui-monospace, monospace;
          font-size: 11px;
          color: var(--text);
          background: color-mix(in srgb, var(--bg) 80%, transparent);
          padding: 3px 8px;
          border-radius: var(--r-sm);
        }
        .swatch-color.on-dark .swatch-hex { color: var(--on-dark); background: color-mix(in srgb, var(--text) 80%, transparent); }
        .swatch-meta {
          padding: var(--space-sm) var(--space-md);
          font-size: 13px;
          line-height: 1.4;
        }
        .swatch-meta b { display: block; font-weight: 600; font-size: 13px; margin-bottom: 2px; }
        .swatch-meta span { color: var(--text-muted); font-size: 12px; }
        @media (max-width: 900px) { .swatch-grid { grid-template-columns: repeat(2, 1fr); } }
      `}</style>
    </div>
  )
}

// ─── §Components ─────────────────────────────────────────────
export function ComponentDemo() {
  return (
    <div className="component-demo">
      <div className="component-block">
        <h4>Buttons · pill 形狀</h4>
        <div className="row">
          <button type="button" className="btn btn-accent">查看案例 →</button>
          <button type="button" className="btn btn-primary">了解更多</button>
          <button type="button" className="btn btn-ghost">取消</button>
        </div>
      </div>

      <div className="component-block">
        <h4>Chips · Geist Mono uppercase</h4>
        <div className="row">
          <span className="chip">Lead UX</span>
          <span className="chip">2024</span>
          <span className="chip">B2B Portal</span>
          <span className="chip chip-accent">FEATURED</span>
          <span className="chip">SHIPPED</span>
        </div>
      </div>

      <div className="component-block">
        <h4>Cards · pastel cycle</h4>
        <div className="row card-row">
          <div className="mini-card" style={{ background: 'var(--card-mint)' }}>Mint</div>
          <div className="mini-card" style={{ background: 'var(--card-peach)' }}>Peach</div>
          <div className="mini-card" style={{ background: 'var(--card-butter)' }}>Butter</div>
          <div className="mini-card" style={{ background: 'var(--card-lavender)' }}>Lavender</div>
        </div>
      </div>

      <div className="component-block">
        <h4>Input</h4>
        <div className="input-row">
          <label htmlFor="demo-input">Email</label>
          <input id="demo-input" type="email" placeholder="hi@henry.design" />
        </div>
      </div>

      <style>{`
        .component-demo {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--space-md);
        }
        .component-block {
          padding: var(--space-lg);
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--r-lg);
        }
        .component-block h4 {
          font-family: var(--font-mono), ui-monospace, monospace;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: var(--space-md);
        }
        .row { display: flex; flex-wrap: wrap; gap: var(--space-xs); align-items: center; }
        .btn {
          font-family: var(--font-body), -apple-system, sans-serif;
          font-size: 14px;
          font-weight: 600;
          padding: 10px 20px;
          border-radius: var(--r-full);
          border: 1px solid var(--border);
          background: var(--surface);
          color: var(--text);
          cursor: pointer;
          transition: transform 200ms var(--ease-out), border-color 200ms var(--ease-out);
        }
        .btn:hover { transform: translateY(-2px); border-color: var(--text); }
        .btn-accent { background: var(--accent); color: var(--bg); border-color: var(--accent); }
        .btn-primary { background: var(--text); color: var(--bg); border-color: var(--text); }
        .btn-ghost { background: transparent; }
        .chip {
          font-family: var(--font-mono), ui-monospace, monospace;
          font-size: 11px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 6px 12px;
          border-radius: var(--r-full);
          background: var(--surface);
          color: var(--text);
          border: 1px solid var(--border);
        }
        .chip-accent { background: var(--accent); color: var(--bg); border-color: var(--accent); }
        .card-row { gap: var(--space-sm); }
        .mini-card {
          flex: 1;
          min-width: 80px;
          padding: var(--space-md);
          border-radius: var(--r-md);
          font-family: var(--font-mono), ui-monospace, monospace;
          font-size: 11px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--text);
          text-align: center;
        }
        .input-row { display: flex; flex-direction: column; gap: var(--space-xs); }
        .input-row label {
          font-family: var(--font-mono), ui-monospace, monospace;
          font-size: 11px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--text-muted);
        }
        .input-row input {
          padding: 12px 16px;
          border: 1px solid var(--border);
          border-radius: var(--r-md);
          background: var(--bg);
          color: var(--text);
          font-family: var(--font-body), sans-serif;
          font-size: 15px;
        }
        .input-row input:focus { outline: 2px solid var(--accent); outline-offset: 1px; }
        @media (max-width: 768px) { .component-demo { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  )
}

// ─── §Spacing & Radius ───────────────────────────────────────
const spacingScale = [
  { name: '2xs', cssVar: '--space-2xs', value: 4 },
  { name: 'xs', cssVar: '--space-xs', value: 8 },
  { name: 'sm', cssVar: '--space-sm', value: 16 },
  { name: 'md', cssVar: '--space-md', value: 24 },
  { name: 'lg', cssVar: '--space-lg', value: 32 },
  { name: 'xl', cssVar: '--space-xl', value: 40 },
  { name: '2xl', cssVar: '--space-2xl', value: 56 },
  { name: '3xl', cssVar: '--space-3xl', value: 80 },
  { name: '4xl', cssVar: '--space-4xl', value: 128 },
]

const radiusScale = [
  { name: 'sm', cssVar: '--r-sm', value: 12 },
  { name: 'md', cssVar: '--r-md', value: 20 },
  { name: 'lg', cssVar: '--r-lg', value: 28 },
  { name: 'xl', cssVar: '--r-xl', value: 40 },
  { name: 'full', cssVar: '--r-full', value: 9999 },
]

export function SpacingScale() {
  return (
    <div className="spacing-list">
      {spacingScale.map((s) => (
        <div key={s.name} className="spacing-row">
          <div className="spacing-meta">
            <b>{s.name}</b>
            <span>{s.value}px</span>
          </div>
          <div className="spacing-bar" style={{ width: `var(${s.cssVar})` }} />
        </div>
      ))}
      <style>{`
        .spacing-list {
          display: flex;
          flex-direction: column;
          gap: var(--space-xs);
          padding: var(--space-lg);
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--r-lg);
        }
        .spacing-row {
          display: grid;
          grid-template-columns: 100px 1fr;
          align-items: center;
          gap: var(--space-md);
        }
        .spacing-meta {
          font-family: var(--font-mono), ui-monospace, monospace;
          font-size: 11px;
          letter-spacing: 0.04em;
          color: var(--text-muted);
        }
        .spacing-meta b { color: var(--text); font-weight: 500; margin-right: 8px; text-transform: uppercase; }
        .spacing-bar {
          height: 16px;
          background: var(--accent);
          border-radius: var(--r-sm);
          opacity: 0.85;
        }
      `}</style>
    </div>
  )
}

export function RadiusScale() {
  return (
    <div className="radius-list">
      {radiusScale.map((r) => (
        <div key={r.name} className="radius-item">
          <div className="radius-box" style={{ borderRadius: `var(${r.cssVar})` }} />
          <div className="radius-meta">
            <b>{r.name}</b>
            <span>{r.value === 9999 ? 'pill' : `${r.value}px`}</span>
          </div>
        </div>
      ))}
      <style>{`
        .radius-list {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: var(--space-sm);
        }
        .radius-item {
          padding: var(--space-md);
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--r-md);
          text-align: center;
        }
        .radius-box {
          width: 100%;
          aspect-ratio: 1;
          background: var(--card-mint);
          margin-bottom: var(--space-sm);
        }
        .radius-meta {
          font-family: var(--font-mono), ui-monospace, monospace;
          font-size: 11px;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: var(--text-muted);
        }
        .radius-meta b { color: var(--text); font-weight: 500; margin-right: 6px; }
        @media (max-width: 600px) {
          .radius-list { grid-template-columns: repeat(3, 1fr); }
        }
      `}</style>
    </div>
  )
}
