/**
 * Brand identity + primary navigation — single source of truth shared by the
 * cover header/footer (CoverNav / CoverFooter) and the inner-page header/footer
 * (SiteNav / SiteFooter), so the name, role tagline and link set never drift
 * between the two navs.
 */
export const BRAND = {
  name: 'Giselle Lai',
  role: 'APP UI/UX DESIGNER · UX + PRODUCT',
} as const

export interface NavLink {
  href: string
  label: string
}

/** Primary nav. `/#work` resolves to the homepage work section from any page. */
export const NAV_LINKS: NavLink[] = [
  { href: '/', label: '首頁' },
  { href: '/#work', label: '作品' },
  { href: '/about', label: '關於' },
  { href: '/skills', label: '技能' },
  { href: '/colophon', label: '設計系統' },
]
