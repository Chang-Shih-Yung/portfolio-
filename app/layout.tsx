import type { Metadata } from 'next'
import { Geist_Mono, Noto_Sans_TC } from 'next/font/google'
import SiteNav from '@/components/SiteNav'
import SiteFooter from '@/components/SiteFooter'
import StyledJsxRegistry from '@/components/StyledJsxRegistry'
import './globals.css'
// koyama clone styles are global: the homepage sections use them, and the
// inner pages reuse the cover chrome (CoverFooter via SiteFooter). All rules
// are scoped under .kyc / .tmX / .cv-* so nothing leaks into inner styles.
import './cover-clone.css'

/* Wireframe pass: custom display/body fonts removed.
   Body text = neutral system sans (see --font-body override below + globals.css).
   Mono kept ONLY for meta/annotation labels (chips, captions, section-label). */
const geistMono = Geist_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
})

/* Cover hero display/body face — heavy CJK webfont.
   Exposes --font-noto-tc, consumed by --cv-font-display / --cv-font-body in
   globals.css so the cover heading renders Traditional Chinese at weight 900. */
const notoSansTC = Noto_Sans_TC({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  display: 'swap',
  variable: '--font-noto-tc',
})

export const metadata: Metadata = {
  title: 'Giselle Lai — APP UI/UX Designer',
  description: 'APP UI/UX Designer building UX systems for civic tech and B2B portals.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${geistMono.variable} ${notoSansTC.variable}`}
      style={{
        // Body text = the same CJK face as the homepage cover (Noto Sans TC).
        ['--font-body' as string]:
          'var(--font-noto-tc), "Noto Sans TC", "PingFang TC", "Microsoft JhengHei", sans-serif',
      }}
    >
      <body>
        <StyledJsxRegistry>
          <SiteNav />
          <main>{children}</main>
          <SiteFooter />
        </StyledJsxRegistry>
      </body>
    </html>
  )
}
