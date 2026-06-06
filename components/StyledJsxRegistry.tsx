'use client'

import React, { useState } from 'react'
import { useServerInsertedHTML } from 'next/navigation'
import { StyleRegistry, createStyleRegistry } from 'styled-jsx'

/**
 * StyledJsxRegistry — injects styled-jsx CSS into the SSR HTML so it is present
 * on the very first paint.
 *
 * Next.js App Router renders client-component styled-jsx styles on the CLIENT
 * during hydration by default, so the initial server HTML ships WITHOUT them →
 * a flash of unstyled content (FOUC). Collecting the styles via
 * useServerInsertedHTML and flushing them into the streamed <head> fixes it for
 * every styled-jsx component on the site (cover hero + all inner pages).
 *
 * Standard Next.js pattern:
 * https://nextjs.org/docs/app/building-your-application/styling/css-in-js#styled-jsx
 */
export default function StyledJsxRegistry({
  children,
}: {
  children: React.ReactNode
}) {
  const [jsxStyleRegistry] = useState(() => createStyleRegistry())

  useServerInsertedHTML(() => {
    const styles = jsxStyleRegistry.styles()
    jsxStyleRegistry.flush()
    return <>{styles}</>
  })

  return <StyleRegistry registry={jsxStyleRegistry}>{children}</StyleRegistry>
}
