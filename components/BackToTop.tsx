'use client'

import * as React from 'react'
import { usePathname } from 'next/navigation'
import ArrowButton from '@/components/ui/arrow-button'
import { cn } from '@/lib/utils'

/**
 * BackToTop — fixed ↑ control for the inner pages, reusing THE shared
 * circular ArrowButton. Appears once the reader has scrolled past roughly
 * two sections (2 viewport heights); fades/slides in and out. Hidden on "/"
 * (the cover has its own chrome and a mobile bottom tab bar).
 */
const SHOW_AFTER_VIEWPORTS = 2

export default function BackToTop() {
  const pathname = usePathname()
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () =>
      setVisible(window.scrollY > window.innerHeight * SHOW_AFTER_VIEWPORTS)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  if (pathname === '/') return null

  const scrollTop = () => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })
  }

  return (
    <ArrowButton
      dir="up"
      size="md"
      className={cn('back-to-top', visible && 'is-visible')}
      onClick={scrollTop}
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
    />
  )
}
