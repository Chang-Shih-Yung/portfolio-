import IndexLink from '@/components/cover/sections/ui/IndexLink'

/**
 * CorpSection — clone of koyama-sendai.org "法人一覧" corporate list (tm10_pt10).
 * Uses its own `.ttl` heading (not the shared ttl-box) like the reference; the
 * "more" link comes from the shared IndexLink. List is data-driven; body is
 * Chinese placeholder; logos are reference placeholders.
 */
export interface CorpItem {
  name: string
  desc: string
  img: string
  href: string
}

const items: CorpItem[] = [
  { name: '相關連結一', desc: '一句話說明這個連結／合作對象是什麼，以及為什麼值得點進去看。之後換成你的內容。', img: '/cover/ref/d9dd78cb1ae9b9881f05ddb68661b3f3.png', href: '#' },
  { name: '相關連結二', desc: '一句話說明這個連結／合作對象是什麼，以及為什麼值得點進去看。之後換成你的內容。', img: '/cover/ref/66ee58b6068aebedf461845e27c42b55.png', href: '#' },
  { name: '相關連結三', desc: '一句話說明這個連結／合作對象是什麼，以及為什麼值得點進去看。之後換成你的內容。', img: '/cover/ref/4f6a7d1bcb7c6d27904f7f9b564cc601.png', href: '#' },
  { name: '相關連結四', desc: '一句話說明這個連結／合作對象是什麼，以及為什麼值得點進去看。之後換成你的內容。', img: '/cover/ref/329f0ec2ef6fb49743e46ecfe9dff77d.png', href: '#' },
]

function CorpCard({ item }: { item: CorpItem }) {
  return (
    <article className="corp-info-item">
      <a href={item.href} target="_blank" rel="noreferrer">
        <div className="index-detail">
          <h3 className="index-ttl">{item.name}</h3>
          <p className="index-txt">{item.desc}</p>
          <IndexLink />
        </div>
        <div className="index-img">
          <img src={item.img} width={200} height={200} alt="" />
        </div>
      </a>
    </article>
  )
}

export default function CorpSection() {
  return (
    <section className="tm10_pt10 parts-section page-max-width">
      <div className="corp-info">
        <div className="corp-info-inner">
          <h3 className="ttl">相關連結</h3>
          <div className="corp-info-li">
            {items.map((item, i) => (
              <CorpCard key={i} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
