import SectionTitle from '@/components/cover/sections/ui/SectionTitle'
import CityPointApp from '@/components/cover/sections/ui/CityPointApp'

/**
 * AboutSection — repurposed from "ABOUT KOYAMA" (tm9_pt9) into the CITY POINT APP
 * showcase: a manual map carousel of cities, with the headline / CTA following
 * the selected city. The interactive carousel + state lives in <CityPointApp/>;
 * this shell keeps the section chrome (title, background clouds/waves).
 */
export default function AboutSection() {
  return (
    <section className="tm9_pt9 parts-section page-max-width">
      <div className="about">
        <div className="about-inner">
          <SectionTitle ja="城市幣點數平台" en="CITY POINT APP" />
          <CityPointApp />
        </div>
      </div>
    </section>
  )
}
