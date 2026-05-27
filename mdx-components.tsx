import type { MDXComponents } from 'mdx/types'
import FigmaEmbed from '@/components/FigmaEmbed'
import FlowsShowcase from '@/components/FlowsShowcase'
import SystemMap from '@/components/SystemMap'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    FigmaEmbed,
    FlowsShowcase,
    SystemMap,
  }
}
