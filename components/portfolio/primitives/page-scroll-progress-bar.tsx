import { motion, useScroll, useSpring } from "framer-motion";

export function PageScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scrollProgressScale = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-[100] h-1 origin-left bg-electric-yellow"
      style={{ scaleX: scrollProgressScale }}
    />
  );
}
