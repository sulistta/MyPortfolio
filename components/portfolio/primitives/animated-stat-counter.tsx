import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import type { CareerStat } from "../portfolio-types";
import { portfolioRevealViewport } from "../portfolio-motion";

type AnimatedStatCounterProps = Pick<CareerStat, "value" | "suffix">;

export function AnimatedStatCounter({
  value,
  suffix,
}: AnimatedStatCounterProps) {
  const counterReference = useRef<HTMLSpanElement>(null);
  const isCounterVisible = useInView(counterReference, portfolioRevealViewport);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isCounterVisible) {
      return;
    }

    let animationStartTime: number | undefined;
    let animationFrameId = 0;

    const updateCounter = (timestamp: number) => {
      if (!animationStartTime) {
        animationStartTime = timestamp;
      }

      const progress = Math.min((timestamp - animationStartTime) / 2000, 1);
      setDisplayValue(Math.floor((1 - Math.pow(1 - progress, 3)) * value));

      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(updateCounter);
      }
    };

    animationFrameId = window.requestAnimationFrame(updateCounter);
    return () => window.cancelAnimationFrame(animationFrameId);
  }, [isCounterVisible, value]);

  return (
    <span ref={counterReference}>
      {displayValue}
      {suffix}
    </span>
  );
}
