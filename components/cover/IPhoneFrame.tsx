'use client'

import type { ReactNode, JSX } from 'react'

/**
 * IPhoneFrame — hero capsule slot. The screenshots now ship as SELF-CONTAINED
 * capsule PNGs (the stadium outline + rounded shape + transparent corners are
 * baked into the artwork), so this frame carries NO chrome of its own — no
 * border, no background, no radius. It just sizes the slot (via --cv-phone-w/h)
 * and shows the image whole (object-fit:contain, ratio matches so it fills).
 * A labelled placeholder is kept only as a no-image fallback.
 */
export interface IPhoneFrameProps {
  /** Project label shown in the placeholder screen (default "PROJECT"). */
  label?: string
  /** Optional content (e.g. a screenshot <img>) to render inside the capsule. */
  children?: ReactNode
  /** Extra class names merged onto the capsule. */
  className?: string
}

export default function IPhoneFrame({
  label = 'PROJECT',
  children,
  className,
}: IPhoneFrameProps): JSX.Element {
  return (
    <div className={`capsule${className ? ` ${className}` : ''}`}>
      <div className="screen" data-slot="screen">
        {children ?? (
          <div className="placeholder">
            <span className="placeholder-label">{label}</span>
          </div>
        )}
      </div>

      <style jsx>{`
        /* chrome-free: the PNG is the whole capsule (outline + shape baked in) */
        .capsule {
          flex: 0 0 auto;
          width: var(--cv-phone-w);
          height: var(--cv-phone-h);
        }
        .screen {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        /* the self-contained capsule image shows whole; ratio matches the slot */
        .screen :global(img),
        .screen :global(video) {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        /* fallback only (no image supplied) — a light stadium placeholder */
        .placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 var(--space-md, 24px);
          text-align: center;
          border: 2px solid var(--cv-phone-edge);
          border-radius: var(--cv-r-pill);
          background: linear-gradient(
            180deg,
            var(--cv-phone-screen) 0%,
            var(--cv-phone-screen-2) 100%
          );
        }
        .placeholder-label {
          font-family: var(--cv-font-mono);
          font-size: 12px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--cv-ink-soft);
        }
      `}</style>
    </div>
  )
}
