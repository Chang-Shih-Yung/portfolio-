import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

/**
 * Badge — shadcn-pattern chip (mono uppercase pill, koyama styling via
 * tokens in app/globals.css §UI PRIMITIVES).
 */
const badgeVariants = cva('ui-badge', {
  variants: {
    variant: {
      outline: 'ui-badge--outline',
      solid: 'ui-badge--solid',
    },
  },
  defaultVariants: { variant: 'outline' },
})

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
