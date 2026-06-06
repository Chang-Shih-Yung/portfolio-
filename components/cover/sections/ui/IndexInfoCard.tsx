import type { ReactNode, JSX } from 'react'
import RefImg from '@/components/cover/sections/ui/RefImg'

/**
 * IndexInfoCard — the reusable `.index-info` card body shared by LIVE (tm4) and
 * CONCIERGE (tm8): a title + free-form detail (children) + company line, beside a
 * 510×315 image. Each section wraps it in its own <article> for section-specific
 * CSS. Mirrors the reference, which reuses .index-info across these blocks.
 */
export interface IndexInfoCardProps {
  title: string
  company: string
  img: string
  href?: string
  /** The `.index-txt` content (a <p> for LIVE, a person-item list for CONCIERGE). */
  children: ReactNode
}

export default function IndexInfoCard({
  title,
  company,
  img,
  href = '#',
  children,
}: IndexInfoCardProps): JSX.Element {
  return (
    <a href={href}>
      <div className="index-info">
        <div className="index-info-detail">
          <h3 className="index-ttl">
            {title}
            <span></span>
          </h3>
          {children}
        </div>
        <div className="company">{company}</div>
      </div>
      <div className="facility-img">
        <RefImg src={img} width={510} height={315} alt="" />
      </div>
    </a>
  )
}
