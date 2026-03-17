import { motion } from "framer-motion";
import { PortfolioFooter } from "./portfolio-footer";
import { PortfolioHeader } from "./portfolio-header";
import { ProjectsCatalogHeroSection } from "../sections/projects-catalog-hero-section";
import { ProjectsCatalogSection } from "../sections/projects-catalog-section";
import { PageScrollProgressBar } from "../primitives/page-scroll-progress-bar";
import { PortfolioCursorTrail } from "../primitives/portfolio-cursor-trail";

export function PortfolioProjectsShell() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative noise-overlay"
    >
      <PortfolioCursorTrail />
      <PageScrollProgressBar />
      <PortfolioHeader />
      <ProjectsCatalogHeroSection />
      <ProjectsCatalogSection />
      <PortfolioFooter />
    </motion.main>
  );
}
