import SectionTitle from '@/components/cover/sections/ui/SectionTitle'
import Btn from '@/components/cover/sections/ui/Btn'

/**
 * NewsSection — clone of koyama-sendai.org "NEWS" (tm3_pt3).
 * Structure/classes ported 1:1 (styled by app/cover-clone.css). Title + button
 * come from shared UI components; the list is data-driven. Body is Chinese
 * placeholder; thumbnails are reference placeholders under /cover/ref.
 */
export interface NewsItem {
  title: string
  cat: string
  date: string
  img: string
  href: string
}

const items: NewsItem[] = [
  { title: '作品集網站正式改版上線', cat: '公告', date: '2026.05.26', img: '/cover/ref/ca7a89adcef403f22a6534e36bd36ada.jpg', href: '#' },
  { title: '新增南投數位點數平台案例', cat: '案例', date: '2026.04.28', img: '/cover/ref/7b071db3c3b072064d955ecaf2fd13ca.png', href: '#' },
  { title: '關於設計系統的一些工作筆記', cat: '筆記', date: '2026.03.11', img: '/cover/ref/b2703b912a140c84b054ed1bdb9545ca.png', href: '#' },
]

function NewsRow({ item }: { item: NewsItem }) {
  return (
    <article className="news-list-item">
      <a href={item.href}>
        <div className="news-detail">
          <h3 className="news-ttl">
            <span>{item.title}</span>
          </h3>
          <div className="news-type">
            <span className="news-cat">#{item.cat}</span>
            <time className="news-time">{item.date}</time>
          </div>
        </div>
        <div className="news-img">
          <img src={item.img} width={80} height={80} alt="" />
        </div>
      </a>
    </article>
  )
}

export default function NewsSection() {
  return (
    <section className="tm3_pt3 parts-section page-content-width">
      <div className="news">
        <SectionTitle ja="最新消息" en="NEWS" />
        <div className="news-list">
          {items.map((item, i) => (
            <NewsRow key={i} item={item} />
          ))}
        </div>
        <Btn label="查看所有消息" />
      </div>
    </section>
  )
}
