import { motion } from "framer-motion";
import type { ProjectPreviewVariant } from "../portfolio-types";

type PortfolioProjectPreviewArtworkProps = {
  accentColor: string;
  previewVariant: ProjectPreviewVariant;
};

export function PortfolioProjectPreviewArtwork({
  accentColor,
  previewVariant,
}: PortfolioProjectPreviewArtworkProps) {
  const previewInk = "rgba(245, 247, 251, 0.92)";
  const previewStroke = "rgba(245, 247, 251, 0.72)";
  const previewPaper = "rgba(7, 10, 18, 0.82)";
  const previewGlass = "rgba(245, 247, 251, 0.1)";

  if (previewVariant === "orbit") {
    return (
      <>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="h-40 w-40 rounded-full border-4"
          style={{ borderColor: accentColor }}
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 m-auto h-32 w-32 rounded-full border-4"
          style={{ borderColor: previewInk }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-heading text-4xl text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.45)]">
            3D
          </span>
        </div>
      </>
    );
  }

  if (previewVariant === "grid") {
    return (
      <div className="grid grid-cols-3 gap-2">
        {Array.from({ length: 9 }).map((_, gridBlockIndex) => (
          <motion.div
            key={gridBlockIndex}
            animate={{
              scale: [1, 1.2, 1],
              backgroundColor: [accentColor, previewGlass, accentColor],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: gridBlockIndex * 0.1,
            }}
            className="h-8 w-8 border-2"
            style={{ borderColor: previewStroke }}
          />
        ))}
      </div>
    );
  }

  if (previewVariant === "signal") {
    return (
      <div className="relative h-32 w-32">
        {Array.from({ length: 3 }).map((_, signalIndex) => (
          <motion.div
            key={signalIndex}
            animate={{ x: [-16, 16, -16] }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              delay: signalIndex * 0.15,
            }}
            className="absolute left-0 right-0 h-1 border-2"
            style={{
              top: `${24 + signalIndex * 28}px`,
              borderColor: signalIndex === 1 ? accentColor : previewStroke,
              backgroundColor:
                signalIndex === 1 ? `${accentColor}55` : previewGlass,
            }}
          />
        ))}
        <motion.div
          animate={{ scale: [1, 1.25, 1], opacity: [1, 0.65, 1] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-4"
          style={{ backgroundColor: accentColor, borderColor: previewInk }}
        />
      </div>
    );
  }

  if (previewVariant === "stack") {
    return (
      <div className="relative h-32 w-32">
        {[0, 1, 2].map((stackIndex) => (
          <motion.div
            key={stackIndex}
            animate={{
              rotate: [-8 + stackIndex * 6, 4 + stackIndex * 6, -8 + stackIndex * 6],
              y: [0, -6, 0],
            }}
            transition={{
              duration: 2.6,
              repeat: Infinity,
              delay: stackIndex * 0.15,
            }}
            className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 border-4"
            style={{
              backgroundColor: stackIndex === 1 ? accentColor : previewPaper,
              borderColor: stackIndex === 1 ? previewInk : previewStroke,
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <>
      <motion.div
        animate={{ height: [40, 80, 40] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="mx-1 inline-block w-4 border-2"
        style={{ borderColor: previewStroke, backgroundColor: previewGlass }}
      />
      <motion.div
        animate={{ height: [60, 30, 60] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="mx-1 inline-block w-4 border-2"
        style={{ borderColor: previewStroke, backgroundColor: accentColor }}
      />
      <motion.div
        animate={{ height: [30, 70, 30] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        className="mx-1 inline-block w-4 border-2"
        style={{ borderColor: previewStroke, backgroundColor: previewGlass }}
      />
      <motion.div
        animate={{ height: [50, 40, 50] }}
        transition={{ duration: 1.8, repeat: Infinity }}
        className="mx-1 inline-block w-4 border-2"
        style={{ borderColor: previewStroke, backgroundColor: previewInk }}
      />
    </>
  );
}
