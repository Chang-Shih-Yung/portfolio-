'use client'

import type { ReactNode, JSX } from 'react'

/**
 * IPhoneFrame — a CAPSULE phone mockup, a faithful clone of the reference site
 * (koyama-sendai.org) "kv-img": a tall STADIUM shape (border-radius:9999px) with
 * a 2px near-black outline, holding a vertical app screenshot clipped to the
 * capsule. Deliberately NOT a photoreal device — no notch / home indicator.
 *
 * Every value (size / border / radius / screen tint) references a --cv-* token
 * in app/globals.css. Drop an <img> as `children` to fill the screen exactly
 * (object-fit:cover); otherwise a labelled placeholder screen is shown.
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
        .capsule {
          flex: 0 0 auto;
          width: var(--cv-phone-w);
          height: var(--cv-phone-h);
          border: 2px solid var(--cv-phone-edge);
          border-radius: var(--cv-r-pill);
          overflow: hidden;
          background: var(--cv-phone-screen);
        }
        .screen {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: inherit;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(
            180deg,
            var(--cv-phone-screen) 0%,
            var(--cv-phone-screen-2) 100%
          );
        }
        /* an image/video dropped as children fills the capsule exactly */
        .screen :global(img),
        .screen :global(video) {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .placeholder {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 var(--space-md, 24px);
          text-align: center;
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
