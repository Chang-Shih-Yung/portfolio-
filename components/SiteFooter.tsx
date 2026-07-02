'use client'

import { usePathname } from 'next/navigation'
import CoverFooter from '@/components/cover/sections/CoverFooter'

/**
 * SiteFooter — inner pages reuse the homepage koyama footer (CoverFooter:
 * the lake-green block + banner row + bottom cityscape illustration) so the
 * whole site closes on the same chrome. Wrapped in `.kyc kyc--chrome` for
 * the koyama style context without the cover's page padding. Hidden on "/"
 * (the cover already renders CoverFooter itself).
 */
export default function SiteFooter() {
  const pathname = usePathname()
  if (pathname === '/') return null

  return (
    <div className="kyc kyc--chrome">
      <CoverFooter />
    </div>
  )
}
