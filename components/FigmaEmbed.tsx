/**
 * Figma live embed.
 *
 * NOTE: Figma file 必須設為 "Anyone with the link can view" 才能 embed。
 * Settings → Share → 把 link access 改成 "Anyone with the link"。
 * 否則 iframe 會顯示 access denied。
 *
 * WIREFRAME MODE: 為 lo-fi 線框稿,實際 iframe 視覺以灰階 placeholder box 取代,
 * 但保留 props / 元件 API / 版位 / aspect-ratio footprint 不變。
 */

type Props = {
  /** e.g. "BjJENYyLv9zQKLsxZhVKrl" */
  fileKey: string
  /** e.g. "2:2006" or "2-2006" — both accepted */
  nodeId: string
  /** Figma 檔名 URL slug,例 "Portfolio-Lai"。Cosmetic only. */
  fileName?: string
  /** Accessible title for iframe */
  title?: string
  /** height / width — default 0.62 (wider than 16:9, fits flow diagrams) */
  ratio?: number
}

export default function FigmaEmbed({
  fileKey,
  nodeId,
  fileName = 'design',
  title,
  ratio = 0.62,
}: Props) {
  const formattedNodeId = nodeId.replace(':', '-')
  const src = `https://embed.figma.com/design/${fileKey}/${fileName}?node-id=${formattedNodeId}&embed-host=share`
  const paddingBottom = `${(ratio * 100).toFixed(2)}%`

  // WIREFRAME: render a grayscale placeholder box instead of the live iframe.
  // Keeps the same footprint/aspect-ratio (paddingBottom) so layout doesn't shift.
  // `src` is retained (props/architecture unchanged) and exposed via data-src.
  return (
    <div className="figma-embed" style={{ paddingBottom }}>
      <div
        className="figma-embed__placeholder wf-placeholder"
        role="img"
        aria-label={title ?? 'Figma design preview'}
        data-src={src}
      >
        <span className="wf-label">FIGMA EMBED</span>
        <span className="figma-embed__caption">{title ?? 'Figma design preview'}</span>
      </div>

      <style>{`
        .figma-embed {
          position: relative;
          width: 100%;
          border-radius: 0;
          overflow: hidden;
          border: 1px solid var(--border);
          background: var(--surface);
        }
        .figma-embed__placeholder {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: var(--space-xs, 8px);
          border: none;
          background-color: var(--placeholder-fill, #ECECEC);
          background-image:
            linear-gradient(to top right,
              transparent calc(50% - 0.5px),
              var(--placeholder-border, #CCCCCC) calc(50% - 0.5px),
              var(--placeholder-border, #CCCCCC) calc(50% + 0.5px),
              transparent calc(50% + 0.5px)),
            linear-gradient(to top left,
              transparent calc(50% - 0.5px),
              var(--placeholder-border, #CCCCCC) calc(50% - 0.5px),
              var(--placeholder-border, #CCCCCC) calc(50% + 0.5px),
              transparent calc(50% + 0.5px));
        }
        .figma-embed__placeholder .wf-label {
          font-family: var(--font-mono-stack);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          font-size: 12px;
          color: var(--text-muted);
          background: var(--placeholder-fill, #ECECEC);
          padding: 2px 8px;
        }
        .figma-embed__caption {
          font-family: var(--font-mono-stack);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          font-size: 12px;
          color: var(--text-subtle);
          background: var(--placeholder-fill, #ECECEC);
          padding: 2px 8px;
          text-align: center;
          max-width: 80%;
        }
      `}</style>
    </div>
  )
}
