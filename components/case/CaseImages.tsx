import * as React from 'react'

/**
 * ImageRow — a side-by-side row of koyama-framed images inside the case
 * body (e.g. two coupon banners under §Highlights). Server-safe; styled by
 * .img-row rules in app/globals.css. Two per row on desktop, stacked on
 * mobile.
 */
export function ImageRow({
  images,
}: {
  images: { src: string; alt: string }[]
}) {
  return (
    <div className="img-row">
      {images.map((im) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img key={im.src} src={im.src} alt={im.alt} loading="lazy" />
      ))}
    </div>
  )
}
