'use client'

import { usePathname } from 'next/navigation'

/**
 * SiteFooter — client-side route gate for the shared footer chrome. The
 * actual footer (CoverFooter, a SERVER component — RefImg uses node:fs) is
 * passed in as children from app/layout.tsx, so importing it here would drag
 * server-only code into the client bundle. Hidden on "/" (the cover already
 * renders CoverFooter itself).
 */
export default function SiteFooter({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  if (pathname === '/') return null
  return <>{children}</>
}
