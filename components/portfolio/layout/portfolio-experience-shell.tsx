import { motion } from "framer-motion";
import { PortfolioFooter } from "./portfolio-footer";
import { PortfolioHeader } from "./portfolio-header";
import { PortfolioAboutSection } from "../sections/portfolio-about-section";
import { PortfolioContactSection } from "../sections/portfolio-contact-section";
import { FeaturedProjectsSection } from "../sections/featured-projects-section";
import { PortfolioHeroSection } from "../sections/portfolio-hero-section";
import { TechnicalSkillsSection } from "../sections/technical-skills-section";
import { PageScrollProgressBar } from "../primitives/page-scroll-progress-bar";
import { PortfolioCursorTrail } from "../primitives/portfolio-cursor-trail";

export function PortfolioExperienceShell() {
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
      <PortfolioHeroSection />
      <PortfolioAboutSection />
      <TechnicalSkillsSection />
      <FeaturedProjectsSection />
      <PortfolioContactSection />
      <PortfolioFooter />
    </motion.main>
  );
}
