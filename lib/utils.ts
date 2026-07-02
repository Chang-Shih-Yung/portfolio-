import { clsx, type ClassValue } from 'clsx'

/**
 * cn — class combiner for the shadcn-pattern components under components/ui.
 * (No Tailwind in this codebase, so plain clsx without tailwind-merge.)
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}
