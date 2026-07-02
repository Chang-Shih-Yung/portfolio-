import * as React from 'react'
import { cn } from '@/lib/utils'

/**
 * ArrowButton — THE shared circular ←/→ control (ink circle, paper glyph,
 * opacity hover). One visual source (.arr in app/globals.css §UI PRIMITIVES),
 * consumed by the cover carousels (LIFESTYLE / FACILITIES), CITY POINT APP
 * and the case-study carousel — inner and outer pages share this component.
 *
 * `size` sets the circle via --arr-size (sm 40 / md 48 / lg 56); consumers
 * may also override --arr-size per breakpoint in CSS. `className` is for
 * POSITIONING — the consumer owns where the arrow sits.
 */
export type ArrowSize = 'sm' | 'md' | 'lg'

export interface ArrowButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  dir: 'prev' | 'next'
  /** default circle size; omit to size purely via CSS `--arr-size` */
  size?: ArrowSize
  label?: string
}

const ArrowButton = React.forwardRef<HTMLButtonElement, ArrowButtonProps>(
  ({ dir, size, className, label, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      className={cn('arr', size && `arr--${size}`, `arr--${dir}`, className)}
      aria-label={label ?? (dir === 'prev' ? '上一個' : '下一個')}
      {...props}
    >
      <span aria-hidden="true">{dir === 'prev' ? '←' : '→'}</span>
    </button>
  ),
)
ArrowButton.displayName = 'ArrowButton'

export default ArrowButton
export { ArrowButton }
