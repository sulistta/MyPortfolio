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
import {
  PORTFOLIO_SECTION_SCROLL_STYLE,
  PORTFOLIO_SKILLS_PATTERN_STYLE,
  portfolioLayoutClassNames,
  portfolioTypographyClassNames,
} from "../portfolio-styles";
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
      className={portfolioLayoutClassNames.lightSectionCompact}
      style={PORTFOLIO_SECTION_SCROLL_STYLE}
    >
      <div className="absolute inset-0 opacity-5" style={PORTFOLIO_SKILLS_PATTERN_STYLE} />

      <div className={portfolioLayoutClassNames.contentContainer}>
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={isSkillsSectionVisible ? { x: 0, opacity: 1 } : undefined}
          transition={{ duration: 0.6, ease: portfolioEntranceEase }}
          className="mb-16"
        >
          <div className={portfolioLayoutClassNames.kickerRow}>
            <div className="h-1 w-16 bg-black" />
            <span className={portfolioTypographyClassNames.kickerOnLight}>
              {skillsSectionContent.kicker}
            </span>
          </div>
          <h2 className={portfolioTypographyClassNames.lightSectionTitle}>
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
