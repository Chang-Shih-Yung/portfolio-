"use client";

/**
 * CityscapeIllustration — flat-vector band of a stylized Sendai cityscape.
 *
 * Used as the bottom layer of the cover (z-index var(--cv-z-city)). The
 * integration pins it to the bottom edge in FRONT of the carousel phones;
 * this component only renders the SVG, scaling to 100% width with auto height.
 *
 * Shapes, left → right (flat, simple, recognizable — not photoreal):
 *   - blue statue on a pedestal (var(--cv-statue)) at far left
 *   - yellow modern block building (var(--cv-bld-yellow)) with a window grid
 *   - two red brick buildings (var(--cv-bld-red)) with windows
 *   - blue traditional temple-roof building
 *       (roof var(--cv-bld-blue-deep), body var(--cv-bld-blue))
 *   - rounded green bushes/trees along the base
 *       (var(--cv-green) / var(--cv-green-deep))
 *
 * Every fill references a --cv-* token (inline SVG can read CSS vars in fill).
 * The cover keeps its warm palette regardless of [data-theme] — this component
 * is intentionally NOT theme-aware.
 */

export type CityscapeIllustrationProps = {
  className?: string;
};

export default function CityscapeIllustration({
  className,
}: CityscapeIllustrationProps) {
  return (
    <div className={`cs-band${className ? ` ${className}` : ""}`}>
      <svg
        className="cs-svg"
        viewBox="0 0 1440 240"
        preserveAspectRatio="xMidYMax meet"
        role="img"
        aria-label="台南／仙台風格的扁平城市天際線插畫"
      >
        {/* ───────── ground baseline ───────── */}
        <rect
          x="0"
          y="222"
          width="1440"
          height="18"
          fill="var(--cv-green-deep)"
        />

        {/* ───────── far-left: blue statue on pedestal ───────── */}
        {/* pedestal */}
        <rect
          x="44"
          y="176"
          width="64"
          height="46"
          fill="var(--cv-bld-blue-deep)"
        />
        <rect x="38" y="170" width="76" height="10" fill="var(--cv-statue)" />
        {/* statue figure: body, head, outstretched arm */}
        <path
          d="M70 170 L70 118 Q76 104 82 118 L82 170 Z"
          fill="var(--cv-statue)"
        />
        <circle cx="76" cy="100" r="11" fill="var(--cv-statue)" />
        <path
          d="M80 124 L104 110 L108 118 L84 134 Z"
          fill="var(--cv-statue)"
        />

        {/* ───────── yellow modern block building ───────── */}
        <rect
          x="150"
          y="96"
          width="190"
          height="126"
          fill="var(--cv-bld-yellow)"
        />
        {/* window grid (cut out of the bg via beige fill) */}
        <g fill="var(--cv-bg)">
          {[0, 1, 2, 3].map((col) =>
            [0, 1, 2, 3].map((row) => (
              <rect
                key={`yw-${col}-${row}`}
                x={168 + col * 42}
                y={116 + row * 26}
                width="24"
                height="14"
              />
            ))
          )}
        </g>

        {/* ───────── red brick building #1 ───────── */}
        <rect
          x="360"
          y="120"
          width="150"
          height="102"
          fill="var(--cv-bld-red)"
        />
        <g fill="var(--cv-bg)">
          {[0, 1, 2].map((col) =>
            [0, 1, 2].map((row) => (
              <rect
                key={`r1-${col}-${row}`}
                x={378 + col * 44}
                y={138 + row * 26}
                width="24"
                height="16"
              />
            ))
          )}
        </g>

        {/* ───────── red brick building #2 (taller, set back) ───────── */}
        <rect
          x="528"
          y="86"
          width="128"
          height="136"
          fill="var(--cv-bld-red)"
        />
        <g fill="var(--cv-bg)">
          {[0, 1, 2].map((col) =>
            [0, 1, 2, 3].map((row) => (
              <rect
                key={`r2-${col}-${row}`}
                x={544 + col * 38}
                y={104 + row * 28}
                width="22"
                height="16"
              />
            ))
          )}
        </g>

        {/* ───────── blue traditional temple-roof building ───────── */}
        {/* body */}
        <rect
          x="704"
          y="132"
          width="196"
          height="90"
          fill="var(--cv-bld-blue)"
        />
        {/* upper tier body */}
        <rect
          x="744"
          y="96"
          width="116"
          height="40"
          fill="var(--cv-bld-blue)"
        />
        {/* lower flared roof */}
        <path
          d="M684 134 Q802 108 920 134 L900 134 L704 134 Z"
          fill="var(--cv-bld-blue-deep)"
        />
        <path
          d="M684 134 L704 122 L900 122 L920 134 Q802 116 684 134 Z"
          fill="var(--cv-bld-blue-deep)"
        />
        {/* upper flared roof + ridge finial */}
        <path
          d="M724 98 Q802 78 880 98 L860 98 L744 98 Z"
          fill="var(--cv-bld-blue-deep)"
        />
        <rect x="798" y="66" width="8" height="16" fill="var(--cv-bld-blue-deep)" />
        {/* temple doorway + windows */}
        <rect x="788" y="180" width="28" height="42" fill="var(--cv-bld-blue-deep)" />
        <g fill="var(--cv-bg)">
          <rect x="724" y="152" width="26" height="18" />
          <rect x="854" y="152" width="26" height="18" />
          <rect x="780" y="106" width="44" height="18" />
        </g>

        {/* ───────── right-side filler buildings ───────── */}
        <rect
          x="924"
          y="110"
          width="120"
          height="112"
          fill="var(--cv-bld-yellow)"
        />
        <g fill="var(--cv-bg)">
          {[0, 1].map((col) =>
            [0, 1, 2].map((row) => (
              <rect
                key={`y2-${col}-${row}`}
                x={944 + col * 50}
                y={128 + row * 28}
                width="26"
                height="16"
              />
            ))
          )}
        </g>

        <rect
          x="1064"
          y="138"
          width="156"
          height="84"
          fill="var(--cv-bld-red)"
        />
        <g fill="var(--cv-bg)">
          {[0, 1, 2, 3].map((col) =>
            [0, 1].map((row) => (
              <rect
                key={`r3-${col}-${row}`}
                x={1082 + col * 36}
                y={154 + row * 28}
                width="22"
                height="16"
              />
            ))
          )}
        </g>

        <rect
          x="1238"
          y="118"
          width="120"
          height="104"
          fill="var(--cv-bld-blue)"
        />
        <g fill="var(--cv-bg)">
          {[0, 1].map((col) =>
            [0, 1, 2].map((row) => (
              <rect
                key={`b2-${col}-${row}`}
                x={1258 + col * 48}
                y={136 + row * 28}
                width="26"
                height="16"
              />
            ))
          )}
        </g>

        {/* ───────── rounded green bushes / trees along the base ───────── */}
        <g>
          {/* tree clusters (deeper green back layer) */}
          <circle cx="124" cy="206" r="30" fill="var(--cv-green-deep)" />
          <circle cx="700" cy="208" r="32" fill="var(--cv-green-deep)" />
          <circle cx="1052" cy="206" r="30" fill="var(--cv-green-deep)" />

          {/* front bush row (bright green) */}
          <circle cx="22" cy="224" r="26" fill="var(--cv-green)" />
          <circle cx="232" cy="222" r="24" fill="var(--cv-green)" />
          <circle cx="346" cy="226" r="22" fill="var(--cv-green)" />
          <circle cx="516" cy="224" r="26" fill="var(--cv-green)" />
          <circle cx="676" cy="226" r="24" fill="var(--cv-green)" />
          <circle cx="912" cy="224" r="26" fill="var(--cv-green)" />
          <circle cx="1060" cy="226" r="22" fill="var(--cv-green)" />
          <circle cx="1232" cy="224" r="26" fill="var(--cv-green)" />
          <circle cx="1416" cy="222" r="28" fill="var(--cv-green)" />
        </g>
      </svg>

      <style jsx>{`
        .cs-band {
          width: 100%;
          line-height: 0;
        }

        .cs-svg {
          display: block;
          width: 100%;
          height: auto;
        }
      `}</style>
    </div>
  );
}
