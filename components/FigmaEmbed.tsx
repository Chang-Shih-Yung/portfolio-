/**
 * Figma live embed.
 *
 * NOTE: Figma file 必須設為 "Anyone with the link can view" 才能 embed。
 * Settings → Share → 把 link access 改成 "Anyone with the link"。
 * 否則 iframe 會顯示 access denied。
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

  return (
    <div className="figma-embed" style={{ paddingBottom }}>
      <iframe
        src={src}
        title={title ?? 'Figma design preview'}
        loading="lazy"
        allow="fullscreen"
      />

      <style>{`
        .figma-embed {
          position: relative;
          width: 100%;
          border-radius: var(--r-lg);
          overflow: hidden;
          border: 1px solid var(--border);
          background: var(--surface);
        }
        .figma-embed iframe {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border: none;
          display: block;
        }
      `}</style>
    </div>
  )
}
