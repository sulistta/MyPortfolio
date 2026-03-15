import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function PortfolioCursorTrail() {
  const [isHoveringInteractiveElement, setIsHoveringInteractiveElement] =
    useState(false);
  const [isCursorEnabled, setIsCursorEnabled] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const mainCursorX = useSpring(cursorX, { damping: 25, stiffness: 400 });
  const mainCursorY = useSpring(cursorY, { damping: 25, stiffness: 400 });
  const trailOneX = useSpring(cursorX, { damping: 35, stiffness: 270 });
  const trailOneY = useSpring(cursorY, { damping: 35, stiffness: 270 });
  const trailTwoX = useSpring(cursorX, { damping: 40, stiffness: 240 });
  const trailTwoY = useSpring(cursorY, { damping: 40, stiffness: 240 });
  const trailThreeX = useSpring(cursorX, { damping: 45, stiffness: 210 });
  const trailThreeY = useSpring(cursorY, { damping: 45, stiffness: 210 });
  const trailFourX = useSpring(cursorX, { damping: 50, stiffness: 180 });
  const trailFourY = useSpring(cursorY, { damping: 50, stiffness: 180 });

  const cursorTrailDots = [
    { x: trailOneX, y: trailOneY, size: 5, opacity: 0.5 },
    { x: trailTwoX, y: trailTwoY, size: 4, opacity: 0.4 },
    { x: trailThreeX, y: trailThreeY, size: 3, opacity: 0.3 },
    { x: trailFourX, y: trailFourY, size: 2, opacity: 0.2 },
  ];

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    setIsCursorEnabled(true);
    document.body.classList.add("cursor-hidden");

    const handleMouseMove = (event: MouseEvent) => {
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);
    };

    const handlePointerOver = (event: PointerEvent) => {
      if (!(event.target instanceof Element)) {
        return;
      }

      setIsHoveringInteractiveElement(
        event.target.closest("a, button, [data-cursor-hover]") !== null,
      );
    };

    const handlePointerOut = (event: PointerEvent) => {
      if (
        event.relatedTarget instanceof Element &&
        event.relatedTarget.closest("a, button, [data-cursor-hover]")
      ) {
        return;
      }

      setIsHoveringInteractiveElement(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("pointerover", handlePointerOver);
    document.addEventListener("pointerout", handlePointerOut);

    return () => {
      document.body.classList.remove("cursor-hidden");
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("pointerover", handlePointerOver);
      document.removeEventListener("pointerout", handlePointerOut);
    };
  }, [cursorX, cursorY]);

  if (!isCursorEnabled) {
    return null;
  }

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] mix-blend-difference"
        style={{ x: mainCursorX, y: mainCursorY }}
      >
        <motion.div
          className="relative -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-transparent"
          animate={{
            width: isHoveringInteractiveElement ? 60 : 24,
            height: isHoveringInteractiveElement ? 60 : 24,
            backgroundColor: isHoveringInteractiveElement
              ? "rgba(255, 233, 0, 0.3)"
              : "transparent",
          }}
          transition={{ duration: 0.15, ease: "easeOut" }}
        />
      </motion.div>

      {cursorTrailDots.map((cursorTrailDot, trailIndex) => (
        <motion.div
          key={trailIndex}
          className="pointer-events-none fixed left-0 top-0 z-[9998]"
          style={{ x: cursorTrailDot.x, y: cursorTrailDot.y }}
        >
          <div
            className="relative -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric-yellow"
            style={{
              width: cursorTrailDot.size,
              height: cursorTrailDot.size,
              opacity: cursorTrailDot.opacity,
            }}
          />
        </motion.div>
      ))}
    </>
  );
}
