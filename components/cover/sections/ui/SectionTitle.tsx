import type { JSX } from 'react'

/**
 * SectionTitle — the reusable `.ttl-box` block shared by every homepage section
 * (mirrors how the reference reuses ttl-ja + ttl-en across all sections).
 *
 *   <SectionTitle ja="最新消息" en="NEWS" />
 *   <SectionTitle ja="關於居住" en="LIVE" enSub="IN SENDAI" />
 */
export interface SectionTitleProps {
  /** Chinese heading (rendered inside .ttl-ja > span). */
  ja: string
  /** English label (.ttl-en). */
  en: string
  /** Optional second English word wrapped in a <span> (e.g. "IN SENDAI"). */
  enSub?: string
}

export default function SectionTitle({ ja, en, enSub }: SectionTitleProps): JSX.Element {
  return (
    <div className="ttl-box">
      <h2 className="ttl-ja">
        <span>{ja}</span>
      </h2>
      <p className="ttl-en">
        {en}
        {enSub ? (
          <>
            {' '}
            <span>{enSub}</span>
          </>
        ) : null}
      </p>
    </div>
  )
}
