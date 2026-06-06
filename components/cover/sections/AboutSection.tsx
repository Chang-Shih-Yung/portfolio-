import SectionTitle from '@/components/cover/sections/ui/SectionTitle'
import Btn from '@/components/cover/sections/ui/Btn'

/**
 * AboutSection — clone of koyama-sendai.org "ABOUT KOYAMA" (tm9_pt9), including
 * the bottom logo MARQUEE (two .autoplay-slider tracks animated by the ported
 * `sliderAnimation` keyframe — pure CSS). Title/button from shared UI components.
 * Body is Chinese placeholder; images are reference placeholders.
 */
const mapImg = '/cover/ref/5ac03b6996f8ebf69caf7268be550c4d.png'
const stripImg = '/cover/ref/fc8d8d3ea2b4faa6df5de8bd807f065f.png'

export default function AboutSection() {
  return (
    <section className="tm9_pt9 parts-section page-max-width">
      <div className="about">
        <div className="about-inner">
          <SectionTitle ja="關於我" en="ABOUT KOYAMA" />
          <div className="about-main">
            <p className="catch">
              <span>我相信</span>好設計是能落地的系統
            </p>
            <div className="map">
              <img src={mapImg} width={400} height={448} alt="" />
            </div>
            <div className="about-detail">
              <p className="detail-catch">這裡放一句你的定位主張，兩行以內最好</p>
              <p className="detail-txt">
                這段是補充說明，描述你的經歷脈絡與專長範圍。之後換成你自己的內容即可，版面會自動撐住。
              </p>
              <Btn label="更多關於我" />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="autoplay-slider">
            <div className="bg-item"><img src={stripImg} width={5335} height={276} alt="" /></div>
            <div className="bg-item"><img src={stripImg} width={5335} height={276} alt="" /></div>
          </div>
          <div className="autoplay-slider">
            <div className="bg-item"><img src={stripImg} width={5335} height={276} alt="" /></div>
            <div className="bg-item"><img src={stripImg} width={5335} height={276} alt="" /></div>
          </div>
        </div>
      </div>
    </section>
  )
}
