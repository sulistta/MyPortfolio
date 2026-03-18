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

type FeaturedProjectCardProps = {
  featuredProject: PortfolioProject;
  cardIndex: number;
};

export function FeaturedProjectCard({
  featuredProject,
  cardIndex,
}: FeaturedProjectCardProps) {
  const projectCardReference = useRef<HTMLDivElement>(null);
  const [isCardHovered, setIsCardHovered] = useState(false);
  const pointerOffsetX = useMotionValue(0);
  const pointerOffsetY = useMotionValue(0);
  const tiltRotateX = useSpring(
    useTransform(pointerOffsetY, [-0.5, 0.5], [15, -15]),
    { damping: 20, stiffness: 300 },
  );
  const tiltRotateY = useSpring(
    useTransform(pointerOffsetX, [-0.5, 0.5], [-15, 15]),
    { damping: 20, stiffness: 300 },
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
    <motion.div
      initial={{ rotateY: 90, opacity: 0 }}
      whileInView={{ rotateY: 0, opacity: 1 }}
      viewport={portfolioRevealViewport}
      transition={{
        duration: 0.8,
        delay: cardIndex * 0.2,
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
        className="relative group"
      >
        <motion.div
          animate={{
            y: isCardHovered ? -12 : 0,
            boxShadow: isCardHovered
              ? `12px 12px 0px ${featuredProject.accentColor}`
              : "8px 8px 0px #000",
          }}
          transition={{ duration: 0.3 }}
          className="relative overflow-hidden border-4 border-black bg-off-white shadow-brutal"
        >
          <div
            className="relative h-64 overflow-hidden md:h-80"
            style={{ backgroundColor: featuredProject.backgroundColor }}
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(6,8,15,0.18) 0%, rgba(6,8,15,0.36) 100%)",
              }}
            />
            <motion.div
              animate={{ scale: isCardHovered ? 1.1 : 1 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="relative">
                <PortfolioProjectPreviewArtwork
                  previewVariant={featuredProject.previewVariant}
                  accentColor={featuredProject.accentColor}
                />
              </div>
            </motion.div>

            <motion.div
              animate={{ opacity: isCardHovered ? 0.9 : 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex items-center justify-center bg-[rgba(6,8,15,0.88)] backdrop-blur-sm"
            >
              <div className="flex flex-wrap justify-center gap-4 px-6">
                <ProjectActionLink
                  href={featuredProject.liveUrl}
                  label="VIEW"
                  icon={Eye}
                  surface="light"
                  variant="primary"
                />
                <ProjectActionLink
                  href={featuredProject.repoUrl}
                  label="CODE"
                  icon={Code2}
                  surface="light"
                  variant="secondary"
                />
                <ProjectActionLink
                  href={featuredProject.caseStudyUrl}
                  label="CASE"
                  icon={FileText}
                  surface="light"
                  variant="accent"
                />
              </div>
            </motion.div>
          </div>

          <div className="p-6">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span
                className={cn(
                  "border-2 border-black px-3 py-1 font-accent text-xs tracking-wider text-black",
                )}
                style={{ backgroundColor: `${featuredProject.accentColor}20` }}
              >
                {featuredProject.category}
              </span>
              <span className="font-accent text-xs tracking-wider text-dark-gray">
                {featuredProject.year}
              </span>
            </div>
            <h3 className="mb-2 font-heading text-2xl text-ink-black md:text-3xl">
              {featuredProject.title}
            </h3>
            <p className="mb-4 font-body text-sm leading-relaxed text-light-gray">
              {featuredProject.summary}
            </p>
            <div className="flex flex-wrap gap-2">
              {featuredProject.technologies.map((technologyLabel) => (
                <span
                  key={technologyLabel}
                  className="border-2 border-black px-3 py-1 font-accent text-xs tracking-wider text-black"
                  style={{
                    backgroundColor: `${featuredProject.accentColor}1f`,
                  }}
                >
                  {technologyLabel}
                </span>
              ))}
            </div>
            <p className="mt-4 font-body text-sm leading-relaxed text-dark-gray">
              {featuredProject.description}
            </p>
          </div>

          <div
            className="absolute right-0 top-0 h-0 w-0 border-l-[60px] border-t-[60px]"
            style={{
              borderTopColor: featuredProject.accentColor,
              borderLeftColor: "transparent",
            }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
