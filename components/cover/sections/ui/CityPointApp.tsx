'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import ArrowButton from '@/components/ui/arrow-button'

/**
 * CityPointApp — the interactive heart of the "CITY POINT APP" section.
 *
 * A MANUAL map carousel: click the left/right black-circle arrows (placed at the
 * page sides) to switch city — no autoplay. The "{city}幣" headline, the copy and
 * the "進入{city}幣" CTA all follow the selected city.
 *
 * SHAPE-ONLY hover: browsers don't alpha-hit-test raster images (the whole 500×
 * 500 box would react), so we sample the PNG's alpha under the cursor ourselves
 * (draw it to a canvas once — same-origin, no taint — and read the pixel). Only
 * when the cursor is actually over the map shape does it brighten + scale up.
 *
 * Fully data-driven: add a city by dropping a 500×500 map in /public/cities and
 * appending one entry to `cities`. Copy is Traditional-Chinese placeholder.
 */
export interface City {
  /** display name, e.g. 台中 — the coin/CTA becomes `{name}幣` */
  name: string
  /** map asset under /public/cities (500×500 PNG) */
  map: string
  /** the coin-app slogan beside the map — two lines (lead = big, sub = small) */
  slogan: { lead: string; sub: string }
  /** case-study route the 進入{name}幣 CTA opens */
  href: string
  /** one-line intro of the city's real project, shown beside the map */
  desc: string
}

const cities: City[] = [
  {
    name: '台中',
    map: '/cities/taichung.png',
    slogan: { lead: '大城生活', sub: '一卡通行' },
    href: '/work/taichung-carbon',
    desc: '減碳存摺平台——把搭車、走路、回收等日常低碳行為，變成可累積、可兌換的數位資產。',
  },
  {
    name: '苗栗',
    map: '/cities/miaoli.png',
    slogan: { lead: '漫遊山城', sub: '在地有禮' },
    href: '/work/miaoli-points',
    desc: '苗栗縣數位點數平台——會員、點數、店家與活動的一站式地方數位服務入口。',
  },
  {
    name: '南投',
    map: '/cities/nantou.png',
    slogan: { lead: '山水之間', sub: '處處有禮' },
    href: '/work/nantou-points',
    desc: '數位生活點數平台 2.0——從真實使用者回饋出發，重新優化民眾、商家與後台三端流程。',
  },
  {
    name: '雲林',
    map: '/cities/yunlin.png',
    slogan: { lead: '農鄉新意', sub: '點數同行' },
    href: '/work/yunlin-platform',
    desc: '雲林數位縣民平台（雲林幣 2.0）——一致品牌與設計系統之上的縣政服務生態系。',
  },
  {
    name: '台東',
    map: '/cities/taitung.png',
    slogan: { lead: '慢活東岸', sub: '一點就通' },
    href: '/work/dongan-food-festival',
    desc: '臺東金幣 × 東岸舖食節——用點數機制把城市慶典，變成年度的數位生活儀式。',
  },
  {
    name: '花蓮',
    map: '/cities/hualien.png',
    slogan: { lead: '山海之境', sub: '樂遊有禮' },
    href: '/work/hualien-sustainable',
    desc: '花蓮永續生活數位服務平台——把活動參與、點數累積與商家使用接成一條行為循環。',
  },
]

/* background ribbon phrases (city / points themed placeholder) */
const marqueePhrases = [
  '在地消費',
  '點數回饋',
  'CITY POINT',
  '一點就通',
  '走到哪 · 用到哪',
  '城市生活',
  'LOCAL REWARDS',
  '掃碼即享',
]

function MarqueeGroup() {
  return (
    <div className="bg-item">
      {marqueePhrases.map((phrase, i) => (
        <span className="mq-cell" key={i}>
          <span className="mq-word">{phrase}</span>
          <span className="mq-dot" aria-hidden="true">·</span>
        </span>
      ))}
    </div>
  )
}

export default function CityPointApp() {
  const [index, setIndex] = useState(0)
  const [overShape, setOverShape] = useState(false)
  const imgRef = useRef<HTMLImageElement | null>(null)
  const alphaRef = useRef<{ data: Uint8ClampedArray; w: number; h: number } | null>(
    null,
  )

  const city = cities[index]

  // preload EVERY city map once on mount so switching never waits on the
  // network. Without this, the first visit shows a blank frame on each new
  // city until its PNG downloads — looks like a flicker.
  useEffect(() => {
    cities.forEach((c) => {
      const im = new Image()
      im.src = c.map
    })
  }, [])

  const reset = () => {
    setOverShape(false)
    alphaRef.current = null // rebuilt when the next map loads
  }
  const go = (delta: number) => {
    setIndex((p) => (p + delta + cities.length) % cities.length)
    reset()
  }
  const select = (i: number) => {
    setIndex(i)
    reset()
  }

  // pointer / touch SWIPE to change city (drag the map left/right)
  const dragX = useRef<number | null>(null)
  const onDown = (e: React.PointerEvent<HTMLImageElement>) => {
    dragX.current = e.clientX
    try {
      e.currentTarget.setPointerCapture(e.pointerId)
    } catch {
      /* capture is best-effort */
    }
  }
  const onUp = (e: React.PointerEvent<HTMLImageElement>) => {
    const start = dragX.current
    dragX.current = null
    if (start == null) return
    const dx = e.clientX - start
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1) // swipe left → next
  }
  // a cancelled gesture (touch interrupted / browser takeover) must clear the
  // pending drag so a later move/up isn't measured from a stale start point.
  const onCancel = () => {
    dragX.current = null
  }

  /** draw the (same-origin) PNG to a canvas once and cache its alpha channel */
  const buildAlpha = useCallback(() => {
    const img = imgRef.current
    if (!img || !img.complete || !img.naturalWidth) return
    try {
      const c = document.createElement('canvas')
      c.width = img.naturalWidth
      c.height = img.naturalHeight
      const ctx = c.getContext('2d', { willReadFrequently: true })
      if (!ctx) return
      ctx.drawImage(img, 0, 0)
      const { data } = ctx.getImageData(0, 0, c.width, c.height)
      alphaRef.current = { data, w: c.width, h: c.height }
    } catch {
      alphaRef.current = null
    }
  }, [])

  const handleMove = useCallback(
    (e: React.PointerEvent<HTMLImageElement>) => {
      const img = imgRef.current
      if (!img) return
      if (!alphaRef.current) buildAlpha()
      const a = alphaRef.current
      if (!a) return
      const r = img.getBoundingClientRect()
      const x = Math.floor(((e.clientX - r.left) / r.width) * a.w)
      const y = Math.floor(((e.clientY - r.top) / r.height) * a.h)
      if (x < 0 || y < 0 || x >= a.w || y >= a.h) {
        setOverShape(false)
        return
      }
      const alpha = a.data[(y * a.w + x) * 4 + 3]
      setOverShape(alpha > 24)
    },
    [buildAlpha],
  )

  return (
    <>
      <div className="about-main cpa">
        {/* background ribbon marquee — sits BEHIND the map (CSS z-index) */}
        <div className="row" aria-hidden="true">
          <div className="autoplay-slider"><MarqueeGroup /></div>
          <div className="autoplay-slider"><MarqueeGroup /></div>
        </div>

        {/* manual carousel arrows — the SHARED ArrowButton (same as the other
            sections), pinned to the page's left/right sides via .cpa-arrow */}
        <ArrowButton
          dir="prev"
          className="cpa-arrow cpa-arrow--prev"
          onClick={() => go(-1)}
          label="上一個城市"
        />
        <ArrowButton
          dir="next"
          className="cpa-arrow cpa-arrow--next"
          onClick={() => go(1)}
          label="下一個城市"
        />

        <div className={`map cpa-map${overShape ? ' is-over' : ''}`}>
          {/* ONE persistent <img> reused across cities — we swap `src`, not the
              element. The old map stays painted until the new src is ready, so
              switching never blanks (preloaded on mount). `cpaFade` plays once
              on initial mount. Hover (brighten + scale) only fires over the
              actual shape — see handleMove. */}
          <img
            ref={imgRef}
            className="cpa-map__img"
            src={city.map}
            width={500}
            height={500}
            alt={`${city.name}地圖`}
            draggable={false}
            onLoad={buildAlpha}
            onPointerMove={handleMove}
            onPointerLeave={() => setOverShape(false)}
            onPointerDown={onDown}
            onPointerUp={onUp}
            onPointerCancel={onCancel}
          />
          {/* pagination dots — position indicator + swipe affordance */}
          <div className="cpa-dots" role="group" aria-label="切換城市">
            {cities.map((c, i) => (
              <button
                key={c.map}
                type="button"
                className={`cpa-dot${i === index ? ' is-active' : ''}`}
                onClick={() => select(i)}
                aria-label={c.name}
                aria-current={i === index}
              />
            ))}
          </div>
        </div>

        <div className="about-detail">
          <p className="detail-catch cpa-coin">{city.name}幣</p>
          <p className="detail-txt">{city.desc}</p>
        </div>

        {/* per-city slogan — two vertical lines on the right (col 3): a big lead
            + a smaller sub for hierarchy */}
        <p className="catch cpa-slogan">
          <span className="cpa-slogan__lead">{city.slogan.lead}</span>
          <span className="cpa-slogan__sub">{city.slogan.sub}</span>
        </p>
      </div>

      {/* CTA — long black capsule, centred at the bottom; label AND target
          follow the selected city (each region links to its case study) */}
      <div className="cpa-cta-wrap">
        <Link className="cpa-cta" href={city.href}>進入{city.name}幣</Link>
      </div>
    </>
  )
}
