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
 * MoreCases — the "更多案例" carousel at the bottom of every case study:
 * four square ProjectCards per view (the homepage Marketing Project card at
 * ~75% scale, minus the 查看詳情 pill), data-driven from lib/cases so future
 * projects (app cases included) appear automatically. Shared shadcn Carousel:
 * loop + 5s autoplay (stops on interaction / reduced-motion), arrows on
 * desktop, dots + swipe on mobile.
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
  autoplayMs = 5000,
}: {
  cases: MoreCaseItem[]
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

  return (
    <div className="more-cases">
      <Carousel opts={{ loop: cases.length > 4, align: 'start' }} plugins={plugins}>
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
