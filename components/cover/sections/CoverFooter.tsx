/**
 * CoverFooter — clone of koyama-sendai.org footer (tm11_pt11).
 * Structure/classes ported 1:1 (styled by app/cover-clone.css; the bottom
 * `.illust` band is a CSS background). The old partner-banner placeholders
 * are replaced by the WORKSTYLE block, kept in its ORIGINAL tm6 styling
 * (ink type, cloud sheet, arrow button) minus the sky band + wave.
 */
import SectionTitle from '@/components/cover/sections/ui/SectionTitle'
import Btn from '@/components/cover/sections/ui/Btn'

export default function CoverFooter() {
  return (
    <section className="tm11_pt11 parts-section page-max-width">
      <footer className="footer">
        <div className="footer-wrap">
          <div className="footer-inner">
            {/* WORKSTYLE — moved from its own section, original tm6 styling */}
            <div className="footer-workstyle">
              <div className="workstyle-box">
                <SectionTitle ja="關於工作" en="WORKSTYLE" enSub="IN SENDAI" />
                <p className="txt">
                  行銷把人帶進來，體驗把人留下來——4 場政府大型活動、5 座城市數位平台，
                  從聲量、轉換到留存都是我的工作範圍。點進來看九個專案的完整過程。
                </p>
                <Btn label="了解更多" href="/work" />
              </div>
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
          </div>
          <div className="illust" />
        </div>
      </footer>
    </section>
  )
}
