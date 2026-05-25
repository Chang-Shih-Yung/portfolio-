import Hero from '@/components/Hero'
import CasesGrid from '@/components/CasesGrid'
import { getAllCases } from '@/lib/cases'

export default function HomePage() {
  const cases = getAllCases()

  return (
    <div className="container">
      <Hero />
      <CasesGrid cases={cases} />
    </div>
  )
}
