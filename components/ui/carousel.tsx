'use client'

import * as React from 'react'
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from 'embla-carousel-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

/**
 * Carousel — the shadcn/ui carousel (Embla-based compound component),
 * adapted to this codebase: semantic classes styled by design tokens in
 * app/globals.css (§UI PRIMITIVES) instead of Tailwind, and the shared
 * ←/→ glyphs instead of lucide icons (matches the homepage arrows).
 *
 * API surface mirrors shadcn:
 *   <Carousel opts plugins setApi orientation>
 *     <CarouselContent> <CarouselItem/>… </CarouselContent>
 *     <CarouselPrevious/> <CarouselNext/> <CarouselDots/>
 *   </Carousel>
 */
type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

interface CarouselProps {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: 'horizontal' | 'vertical'
  setApi?: (api: CarouselApi) => void
}

interface CarouselContextProps extends CarouselProps {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
  /** stop a mounted autoplay plugin — manual navigation takes over */
  stopAutoplay: () => void
}

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)
  if (!context) {
    throw new Error('useCarousel must be used within <Carousel />')
  }
  return context
}

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    { orientation, opts, setApi, plugins, className, children, ...props },
    ref,
  ) => {
    // explicit `orientation` wins; otherwise honour an Embla-style opts.axis
    const resolvedOrientation =
      orientation ?? (opts?.axis === 'y' ? 'vertical' : 'horizontal')
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: resolvedOrientation === 'horizontal' ? 'x' : 'y',
      },
      plugins,
    )
    // with loop, prev/next are always available — seed true so the SSR HTML
    // doesn't flash (or stick, without JS) disabled arrows
    const [canScrollPrev, setCanScrollPrev] = React.useState(!!opts?.loop)
    const [canScrollNext, setCanScrollNext] = React.useState(!!opts?.loop)

    const onSelect = React.useCallback((emblaApi: CarouselApi) => {
      if (!emblaApi) return
      setCanScrollPrev(emblaApi.canScrollPrev())
      setCanScrollNext(emblaApi.canScrollNext())
    }, [])

    // manual navigation (arrows / dots) takes control: a running autoplay
    // timer must not fire a surprise extra advance right after the click —
    // and interaction-stops-autoplay is also the WCAG 2.2.2 pause affordance.
    const stopAutoplay = React.useCallback(() => {
      const pluginApi = api?.plugins() as
        | Record<string, { stop?: () => void }>
        | undefined
      pluginApi?.autoplay?.stop?.()
    }, [api])

    const scrollPrev = React.useCallback(() => {
      stopAutoplay()
      api?.scrollPrev()
    }, [api, stopAutoplay])
    const scrollNext = React.useCallback(() => {
      stopAutoplay()
      api?.scrollNext()
    }, [api, stopAutoplay])

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        // never hijack keys already handled, or typed into editable controls
        if (event.defaultPrevented) return
        const target = event.target as HTMLElement | null
        if (target?.closest('input, textarea, select, [contenteditable="true"]')) return
        const [prevKey, nextKey] =
          resolvedOrientation === 'vertical'
            ? ['ArrowUp', 'ArrowDown']
            : ['ArrowLeft', 'ArrowRight']
        if (event.key === prevKey) {
          event.preventDefault()
          scrollPrev()
        } else if (event.key === nextKey) {
          event.preventDefault()
          scrollNext()
        }
      },
      [resolvedOrientation, scrollPrev, scrollNext],
    )

    React.useEffect(() => {
      if (!api || !setApi) return
      setApi(api)
    }, [api, setApi])

    React.useEffect(() => {
      if (!api) return
      onSelect(api)
      api.on('reInit', onSelect)
      api.on('select', onSelect)
      return () => {
        api?.off('reInit', onSelect)
        api?.off('select', onSelect)
      }
    }, [api, onSelect])

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api,
          opts,
          orientation: resolvedOrientation,
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
          stopAutoplay,
        }}
      >
        <div
          ref={ref}
          onKeyDown={handleKeyDown}
          className={cn('ui-carousel', className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    )
  },
)
Carousel.displayName = 'Carousel'

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel()
  return (
    <div ref={carouselRef} className="ui-carousel-viewport">
      <div
        ref={ref}
        className={cn(
          'ui-carousel-track',
          orientation === 'vertical' && 'ui-carousel-track--vertical',
          className,
        )}
        {...props}
      />
    </div>
  )
})
CarouselContent.displayName = 'CarouselContent'

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel()
  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        'ui-carousel-item',
        orientation === 'vertical' && 'ui-carousel-item--vertical',
        className,
      )}
      {...props}
    />
  )
})
CarouselItem.displayName = 'CarouselItem'

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = 'outline', size = 'icon', ...props }, ref) => {
  const { scrollPrev, canScrollPrev } = useCarousel()
  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn('ui-carousel-prev', className)}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      aria-label="上一張"
      {...props}
    >
      <span aria-hidden="true">←</span>
    </Button>
  )
})
CarouselPrevious.displayName = 'CarouselPrevious'

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = 'outline', size = 'icon', ...props }, ref) => {
  const { scrollNext, canScrollNext } = useCarousel()
  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn('ui-carousel-next', className)}
      disabled={!canScrollNext}
      onClick={scrollNext}
      aria-label="下一張"
      {...props}
    >
      <span aria-hidden="true">→</span>
    </Button>
  )
})
CarouselNext.displayName = 'CarouselNext'

/**
 * CarouselDots — pagination dots (shadcn-pattern extension: consumes the
 * same context; active dot follows Embla's selected snap). Pass `count`
 * so the dots render in the SSR HTML too (no post-hydration layout shift);
 * once Embla mounts, its snap list takes over.
 */
const CarouselDots = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { count?: number }
>(({ className, count, ...props }, ref) => {
  const { api, stopAutoplay } = useCarousel()
  const [snaps, setSnaps] = React.useState<number[]>([])
  const [selected, setSelected] = React.useState(0)

  React.useEffect(() => {
    if (!api) return
    const sync = () => {
      setSnaps(api.scrollSnapList())
      setSelected(api.selectedScrollSnap())
    }
    sync()
    api.on('reInit', sync)
    api.on('select', sync)
    return () => {
      api?.off('reInit', sync)
      api?.off('select', sync)
    }
  }, [api])

  const total = snaps.length || count || 0
  if (total <= 1) return null

  return (
    <div
      ref={ref}
      className={cn('ui-carousel-dots', className)}
      role="group"
      aria-label="輪播頁籤"
      {...props}
    >
      {Array.from({ length: total }, (_, i) => (
        <button
          key={i}
          type="button"
          className={cn('ui-carousel-dot', i === selected && 'is-active')}
          aria-label={`第 ${i + 1} 張`}
          aria-current={i === selected}
          onClick={() => {
            stopAutoplay()
            api?.scrollTo(i)
          }}
        />
      ))}
    </div>
  )
})
CarouselDots.displayName = 'CarouselDots'

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
  useCarousel,
}
