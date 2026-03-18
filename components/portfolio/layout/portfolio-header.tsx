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
  cn,
  portfolioButtonClassNames,
} from "../portfolio-styles";
import { scrollPageToTop, scrollToSectionFromHref } from "../portfolio-utils";
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

  const desktopNavigationLinkClassName =
    "group relative font-accent text-sm tracking-wider text-gray-300 transition-colors hover:text-white";
  const headerActionClassName = cn(
    portfolioButtonClassNames.navPrimary,
    "!border-white !bg-electric-yellow !text-black hover:!bg-white hover:!text-black",
  );
  const mobileMenuActionClassName = cn(
    portfolioButtonClassNames.accent,
    "!border-white !shadow-[8px_8px_0px_rgba(250,250,250,0.14)]",
  );

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: portfolioEntranceEase }}
        className={cn(
          "fixed left-0 right-0 top-0 z-[99] transition-all duration-300",
          hasPageScrolled
            ? "border-b-4 border-white bg-ink-black/85 shadow-[0_12px_32px_rgba(0,0,0,0.45)] backdrop-blur-md"
            : "bg-transparent",
        )}
      >
        <div className={PORTFOLIO_CONTAINER_CLASS_NAME}>
          <div className="flex h-20 items-center justify-between">
            {isHomePage ? (
              <motion.button
                type="button"
                onClick={scrollPageToTop}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="font-heading text-2xl text-white md:text-3xl"
              >
                {portfolioBrand.headerMark}
                <span className="text-hot-magenta">.</span>
              </motion.button>
            ) : (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/" className="font-heading text-2xl text-white md:text-3xl">
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
                      className={desktopNavigationLinkClassName}
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
                          ? "text-electric-yellow"
                          : "text-gray-300 hover:text-white"
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
                  className={headerActionClassName}
                >
                  {portfolioBrand.primaryNavigationActionLabel}
                </MagneticActionButton>
              ) : (
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                  <Link
                    href="/#contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn("inline-flex", headerActionClassName)}
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
              className="flex h-12 w-12 items-center justify-center border-4 border-white bg-electric-yellow text-black shadow-[4px_4px_0px_rgba(250,250,250,0.16)] md:hidden"
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
            className="fixed inset-0 z-[98] overflow-hidden bg-ink-black md:hidden"
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 20%, rgba(255, 0, 110, 0.22) 0%, transparent 34%), radial-gradient(circle at 82% 18%, rgba(0, 245, 255, 0.16) 0%, transparent 30%), radial-gradient(circle at 50% 80%, rgba(255, 233, 0, 0.12) 0%, transparent 28%)",
              }}
            />
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
                backgroundSize: "72px 72px",
              }}
            />
            <motion.nav
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="relative z-10 flex h-full flex-col items-center justify-center gap-8"
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
                      className="font-heading text-4xl text-white transition-colors hover:text-hot-magenta"
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
                      className={cn(
                        "font-heading text-4xl transition-colors",
                        isCurrentProjectsPage
                          ? "text-electric-yellow"
                          : "text-white hover:text-hot-magenta",
                      )}
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
                  className={cn("mt-8", mobileMenuActionClassName)}
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
                    className={cn(
                      "mt-8 inline-flex",
                      mobileMenuActionClassName,
                    )}
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
              className="absolute bottom-10 left-10 h-20 w-20 border-4 border-white bg-electric-yellow shadow-[8px_8px_0px_rgba(250,250,250,0.12)]"
            />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4 }}
              className="absolute right-10 top-20 h-16 w-16 rounded-full border-4 border-white bg-cyan-blast shadow-[8px_8px_0px_rgba(250,250,250,0.12)]"
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
