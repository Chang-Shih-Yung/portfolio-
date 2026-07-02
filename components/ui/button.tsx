import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

/**
 * Button — shadcn-pattern primitive (CVA variants + Radix Slot asChild).
 * Variants map to the koyama visual language; the classes are styled with
 * design tokens in app/globals.css (§UI PRIMITIVES), not Tailwind.
 *
 *  - default: ink capsule, paper text (the homepage CTA look)
 *  - outline: paper capsule, hairline border, ink text
 *  - ghost:   borderless, muted → ink on hover
 *  - size icon: round circle (the shared ←/→ arrow look)
 */
const buttonVariants = cva('ui-btn', {
  variants: {
    variant: {
      default: 'ui-btn--default',
      outline: 'ui-btn--outline',
      ghost: 'ui-btn--ghost',
    },
    size: {
      default: 'ui-btn--md',
      sm: 'ui-btn--sm',
      lg: 'ui-btn--lg',
      icon: 'ui-btn--icon',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
})

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
