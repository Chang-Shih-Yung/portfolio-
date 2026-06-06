import type { JSX } from 'react'

/**
 * ArrowButton — the ONE shared circular ←/→ control (black circle, white glyph,
 * opacity hover). Reused by <Carousel> (LIFESTYLE / FACILITIES) and the CITY
 * POINT APP map slider so every section's arrows look + behave identically.
 *
 * Sizing is componentised for RWD: `size` (sm 40 / md 48 / lg 56) sets the
 * `--arr-size` custom property via a class; a consumer can also override
 * `--arr-size` in CSS at any breakpoint (e.g. lg on desktop, sm on mobile).
 * `className` is for POSITIONING — the consumer owns where the arrow sits.
 */
export type ArrowSize = 'sm' | 'md' | 'lg'

export interface ArrowButtonProps {
  dir: 'prev' | 'next'
  onClick?: () => void
  /** default circle size; omit to size purely via CSS `--arr-size` */
  size?: ArrowSize
  /** positioning / context classes (e.g. "cz-arrow cz-arrow--prev") */
  className?: string
  label?: string
}

export default function ArrowButton({
  dir,
  onClick,
  size,
  className,
  label,
}: ArrowButtonProps): JSX.Element {
  const classes = [
    'arr',
    size ? `arr--${size}` : '',
    `arr--${dir}`,
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      type="button"
      className={classes}
      onClick={onClick}
      aria-label={label ?? (dir === 'prev' ? '上一個' : '下一個')}
    >
      <span aria-hidden="true">{dir === 'prev' ? '←' : '→'}</span>
    </button>
  )
}
