import { AnimatePresence, motion, useInView } from "framer-motion";
import { startTransition, useDeferredValue, useRef, useState } from "react";
import {
  portfolioProjects,
  projectFilterOptions,
  projectsCatalogSectionContent,
} from "../portfolio-content";
import { portfolioEntranceEase, portfolioRevealViewport } from "../portfolio-motion";
import type { ProjectFilterOption } from "../portfolio-types";
import {
  PORTFOLIO_GRID_PATTERN_DARK_STYLE,
  PORTFOLIO_SECTION_SCROLL_STYLE,
  portfolioButtonClassNames,
  portfolioLayoutClassNames,
  portfolioSurfaceClassNames,
  portfolioTypographyClassNames,
} from "../portfolio-styles";
import { PortfolioProjectCard } from "../cards/portfolio-project-card";

type ProjectFilterLabel = ProjectFilterOption["label"];

export function ProjectsCatalogSection() {
  const catalogSectionReference = useRef<HTMLElement>(null);
  const isCatalogSectionVisible = useInView(
    catalogSectionReference,
    portfolioRevealViewport,
  );
  const [activeFilter, setActiveFilter] = useState<ProjectFilterLabel>("All");
  const deferredFilter = useDeferredValue(activeFilter);
  const visibleProjects =
    deferredFilter === "All"
      ? portfolioProjects
      : portfolioProjects.filter(
          (portfolioProject) => portfolioProject.category === deferredFilter,
        );

  return (
    <section
      id="all-projects"
      ref={catalogSectionReference}
      className={portfolioLayoutClassNames.darkSection}
      style={PORTFOLIO_SECTION_SCROLL_STYLE}
    >
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, #FF006E 0%, transparent 45%), radial-gradient(circle at 80% 15%, #00F5FF 0%, transparent 40%), radial-gradient(circle at 50% 85%, #FFE900 0%, transparent 35%)",
        }}
      />
      <div className="absolute inset-0 opacity-10" style={PORTFOLIO_GRID_PATTERN_DARK_STYLE} />

      <div className={portfolioLayoutClassNames.contentContainer}>
        <motion.div
          initial={{ x: -60, opacity: 0 }}
          animate={isCatalogSectionVisible ? { x: 0, opacity: 1 } : undefined}
          transition={{ duration: 0.6, ease: portfolioEntranceEase }}
          className={portfolioLayoutClassNames.sectionIntro}
        >
          <div className={portfolioLayoutClassNames.kickerRow}>
            <div className="h-1 w-16 bg-electric-yellow" />
            <span className={portfolioTypographyClassNames.kickerOnDark}>
              {projectsCatalogSectionContent.kicker}
            </span>
          </div>
          <h2 className={portfolioTypographyClassNames.darkSectionTitle}>
            {projectsCatalogSectionContent.title}
            <span className="block text-electric-yellow">
              {projectsCatalogSectionContent.highlightedTitle}
            </span>
          </h2>
        </motion.div>

        <div className="mb-16 flex flex-wrap gap-3 md:mb-24">
          {projectFilterOptions.map((projectFilterOption) => {
            const isFilterActive = activeFilter === projectFilterOption.label;

            return (
              <motion.button
                key={projectFilterOption.label}
                type="button"
                onClick={() => {
                  startTransition(() => setActiveFilter(projectFilterOption.label));
                }}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.96 }}
                className={portfolioButtonClassNames.filter}
                style={{
                  backgroundColor: isFilterActive
                    ? projectFilterOption.accentColor
                    : "#fafafa",
                  boxShadow: isFilterActive ? "8px 8px 0px #000" : "none",
                }}
                aria-pressed={isFilterActive}
              >
                {projectFilterOption.label}
              </motion.button>
            );
          })}
        </div>

        {visibleProjects.length ? (
          <motion.div layout className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {visibleProjects.map((portfolioProject, projectIndex) => (
                <PortfolioProjectCard
                  key={portfolioProject.id}
                  portfolioProject={portfolioProject}
                  cardIndex={projectIndex}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={portfolioSurfaceClassNames.emptyState}
          >
            <p className="font-heading text-3xl text-ink-black md:text-4xl">
              {projectsCatalogSectionContent.emptyStateTitle}
            </p>
            <p className="mt-4 font-body text-lg text-light-gray">
              {projectsCatalogSectionContent.emptyStateDescription}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
