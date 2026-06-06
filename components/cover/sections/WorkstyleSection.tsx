import SectionTitle from '@/components/cover/sections/ui/SectionTitle'
import Btn from '@/components/cover/sections/ui/Btn'

/**
 * WorkstyleSection — clone of koyama-sendai.org "WORKSTYLE" (tm6_pt6).
 * Title/button from shared UI components. Body is Chinese placeholder.
 */
export default function WorkstyleSection() {
  return (
    <section className="tm6_pt6 parts-section page-max-width">
      <div className="workstyle">
        <div className="workstyle-box">
          <SectionTitle ja="關於工作" en="WORKSTYLE" enSub="IN SENDAI" />
          <p className="txt">
            這段是區塊的引言，用兩三句話帶出你的工作方式與專長。之後換成你自己的內容，
            篇幅維持差不多即可，版面會自動撐住。
          </p>
          <Btn label="了解更多" />
        </div>
      </div>
    </section>
  )
}
