'use client'

import { useState } from 'react'

/**
 * CityPointApp — the interactive heart of the "CITY POINT APP" section.
 *
 * A MANUAL map carousel: click the left/right black-circle arrows (placed at the
 * page sides) to switch city — no autoplay. Hovering a map brightens + scales it
 * a touch. The "{city}幣" headline, the supporting copy and the "進入{city}幣"
 * CTA all follow the selected city.
 *
 * Fully data-driven: add a city by dropping a 500×500 map in /public/cities and
 * appending one entry to `cities`. Copy is Traditional-Chinese placeholder.
 */
export interface City {
  /** display name, e.g. 台中 — the coin/CTA becomes `{name}幣` */
  name: string
  /** map asset under /public/cities */
  map: string
}

const cities: City[] = [
  { name: '台中', map: '/cities/taichung.png' },
  { name: '苗栗', map: '/cities/miaoli.png' },
  { name: '南投', map: '/cities/nantou.png' },
  { name: '雲林', map: '/cities/yunlin.png' },
  { name: '台東', map: '/cities/taitung.png' },
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
  const city = cities[index]
  const go = (delta: number) =>
    setIndex((p) => (p + delta + cities.length) % cities.length)

  return (
    <>
    <div className="about-main cpa">
      {/* background ribbon marquee — sits BEHIND the map (CSS z-index) */}
      <div className="row" aria-hidden="true">
        <div className="autoplay-slider"><MarqueeGroup /></div>
        <div className="autoplay-slider"><MarqueeGroup /></div>
      </div>

      {/* manual carousel arrows — pinned to the page's left/right sides */}
      <button
        type="button"
        className="cpa-arrow cpa-arrow--prev"
        onClick={() => go(-1)}
        aria-label="上一個城市"
      >
        <span className="btn-icon" aria-hidden="true" />
      </button>
      <button
        type="button"
        className="cpa-arrow cpa-arrow--next"
        onClick={() => go(1)}
        aria-label="下一個城市"
      >
        <span className="btn-icon" aria-hidden="true" />
      </button>

      <div className="map cpa-map">
        {/* key → re-mounts on change so each map fades in; hover = brighten+scale */}
        <img
          key={city.map}
          className="cpa-map__img"
          src={city.map}
          width={500}
          height={500}
          alt={`${city.name}地圖`}
          draggable={false}
        />
      </div>

      <div className="about-detail">
        <p className="detail-catch cpa-coin">{city.name}幣</p>
        <p className="detail-txt">
          點擊左右箭頭切換城市，探索各地的在地點數方案。這裡先放一段{city.name}
          幣的簡介，之後可依城市替換成實際內容。
        </p>
      </div>
    </div>

    {/* CTA — long black capsule, centred at the bottom (original related-links
        position); label follows the selected city */}
    <div className="cpa-cta-wrap">
      <a className="cpa-cta" href="#">進入{city.name}幣</a>
    </div>
    </>
  )
}
