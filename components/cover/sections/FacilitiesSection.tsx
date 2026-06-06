import SectionTitle from '@/components/cover/sections/ui/SectionTitle'
import Btn from '@/components/cover/sections/ui/Btn'
import IndexLink from '@/components/cover/sections/ui/IndexLink'
import Carousel from '@/components/cover/sections/ui/Carousel'

/**
 * FacilitiesSection — clone of koyama-sendai.org "FACILITIES" (tm7_pt7).
 * The reference slick carousel is reimplemented as a CSS scroll-snap row.
 * Title/buttons/link from shared UI components; the slides are data-driven.
 * Body is Chinese placeholder; images are reference placeholders.
 */
const ref = (h: string) => `/cover/ref/${h}`

export interface FacilityItem {
  name: string
  cats: string[]
  loc: string
  img: string
  href: string
}

const items: FacilityItem[] = [
  { name: '範例項目一', cats: ['分類 A', '分類 B'], loc: '#標籤', img: ref('adef1d60f58f986674e03f2e0387ef4a.jpg'), href: '#' },
  { name: '範例項目二', cats: ['分類 A'], loc: '#標籤', img: ref('a1b74f98c93bd81a75152f30a8728196.jpg'), href: '#' },
  { name: '範例項目三', cats: ['分類 A', '分類 B', '分類 C'], loc: '#標籤', img: ref('46a38c83dcef0dd58550681e9256e40d.jpg'), href: '#' },
  { name: '範例項目四', cats: ['分類 A', '分類 B'], loc: '#標籤', img: ref('b3e78fe35dcf97de8e51ee671afffdcb.jpg'), href: '#' },
  { name: '範例項目五', cats: ['分類 A', '分類 B'], loc: '#標籤', img: ref('1af3e7a4573c92dc1323f44b6cf6ccd4.jpg'), href: '#' },
  { name: '範例項目六', cats: ['分類 A', '分類 B'], loc: '#標籤', img: ref('a794631dac65719db75e162a951db549.jpg'), href: '#' },
]

function FacilityCard({ item }: { item: FacilityItem }) {
  return (
    <article className="facility-slide-item">
      <a href={item.href}>
        <div className="facility-slide-img">
          <img src={item.img} width={308} height={308} alt="" />
        </div>
        <h3 className="facility-name">{item.name}</h3>
        <div className="facility-cat">
          {item.cats.map((c, j) => (
            <span key={j}>{c}</span>
          ))}
        </div>
        <div className="facility-slide-bottom">
          <div className="location">{item.loc}</div>
          <IndexLink />
        </div>
      </a>
    </article>
  )
}

export default function FacilitiesSection() {
  return (
    <section className="tm7_pt7 parts-section page-max-width">
      <div className="facility">
        <div className="facility-head">
          <div className="facility-head-inner">
            <SectionTitle ja="作品一覽" en="FACILITIES" enSub="IN SENDAI" />
            <Btn label="查看全部" className="pc-only" />
          </div>
        </div>
        <Carousel className="facility-slide" desktopArrows={false}>
          {items.map((item, i) => (
            <FacilityCard key={i} item={item} />
          ))}
        </Carousel>
        <Btn label="查看全部" className="sp-only" />
      </div>
    </section>
  )
}
