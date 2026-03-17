import { AnimatePresence, motion, useInView } from "framer-motion";
import { startTransition, useDeferredValue, useRef, useState } from "react";
import {
  portfolioProjects,
  projectFilterOptions,
  projectsCatalogSectionContent,
} from "../portfolio-content";
import { portfolioEntranceEase, portfolioRevealViewport } from "../portfolio-motion";
import type { ProjectFilterOption } from "../portfolio-types";
import { PORTFOLIO_CONTAINER_CLASS_NAME } from "../portfolio-utils";
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
      className="relative overflow-hidden bg-charcoal py-24 md:py-32 lg:py-40"
      style={{ scrollMarginTop: 112 }}
    >
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, #FF006E 0%, transparent 45%), radial-gradient(circle at 80% 15%, #00F5FF 0%, transparent 40%), radial-gradient(circle at 50% 85%, #FFE900 0%, transparent 35%)",
        }}
      />
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
          initial={{ x: -60, opacity: 0 }}
          animate={isCatalogSectionVisible ? { x: 0, opacity: 1 } : undefined}
          transition={{ duration: 0.6, ease: portfolioEntranceEase }}
          className="mb-16 md:mb-24"
        >
          <div className="mb-4 flex items-center gap-4">
            <div className="h-1 w-16 bg-electric-yellow" />
            <span className="font-accent text-sm tracking-[0.2em] text-gray-400">
              {projectsCatalogSectionContent.kicker}
            </span>
          </div>
          <h2 className="font-heading text-5xl text-white md:text-6xl lg:text-8xl">
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
                className="border-4 border-black px-4 py-2 font-accent text-sm font-bold tracking-wider text-black transition-colors"
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
            className="border-4 border-white bg-off-white p-6 text-center shadow-brutal"
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
