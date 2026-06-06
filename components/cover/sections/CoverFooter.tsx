/**
 * CoverFooter — clone of koyama-sendai.org footer (tm11_pt11).
 * Structure/classes ported 1:1 (styled by app/cover-clone.css; the bottom
 * `.illust` band is a CSS background). Body is Traditional-Chinese placeholder;
 * banner logos are reference placeholders under /cover/ref.
 */
import RefImg from '@/components/cover/sections/ui/RefImg'

const ref = (h: string) => `/cover/ref/${h}`
const banners = [
  { img: ref('4d383a409bee31551999db47e0e86add.png'), txt: '這裡放合作夥伴或外部連結的說明文字' },
  { img: ref('cdf22f24b0717ac803b17d92533db48f.png'), txt: '這裡放合作夥伴或外部連結的說明文字' },
  { img: ref('a16dd17761ca032af5eae762a754e596.png'), txt: '這裡放合作夥伴或外部連結的說明文字' },
  { img: ref('c90b8d74019b22ef48c190d4aac24f93.png'), txt: '這裡放合作夥伴或外部連結的說明文字' },
  { img: ref('3850638259baa13d1a3753d64ae06d24.png'), txt: '這裡放合作夥伴或外部連結的說明文字' },
]
const bottomNav = ['最新消息', '聯絡我', '隱私權政策', '網站地圖']

export default function CoverFooter() {
  return (
    <section className="tm11_pt11 parts-section page-max-width">
      <footer className="footer">
        <div className="footer-wrap">
          <div className="footer-inner">
            <ul className="footer-banner">
              {banners.map((b, i) => (
                <li className="footer-banner-item" key={i}>
                  <a href="#" target="_blank" rel="noreferrer">
                    <div className="footer-banner-img">
                      <RefImg src={b.img} width={245} height={90} alt="" />
                    </div>
                    <p className="footer-banner-txt">{b.txt}</p>
                  </a>
                </li>
              ))}
            </ul>
            <div className="footer-middle">
              <div className="footer-logo" />
              <ul className="footer-sns">
                {[0, 1, 2, 3].map((i) => (
                  <li className="footer-sns-item" key={i}>
                    <a href="#" target="_blank" rel="noreferrer" aria-label="社群連結" />
                  </li>
                ))}
              </ul>
            </div>
            <div className="footer-bottom">
              <ul className="footer-bottom-nav">
                {bottomNav.map((n, i) => (
                  <li className="footer-bottom-nav-item" key={i}>
                    <a href="#"><span>{n}</span></a>
                  </li>
                ))}
              </ul>
              <p className="copyright">
                <small>© 2026 Giselle Lai</small>
              </p>
            </div>
          </div>
          <div className="illust" />
        </div>
      </footer>
    </section>
  )
}
