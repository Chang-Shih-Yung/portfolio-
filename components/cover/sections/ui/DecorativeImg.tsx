'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * DecorativeImg — an <img> for purely DECORATIVE overlays (e.g. the lifestyle
 * person cut-outs) that simply REMOVES ITSELF if the source can't load, instead
 * of leaving broken-image chrome behind.
 *
 * Why not the CSS `img::before` placeholder used for content slots? A cut-out
 * overlaps both the bordered card and its caption text, so a filled placeholder
 * would cover the text and a dashed one would clash with the card's solid frame.
 * For these overlays the cleanest missing state is "not there at all".
 *
 * Handles the SSR race too: if the image already failed before React hydrated
 * (so the error event was missed), the mount effect catches the broken state.
 */
export default function DecorativeImg(
  props: React.ImgHTMLAttributes<HTMLImageElement>,
) {
  const ref = useRef<HTMLImageElement>(null)
  const [broken, setBroken] = useState(false)

  useEffect(() => {
    const img = ref.current
    if (img && img.complete && img.naturalWidth === 0) setBroken(true)
  }, [])

  if (broken) return null
  return <img ref={ref} alt="" {...props} onError={() => setBroken(true)} />
}
