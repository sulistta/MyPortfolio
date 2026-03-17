import { motion } from "framer-motion";
import { useState } from "react";
import { portfolioEntranceEase } from "../portfolio-motion";
import {
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
    return "#000";
  }

  const red = Number.parseInt(normalizedHexColor.slice(0, 2), 16);
  const green = Number.parseInt(normalizedHexColor.slice(2, 4), 16);
  const blue = Number.parseInt(normalizedHexColor.slice(4, 6), 16);
  const luminance = (red * 299 + green * 587 + blue * 114) / 1000;

  return luminance >= 140 ? "#000" : "#FFF";
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
  const hoveredIconColor = getContrastingTextColor(skillHighlight.color);

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
            ? `8px 8px 0px ${skillHighlight.color}`
            : "4px 4px 0px #000",
        }}
        transition={{ duration: 0.2 }}
        className={`relative cursor-pointer overflow-hidden ${portfolioSurfaceClassNames.panel} p-4 md:p-6`}
      >
        <div
          className="mb-4 flex h-12 w-12 items-center justify-center border-4 border-black transition-colors duration-200 md:h-14 md:w-14"
          style={{
            backgroundColor: isCardHovered ? skillHighlight.color : "transparent",
          }}
        >
          <SkillIcon
            className="h-6 w-6 transition-colors duration-200 md:h-7 md:w-7"
            style={{ color: isCardHovered ? hoveredIconColor : skillHighlight.color }}
          />
        </div>

        <h3 className={portfolioTypographyClassNames.skillCardTitle}>
          {skillHighlight.name}
        </h3>

        <div className="mt-3 h-2 overflow-hidden border-2 border-black bg-gray-200">
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
            style={{ backgroundColor: skillHighlight.color }}
          />
        </div>

        <motion.div
          animate={{ opacity: isCardHovered ? 0.1 : 0 }}
          className="pointer-events-none absolute inset-0"
          style={{ backgroundColor: skillHighlight.color }}
        />
      </motion.div>

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: isCardHovered ? 1 : 0,
          opacity: isCardHovered ? 1 : 0,
        }}
        className="absolute -right-2 -top-2 z-10 border-2 border-white bg-black px-2 py-1 font-accent text-xs text-white"
      >
        {skillHighlight.proficiency}%
      </motion.div>
    </motion.div>
  );
}
