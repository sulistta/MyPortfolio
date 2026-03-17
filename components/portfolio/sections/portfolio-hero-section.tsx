import Image from "next/image";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useEffect, useRef } from "react";
import { useTypewriterText } from "../hooks/use-typewriter-text";
import { portfolioBrand } from "../portfolio-content";
import { portfolioEntranceEase } from "../portfolio-motion";
import {
  PORTFOLIO_GRID_PATTERN_LIGHT_STYLE,
  portfolioButtonClassNames,
  portfolioLayoutClassNames,
  portfolioTypographyClassNames,
} from "../portfolio-styles";
import { scrollToSection } from "../portfolio-utils";
import { MagneticActionButton } from "../primitives/magnetic-action-button";

const heroStickerDecorations = [
  {
    src: "/stickers/sticker_amarelo.png",
    width: 590,
    height: 574,
    sizes: "(min-width: 1024px) 128px, (min-width: 768px) 112px, 76px",
    style: { left: "7%", top: "12%", width: "clamp(4.75rem, 10vw, 8rem)" },
    animate: { y: [0, -24, 0], rotate: [-8, 10, -8] },
    transition: { duration: 5, repeat: Infinity, ease: "easeInOut" as const },
  },
  {
    src: "/stickers/sticker_barra_rosa.png",
    width: 856,
    height: 413,
    sizes: "(min-width: 1024px) 160px, (min-width: 768px) 136px, 96px",
    style: { right: "23%", top: "14%", width: "clamp(6rem, 12vw, 10rem)" },
    animate: { y: [0, 14, 0], rotate: [-6, -1, -6] },
    transition: {
      duration: 4.8,
      repeat: Infinity,
      ease: "easeInOut" as const,
      delay: 0.2,
    },
  },
  {
    src: "/stickers/sticker_circulo_rosa.png",
    width: 408,
    height: 423,
    sizes: "(min-width: 1024px) 96px, (min-width: 768px) 84px, 64px",
    style: { right: "10%", top: "24%", width: "clamp(4rem, 7vw, 6rem)" },
    animate: { y: [0, 18, 0], x: [0, -12, 0] },
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut" as const,
      delay: 0.5,
    },
  },
  {
    src: "/stickers/sticker_seta_ciano.png",
    width: 602,
    height: 757,
    sizes: "(min-width: 1024px) 112px, (min-width: 768px) 96px, 76px",
    style: { left: "11%", bottom: "13%", width: "clamp(4.75rem, 8vw, 7rem)" },
    animate: { y: [0, -18, 0], rotate: [-12, -4, -12] },
    transition: {
      duration: 5.8,
      repeat: Infinity,
      ease: "easeInOut" as const,
      delay: 0.8,
    },
  },
  {
    src: "/stickers/sticker_rabisco_preto.png",
    width: 588,
    height: 551,
    sizes: "(min-width: 1024px) 96px, (min-width: 768px) 80px, 56px",
    style: { left: "62%", bottom: "15%", width: "clamp(3.5rem, 6vw, 6rem)" },
    animate: { y: [0, 14, 0], x: [0, 8, 0], rotate: [-8, 2, -8] },
    transition: {
      duration: 4.4,
      repeat: Infinity,
      ease: "easeInOut" as const,
      delay: 0.4,
    },
  },
  {
    src: "/stickers/sticker_zigzag_preto.png",
    width: 391,
    height: 538,
    sizes: "(min-width: 1024px) 80px, (min-width: 768px) 72px, 52px",
    style: { right: "8%", bottom: "26%", width: "clamp(3.25rem, 5vw, 5rem)" },
    animate: { y: [0, -20, 0], rotate: [0, 8, 0] },
    transition: {
      duration: 4.7,
      repeat: Infinity,
      ease: "easeInOut" as const,
      delay: 0.3,
    },
  },
];

export function PortfolioHeroSection() {
  const heroSectionReference = useRef<HTMLElement>(null);
  const typedHeroTagline = useTypewriterText(portfolioBrand.heroTagline);
  const cursorResponsiveX = useMotionValue(0);
  const cursorResponsiveY = useMotionValue(0);
  const backgroundOffsetX = useSpring(cursorResponsiveX, {
    damping: 30,
    stiffness: 100,
  });
  const backgroundOffsetY = useSpring(cursorResponsiveY, {
    damping: 30,
    stiffness: 100,
  });
  const { scrollYProgress } = useScroll({
    target: heroSectionReference,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  useEffect(() => {
    const updateHeroParallax = (event: MouseEvent) => {
      const { innerWidth, innerHeight } = window;

      cursorResponsiveX.set((event.clientX - innerWidth / 2) / 50);
      cursorResponsiveY.set((event.clientY - innerHeight / 2) / 50);
    };

    window.addEventListener("mousemove", updateHeroParallax);
    return () => window.removeEventListener("mousemove", updateHeroParallax);
  }, [cursorResponsiveX, cursorResponsiveY]);

  return (
    <section
      ref={heroSectionReference}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-off-white"
    >
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ x: backgroundOffsetX, y: backgroundOffsetY }}
      >
        {heroStickerDecorations.map((heroSticker) => (
          <motion.div
            key={heroSticker.src}
            className="absolute"
            style={heroSticker.style}
            animate={heroSticker.animate}
            transition={heroSticker.transition}
          >
            <Image
              src={heroSticker.src}
              alt=""
              aria-hidden="true"
              width={heroSticker.width}
              height={heroSticker.height}
              sizes={heroSticker.sizes}
              draggable={false}
              style={{ width: "100%", height: "auto" }}
            />
          </motion.div>
        ))}
        <div
          className="absolute inset-0 opacity-5"
          style={PORTFOLIO_GRID_PATTERN_LIGHT_STYLE}
        />
      </motion.div>

      <motion.div
        className={portfolioLayoutClassNames.contentContainerWide}
        style={{ opacity: heroOpacity, scale: heroScale }}
      >
        <div className="relative">
          <motion.div
            initial={{ x: "-100%", rotate: -10, opacity: 0 }}
            animate={{ x: 0, rotate: -3, opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: portfolioEntranceEase,
            }}
            className="relative"
          >
            <h1 className={portfolioTypographyClassNames.heroDisplay}>
              {portfolioBrand.heroPrimaryHeading}
            </h1>
            <motion.div
              className="absolute -bottom-2 left-0 h-4 bg-electric-yellow md:h-6"
              initial={{ width: 0 }}
              animate={{ width: "60%" }}
              transition={{ duration: 0.6, delay: 1 }}
            />
          </motion.div>

          <motion.div
            initial={{ x: "100%", rotate: 10, opacity: 0 }}
            animate={{ x: 0, rotate: 3, opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.4,
              ease: portfolioEntranceEase,
            }}
            className="relative -mt-4 text-right md:-mt-8"
          >
            <h1 className={portfolioTypographyClassNames.heroDisplay}>
              {portfolioBrand.heroSecondaryHeading}
            </h1>
            <motion.div
              className="absolute -bottom-2 right-0 h-4 bg-hot-magenta md:h-6"
              initial={{ width: 0 }}
              animate={{ width: "50%" }}
              transition={{ duration: 0.6, delay: 1.2 }}
            />
          </motion.div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.6,
              delay: 0.6,
              ease: [0.34, 1.56, 0.64, 1],
            }}
            className="relative mt-8 -rotate-2 md:mt-12"
          >
            <p className="font-accent text-xl font-bold uppercase tracking-widest text-dark-gray md:text-2xl lg:text-3xl">
              {portfolioBrand.heroRole}
            </p>
            <div className="mt-2 flex items-center gap-4">
              <div className="h-1 w-12 bg-black" />
              <span className="font-body text-sm text-light-gray">
                &amp; {portfolioBrand.heroSubtitle}
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 max-w-2xl md:mt-16"
          >
            <p className={portfolioTypographyClassNames.heroLead}>
              {typedHeroTagline}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="ml-1 inline-block h-6 w-3 bg-electric-yellow"
              />
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 50, scale: 0.9, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            transition={{
              duration: 0.5,
              delay: 1.2,
              ease: [0.34, 1.56, 0.64, 1],
            }}
            className="mt-12"
          >
            <MagneticActionButton
              type="button"
              onClick={() => scrollToSection("projects")}
              className={portfolioButtonClassNames.hero}
              magnetStrength={0.4}
            >
              <span className="flex items-center gap-3">
                {portfolioBrand.heroPrimaryActionLabel}
                <ArrowDown className="h-5 w-5 transition-transform group-hover:translate-y-1" />
              </span>
            </MagneticActionButton>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex h-10 w-6 justify-center rounded-full border-4 border-black pt-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="h-2 w-2 rounded-full bg-black"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
