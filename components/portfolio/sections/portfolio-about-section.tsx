import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { aboutSectionContent, careerStats, portfolioBrand } from "../portfolio-content";
import { portfolioEntranceEase, portfolioRevealViewport } from "../portfolio-motion";
import { PORTFOLIO_CONTAINER_CLASS_NAME } from "../portfolio-utils";
import { AnimatedStatCounter } from "../primitives/animated-stat-counter";

function renderHighlightedParagraph(
  paragraphText: string,
  highlightText: string,
  highlightClassName: string,
) {
  const paragraphSegments = paragraphText.split(highlightText);

  if (paragraphSegments.length < 2) {
    return paragraphText;
  }

  return (
    <>
      {paragraphSegments[0]}
      <span className={highlightClassName}>{highlightText}</span>
      {paragraphSegments.slice(1).join(highlightText)}
    </>
  );
}

export function PortfolioAboutSection() {
  const aboutSectionReference = useRef<HTMLElement>(null);
  const isAboutSectionVisible = useInView(
    aboutSectionReference,
    portfolioRevealViewport,
  );
  const { scrollYProgress } = useScroll({
    target: aboutSectionReference,
    offset: ["start end", "end start"],
  });
  const portraitColumnOffset = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section
      id="about"
      ref={aboutSectionReference}
      className="relative overflow-hidden bg-soft-cream py-24 md:py-32 lg:py-40"
    >
      <div className="absolute right-0 top-0 h-full w-1/3 -skew-x-12 translate-x-1/4 bg-electric-yellow/10" />

      <div className={`relative z-10 ${PORTFOLIO_CONTAINER_CLASS_NAME}`}>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-20">
          <motion.div
            className="relative lg:col-span-5"
            style={{ y: portraitColumnOffset }}
          >
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={isAboutSectionVisible ? { x: 0, opacity: 1 } : undefined}
              transition={{ duration: 0.8, ease: portfolioEntranceEase }}
              className="relative"
            >
              <div className="relative border-4 border-black bg-white p-4 shadow-brutal-lg">
                <div className="relative aspect-[4/5] overflow-hidden bg-charcoal">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <motion.div
                        className="h-48 w-48 rounded-full border-4 border-black bg-electric-yellow md:h-64 md:w-64"
                        animate={{
                          boxShadow: [
                            "8px 8px 0px #000",
                            "12px 12px 0px #FF006E",
                            "8px 8px 0px #000",
                          ],
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />
                      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                        <span className="font-heading text-6xl text-black md:text-8xl">
                          {aboutSectionContent.profileMonogram}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute right-4 top-4 h-8 w-8 border-2 border-black bg-hot-magenta" />
                  <div className="absolute bottom-4 left-4 h-12 w-12 rotate-12 border-2 border-black bg-cyan-blast" />
                </div>
              </div>

              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={
                  isAboutSectionVisible ? { scale: 1, rotate: -5 } : undefined
                }
                transition={{ delay: 0.5, duration: 0.5, type: "spring" }}
                className="absolute -bottom-6 -right-6 border-4 border-black bg-hot-magenta px-6 py-3 text-white shadow-brutal"
              >
                <span className="font-accent text-sm font-bold tracking-wider">
                  {portfolioBrand.availabilityLabel}
                </span>
              </motion.div>
            </motion.div>
          </motion.div>

          <div className="lg:col-span-7">
            <motion.h2 className="mb-8 font-heading text-5xl text-ink-black md:text-6xl lg:text-7xl">
              {aboutSectionContent.heading.split("").map((character, characterIndex) => (
                <motion.span
                  key={`${character}-${characterIndex}`}
                  initial={{ y: 30, opacity: 0 }}
                  animate={isAboutSectionVisible ? { y: 0, opacity: 1 } : undefined}
                  transition={{
                    duration: 0.05,
                    delay: 0.2 + characterIndex * 0.05,
                    ease: portfolioEntranceEase,
                  }}
                  className="inline-block"
                >
                  {character === " " ? "\u00a0" : character}
                </motion.span>
              ))}
            </motion.h2>

            <div className="space-y-6">
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={isAboutSectionVisible ? { y: 0, opacity: 1 } : undefined}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="font-body text-lg leading-relaxed text-dark-gray"
              >
                {renderHighlightedParagraph(
                  aboutSectionContent.paragraphs[0],
                  aboutSectionContent.introHighlight,
                  "bg-electric-yellow px-1 font-bold",
                )}
              </motion.p>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={isAboutSectionVisible ? { y: 0, opacity: 1 } : undefined}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="font-body text-lg leading-relaxed text-dark-gray"
              >
                {renderHighlightedParagraph(
                  aboutSectionContent.paragraphs[1],
                  aboutSectionContent.experienceHighlight,
                  "border-b-4 border-hot-magenta font-bold",
                )}
              </motion.p>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={isAboutSectionVisible ? { y: 0, opacity: 1 } : undefined}
                transition={{ delay: 0.6, duration: 0.4 }}
                className="font-body text-lg leading-relaxed text-dark-gray"
              >
                {aboutSectionContent.paragraphs[2]}
              </motion.p>
            </div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={isAboutSectionVisible ? { y: 0, opacity: 1 } : undefined}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="mt-12 grid grid-cols-3 gap-6"
            >
              {careerStats.map((careerStat) => (
                <motion.div
                  key={careerStat.label}
                  whileHover={{ y: -5, boxShadow: "8px 8px 0px #000" }}
                  className="border-4 border-black bg-white p-4 transition-all duration-200 shadow-brutal md:p-6"
                >
                  <div className="font-heading text-3xl text-ink-black md:text-4xl lg:text-5xl">
                    <AnimatedStatCounter
                      value={careerStat.value}
                      suffix={careerStat.suffix}
                    />
                  </div>
                  <div className="mt-2 font-accent text-xs tracking-wider text-light-gray md:text-sm">
                    {careerStat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
