/**
 * Type declarations for `.mdx` imports.
 *
 * Each case study `.mdx` exports:
 *   - default: the rendered React component (MDX body)
 *   - named `meta`: structured frontmatter (CaseMeta-compatible)
 *
 * `lib/cases.ts` imports both — without this declaration, TypeScript
 * complains because `next-env.d.ts` does not export `meta` from the
 * generic `*.mdx` module.
 */
declare module '*.mdx' {
  import type { ComponentType } from 'react'

  export const meta: Record<string, unknown>

  const MDXContent: ComponentType
  export default MDXContent
}
