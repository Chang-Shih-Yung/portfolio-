import type { ComponentType } from 'react'
import NantouContent, { meta as nantouMeta } from '@/content/cases/nantou-points.mdx'
import DonganContent, { meta as donganMeta } from '@/content/cases/dongan-food-festival.mdx'
import HualienContent, { meta as hualienMeta } from '@/content/cases/hualien-digital.mdx'
import YunlinContent, { meta as yunlinMeta } from '@/content/cases/yunlin-coin.mdx'
import TaoyuanContent, { meta as taoyuanMeta } from '@/content/cases/taoyuan-hotpot.mdx'

export interface CaseSection {
  id: string
  label: string
  tag: string
}

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
  /** Hero cover image (public path), shown between hero meta and case body */
  cover?: string
  /** Hero eyebrow label; defaults from `featured` when omitted */
  eyebrow?: string
  /** Hero meta rows; overrides the default 角色/團隊/期程/階段 when present */
  metaItems?: { label: string; value: string }[]
  /** Side-nav sections; defaults to the 5-chapter template when omitted */
  sections?: CaseSection[]
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
    ...(nantouMeta as unknown as CaseMeta),
    Content: NantouContent,
  },
  {
    ...(donganMeta as unknown as CaseMeta),
    Content: DonganContent,
  },
  {
    ...(hualienMeta as unknown as CaseMeta),
    Content: HualienContent,
  },
  {
    ...(yunlinMeta as unknown as CaseMeta),
    Content: YunlinContent,
  },
  {
    ...(taoyuanMeta as unknown as CaseMeta),
    Content: TaoyuanContent,
  },
]

export function getAllCases(): CaseRecord[] {
  return [...cases].sort((a, b) => a.order - b.order)
}

export function getCase(slug: string): CaseRecord | undefined {
  return cases.find((c) => c.slug === slug)
}
