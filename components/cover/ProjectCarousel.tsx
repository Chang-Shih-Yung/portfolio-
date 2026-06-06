"use client";

import IPhoneFrame from "@/components/cover/IPhoneFrame";

/**
 * ProjectCarousel — infinite, seamless horizontal marquee of iPhone mockups.
 *
 * Lives on the cover inside .cv-hero__slide (z-index var(--cv-z-slide)). Renders
 * the project list TWICE back-to-back and animates the track translateX 0 → -50%
 * so the loop is seamless. All themable values reference --cv-* tokens.
 *
 * The cover keeps its warm palette regardless of [data-theme] — this component
 * is intentionally NOT theme-aware.
 */

type Project = {
  id: string;
  label: string;
};

const PROJECTS: Project[] = [
  { id: "p1", label: "PROJECT 01" },
  { id: "p2", label: "PROJECT 02" },
  { id: "p3", label: "PROJECT 03" },
  { id: "p4", label: "PROJECT 04" },
  { id: "p5", label: "PROJECT 05" },
  { id: "p6", label: "PROJECT 06" },
];

export type ProjectCarouselProps = {
  className?: string;
};

export default function ProjectCarousel({ className }: ProjectCarouselProps) {
  // Duplicate the list to create the seamless -50% loop.
  const loop = [...PROJECTS, ...PROJECTS];

  return (
    <div className={`pc-viewport${className ? ` ${className}` : ""}`}>
      <div className="pc-track" aria-hidden="true">
        {loop.map((project, i) => (
          <div className="pc-item" key={`${project.id}-${i}`}>
            <IPhoneFrame label={project.label} />
          </div>
        ))}
      </div>

      <style jsx>{`
        .pc-viewport {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
          display: flex;
          align-items: center;
        }

        .pc-track {
          display: flex;
          flex-wrap: nowrap;
          align-items: center;
          gap: var(--cv-phone-gap);
          width: max-content;
          will-change: transform;
          animation: pc-marquee var(--cv-marquee-dur) linear infinite;
        }

        /* The duplicated list means -50% lands exactly one set later → seamless. */
        @keyframes pc-marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        .pc-item {
          flex: 0 0 auto;
        }

        .pc-viewport:hover .pc-track {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .pc-track {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
