import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  aboutSectionContent,
  careerStats,
  portfolioBrand,
} from "../portfolio-content";
import {
  portfolioEntranceEase,
  portfolioRevealViewport,
} from "../portfolio-motion";
import {
  PORTFOLIO_SECTION_SCROLL_STYLE,
  portfolioLayoutClassNames,
} from "../portfolio-styles";
import { AnimatedStatCounter } from "../primitives/animated-stat-counter";
import { stickerAssetPaths } from "@/public/stickers";
import Image from "next/image";

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
  const portraitColumnOffset = useTransform(
    scrollYProgress,
    [0, 1],
    [100, -100],
  );

  return (
    <section
      id="about"
      ref={aboutSectionReference}
      className="relative overflow-hidden bg-ink-black py-24 md:py-32 lg:py-40"
      style={PORTFOLIO_SECTION_SCROLL_STYLE}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,233,0,0.16),transparent_36%),radial-gradient(circle_at_bottom_left,rgba(0,245,255,0.14),transparent_42%)]" />
      <div className="absolute right-0 top-0 h-full w-1/3 -skew-x-12 translate-x-1/4 bg-electric-yellow/10" />
      <div className="absolute left-0 top-16 h-40 w-40 -translate-x-1/3 rounded-full bg-hot-magenta/15 blur-3xl" />

      <div className={portfolioLayoutClassNames.contentContainer}>
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
              <div
                className="relative border-4 border-white bg-[#111111] p-4"
                style={{ boxShadow: "12px 12px 0px rgba(250, 250, 250, 0.16)" }}
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-charcoal">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_45%)]" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <motion.div
                        className="h-48 w-48 rounded-full border-4 border-white bg-electric-yellow md:h-64 md:w-64"
                        animate={{
                          boxShadow: [
                            "8px 8px 0px rgba(250, 250, 250, 0.22)",
                            "12px 12px 0px #FF006E",
                            "8px 8px 0px rgba(250, 250, 250, 0.22)",
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
                  <Image
                    src={stickerAssetPaths.circuloRosa}
                    alt="Circulo Rosa Sticker"
                    width={80}
                    height={80}
                    className="absolute right-4 top-4 h-8 w-8"
                  />
                  <Image
                    src={stickerAssetPaths.amarelo}
                    alt="Amarelo Sticker"
                    width={120}
                    height={120}
                    className="absolute bottom-4 left-4 h-12 w-12 rotate-12"
                  />
                </div>
              </div>

              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={
                  isAboutSectionVisible ? { scale: 1, rotate: -5 } : undefined
                }
                transition={{ delay: 0.5, duration: 0.5, type: "spring" }}
                className="absolute -bottom-6 -right-6 border-4 border-white bg-hot-magenta px-6 py-3 text-white"
                style={{ boxShadow: "8px 8px 0px rgba(250, 250, 250, 0.16)" }}
              >
                <span className="font-accent text-sm font-bold tracking-wider">
                  {portfolioBrand.availabilityLabel}
                </span>
              </motion.div>
            </motion.div>
          </motion.div>

          <div className="lg:col-span-7">
            <motion.h2
              className="mb-8 font-heading text-5xl text-white md:text-6xl lg:text-7xl"
            >
              {aboutSectionContent.heading
                .split("")
                .map((character, characterIndex) => (
                  <motion.span
                    key={`${character}-${characterIndex}`}
                    initial={{ y: 30, opacity: 0 }}
                    animate={
                      isAboutSectionVisible ? { y: 0, opacity: 1 } : undefined
                    }
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
                animate={
                  isAboutSectionVisible ? { y: 0, opacity: 1 } : undefined
                }
                transition={{ delay: 0.4, duration: 0.4 }}
                className="font-body text-lg leading-relaxed text-gray-300"
              >
                {renderHighlightedParagraph(
                  aboutSectionContent.paragraphs[0],
                  aboutSectionContent.introHighlight,
                  "bg-electric-yellow px-1 font-bold text-black",
                )}
              </motion.p>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={
                  isAboutSectionVisible ? { y: 0, opacity: 1 } : undefined
                }
                transition={{ delay: 0.5, duration: 0.4 }}
                className="font-body text-lg leading-relaxed text-gray-300"
              >
                {renderHighlightedParagraph(
                  aboutSectionContent.paragraphs[1],
                  aboutSectionContent.experienceHighlight,
                  "border-b-4 border-hot-magenta font-bold text-white",
                )}
              </motion.p>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={
                  isAboutSectionVisible ? { y: 0, opacity: 1 } : undefined
                }
                transition={{ delay: 0.6, duration: 0.4 }}
                className="font-body text-lg leading-relaxed text-gray-300"
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
                  whileHover={{
                    y: -5,
                    boxShadow: "8px 8px 0px rgba(255, 0, 110, 0.4)",
                  }}
                  className="border-4 border-white bg-[#101010] p-4 shadow-[8px_8px_0_0_rgba(250,250,250,0.14)] transition-all duration-200 md:p-6"
                >
                  <div className="font-heading text-3xl text-white md:text-4xl lg:text-5xl">
                    <AnimatedStatCounter
                      value={careerStat.value}
                      suffix={careerStat.suffix}
                    />
                  </div>
                  <div className="font-accent text-xs tracking-wider text-gray-400 md:text-sm">
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
