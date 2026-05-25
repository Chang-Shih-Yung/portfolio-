import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import CaseStudyLayout from '@/components/CaseStudyLayout'
import { getCase, getAllCases } from '@/lib/cases'

export function generateStaticParams() {
  return getAllCases().map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const c = getCase(slug)
  if (!c) return {}
  return {
    title: `${c.title} — Henry Chen`,
    description: c.subtitle,
  }
}

export default async function CasePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const c = getCase(slug)
  if (!c) notFound()

  const { Content, ...meta } = c

  return (
    <CaseStudyLayout meta={meta}>
      <Content />
    </CaseStudyLayout>
  )
}
