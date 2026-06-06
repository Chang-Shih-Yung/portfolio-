import SectionTitle from '@/components/cover/sections/ui/SectionTitle'
import Btn from '@/components/cover/sections/ui/Btn'
import Carousel from '@/components/cover/sections/ui/Carousel'

/**
 * LifestyleSection — clone of koyama-sendai.org "LIFESTYLE" (tm5_pt5).
 * The reference slick carousel is reimplemented as a CSS scroll-snap row
 * (styled by app/cover-clone.css). Title/buttons from shared UI components; the
 * slides are data-driven. Body is Chinese placeholder; images are placeholders.
 */
const ref = (h: string) => `/cover/ref/${h}`

export interface LifestyleSlide {
  loc: string
  name: string
  year: string
  img: string
}

const slides: LifestyleSlide[] = [
  { loc: '範例地點 / 場域一', name: '人物或專案 A', year: '2022 加入 · 角色', img: ref('0ad51c02a69ef82500a0c22bdd90358e.png') },
  { loc: '範例地點 / 場域二', name: '人物或專案 B', year: '2022 加入 · 角色', img: ref('e3687aff8a7e59fe680ea8b37a251f92.png') },
  { loc: '範例地點 / 場域三', name: '人物或專案 C', year: '2024 加入 · 角色', img: ref('3e69fbf4def6fd78b0f9b9d95d21bfa9.jpg') },
  { loc: '範例地點 / 場域四', name: '人物或專案 D', year: '2018 加入 · 角色', img: ref('2202ba5d22debd685c0d7098a307f5bc.png') },
  { loc: '範例地點 / 場域五', name: '人物或專案 E', year: '2023 加入 · 角色', img: ref('9a3641563de38ba3df861a97a80a039c.png') },
  { loc: '範例地點 / 場域六', name: '人物或專案 F', year: '2021 加入 · 角色', img: ref('a5fc39659117db0ff2db5717ed36c2bc.png') },
  { loc: '範例地點 / 場域七', name: '人物或專案 G', year: '2014 加入 · 角色', img: ref('ae086a2a0283e279cbc6e44732a6f68a.png') },
]

function LifestyleCard({ slide }: { slide: LifestyleSlide }) {
  return (
    <div className="lifestyle-slide-item">
      <a href="#">
        <div className="index-img">
          <img src={slide.img} width={530} height={310} alt="" />
        </div>
        <div className="index-detail">
          <div className="index-detail-box">
            <p className="index-detail-location">{slide.loc}</p>
            <p className="index-detail-name">{slide.name}</p>
            <p className="index-detail-year">{slide.year}</p>
            <div className="index-btn">查看詳情</div>
          </div>
        </div>
      </a>
    </div>
  )
}

export default function LifestyleSection() {
  return (
    <section className="tm5_pt5 parts-section page-max-width">
      <div className="lifestyle">
        <div className="lifestyle-head">
          <div className="lifestyle-head-inner">
            <SectionTitle ja="日常一隅" en="LIFESTYLE" enSub="IN SENDAI" />
            <Btn label="查看全部" className="pc-only" />
          </div>
        </div>
        <Carousel className="lifestyle-slide" desktopArrows>
          {slides.map((slide, i) => (
            <LifestyleCard key={i} slide={slide} />
          ))}
        </Carousel>
        <Btn label="查看全部" className="sp-only" />
      </div>
    </section>
  )
}
