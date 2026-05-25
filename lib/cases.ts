import type { ComponentType } from 'react'
import NantouContent, { meta as nantouMeta } from '@/content/cases/nantou-points.mdx'

export interface CaseMeta {
  slug: string
  title: string
  subtitle: string
  featured: boolean
  order: number
  role: string
  team: string
  timeline: string
  stage: string
  domain: string
  year: number
  cardColor: 'mint' | 'peach' | 'butter' | 'lavender' | 'dark'
}

export interface CaseRecord extends CaseMeta {
  Content: ComponentType
}

// ────────────────────────────────────────
// 新增 case 的 SOP:
// 1. 在 content/cases/ 建 <slug>.mdx (export const meta + body)
// 2. 在這裡 import 它
// 3. 加進下面的 cases array
// 4. Done. 首頁 grid + dynamic route 自動處理
// ────────────────────────────────────────

const cases: CaseRecord[] = [
  {
    ...(nantouMeta as CaseMeta),
    Content: NantouContent,
  },
]

export function getAllCases(): CaseRecord[] {
  return [...cases].sort((a, b) => a.order - b.order)
}

export function getFeaturedCase(): CaseRecord | undefined {
  return cases.find((c) => c.featured)
}

export function getMoreCases(): CaseRecord[] {
  return cases
    .filter((c) => !c.featured)
    .sort((a, b) => a.order - b.order)
}

export function getCase(slug: string): CaseRecord | undefined {
  return cases.find((c) => c.slug === slug)
}
