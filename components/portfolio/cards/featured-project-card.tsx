import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Code2, Eye } from "lucide-react";
import { useRef, useState } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import { MagneticActionButton } from "../primitives/magnetic-action-button";
import { portfolioEntranceEase, portfolioRevealViewport } from "../portfolio-motion";
import type { FeaturedProject } from "../portfolio-types";

type FeaturedProjectCardProps = {
  featuredProject: FeaturedProject;
  cardIndex: number;
};

type ProjectPreviewArtworkProps = Pick<
  FeaturedProject,
  "accentColor" | "previewVariant"
>;

function ProjectPreviewArtwork({
  accentColor,
  previewVariant,
}: ProjectPreviewArtworkProps) {
  if (previewVariant === "orbit") {
    return (
      <>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="h-40 w-40 rounded-full border-4 border-black"
          style={{ borderColor: accentColor }}
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 m-auto h-32 w-32 rounded-full border-4 border-white"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-heading text-4xl text-white">3D</span>
        </div>
      </>
    );
  }

  if (previewVariant === "grid") {
    return (
      <div className="grid grid-cols-3 gap-2">
        {Array.from({ length: 9 }).map((_, gridBlockIndex) => (
          <motion.div
            key={gridBlockIndex}
            animate={{
              scale: [1, 1.2, 1],
              backgroundColor: [accentColor, "#fff", accentColor],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: gridBlockIndex * 0.1,
            }}
            className="h-8 w-8 border-2 border-black"
          />
        ))}
      </div>
    );
  }

  return (
    <>
      <motion.div
        animate={{ height: [40, 80, 40] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="mx-1 inline-block w-4 border-2 border-black bg-white"
      />
      <motion.div
        animate={{ height: [60, 30, 60] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="mx-1 inline-block w-4 border-2 border-black bg-white"
      />
      <motion.div
        animate={{ height: [30, 70, 30] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        className="mx-1 inline-block w-4 border-2 border-black bg-white"
      />
      <motion.div
        animate={{ height: [50, 40, 50] }}
        transition={{ duration: 1.8, repeat: Infinity }}
        className="mx-1 inline-block w-4 border-2 border-black bg-white"
      />
    </>
  );
}

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
          className="relative overflow-hidden border-4 border-black bg-white"
        >
          <div
            className="relative h-64 overflow-hidden md:h-80"
            style={{ backgroundColor: featuredProject.backgroundColor }}
          >
            <motion.div
              animate={{ scale: isCardHovered ? 1.1 : 1 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="relative">
                <ProjectPreviewArtwork
                  previewVariant={featuredProject.previewVariant}
                  accentColor={featuredProject.accentColor}
                />
              </div>
            </motion.div>

            <motion.div
              animate={{ opacity: isCardHovered ? 0.9 : 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex items-center justify-center bg-black"
            >
              <div className="flex gap-4">
                <MagneticActionButton
                  type="button"
                  className="border-4 border-white bg-white px-6 py-3 font-accent font-bold text-black transition-colors hover:bg-electric-yellow"
                >
                  <span className="flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    VIEW
                  </span>
                </MagneticActionButton>
                <MagneticActionButton
                  type="button"
                  className="border-4 border-white bg-transparent px-6 py-3 font-accent font-bold text-white transition-colors hover:bg-white hover:text-black"
                >
                  <span className="flex items-center gap-2">
                    <Code2 className="h-5 w-5" />
                    CODE
                  </span>
                </MagneticActionButton>
              </div>
            </motion.div>
          </div>

          <div className="p-6">
            <h3 className="mb-2 font-heading text-2xl text-ink-black md:text-3xl">
              {featuredProject.title}
            </h3>
            <p className="mb-4 font-body text-sm leading-relaxed text-light-gray">
              {featuredProject.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {featuredProject.technologies.map((technologyLabel) => (
                <span
                  key={technologyLabel}
                  className="border-2 border-black px-3 py-1 font-accent text-xs tracking-wider"
                  style={{
                    backgroundColor: `${featuredProject.accentColor}20`,
                  }}
                >
                  {technologyLabel}
                </span>
              ))}
            </div>
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
