import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useRef } from "react";
import {
  featuredProjects,
  featuredProjectsSectionContent,
} from "../portfolio-content";
import {
  portfolioEntranceEase,
  portfolioRevealViewport,
} from "../portfolio-motion";
import { PORTFOLIO_CONTAINER_CLASS_NAME } from "../portfolio-utils";
import { FeaturedProjectCard } from "../cards/featured-project-card";

export function FeaturedProjectsSection() {
  const featuredProjectsSectionReference = useRef<HTMLElement>(null);
  const isFeaturedProjectsSectionVisible = useInView(
    featuredProjectsSectionReference,
    portfolioRevealViewport,
  );
  const { scrollYProgress } = useScroll({
    target: featuredProjectsSectionReference,
    offset: ["start end", "end start"],
  });
  const backgroundGradientOffset = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section
      id="projects"
      ref={featuredProjectsSectionReference}
      className="relative overflow-hidden bg-charcoal py-24 md:py-32 lg:py-40"
    >
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{ y: backgroundGradientOffset }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, #FF006E 0%, transparent 50%), radial-gradient(circle at 80% 80%, #00F5FF 0%, transparent 50%), radial-gradient(circle at 50% 20%, #FFE900 0%, transparent 40%)",
          }}
        />
      </motion.div>
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className={`relative z-10 ${PORTFOLIO_CONTAINER_CLASS_NAME}`}>
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={
            isFeaturedProjectsSectionVisible ? { x: 0, opacity: 1 } : undefined
          }
          transition={{ duration: 0.6, ease: portfolioEntranceEase }}
          className="mb-16 md:mb-24"
        >
          <div className="mb-4 flex items-center gap-4">
            <div className="h-1 w-16 bg-electric-yellow" />
            <span className="font-accent text-sm tracking-[0.2em] text-gray-400">
              {featuredProjectsSectionContent.kicker}
            </span>
          </div>
          <h2 className="font-heading text-5xl text-white md:text-6xl lg:text-8xl">
            {featuredProjectsSectionContent.title}
            <span className="block text-electric-yellow">
              {featuredProjectsSectionContent.highlightedTitle}
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          {featuredProjects.map((featuredProject, projectIndex) => (
            <div key={featuredProject.title} className={featuredProject.layoutClassName}>
              <FeaturedProjectCard
                featuredProject={featuredProject}
                cardIndex={projectIndex}
              />
            </div>
          ))}
        </div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-16 text-center md:mt-24"
        >
          <motion.button
            type="button"
            aria-disabled="true"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 border-4 border-white bg-transparent px-8 py-4 font-accent text-lg font-bold tracking-wider text-white transition-colors duration-200 hover:bg-white hover:text-black"
          >
            {featuredProjectsSectionContent.secondaryActionLabel}
            <ArrowUp className="h-5 w-5 rotate-90" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
