'use client'

import * as React from 'react'
import Autoplay from 'embla-carousel-autoplay'
import { ProjectCard } from '@/components/ProjectCard'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
} from '@/components/ui/carousel'

/**
 * MoreCases — the "更多案例" rail at the bottom of every case study: the full
 * project set (every case in lib/cases, so new ones appear automatically),
 * four square ProjectCards per view (the homepage Marketing Project card at
 * ~75% scale, minus the 查看詳情 pill). Shared shadcn Carousel: loop + 5s
 * autoplay (stops on interaction / reduced-motion), arrows on desktop, dots +
 * swipe on mobile. `activeSlug` (the case being viewed) just sets the opening
 * scroll position to the NEXT project, so the rail leads with the "more" ones.
 */
export interface MoreCaseItem {
  slug: string
  title: string
  domain: string
  year: number
  thumb?: string
}

export function MoreCases({
  cases,
  activeSlug,
  autoplayMs = 5000,
}: {
  cases: MoreCaseItem[]
  activeSlug?: string
  autoplayMs?: number
}) {
  const plugins = React.useMemo(() => {
    if (autoplayMs <= 0) return []
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return []
    }
    return [Autoplay({ delay: autoplayMs, stopOnInteraction: true })]
  }, [autoplayMs])

  if (cases.length === 0) return null

  const activeIdx = activeSlug ? cases.findIndex((c) => c.slug === activeSlug) : -1
  const startIndex = activeIdx >= 0 ? (activeIdx + 1) % cases.length : 0

  return (
    <div className="more-cases proj-compact">
      <Carousel opts={{ loop: cases.length > 4, align: 'start', startIndex }} plugins={plugins}>
        <CarouselContent>
          {cases.map((c) => (
            <CarouselItem key={c.slug}>
              <ProjectCard
                href={`/work/${c.slug}`}
                loc={c.domain}
                name={c.title}
                year={String(c.year)}
                image={
                  c.thumb ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={c.thumb} alt="" loading="lazy" draggable={false} />
                  ) : (
                    <span className="proj-thumb-ph" aria-hidden="true" />
                  )
                }
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        {cases.length > 4 && (
          <>
            <CarouselPrevious />
            <CarouselNext />
            <CarouselDots count={cases.length} />
          </>
        )}
      </Carousel>
    </div>
  )
}
