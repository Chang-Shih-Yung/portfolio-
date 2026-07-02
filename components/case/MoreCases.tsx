'use client'

import * as React from 'react'
import Link from 'next/link'
import Autoplay from 'embla-carousel-autoplay'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
} from '@/components/ui/carousel'

/**
 * MoreCases — the "更多案例" carousel at the bottom of every case study.
 * Data-driven from lib/cases (the current case is excluded upstream), so new
 * cases appear automatically. Built on the shared shadcn Carousel: loop +
 * 5s autoplay (stops on interaction / reduced-motion), arrows on desktop,
 * dots + swipe on mobile. Cards rotate the koyama pastel offset shadows.
 */
export interface MoreCaseItem {
  slug: string
  title: string
  domain: string
  year: number
  stage: string
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
      <Carousel opts={{ loop: cases.length > 1 }} plugins={plugins}>
        <CarouselContent>
          {cases.map((c) => (
            <CarouselItem key={c.slug}>
              <Link href={`/work/${c.slug}`} className="more-case-card">
                <p className="more-case-eyebrow">
                  {c.domain} · {c.year}
                </p>
                <p className="more-case-title">{c.title}</p>
                <p className="more-case-stage">{c.stage}</p>
                <span className="more-case-cta">查看案例 →</span>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        {cases.length > 1 && (
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
