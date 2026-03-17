import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import {
  portfolioBrand,
  portfolioNavigationLinks,
} from "../portfolio-content";
import { portfolioEntranceEase } from "../portfolio-motion";
import {
  PORTFOLIO_CONTAINER_CLASS_NAME,
  scrollPageToTop,
  scrollToSectionFromHref,
} from "../portfolio-utils";
import { MagneticActionButton } from "../primitives/magnetic-action-button";

export function PortfolioHeader() {
  const pathname = usePathname();
  const [hasPageScrolled, setHasPageScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isHomePage = pathname === "/";

  useEffect(() => {
    const updateHeaderState = () => setHasPageScrolled(window.scrollY > 100);

    updateHeaderState();
    window.addEventListener("scroll", updateHeaderState);

    return () => window.removeEventListener("scroll", updateHeaderState);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const handleSectionNavigation = (sectionHref: string) => {
    setIsMobileMenuOpen(false);
    scrollToSectionFromHref(sectionHref);
  };

  const getNavigationHref = (sectionHref: string, navigationLabel: string) => {
    if (navigationLabel === "PROJECTS") {
      return "/projects";
    }

    return `/${sectionHref}`;
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: portfolioEntranceEase }}
        className={`fixed left-0 right-0 top-0 z-[99] transition-all duration-300 ${
          hasPageScrolled
            ? "border-b-4 border-black bg-off-white/90 backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className={PORTFOLIO_CONTAINER_CLASS_NAME}>
          <div className="flex h-20 items-center justify-between">
            {isHomePage ? (
              <motion.button
                type="button"
                onClick={scrollPageToTop}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="font-heading text-2xl text-ink-black md:text-3xl"
              >
                {portfolioBrand.headerMark}
                <span className="text-hot-magenta">.</span>
              </motion.button>
            ) : (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/" className="font-heading text-2xl text-ink-black md:text-3xl">
                  {portfolioBrand.headerMark}
                  <span className="text-hot-magenta">.</span>
                </Link>
              </motion.div>
            )}

            <nav className="hidden items-center gap-8 md:flex">
              {portfolioNavigationLinks.map((navigationLink, navigationIndex) => {
                const isCurrentProjectsPage =
                  !isHomePage && navigationLink.label === "PROJECTS";

                if (isHomePage) {
                  return (
                    <motion.button
                      key={navigationLink.label}
                      type="button"
                      onClick={() => handleSectionNavigation(navigationLink.href)}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: navigationIndex * 0.1 }}
                      whileHover={{ y: -2 }}
                      className="group relative font-accent text-sm tracking-wider text-dark-gray transition-colors hover:text-ink-black"
                    >
                      {navigationLink.label}
                      <motion.span
                        className="absolute -bottom-1 left-0 h-0.5 bg-electric-yellow"
                        initial={{ width: 0 }}
                        whileHover={{ width: "100%" }}
                        transition={{ duration: 0.2 }}
                      />
                    </motion.button>
                  );
                }

                return (
                  <motion.div
                    key={navigationLink.label}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: navigationIndex * 0.1 }}
                    whileHover={{ y: -2 }}
                  >
                    <Link
                      href={getNavigationHref(
                        navigationLink.href,
                        navigationLink.label,
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`group relative font-accent text-sm tracking-wider transition-colors ${
                        isCurrentProjectsPage
                          ? "text-ink-black"
                          : "text-dark-gray hover:text-ink-black"
                      }`}
                      aria-current={isCurrentProjectsPage ? "page" : undefined}
                    >
                      {navigationLink.label}
                      <span
                        className="absolute -bottom-1 left-0 h-0.5 bg-electric-yellow"
                        style={{ width: isCurrentProjectsPage ? "100%" : 0 }}
                      />
                    </Link>
                  </motion.div>
                );
              })}

              {isHomePage ? (
                <MagneticActionButton
                  type="button"
                  onClick={() => handleSectionNavigation("#contact")}
                  className="border-4 border-black bg-black px-5 py-2 font-accent text-sm tracking-wider text-white transition-colors hover:bg-electric-yellow hover:text-black"
                >
                  {portfolioBrand.primaryNavigationActionLabel}
                </MagneticActionButton>
              ) : (
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                  <Link
                    href="/#contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="inline-flex border-4 border-black bg-black px-5 py-2 font-accent text-sm tracking-wider text-white transition-colors hover:bg-electric-yellow hover:text-black"
                  >
                    {portfolioBrand.primaryNavigationActionLabel}
                  </Link>
                </motion.div>
              )}
            </nav>

            <motion.button
              type="button"
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen((currentValue) => !currentValue)}
              className="flex h-12 w-12 items-center justify-center border-4 border-black bg-black text-white md:hidden"
              aria-expanded={isMobileMenuOpen}
              aria-label={
                isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"
              }
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </motion.button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[98] bg-off-white md:hidden"
          >
            <motion.nav
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="flex h-full flex-col items-center justify-center gap-8"
            >
              {portfolioNavigationLinks.map((navigationLink, navigationIndex) => {
                const isCurrentProjectsPage =
                  !isHomePage && navigationLink.label === "PROJECTS";

                if (isHomePage) {
                  return (
                    <motion.button
                      key={navigationLink.label}
                      type="button"
                      onClick={() => handleSectionNavigation(navigationLink.href)}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + navigationIndex * 0.05 }}
                      className="font-heading text-4xl text-ink-black transition-colors hover:text-hot-magenta"
                    >
                      {navigationLink.label}
                    </motion.button>
                  );
                }

                return (
                  <motion.div
                    key={navigationLink.label}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + navigationIndex * 0.05 }}
                  >
                    <Link
                      href={getNavigationHref(
                        navigationLink.href,
                        navigationLink.label,
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`font-heading text-4xl transition-colors ${
                        isCurrentProjectsPage
                          ? "text-hot-magenta"
                          : "text-ink-black hover:text-hot-magenta"
                      }`}
                    >
                      {navigationLink.label}
                    </Link>
                  </motion.div>
                );
              })}

              {isHomePage ? (
                <motion.button
                  type="button"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  onClick={() => handleSectionNavigation("#contact")}
                  className="mt-8 border-4 border-black bg-hot-magenta px-8 py-4 font-accent text-xl font-bold tracking-wider text-white shadow-brutal"
                >
                  {portfolioBrand.primaryNavigationActionLabel}
                </motion.button>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <Link
                    href="/#contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="mt-8 inline-flex border-4 border-black bg-hot-magenta px-8 py-4 font-accent text-xl font-bold tracking-wider text-white shadow-brutal"
                  >
                    {portfolioBrand.primaryNavigationActionLabel}
                  </Link>
                </motion.div>
              )}
            </motion.nav>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 }}
              className="absolute bottom-10 left-10 h-20 w-20 border-4 border-black bg-electric-yellow"
            />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4 }}
              className="absolute right-10 top-20 h-16 w-16 rounded-full border-4 border-black bg-cyan-blast"
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
