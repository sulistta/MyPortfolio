import { motion } from "framer-motion";
import { useState } from "react";
import { portfolioEntranceEase } from "../portfolio-motion";
import {
  cn,
  portfolioSurfaceClassNames,
  portfolioTypographyClassNames,
} from "../portfolio-styles";
import type { SkillHighlight } from "../portfolio-types";

function getContrastingTextColor(backgroundColor: string) {
  const hexColor = backgroundColor.replace("#", "").trim();
  const normalizedHexColor =
    hexColor.length === 3
      ? hexColor
          .split("")
          .map((hexDigit) => `${hexDigit}${hexDigit}`)
          .join("")
      : hexColor;

  if (normalizedHexColor.length !== 6) {
    return "#05070c";
  }

  const red = Number.parseInt(normalizedHexColor.slice(0, 2), 16);
  const green = Number.parseInt(normalizedHexColor.slice(2, 4), 16);
  const blue = Number.parseInt(normalizedHexColor.slice(4, 6), 16);
  const luminance = (red * 299 + green * 587 + blue * 114) / 1000;

  return luminance >= 140 ? "#05070c" : "#F5F7FB";
}

function resolveSkillAccentColor(backgroundColor: string) {
  return backgroundColor.toLowerCase() === "#000000" ? "#fafafa" : backgroundColor;
}

type SkillHighlightCardProps = {
  skillHighlight: SkillHighlight;
  animationDelay: number;
  entryRotation: number;
  isSectionVisible: boolean;
};

export function SkillHighlightCard({
  skillHighlight,
  animationDelay,
  entryRotation,
  isSectionVisible,
}: SkillHighlightCardProps) {
  const [isCardHovered, setIsCardHovered] = useState(false);
  const SkillIcon = skillHighlight.icon;
  const resolvedAccentColor = resolveSkillAccentColor(skillHighlight.color);
  const hoveredIconColor = getContrastingTextColor(resolvedAccentColor);

  return (
    <motion.div
      initial={{ scale: 0, rotate: entryRotation, opacity: 0 }}
      animate={isSectionVisible ? { scale: 1, rotate: 0, opacity: 1 } : undefined}
      transition={{
        duration: 0.6,
        delay: animationDelay,
        ease: portfolioEntranceEase,
      }}
      onMouseEnter={() => setIsCardHovered(true)}
      onMouseLeave={() => setIsCardHovered(false)}
      className="group relative"
    >
      <motion.div
        animate={{
          y: isCardHovered ? -8 : 0,
          boxShadow: isCardHovered
            ? `8px 8px 0px ${resolvedAccentColor}`
            : "6px 6px 0px rgba(245, 247, 251, 0.14)",
        }}
        transition={{ duration: 0.2 }}
        className={cn(
          "relative cursor-pointer overflow-hidden border-white bg-[#10131c] p-4 shadow-[6px_6px_0px_rgba(245,247,251,0.14)] md:p-6",
          portfolioSurfaceClassNames.panel,
        )}
      >
        <div
          className="mb-4 flex h-12 w-12 items-center justify-center border-4 border-white transition-colors duration-200 md:h-14 md:w-14"
          style={{
            backgroundColor: isCardHovered ? resolvedAccentColor : `${resolvedAccentColor}22`,
          }}
        >
          <SkillIcon
            className="h-6 w-6 transition-colors duration-200 md:h-7 md:w-7"
            style={{
              color: isCardHovered ? hoveredIconColor : resolvedAccentColor,
            }}
          />
        </div>

        <h3 className={portfolioTypographyClassNames.skillCardTitle}>
          {skillHighlight.name}
        </h3>

        <div className="mt-3 h-2 overflow-hidden border-2 border-white/80 bg-white/10">
          <motion.div
            initial={{ width: 0 }}
            animate={
              isSectionVisible
                ? { width: `${skillHighlight.proficiency}%` }
                : undefined
            }
            transition={{
              duration: 1,
              delay: 0.5 + animationDelay,
              ease: "easeOut",
            }}
            className="h-full"
            style={{ backgroundColor: resolvedAccentColor }}
          />
        </div>

        <p className="mt-4 font-body text-xs uppercase tracking-[0.24em] text-theme-text-subtle">
          Interface Craft
        </p>

        <motion.div
          animate={{ opacity: isCardHovered ? 0.1 : 0 }}
          className="pointer-events-none absolute inset-0"
          style={{ backgroundColor: resolvedAccentColor }}
        />
      </motion.div>

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: isCardHovered ? 1 : 0,
          opacity: isCardHovered ? 1 : 0,
        }}
        className="absolute -right-2 -top-2 z-10 border-2 border-white bg-[rgba(6,8,15,0.9)] px-2 py-1 font-accent text-xs text-white"
      >
        {skillHighlight.proficiency}%
      </motion.div>
    </motion.div>
  );
}
