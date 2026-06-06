import SectionTitle from '@/components/cover/sections/ui/SectionTitle'
import Btn from '@/components/cover/sections/ui/Btn'
import IndexInfoCard from '@/components/cover/sections/ui/IndexInfoCard'

/**
 * LiveSection — clone of koyama-sendai.org "LIVE" (tm4_pt4).
 * Title/button/card come from shared UI components; the list is data-driven.
 * Body is Chinese placeholder; images are reference placeholders.
 */
export interface LiveItem {
  name: string
  desc: string
  company: string
  img: string
  href: string
}

const items: LiveItem[] = [
  {
    name: '專案範例一',
    desc: '這裡是專案的一句話簡介，描述背景、角色與你解決的核心問題。之後換成你自己的內容。',
    company: '分類標籤 / 角色',
    img: '/cover/ref/7b66a4edbc6b9ec627bc617bb328220f.jpg',
    href: '#',
  },
  {
    name: '專案範例二',
    desc: '第二個專案的簡述，放上你想讓 HR 一眼看到的重點與成果。之後換成你自己的內容。',
    company: '分類標籤 / 角色',
    img: '/cover/ref/0a3997df5ecc165d12cc150d4aff151e.jpg',
    href: '#',
  },
]

export default function LiveSection() {
  return (
    <section className="tm4_pt4 parts-section page-content-width">
      <div className="live">
        <SectionTitle ja="關於居住" en="LIVE" enSub="IN SENDAI" />
        <div className="live-li">
          {items.map((item, i) => (
            <article className="live-item" key={i}>
              <IndexInfoCard title={item.name} company={item.company} img={item.img} href={item.href}>
                <p className="index-txt">{item.desc}</p>
              </IndexInfoCard>
            </article>
          ))}
        </div>
        <Btn label="查看更多" />
      </div>
    </section>
  )
}
