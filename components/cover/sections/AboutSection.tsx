import SectionTitle from '@/components/cover/sections/ui/SectionTitle'
import Btn from '@/components/cover/sections/ui/Btn'

/**
 * AboutSection — clone of koyama-sendai.org "ABOUT KOYAMA" (tm9_pt9). The bottom
 * band is a horizontal TEXT MARQUEE of Traditional-Chinese, portfolio-relevant
 * phrases (replacing the reference's Japanese image strip): two identical
 * .autoplay-slider tracks sit side by side and each animates translateX(-100%)
 * via the ported `sliderAnimation` keyframe, so the loop is seamless (pure CSS).
 * Title/button from shared UI components; body is Chinese placeholder.
 */
const mapImg = '/cover/ref/5ac03b6996f8ebf69caf7268be550c4d.png'

/* big background phrases that slide across the bottom of the section */
const marqueePhrases = [
  '系統化思考',
  '把複雜，設計得簡單',
  'UX × PRODUCT',
  '以使用者為中心',
  '從研究到落地',
  '能撐住的設計系統',
  '介面 · 流程 · 體驗',
  'DESIGN THAT SCALES',
]

/* one full copy of the phrase list — duplicated across the two sliders so the
   translateX(-100%) loop reads as a continuous ribbon with no seam. */
function MarqueeGroup() {
  return (
    <div className="bg-item">
      {marqueePhrases.map((phrase, i) => (
        <span className="mq-cell" key={i}>
          <span className="mq-word">{phrase}</span>
          <span className="mq-dot" aria-hidden="true">·</span>
        </span>
      ))}
    </div>
  )
}

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
        <div className="row" aria-hidden="true">
          <div className="autoplay-slider"><MarqueeGroup /></div>
          <div className="autoplay-slider"><MarqueeGroup /></div>
        </div>
      </div>
    </section>
  )
}
