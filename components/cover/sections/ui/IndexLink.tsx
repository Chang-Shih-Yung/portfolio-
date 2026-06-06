import type { JSX } from 'react'

/**
 * IndexLink — the reusable inline `.index-link` "more" affordance used inside
 * cards (FACILITIES, CORP). Defaults to 了解更多.
 */
export interface IndexLinkProps {
  label?: string
}

export default function IndexLink({ label = '了解更多' }: IndexLinkProps): JSX.Element {
  return (
    <div className="index-link">
      <span>{label}</span>
    </div>
  )
}
