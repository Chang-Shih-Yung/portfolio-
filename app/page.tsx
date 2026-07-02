import CoverNav from '@/components/cover/CoverNav'
import CoverHero from '@/components/cover/CoverHero'
import LifestyleSection from '@/components/cover/sections/LifestyleSection'
import WorkstyleSection from '@/components/cover/sections/WorkstyleSection'
import ConciergeSection from '@/components/cover/sections/ConciergeSection'
import AboutSection from '@/components/cover/sections/AboutSection'
import CoverFooter from '@/components/cover/sections/CoverFooter'

/**
 * HomePage — the portfolio COVER hero followed by a clone of the
 * koyama-sendai.org homepage sections (LIFESTYLE → FOOTER). The hero owns its
 * own nav + warm palette; the sections below live inside the `.kyc` namespace
 * and are styled entirely by app/cover-clone.css (ported 1:1 from the reference).
 *
 * Content is Traditional-Chinese placeholder + reference image placeholders
 * (under /public/cover/ref) — swap section copy and images with your own later.
 * The global <SiteNav/> + <SiteFooter/> (app/layout.tsx) hide themselves on "/".
 */
export default function HomePage() {
  return (
    <>
      {/* fixed header — rendered at the page root (NOT inside the isolated
          .cv-hero) so its z-index wins over every scrolling section below */}
      <CoverNav />
      <CoverHero />
      <div className="kyc">
        <LifestyleSection />
        <WorkstyleSection />
        <ConciergeSection />
        <AboutSection />
        <CoverFooter />
      </div>
    </>
  )
}
