import type { JSX } from 'react'

/**
 * Btn — the reusable `.btn` arrow button shared across sections. Pass `className`
 * to append visibility helpers (e.g. "pc-only" / "sp-only" used by the carousels).
 *
 *   <Btn label="查看所有消息" href="/news" />
 *   <Btn label="查看全部" className="pc-only" />
 */
export interface BtnProps {
  label: string
  href?: string
  className?: string
}

export default function Btn({ label, href = '#', className }: BtnProps): JSX.Element {
  return (
    <div className={`btn${className ? ` ${className}` : ''}`}>
      <a href={href}>
        <span className="btn-txt">{label}</span>
        {/* the circle + arrow are drawn entirely by .btn-icon CSS (::before/::after) */}
        <span className="btn-icon" aria-hidden="true" />
      </a>
    </div>
  )
}
