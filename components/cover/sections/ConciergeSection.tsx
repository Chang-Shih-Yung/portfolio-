import SectionTitle from '@/components/cover/sections/ui/SectionTitle'
import IndexInfoCard from '@/components/cover/sections/ui/IndexInfoCard'

/**
 * ConciergeSection — clone of koyama-sendai.org "CONCIERGE" (tm8_pt8).
 * Title + card come from shared UI components; the list is data-driven.
 * Body is Chinese placeholder; images are reference placeholders.
 */
export interface ConciergeItem {
  title: string
  rows: string[]
  company: string
  img: string
  href: string
}

const items: ConciergeItem[] = [
  {
    title: '想了解我的設計流程',
    rows: ['使用者研究 / 訪談', '資訊架構 / 流程', '互動 / 原型', '設計系統 / 交付'],
    company: '看我怎麼從問題走到系統',
    img: '/cover/concierge/left.png',
    href: '/skills',
  },
  {
    title: '想直接看成果與案例',
    rows: ['4 場政府大型行銷活動', '5 座城市數位平台', '7 個縣市落地', '9 個完整案例'],
    company: '挑一個你有興趣的案例切入',
    img: '/cover/concierge/right.png',
    href: '/work',
  },
]

export default function ConciergeSection() {
  return (
    <section className="tm8_pt8 parts-section page-content-width">
      <div className="concierge">
        <SectionTitle ja="給你的指引" en="CONCIERGE" />
        <div className="concierge-li">
          {items.map((item, i) => (
            <article className="concierge-item" key={i}>
              <IndexInfoCard title={item.title} company={item.company} img={item.img} href={item.href}>
                <div className="index-txt">
                  {item.rows.map((row, j) => (
                    <div className="person-item" key={j}>
                      {row}
                    </div>
                  ))}
                </div>
              </IndexInfoCard>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
