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
            行銷把人帶進來，體驗把人留下來——4 場政府大型活動、5 座城市數位平台，
            從聲量、轉換到留存都是我的工作範圍。點進來看九個專案的完整過程。
          </p>
          <Btn label="了解更多" href="/work" />
        </div>
      </div>
    </section>
  )
}
