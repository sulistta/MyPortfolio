import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useEffect, useRef } from "react";
import { useTypewriterText } from "../hooks/use-typewriter-text";
import { portfolioBrand } from "../portfolio-content";
import { portfolioEntranceEase } from "../portfolio-motion";
import {
  PORTFOLIO_CONTAINER_CLASS_NAME,
  scrollToSection,
} from "../portfolio-utils";
import { MagneticActionButton } from "../primitives/magnetic-action-button";

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
        <motion.div
          className="absolute left-[10%] top-[15%] h-32 w-32 border-4 border-black bg-electric-yellow"
          animate={{ y: [0, -30, 0], rotate: [0, 15, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-[15%] top-[25%] h-24 w-24 rounded-full border-4 border-black bg-hot-magenta"
          animate={{ y: [0, 20, 0], x: [0, -15, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
        <motion.div
          className="absolute bottom-[20%] left-[20%] h-20 w-20 rotate-45 border-4 border-black bg-cyan-blast"
          animate={{ rotate: [45, 90, 45], scale: [1, 1.1, 1] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute bottom-[30%] right-[10%] h-40 w-16 border-4 border-black bg-transparent"
          animate={{ y: [0, -25, 0] }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.3,
          }}
        />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </motion.div>

      <motion.div
        className={`relative z-10 w-full ${PORTFOLIO_CONTAINER_CLASS_NAME}`}
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
            <h1 className="font-heading text-[15vw] leading-[0.85] tracking-tight text-ink-black md:text-[12vw] lg:text-[10vw]">
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
            <h1 className="font-heading text-[15vw] leading-[0.85] tracking-tight text-ink-black md:text-[12vw] lg:text-[10vw]">
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
            <p className="font-body text-lg leading-relaxed text-ink-black md:text-xl lg:text-2xl">
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
              className="group relative border-4 border-black bg-black px-8 py-4 font-accent text-lg font-bold tracking-wider text-white shadow-brutal transition-shadow duration-200 hover:shadow-brutal-accent"
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
