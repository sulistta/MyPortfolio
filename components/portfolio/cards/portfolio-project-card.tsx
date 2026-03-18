import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Code2, Eye, FileText } from "lucide-react";
import { useRef, useState } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import { portfolioEntranceEase, portfolioRevealViewport } from "../portfolio-motion";
import {
  cn,
} from "../portfolio-styles";
import type { PortfolioProject } from "../portfolio-types";
import { ProjectActionLink } from "../primitives/project-action-link";
import { PortfolioProjectPreviewArtwork } from "../primitives/portfolio-project-preview-artwork";

type PortfolioProjectCardProps = {
  portfolioProject: PortfolioProject;
  cardIndex: number;
};

const availabilityLabels = {
  live: "LIVE BUILD",
  private: "PRIVATE BUILD",
  concept: "R&D CONCEPT",
} as const;

function getContrastingTextColor(backgroundColor: string) {
  const hexColor = backgroundColor.replace("#", "").trim();
  const normalizedHexColor =
    hexColor.length === 3
      ? hexColor
          .split("")
          .map((hexDigit) => `${hexDigit}${hexDigit}`)
          .join("")
      : hexColor;

  if (normalizedHexColor.length !== 6) {
    return "#05070c";
  }

  const red = Number.parseInt(normalizedHexColor.slice(0, 2), 16);
  const green = Number.parseInt(normalizedHexColor.slice(2, 4), 16);
  const blue = Number.parseInt(normalizedHexColor.slice(4, 6), 16);
  const luminance = (red * 299 + green * 587 + blue * 114) / 1000;

  return luminance >= 150 ? "#05070c" : "#f5f7fb";
}

export function PortfolioProjectCard({
  portfolioProject,
  cardIndex,
}: PortfolioProjectCardProps) {
  const projectCardReference = useRef<HTMLDivElement>(null);
  const [isCardHovered, setIsCardHovered] = useState(false);
  const pointerOffsetX = useMotionValue(0);
  const pointerOffsetY = useMotionValue(0);
  const tiltRotateX = useSpring(
    useTransform(pointerOffsetY, [-0.5, 0.5], [10, -10]),
    { damping: 18, stiffness: 220 },
  );
  const tiltRotateY = useSpring(
    useTransform(pointerOffsetX, [-0.5, 0.5], [-10, 10]),
    { damping: 18, stiffness: 220 },
  );

  const handleCardTilt = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (!projectCardReference.current) {
      return;
    }

    const cardBounds = projectCardReference.current.getBoundingClientRect();
    const cardCenterX = cardBounds.left + cardBounds.width / 2;
    const cardCenterY = cardBounds.top + cardBounds.height / 2;

    pointerOffsetX.set((event.clientX - cardCenterX) / cardBounds.width);
    pointerOffsetY.set((event.clientY - cardCenterY) / cardBounds.height);
  };

  return (
    <motion.article
      layout
      initial={{ y: 60, opacity: 0, rotate: cardIndex % 2 === 0 ? -2 : 2 }}
      whileInView={{ y: 0, opacity: 1, rotate: 0 }}
      exit={{ y: 30, opacity: 0 }}
      viewport={portfolioRevealViewport}
      transition={{
        duration: 0.7,
        delay: cardIndex * 0.06,
        ease: portfolioEntranceEase,
      }}
      style={{ perspective: 1000 }}
      className="relative"
    >
      <motion.div
        ref={projectCardReference}
        onMouseMove={handleCardTilt}
        onMouseEnter={() => setIsCardHovered(true)}
        onMouseLeave={() => {
          pointerOffsetX.set(0);
          pointerOffsetY.set(0);
          setIsCardHovered(false);
        }}
        style={{
          rotateX: tiltRotateX,
          rotateY: tiltRotateY,
          transformStyle: "preserve-3d",
        }}
      >
        <motion.div
          layout
          animate={{
            y: isCardHovered ? -10 : 0,
            boxShadow: isCardHovered
              ? `12px 12px 0px ${portfolioProject.accentColor}`
              : "8px 8px 0px #000",
          }}
          transition={{ duration: 0.25 }}
          className="relative overflow-hidden border-4 border-black bg-off-white shadow-brutal"
        >
          <div
            className="relative h-64 overflow-hidden md:h-80"
            style={{ backgroundColor: portfolioProject.backgroundColor }}
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(6,8,15,0.18) 0%, rgba(6,8,15,0.36) 100%)",
              }}
            />
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(245, 247, 251, 0.14) 1px, transparent 1px), linear-gradient(to bottom, rgba(245, 247, 251, 0.14) 1px, transparent 1px)",
                backgroundSize: "64px 64px",
              }}
            />

            <div className="absolute left-4 top-4 flex flex-wrap gap-2">
              <span
                className={cn(
                  "border-4 px-3 py-1 font-accent text-xs tracking-wider",
                  "border-white bg-[rgba(6,8,15,0.82)] text-white backdrop-blur-sm",
                )}
              >
                {portfolioProject.category}
              </span>
              <span
                className="border-4 border-white px-3 py-1 font-accent text-xs tracking-wider"
                style={{
                  backgroundColor: portfolioProject.accentColor,
                  color: getContrastingTextColor(portfolioProject.accentColor),
                }}
              >
                {availabilityLabels[portfolioProject.availability]}
              </span>
            </div>

            <div className="absolute right-4 top-4 border-4 border-white bg-[rgba(6,8,15,0.82)] px-3 py-1 font-accent text-xs tracking-wider text-white backdrop-blur-sm">
              {portfolioProject.year}
            </div>

            <motion.div
              animate={{ scale: isCardHovered ? 1.08 : 1 }}
              transition={{ duration: 0.35 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="relative">
                <PortfolioProjectPreviewArtwork
                  accentColor={portfolioProject.accentColor}
                  previewVariant={portfolioProject.previewVariant}
                />
              </div>
            </motion.div>
          </div>

          <div className="p-6">
            <h3 className="mb-2 font-heading text-3xl text-ink-black md:text-3xl">
              {portfolioProject.title}
            </h3>
            <p className="mb-4 font-body text-sm leading-relaxed text-light-gray">
              {portfolioProject.summary}
            </p>
            <p className="font-body text-sm leading-relaxed text-dark-gray">
              {portfolioProject.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {portfolioProject.technologies.map((technologyLabel) => (
                <span
                  key={technologyLabel}
                  className="border-2 border-black px-3 py-1 font-accent text-xs tracking-wider text-black"
                  style={{
                    backgroundColor: `${portfolioProject.accentColor}1f`,
                  }}
                >
                  {technologyLabel}
                </span>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <ProjectActionLink
                href={portfolioProject.liveUrl}
                label="VIEW"
                icon={Eye}
                surface="dark"
                variant="primary"
              />
              <ProjectActionLink
                href={portfolioProject.repoUrl}
                label="CODE"
                icon={Code2}
                surface="dark"
                variant="secondary"
              />
              <ProjectActionLink
                href={portfolioProject.caseStudyUrl}
                label="CASE STUDY"
                icon={FileText}
                surface="dark"
                variant="accent"
              />
            </div>
          </div>

          <div
            className="absolute right-0 top-0 h-0 w-0 border-l-[60px] border-t-[60px]"
            style={{
              borderTopColor: portfolioProject.accentColor,
              borderLeftColor: "transparent",
            }}
          />
        </motion.div>
      </motion.div>
    </motion.article>
  );
}
