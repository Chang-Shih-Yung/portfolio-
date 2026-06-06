'use client'

import {
  Children,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import type { ReactNode, PointerEvent as RPointerEvent } from 'react'
import ArrowButton from '@/components/cover/sections/ui/ArrowButton'

// layout effect on the client, plain effect on the server (no SSR warning)
const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

const DRAG_THRESHOLD = 8 // px of movement before a press counts as a drag (not a tap)

/**
 * Carousel — React reimplementation of the reference slick carousels
 * (LIFESTYLE tm5 / FACILITIES tm7). Matches slick's behaviour:
 *  - centered track with peek of neighbours on desktop; one full-width slide on mobile
 *  - INFINITE loop (clones N slides each side, seamless jump)
 *  - DRAG / SWIPE: press-and-drag (mouse) or swipe (touch) scrolls the track and
 *    snaps to the nearest slide on release (slick `draggable`/`swipe`)
 *  - TAP a side slide → it scrolls to centre (slick `focusOnSelect`); the centred
 *    slide keeps its own link
 *  - prev/next arrows (desktop only, opt-in via `desktopArrows`); mobile uses
 *    swipe + dots, no arrows
 *  - dot pagination (mobile only) + autoplay (paused while dragging / reduced-motion)
 *
 * CLONES = 3 keeps the FACILITIES `:nth-of-type(3n+…)` frame-shape cycle aligned.
 */
export interface CarouselProps {
  children: ReactNode
  /** show prev/next arrows on desktop (mobile always shows them) */
  desktopArrows?: boolean
  /** autoplay interval in ms (0 disables) */
  autoplayMs?: number
  /** class appended to the root (e.g. "lifestyle-slide" / "facility-slide") */
  className?: string
}

export default function Carousel({
  children,
  desktopArrows = true,
  autoplayMs = 4000,
  className,
}: CarouselProps) {
  const slides = Children.toArray(children)
  const count = slides.length
  const loop = count > 1
  const CLONES = loop ? Math.min(count, 3) : 0
  const display = loop
    ? [...slides.slice(count - CLONES), ...slides, ...slides.slice(0, CLONES)]
    : slides

  const [pos, setPos] = useState(CLONES)
  const [anim, setAnim] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [offset, setOffset] = useState(0)
  const [grabbing, setGrabbing] = useState(false)

  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const offsetRef = useRef(0)
  const drag = useRef({ active: false, startX: 0, startOffset: 0, curOffset: 0, moved: 0 })
  const suppressClick = useRef(false)

  const realIndex = loop ? (((pos - CLONES) % count) + count) % count : pos

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const sync = () => setIsMobile(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  // translate the track so the current slide is centred in the viewport
  const recompute = useCallback(() => {
    const vp = viewportRef.current
    const tr = trackRef.current
    if (!vp || !tr) return
    const el = tr.children[pos] as HTMLElement | undefined
    if (!el) return
    const o = vp.clientWidth / 2 - (el.offsetLeft + el.clientWidth / 2)
    offsetRef.current = o
    setOffset(o)
  }, [pos])

  useIsoLayoutEffect(() => {
    if (!drag.current.active) recompute()
  }, [recompute, isMobile, count])

  useEffect(() => {
    const onResize = () => recompute()
    window.addEventListener('resize', onResize)
    const t = setTimeout(recompute, 300) // re-centre after images load
    return () => {
      window.removeEventListener('resize', onResize)
      clearTimeout(t)
    }
  }, [recompute])

  // when a move lands on a clone, jump (without animation) to the real slide
  const onTransitionEnd = () => {
    if (!loop || drag.current.active) return
    if (pos >= count + CLONES) {
      setAnim(false)
      setPos((p) => p - count)
    } else if (pos < CLONES) {
      setAnim(false)
      setPos((p) => p + count)
    }
  }

  // re-enable the transition after a no-animation jump
  useEffect(() => {
    if (anim) return
    if (drag.current.active) return
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setAnim(true)))
    return () => cancelAnimationFrame(id)
  }, [anim])

  useEffect(() => {
    if (!autoplayMs || !loop) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => {
      if (drag.current.active) return // paused while dragging
      setAnim(true)
      setPos((p) => p + 1)
    }, autoplayMs)
    return () => clearInterval(t)
  }, [autoplayMs, loop])

  // ── drag / swipe ──────────────────────────────────────────────────────────
  const onPointerDown = (e: RPointerEvent<HTMLDivElement>) => {
    if (!loop) return
    if (e.pointerType === 'mouse' && e.button !== 0) return
    drag.current = {
      active: true,
      startX: e.clientX,
      startOffset: offsetRef.current,
      curOffset: offsetRef.current,
      moved: 0,
    }
    setGrabbing(true)
    setAnim(false)
    try {
      e.currentTarget.setPointerCapture(e.pointerId)
    } catch {
      /* noop */
    }
  }

  const onPointerMove = (e: RPointerEvent<HTMLDivElement>) => {
    const d = drag.current
    if (!d.active) return
    const dx = e.clientX - d.startX
    d.moved = Math.max(d.moved, Math.abs(dx))
    d.curOffset = d.startOffset + dx
    offsetRef.current = d.curOffset
    setOffset(d.curOffset)
  }

  const endDrag = () => {
    const d = drag.current
    if (!d.active) return
    d.active = false
    setGrabbing(false)
    if (d.moved > DRAG_THRESHOLD) {
      suppressClick.current = true // a real drag must not fire the slide's click
      const vp = viewportRef.current
      const tr = trackRef.current
      if (vp && tr) {
        let best = pos
        let bestDist = Infinity
        for (let k = 0; k < tr.children.length; k++) {
          const el = tr.children[k] as HTMLElement
          const c = el.offsetLeft + el.clientWidth / 2 + d.curOffset
          const dist = Math.abs(c - vp.clientWidth / 2)
          if (dist < bestDist) {
            bestDist = dist
            best = k
          }
        }
        setAnim(true)
        if (best === pos) recompute()
        else setPos(best)
      }
    } else {
      setAnim(true)
      recompute() // tiny move: snap back to centre, let the tap/click through
    }
  }

  const go = (dir: number) => {
    setAnim(true)
    setPos((p) => p + dir)
  }
  const toReal = (i: number) => {
    setAnim(true)
    setPos(CLONES + i)
  }
  // mobile relies on swipe + dots only — no arrows. desktop arrows are opt-in.
  const showArrows = !isMobile && desktopArrows
  const showDots = isMobile

  return (
    <div className={`cz${className ? ` ${className}` : ''}`}>
      <div
        className="cz-viewport"
        ref={viewportRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        style={loop ? { cursor: grabbing ? 'grabbing' : 'grab', touchAction: 'pan-y' } : undefined}
      >
        <div
          className="cz-track"
          ref={trackRef}
          style={{
            transform: `translate3d(${offset}px,0,0)`,
            transition: anim ? undefined : 'none',
          }}
          onTransitionEnd={onTransitionEnd}
        >
          {display.map((s, i) => (
            <div
              className={`cz-slide${i === pos ? ' is-current' : ''}`}
              key={i}
              aria-hidden={i !== pos}
              onClickCapture={(e) => {
                // a completed drag must not trigger the slide's link / focus
                if (suppressClick.current) {
                  suppressClick.current = false
                  e.preventDefault()
                  e.stopPropagation()
                }
              }}
              onClick={(e) => {
                // focusOnSelect: tap a side slide → scroll it to centre.
                if (i !== pos) {
                  e.preventDefault()
                  setAnim(true)
                  setPos(i)
                }
              }}
            >
              {s}
            </div>
          ))}
        </div>
      </div>

      {showArrows && loop && (
        <>
          <ArrowButton dir="prev" size="md" className="cz-arrow cz-arrow--prev" onClick={() => go(-1)} label="上一張" />
          <ArrowButton dir="next" size="md" className="cz-arrow cz-arrow--next" onClick={() => go(1)} label="下一張" />
        </>
      )}

      {showDots && loop && (
        <div className="cz-dots">
          {slides.map((_, i) => (
            <button
              type="button"
              key={i}
              className={`cz-dot${i === realIndex ? ' is-active' : ''}`}
              onClick={() => toReal(i)}
              aria-label={`第 ${i + 1} 張`}
            />
          ))}
        </div>
      )}

      <style jsx>{`
        .cz {
          position: relative;
        }
        .cz-viewport {
          overflow: hidden;
        }
        .cz-track {
          display: flex;
          align-items: flex-start;
          transition: transform 0.45s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform;
          user-select: none;
        }
        .cz-track :global(img) {
          -webkit-user-drag: none;
          user-select: none;
          pointer-events: none;
        }
        .cz-slide {
          flex: 0 0 auto;
        }
        /* arrow visual + positioning live globally (.arr / .cz-arrow* in
           cover-clone.css) so the shared <ArrowButton> picks them up. */
        .cz-dots {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-top: 24px;
        }
        .cz-dot {
          width: 10px;
          height: 10px;
          padding: 0;
          border-radius: 9999px;
          background: transparent;
          border: 1px solid #171717;
          cursor: pointer;
        }
        .cz-dot.is-active {
          background: #171717;
        }
        @media (max-width: 767px) {
          .cz-slide {
            width: 100%;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .cz-track {
            transition: none;
          }
        }
      `}</style>
    </div>
  )
}
