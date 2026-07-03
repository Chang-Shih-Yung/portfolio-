import * as React from 'react'
import Link from 'next/link'

/**
 * ProjectCard — THE shared project card: the homepage Marketing Project
 * carousel and the case pages' 更多案例 carousel both render this exact
 * component, so frame / typography / hover stay identical everywhere.
 * Styled by the .proj-card rules in app/cover-clone.css (global).
 *
 * No 'use client' and no server-only imports — usable from server sections
 * (pass <RefImg/> as `image`) and client carousels (pass a plain <img/>).
 * `cta` renders the 查看詳情-style pill; omit it where the card is enough.
 */
export function ProjectCard({
  href,
  image,
  loc,
  name,
  year,
  cta,
}: {
  href: string
  /** the framed media — <RefImg/>, <img/>, or a placeholder node */
  image: React.ReactNode
  /** small line above the title, e.g. 台東縣 or the case domain */
  loc: string
  name: string
  year: string
  /** pill label, e.g. 查看詳情 — omitted = no button (更多案例) */
  cta?: string
}) {
  return (
    <Link href={href} className="proj-card">
      <div className="index-img">{image}</div>
      <div className="index-detail">
        <div className="index-detail-box">
          <p className="index-detail-location">{loc}</p>
          <p className="index-detail-name">{name}</p>
          <p className="index-detail-year">{year}</p>
          {cta && <div className="index-btn">{cta}</div>}
        </div>
      </div>
    </Link>
  )
}
