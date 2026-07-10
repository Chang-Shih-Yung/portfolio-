import SectionTitle from '@/components/cover/sections/ui/SectionTitle'
import Carousel from '@/components/cover/sections/ui/Carousel'
import RefImg from '@/components/cover/sections/ui/RefImg'
import { ProjectCard } from '@/components/ProjectCard'

/**
 * LifestyleSection — the homepage "Marketing Project / 行銷專案" carousel.
 * Built on the shared <Carousel> (infinite loop, arrows + swipe + dots). The
 * slides are data-driven; images are 1:1 event photos under
 * public/cover/marketing/.
 */
const img = (name: string) => `/cover/marketing/${name}`

export interface LifestyleSlide {
  loc: string
  name: string
  year: string
  img: string
  /** case-study inner page; falls back to '#' when the case isn't built yet */
  href?: string
}

const slides: LifestyleSlide[] = [
  { loc: '台東縣', name: '第四屆東岸舖食節（TTPush）', year: '2024', img: img('taitung-ttpush.png'), href: '/work/dongan-food-festival' },
  { loc: '花蓮縣', name: '「數位有購力．振興拚經濟」記者會', year: '2024', img: img('hualien-digital.png'), href: '/work/hualien-digital' },
  { loc: '雲林縣', name: '雲林「智慧雲林幣 2.0」記者會', year: '2024', img: img('yunlin-coin.png'), href: '/work/yunlin-coin' },
  { loc: '桃園市', name: '桃園火鍋嘉年華', year: '2023', img: img('taoyuan-hotpot.png'), href: '/work/taoyuan-hotpot' },
]

function LifestyleCard({ slide }: { slide: LifestyleSlide }) {
  return (
    <div className="lifestyle-slide-item">
      <ProjectCard
        href={slide.href ?? '#'}
        loc={slide.loc}
        name={slide.name}
        year={slide.year}
        cta="查看詳情"
        image={<RefImg src={slide.img} width={530} height={530} alt={slide.name} />}
      />
    </div>
  )
}

export default function LifestyleSection() {
  return (
    <section className="tm5_pt5 parts-section page-max-width">
      <div className="lifestyle">
        <div className="lifestyle-head">
          <div className="lifestyle-head-inner">
            <SectionTitle ja="行銷專案" en="Marketing Project" />
          </div>
        </div>
        <Carousel className="lifestyle-slide" desktopArrows>
          {slides.map((slide, i) => (
            <LifestyleCard key={i} slide={slide} />
          ))}
        </Carousel>
      </div>
    </section>
  )
}
