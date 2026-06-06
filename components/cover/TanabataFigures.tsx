"use client";

/**
 * TanabataFigures — decorative SVG for the portfolio COVER hero.
 *
 * Three stylized Sendai-Tanabata "bead-figures" (round head + a column of
 * rounded beads) hanging from a thin curved branch with a single leaf.
 * Sits ABOVE the display heading in the left content column.
 *
 * Every fill / stroke references a --cv-* token (defined in app/globals.css
 * by the Foundation phase). The cover keeps its warm palette in both themes,
 * so these colors are NOT theme-aware.
 *
 * Public API:
 *   <TanabataFigures className?: string />
 *   - className: optional class merged onto the root <svg> (sizing/spacing
 *     comes from the integration wrapper).
 *   - svg is width:100% / height:auto so it scales with its container.
 */

interface TanabataFiguresProps {
  className?: string;
}

export default function TanabataFigures({ className }: TanabataFiguresProps) {
  return (
    <>
      <svg
        className={["cv-tanabata", className].filter(Boolean).join(" ")}
        viewBox="0 0 320 260"
        role="img"
        aria-label="Three Sendai-Tanabata streamer figures hanging from a leafy branch"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* ── Branch: thin arc sweeping in from the upper-left ── */}
        <path
          className="cv-branch-stroke"
          d="M8 30 C 70 8, 160 18, 300 40"
          fill="none"
          strokeWidth={5}
          strokeLinecap="round"
        />

        {/* ── Leaf near the branch origin ── */}
        <path
          className="cv-leaf-fill"
          d="M30 26 C 18 6, 48 2, 60 14 C 70 24, 52 42, 38 40 C 30 39, 26 34, 30 26 Z"
        />
        {/* leaf vein */}
        <path
          className="cv-branch-stroke"
          d="M34 36 C 42 28, 50 22, 58 16"
          fill="none"
          strokeWidth={2}
          strokeLinecap="round"
          opacity={0.55}
        />

        {/* ── Figure 1 — purple (hangs from branch ~x=78) ── */}
        <g className="cv-fig cv-fig--purple">
          <line className="cv-hang" x1="78" y1="34" x2="78" y2="64" strokeWidth={2} />
          <circle className="cv-fig-fill" cx="78" cy="78" r="15" />
          <rect className="cv-fig-fill" x="69" y="96" width="18" height="18" rx="6" />
          <rect className="cv-fig-fill" x="69" y="118" width="18" height="18" rx="6" />
          <rect className="cv-fig-fill" x="69" y="140" width="18" height="18" rx="6" />
          <rect className="cv-fig-fill" x="71" y="162" width="14" height="14" rx="5" />
        </g>

        {/* ── Figure 2 — red (hangs from branch ~x=160) ── */}
        <g className="cv-fig cv-fig--red">
          <line className="cv-hang" x1="160" y1="22" x2="160" y2="56" strokeWidth={2} />
          <circle className="cv-fig-fill" cx="160" cy="72" r="16" />
          <rect className="cv-fig-fill" x="150" y="92" width="20" height="20" rx="7" />
          <rect className="cv-fig-fill" x="150" y="116" width="20" height="20" rx="7" />
          <rect className="cv-fig-fill" x="150" y="140" width="20" height="20" rx="7" />
          <rect className="cv-fig-fill" x="152" y="164" width="16" height="16" rx="6" />
        </g>

        {/* ── Figure 3 — blue (hangs from branch ~x=242) ── */}
        <g className="cv-fig cv-fig--blue">
          <line className="cv-hang" x1="242" y1="30" x2="242" y2="60" strokeWidth={2} />
          <circle className="cv-fig-fill" cx="242" cy="74" r="14" />
          <rect className="cv-fig-fill" x="234" y="91" width="16" height="16" rx="6" />
          <rect className="cv-fig-fill" x="234" y="112" width="16" height="16" rx="6" />
          <rect className="cv-fig-fill" x="234" y="133" width="16" height="16" rx="6" />
          <rect className="cv-fig-fill" x="236" y="154" width="12" height="12" rx="4" />
        </g>
      </svg>

      <style jsx>{`
        .cv-tanabata {
          display: block;
          width: 100%;
          height: auto;
        }
        .cv-branch-stroke {
          stroke: var(--cv-branch);
        }
        .cv-leaf-fill {
          fill: var(--cv-leaf);
        }
        /* hanging threads tinted from the branch color */
        .cv-hang {
          stroke: var(--cv-branch);
        }
        .cv-fig--purple .cv-fig-fill {
          fill: var(--cv-fig-purple);
        }
        .cv-fig--red .cv-fig-fill {
          fill: var(--cv-fig-red);
        }
        .cv-fig--blue .cv-fig-fill {
          fill: var(--cv-fig-blue);
        }
      `}</style>
    </>
  );
}
