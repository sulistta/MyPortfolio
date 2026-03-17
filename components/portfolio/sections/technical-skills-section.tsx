import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  skillsSectionContent,
  technicalSkills,
} from "../portfolio-content";
import {
  portfolioEntranceEase,
  portfolioRevealViewport,
  skillCardEntryRotations,
} from "../portfolio-motion";
import { PORTFOLIO_CONTAINER_CLASS_NAME } from "../portfolio-utils";
import { SkillHighlightCard } from "../cards/skill-highlight-card";

export function TechnicalSkillsSection() {
  const skillsSectionReference = useRef<HTMLElement>(null);
  const isSkillsSectionVisible = useInView(
    skillsSectionReference,
    portfolioRevealViewport,
  );

  return (
    <section
      id="skills"
      ref={skillsSectionReference}
      className="relative overflow-hidden bg-off-white py-24 md:py-32"
      style={{ scrollMarginTop: 112 }}
    >
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #000, #000 2px, transparent 2px, transparent 20px)",
        }}
      />

      <div className={`relative z-10 ${PORTFOLIO_CONTAINER_CLASS_NAME}`}>
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={isSkillsSectionVisible ? { x: 0, opacity: 1 } : undefined}
          transition={{ duration: 0.6, ease: portfolioEntranceEase }}
          className="mb-16"
        >
          <div className="mb-4 flex items-center gap-4">
            <div className="h-1 w-16 bg-black" />
            <span className="font-accent text-sm tracking-[0.2em] text-light-gray">
              {skillsSectionContent.kicker}
            </span>
          </div>
          <h2 className="font-heading text-5xl text-ink-black md:text-6xl lg:text-7xl">
            {skillsSectionContent.title}
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 md:gap-6 lg:grid-cols-5">
          {technicalSkills.map((skillHighlight, skillIndex) => (
            <SkillHighlightCard
              key={skillHighlight.name}
              skillHighlight={skillHighlight}
              animationDelay={skillIndex * 0.05}
              entryRotation={skillCardEntryRotations[skillIndex] ?? 0}
              isSectionVisible={isSkillsSectionVisible}
            />
          ))}
        </div>

        <motion.div
          initial={{ width: 0 }}
          animate={isSkillsSectionVisible ? { width: "100%" } : undefined}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-16 h-1 bg-gradient-to-r from-electric-yellow via-hot-magenta to-cyan-blast"
        />
      </div>
    </section>
  );
}
