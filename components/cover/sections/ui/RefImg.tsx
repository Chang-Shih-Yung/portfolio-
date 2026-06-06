import fs from 'node:fs'
import path from 'node:path'

/**
 * RefImg — a reference image slot.
 *
 * Renders the real <img> when the file actually exists under `public/`. When
 * it's missing (the placeholder phase, or a portrait/logo we can't publish) it
 * STILL renders an <img>, but pointed at an inline transparent data-URI plus a
 * `ref-ph` class — so it loads instantly (NO network request → no 404 noise)
 * while inheriting every existing `… img` rule (size, border, shape, radius).
 * The `.ref-ph` class paints the warm fill + dashed frame. Drop a real file at
 * the path later and it shows automatically (no code change).
 *
 * Server component: the fs check runs at build / on the server. Safe inside the
 * client <Carousel> — it's created by a server section, so it renders on the
 * server and only the <img> output crosses the boundary.
 */

// 1×1 fully transparent GIF
const BLANK =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

export interface RefImgProps {
  src: string
  width?: number
  height?: number
  alt?: string
}

export default function RefImg({ src, width, height, alt = '' }: RefImgProps) {
  const rel = src.startsWith('/') ? src.slice(1) : src
  const exists = fs.existsSync(path.join(process.cwd(), 'public', rel))

  if (!exists) {
    return (
      <img
        src={BLANK}
        className="ref-ph"
        width={width}
        height={height}
        alt=""
        aria-hidden="true"
      />
    )
  }

  return <img src={src} width={width} height={height} alt={alt} />
}
