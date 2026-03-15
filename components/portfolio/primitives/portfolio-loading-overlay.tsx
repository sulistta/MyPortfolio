import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { portfolioEntranceEase } from "../portfolio-motion";

type PortfolioLoadingOverlayProps = {
  onLoadingComplete: () => void;
};

export function PortfolioLoadingOverlay({
  onLoadingComplete,
}: PortfolioLoadingOverlayProps) {
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    let completionTimeoutId: number | undefined;
    const progressIntervalId = window.setInterval(() => {
      setLoadingProgress((currentProgress) => {
        if (currentProgress >= 100) {
          window.clearInterval(progressIntervalId);
          completionTimeoutId = window.setTimeout(onLoadingComplete, 500);
          return 100;
        }

        return currentProgress + 15 * Math.random();
      });
    }, 100);

    return () => {
      window.clearInterval(progressIntervalId);

      if (completionTimeoutId) {
        window.clearTimeout(completionTimeoutId);
      }
    };
  }, [onLoadingComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-ink-black"
      exit={{ y: "-100%" }}
      transition={{ duration: 0.8, ease: portfolioEntranceEase }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="mb-8 font-heading text-4xl text-white md:text-6xl">
          LOADING
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            ...
          </motion.span>
        </h2>

        <div className="h-4 w-64 overflow-hidden border-4 border-white bg-gray-800 md:w-96">
          <motion.div
            className="h-full bg-electric-yellow"
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(loadingProgress, 100)}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        <p className="mt-4 font-mono text-xl text-white">
          {Math.min(Math.round(loadingProgress), 100)}%
        </p>
      </motion.div>

      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute left-20 top-20 h-16 w-16 border-4 border-hot-magenta"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-20 right-20 h-20 w-20 rounded-full border-4 border-cyan-blast"
      />
    </motion.div>
  );
}
