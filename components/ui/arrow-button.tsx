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
export type ArrowDir = 'prev' | 'next' | 'up'

const GLYPH: Record<ArrowDir, string> = { prev: '←', next: '→', up: '↑' }
const DEFAULT_LABEL: Record<ArrowDir, string> = {
  prev: '上一個',
  next: '下一個',
  up: '回到頂部',
}

export interface ArrowButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  dir: ArrowDir
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
      aria-label={label ?? DEFAULT_LABEL[dir]}
      {...props}
    >
      <span aria-hidden="true">{GLYPH[dir]}</span>
    </button>
  ),
)
ArrowButton.displayName = 'ArrowButton'

export default ArrowButton
export { ArrowButton }
