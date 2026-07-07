/**
 * CoverFooter — clone of koyama-sendai.org footer (tm11_pt11).
 * Structure/classes ported 1:1 (styled by app/cover-clone.css; the bottom
 * `.illust` band is a CSS background). The old partner-banner placeholders
 * are replaced by the WORKSTYLE intro, restyled for the teal footer ground.
 */
const bottomNav = [
  { label: '聯絡我', href: '#' },
  { label: '專案地圖', href: '/work' },
]

export default function CoverFooter() {
  return (
    <section className="tm11_pt11 parts-section page-max-width">
      <footer className="footer">
        <div className="footer-wrap">
          <div className="footer-inner">
            {/* WORKSTYLE — moved from its own sky-band section into the footer */}
            <div className="footer-workstyle">
              <p className="fw-chip"><span>關於工作</span></p>
              <h2 className="fw-title">WORKSTYLE</h2>
              <p className="fw-txt">
                行銷把人帶進來，體驗把人留下來——4 場政府大型活動、5 座城市數位平台，
                從聲量、轉換到留存都是我的工作範圍。點進來看九個專案的完整過程。
              </p>
              <a className="fw-btn" href="/work">
                了解更多 <span aria-hidden="true">→</span>
              </a>
            </div>
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
                {bottomNav.map((n) => (
                  <li className="footer-bottom-nav-item" key={n.label}>
                    <a href={n.href}><span>{n.label}</span></a>
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
