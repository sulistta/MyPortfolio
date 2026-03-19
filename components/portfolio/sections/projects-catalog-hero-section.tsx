import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { stickerAssetPaths } from "@/public/stickers";
import {
  featuredProjects,
  portfolioProjects,
  projectFilterOptions,
  projectsPageHeroContent,
} from "../portfolio-content";
import { portfolioEntranceEase } from "../portfolio-motion";
import {
  PORTFOLIO_GRID_PATTERN_DARK_STYLE,
  PORTFOLIO_SECTION_SCROLL_STYLE,
  cn,
  portfolioButtonClassNames,
  portfolioLayoutClassNames,
  portfolioSurfaceClassNames,
  portfolioTypographyClassNames,
} from "../portfolio-styles";
import { scrollToSection } from "../portfolio-utils";
import { MagneticActionButton } from "../primitives/magnetic-action-button";

const projectHeroStats = [
  {
    value: portfolioProjects.length,
    label: "PROJECTS IN ROTATION",
    accentColor: "#FFE900",
  },
  {
    value: projectFilterOptions.length - 1,
    label: "ACTIVE CATEGORIES",
    accentColor: "#00F5FF",
  },
  {
    value: featuredProjects.length,
    label: "FEATURED ON HOME",
    accentColor: "#FF006E",
  },
] as const;

const projectHeroStickerDecorations = [
  {
    src: stickerAssetPaths.amarelo,
    width: 590,
    height: 574,
    sizes: "(min-width: 1024px) 120px, (min-width: 768px) 104px, 72px",
    style: { left: "6%", top: "14%", width: "clamp(4.5rem, 9vw, 7.5rem)" },
    animate: { y: [0, -18, 0], rotate: [-7, 7, -7] },
    transition: { duration: 5.2, repeat: Infinity, ease: "easeInOut" as const },
  },
  {
    src: stickerAssetPaths.barraRosa,
    width: 856,
    height: 413,
    sizes: "(min-width: 1024px) 152px, (min-width: 768px) 128px, 92px",
    style: { right: "16%", top: "12%", width: "clamp(5.75rem, 11vw, 9.5rem)" },
    animate: { y: [0, 12, 0], rotate: [-5, 0, -5] },
    transition: {
      duration: 4.6,
      repeat: Infinity,
      ease: "easeInOut" as const,
      delay: 0.2,
    },
  },
  {
    src: stickerAssetPaths.circuloRosa,
    width: 408,
    height: 423,
    sizes: "(min-width: 1024px) 92px, (min-width: 768px) 80px, 60px",
    style: { right: "8%", top: "28%", width: "clamp(3.75rem, 6vw, 5.5rem)" },
    animate: { y: [0, 18, 0], x: [0, -10, 0] },
    transition: {
      duration: 4.2,
      repeat: Infinity,
      ease: "easeInOut" as const,
      delay: 0.45,
    },
  },
  {
    src: stickerAssetPaths.setaCiano,
    width: 602,
    height: 757,
    sizes: "(min-width: 1024px) 108px, (min-width: 768px) 92px, 72px",
    style: { left: "10%", bottom: "14%", width: "clamp(4.5rem, 8vw, 6.75rem)" },
    animate: { y: [0, -16, 0], rotate: [-10, -3, -10] },
    transition: {
      duration: 5.4,
      repeat: Infinity,
      ease: "easeInOut" as const,
      delay: 0.75,
    },
  },
  {
    src: stickerAssetPaths.rabiscoPreto,
    width: 588,
    height: 551,
    sizes: "(min-width: 1024px) 90px, (min-width: 768px) 76px, 52px",
    style: { right: "28%", bottom: "16%", width: "clamp(3.25rem, 5vw, 5.5rem)" },
    animate: { y: [0, 14, 0], x: [0, 6, 0], rotate: [-8, 2, -8] },
    transition: {
      duration: 4.8,
      repeat: Infinity,
      ease: "easeInOut" as const,
      delay: 0.35,
    },
  },
];

const projectHeroStickerImageStyle = {
  width: "100%",
  height: "auto",
  filter:
    "drop-shadow(0 12px 20px rgba(0, 0, 0, 0.45)) drop-shadow(0 0 18px rgba(250, 250, 250, 0.14))",
} as const;

export function ProjectsCatalogHeroSection() {
  const projectHeroTitleClassName = cn(
    portfolioTypographyClassNames.projectsDisplay,
    "[text-shadow:0_8px_24px_rgba(0,0,0,0.45)]",
  );
  const projectHeroPrimaryActionClassName = cn(
    portfolioButtonClassNames.primary,
    "!border-white !bg-electric-yellow !text-black !shadow-[8px_8px_0px_rgba(250,250,250,0.18)] hover:!bg-white hover:!text-black",
  );
  const projectHeroSecondaryActionClassName = cn(
    portfolioButtonClassNames.secondary,
    "!border-white !bg-transparent !text-white hover:!bg-white hover:!text-black",
  );
  const projectHeroStatCardClassName = cn(
    portfolioSurfaceClassNames.statCard,
    "!border-white !bg-white/8 !shadow-[8px_8px_0px_rgba(250,250,250,0.14)] backdrop-blur-sm",
  );
  const projectHeroStatLabelClassName = cn(
    portfolioTypographyClassNames.statLabel,
    "!text-gray-300",
  );

  return (
    <section
      className="relative overflow-hidden bg-ink-black text-white"
      style={PORTFOLIO_SECTION_SCROLL_STYLE}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 18% 18%, rgba(255, 0, 110, 0.22) 0%, transparent 34%), radial-gradient(circle at 84% 18%, rgba(0, 245, 255, 0.18) 0%, transparent 30%), radial-gradient(circle at 50% 82%, rgba(255, 233, 0, 0.14) 0%, transparent 28%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-10"
        style={PORTFOLIO_GRID_PATTERN_DARK_STYLE}
      />
      {projectHeroStickerDecorations.map((projectHeroSticker) => (
        <motion.div
          key={projectHeroSticker.src}
          className="absolute"
          style={projectHeroSticker.style}
          animate={projectHeroSticker.animate}
          transition={projectHeroSticker.transition}
        >
          <Image
            src={projectHeroSticker.src}
            alt=""
            aria-hidden="true"
            width={projectHeroSticker.width}
            height={projectHeroSticker.height}
            sizes={projectHeroSticker.sizes}
            draggable={false}
            style={projectHeroStickerImageStyle}
          />
        </motion.div>
      ))}

      <div className={portfolioLayoutClassNames.contentContainer}>
        <div className="py-24 md:py-32">
          <motion.div
            initial={{ x: -60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: portfolioEntranceEase }}
          >
            <div className={portfolioLayoutClassNames.kickerRow}>
              <div className="h-1 w-16 bg-electric-yellow" />
              <span
                className={cn(
                  portfolioTypographyClassNames.kickerOnLight,
                  "!text-gray-400",
                )}
              >
                {projectsPageHeroContent.kicker}
              </span>
            </div>

            <div className="relative">
              <motion.h1
                initial={{ x: "-100%", rotate: -8, opacity: 0 }}
                animate={{ x: 0, rotate: -2, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.15,
                  ease: portfolioEntranceEase,
                }}
                className={projectHeroTitleClassName}
              >
                {projectsPageHeroContent.title}
              </motion.h1>
              <motion.div
                className="absolute -bottom-6 left-0 bg-electric-yellow"
                initial={{ width: 0 }}
                animate={{ width: "44%" }}
                transition={{ duration: 0.6, delay: 0.7 }}
                style={{ height: "clamp(0.5rem, 1vw, 1.5rem)" }}
              />
            </div>

            <motion.div
              initial={{ x: "100%", rotate: 8, opacity: 0 }}
              animate={{ x: 0, rotate: 2, opacity: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.3,
                ease: portfolioEntranceEase,
              }}
              className="relative mt-3 text-right md:mt-4 lg:mt-6"
            >
              <h1 className={projectHeroTitleClassName}>
                {projectsPageHeroContent.highlightedTitle}
              </h1>
              <motion.div
                className="absolute -bottom-6 right-0 bg-hot-magenta"
                initial={{ width: 0 }}
                animate={{ width: "54%" }}
                transition={{ duration: 0.6, delay: 0.95 }}
                style={{ height: "clamp(0.5rem, 1vw, 1.5rem)" }}
              />
            </motion.div>
          </motion.div>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.45 }}
            className="mt-12 max-w-2xl font-body text-lg leading-relaxed text-gray-200 md:text-xl"
          >
            {projectsPageHeroContent.intro}
          </motion.p>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.45 }}
            className="mt-12 flex flex-col gap-4 md:flex-row"
          >
            <MagneticActionButton
              type="button"
              onClick={() => scrollToSection("all-projects")}
              className={cn("group", projectHeroPrimaryActionClassName)}
              magnetStrength={0.35}
            >
              <span className="flex items-center gap-3">
                {projectsPageHeroContent.primaryActionLabel}
                <ArrowDown className="h-5 w-5 transition-transform group-hover:translate-y-1" />
              </span>
            </MagneticActionButton>

            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Link
                href="/#contact"
                className={projectHeroSecondaryActionClassName}
              >
                {projectsPageHeroContent.secondaryActionLabel}
                <ArrowUpRight className="h-5 w-5" />
              </Link>
            </motion.div>
          </motion.div>

          <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6">
            {projectHeroStats.map((projectHeroStat, statIndex) => (
              <motion.div
                key={projectHeroStat.label}
                initial={{ y: 40, opacity: 0, rotate: statIndex === 1 ? -1 : 1 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                transition={{
                  delay: 0.8 + statIndex * 0.1,
                  duration: 0.45,
                  ease: portfolioEntranceEase,
                }}
                className={projectHeroStatCardClassName}
              >
                <div
                  className="mb-4 h-2 w-16 border-2 border-white/70"
                  style={{ backgroundColor: projectHeroStat.accentColor }}
                />
                <p className="font-heading text-5xl text-white">
                  {projectHeroStat.value}
                </p>
                <p className={projectHeroStatLabelClassName}>
                  {projectHeroStat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
