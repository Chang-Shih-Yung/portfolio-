'use client'

import {
  Children,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import type { ReactNode, PointerEvent as RPointerEvent, TransitionEvent as RTransitionEvent } from 'react'
import ArrowButton from '@/components/cover/sections/ui/ArrowButton'

// layout effect on the client, plain effect on the server (no SSR warning)
const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

const DRAG_THRESHOLD = 8 // px of movement before a press counts as a drag (not a tap)
const SETTLE_MS = 620 // safety fallback if `transitionend` is ever missed (bg tab, interrupted)

const mod = (n: number, m: number) => ((n % m) + m) % m

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
 *
 * ── Robust infinite loop ──────────────────────────────────────────────────
 * The seamless wrap is bulletproofed against the ways a clone carousel usually
 * breaks (and looks like it "stops looping"):
 *  1. `transitionend` is FILTERED to the track's own `transform` — child hover
 *     transitions bubble up and must not trigger a seam jump.
 *  2. On settle we NORMALISE `pos` back into the real range with a modulo, so a
 *     move that crosses several slides at once (fast swipe, focus-on-select onto
 *     a clone) always lands cleanly instead of stranding on the clone buffer.
 *  3. An in-flight lock (`animating`) + a safety timeout stop a second move from
 *     pushing `pos` past the clone buffer (which would blank the track).
 */
export interface CarouselProps {
  children: ReactNode
  /** show prev/next arrows on DESKTOP. Mobile never shows arrows (swipe + dots). */
  desktopArrows?: boolean
  /** autoplay interval in ms (0 disables) */
  autoplayMs?: number
  /** class appended to the root (e.g. "lifestyle-slide" / "facility-slide") */
  className?: string
}

export default function Carousel({
  children,
  desktopArrows = true,
  autoplayMs = 3000,
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
  const drag = useRef({ active: false, startX: 0, startOffset: 0, curOffset: 0, moved: 0, pointerId: -1, captured: false })
  const suppressClick = useRef(false)
  const animating = useRef(false) // a programmatic move is in flight (arrow / autoplay / dot / drag-snap)
  const settleTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const posRef = useRef(pos) // always-fresh pos for the settle timeout closure

  useEffect(() => {
    posRef.current = pos
  }, [pos])

  // map any display index (incl. a clone) to the canonical real-slide index
  const canonical = useCallback(
    (p: number) => (loop ? CLONES + mod(p - CLONES, count) : p),
    [loop, CLONES, count],
  )
  const realIndex = loop ? mod(pos - CLONES, count) : pos

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const sync = () => setIsMobile(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  // translate the track so the current slide is centred in the viewport.
  // Defensive: if `pos` momentarily points past the clone buffer, centre its
  // canonical equivalent instead of bailing (which would freeze the offset).
  const recompute = useCallback(() => {
    const vp = viewportRef.current
    const tr = trackRef.current
    if (!vp || !tr) return
    const el = (tr.children[pos] ?? tr.children[canonical(pos)]) as HTMLElement | undefined
    if (!el) return
    const o = vp.clientWidth / 2 - (el.offsetLeft + el.clientWidth / 2)
    offsetRef.current = o
    setOffset(o)
  }, [pos, canonical])

  useIsoLayoutEffect(() => {
    if (!drag.current.active) recompute()
  }, [recompute, isMobile, count])

  useEffect(() => {
    const onResize = () => recompute()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [recompute])

  // ── settle: run once a move finishes. Normalise a clone landing back into the
  // real range WITHOUT animation (identical content → invisible), and release
  // the in-flight lock. Called by the filtered transitionend + a safety timeout.
  const finishMove = useCallback(() => {
    if (settleTimer.current) {
      clearTimeout(settleTimer.current)
      settleTimer.current = null
    }
    if (!loop) {
      animating.current = false
      return
    }
    const p = posRef.current
    const norm = canonical(p)
    if (norm !== p) {
      // invisible rebase; the [anim] effect re-enables the transition + unlocks
      setAnim(false)
      setPos(norm)
    } else {
      animating.current = false
    }
  }, [loop, canonical])

  // start a programmatic, animated move to a display index (locked while running)
  const animate = useCallback(
    (target: number) => {
      if (animating.current || drag.current.active) return
      animating.current = true
      setAnim(true)
      setPos(target)
      if (settleTimer.current) clearTimeout(settleTimer.current)
      settleTimer.current = setTimeout(finishMove, SETTLE_MS)
    },
    [finishMove],
  )

  // when a settle set anim=false (invisible rebase), re-enable the transition on
  // the next frame and release the lock — one place owns both.
  useEffect(() => {
    if (anim) return
    if (drag.current.active) return
    const id = requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        setAnim(true)
        animating.current = false
      }),
    )
    return () => cancelAnimationFrame(id)
  }, [anim])

  useEffect(() => {
    if (!autoplayMs || !loop) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => {
      if (drag.current.active || animating.current) return // paused while busy
      animate(posRef.current + 1)
    }, autoplayMs)
    return () => clearInterval(t)
  }, [autoplayMs, loop, animate])

  useEffect(
    () => () => {
      if (settleTimer.current) clearTimeout(settleTimer.current)
    },
    [],
  )

  const onTransitionEnd = (e: RTransitionEvent<HTMLDivElement>) => {
    // ignore transitions bubbling up from slide contents (card hover, etc.)
    if (e.target !== e.currentTarget || e.propertyName !== 'transform') return
    if (drag.current.active) return
    finishMove()
  }

  // If a move is grabbed mid-flight while `pos` sits on a clone, snap `pos` to
  // its canonical twin RIGHT NOW without any visual change — the two indices
  // hold identical content, so shifting the offset by their track-gap is a
  // no-op on screen. This keeps every drag starting from the safe real range,
  // so repeated fast swipes can never compound their way onto an edge clone
  // (which would leave a blank peek on one side).
  const rebaseToCanonical = useCallback(() => {
    if (!loop) return
    const tr = trackRef.current
    const p = posRef.current
    const norm = canonical(p)
    if (norm === p || !tr) return
    const cur = tr.children[p] as HTMLElement | undefined
    const dst = tr.children[norm] as HTMLElement | undefined
    if (!cur || !dst) return
    offsetRef.current += cur.offsetLeft - dst.offsetLeft
    setOffset(offsetRef.current)
    posRef.current = norm
    setPos(norm)
  }, [loop, canonical])

  // ── drag / swipe ──────────────────────────────────────────────────────────
  const onPointerDown = (e: RPointerEvent<HTMLDivElement>) => {
    if (!loop) return
    if (e.pointerType === 'mouse' && e.button !== 0) return
    // grabbing takes over from any in-flight programmatic move
    if (settleTimer.current) {
      clearTimeout(settleTimer.current)
      settleTimer.current = null
    }
    animating.current = false
    setAnim(false)
    rebaseToCanonical() // start the gesture from a safe, canonical position
    drag.current = {
      active: true,
      startX: e.clientX,
      startOffset: offsetRef.current,
      curOffset: offsetRef.current,
      moved: 0,
      pointerId: e.pointerId,
      captured: false,
    }
    setGrabbing(true)
    // NOTE: do NOT capture the pointer on press. Capturing on every press makes
    // the browser retarget the follow-up `click` to the capture element (the
    // viewport) on desktop, so a plain click never reaches the card's <a> — the
    // linked card looks dead. We capture only once a real DRAG begins (see
    // onPointerMove); a clean tap keeps its native click → the card navigates.
  }

  const onPointerMove = (e: RPointerEvent<HTMLDivElement>) => {
    const d = drag.current
    if (!d.active) return
    const dx = e.clientX - d.startX
    d.moved = Math.max(d.moved, Math.abs(dx))
    // capture the pointer only once a real drag crosses the threshold, so a
    // stationary tap never captures (and its click reaches the card's link).
    if (!d.captured && d.moved > DRAG_THRESHOLD) {
      d.captured = true
      try {
        e.currentTarget.setPointerCapture(d.pointerId)
      } catch {
        /* noop */
      }
    }
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
        // keep the landing inside the range where both peeks stay filled — a
        // single hard flick can't strand us on an edge clone (blank peek).
        best = Math.min(Math.max(best, CLONES - 1), tr.children.length - CLONES)
        setAnim(true)
        if (best === pos) {
          recompute() // no index change: just snap the offset back to centre
        } else {
          // animate to the nearest slide, then normalise on settle (may be a clone)
          animating.current = true
          posRef.current = best
          setPos(best)
          if (settleTimer.current) clearTimeout(settleTimer.current)
          settleTimer.current = setTimeout(finishMove, SETTLE_MS)
        }
      }
    } else {
      setAnim(true)
      recompute() // tiny move: snap back to centre, let the tap/click through
    }
  }

  const go = (dir: number) => animate(posRef.current + dir)
  const toReal = (i: number) => animate(CLONES + i)
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
                // A click on a REAL link (href other than "#") navigates normally —
                // a linked card should open its page from any position, not just
                // when it's centred. Placeholder cards (href="#") keep the
                // focusOnSelect behaviour: tapping a side slide scrolls it to centre.
                const href = (e.target as HTMLElement)
                  .closest('a')
                  ?.getAttribute('href')
                if (href && href !== '#') return
                if (i !== pos) {
                  e.preventDefault()
                  animate(i)
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
          gap: 8px;
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
