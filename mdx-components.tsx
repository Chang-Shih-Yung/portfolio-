import type { MDXComponents } from 'mdx/types'
import FigmaEmbed from '@/components/FigmaEmbed'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    FigmaEmbed,
  }
}
