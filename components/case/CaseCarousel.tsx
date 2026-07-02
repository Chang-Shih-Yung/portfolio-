'use client'

import * as React from 'react'
import Autoplay from 'embla-carousel-autoplay'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
  type CarouselApi,
} from '@/components/ui/carousel'

/**
 * CaseCarousel — the case-study image showcase, built on the shadcn/ui
 * Carousel (Embla). One koyama-framed viewport (hairline border, 16px
 * radius), autoplay with loop, ←/→ arrows (desktop), dots + a mono
 * "N / total" counter. Sits mid-page inside the MDX body.
 */
export interface CaseSlide {
  src: string
  alt?: string
}

export function CaseCarousel({
  slides,
  aspect = '3 / 2',
  autoplayMs = 4000,
}: {
  slides: CaseSlide[]
  /** CSS aspect-ratio of the frame, e.g. "3 / 2" */
  aspect?: string
  /** autoplay delay in ms (0 disables) */
  autoplayMs?: number
}) {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(1)

  // no autoplay for reduced-motion users (same guard as the homepage
  // carousel); manual arrows / dots / swipe all still work.
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

  React.useEffect(() => {
    if (!api) return
    const sync = () => setCurrent(api.selectedScrollSnap() + 1)
    sync()
    api.on('select', sync)
    api.on('reInit', sync)
    return () => {
      api?.off('select', sync)
      api?.off('reInit', sync)
    }
  }, [api])

  return (
    <div className="case-carousel">
      <Carousel opts={{ loop: true }} plugins={plugins} setApi={setApi}>
        <div className="case-carousel-frame" style={{ aspectRatio: aspect }}>
          <CarouselContent className="case-carousel-content">
            {slides.map((s, i) => (
              <CarouselItem key={`${s.src}-${i}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.src}
                  alt={s.alt ?? `活動紀實 ${i + 1}`}
                  className="case-carousel-img"
                  loading={i === 0 ? 'eager' : 'lazy'}
                  draggable={false}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <span className="case-carousel-counter" aria-hidden="true">
            {current} / {slides.length}
          </span>
        </div>
        <CarouselPrevious />
        <CarouselNext />
        <CarouselDots count={slides.length} />
      </Carousel>
    </div>
  )
}
