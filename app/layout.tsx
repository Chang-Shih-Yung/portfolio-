import type { Metadata } from 'next'
import { Geist_Mono, Noto_Sans_TC } from 'next/font/google'
import SiteNav from '@/components/SiteNav'
import SiteFooter from '@/components/SiteFooter'
import StyledJsxRegistry from '@/components/StyledJsxRegistry'
import './globals.css'

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

const themeInitScript = `
(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.setAttribute('data-theme','dark');}}catch(e){}})();
`

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
        // Body text resolves to the neutral system sans (wireframe).
        ['--font-body' as string]:
          '-apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif',
      }}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
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
