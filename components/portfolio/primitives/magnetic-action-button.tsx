import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";
import { useRef, useState } from "react";
import { magneticButtonSpring } from "../portfolio-motion";

type MagneticActionButtonProps = Omit<HTMLMotionProps<"button">, "children"> & {
  children: ReactNode;
  className?: string;
  magnetStrength?: number;
};

export function MagneticActionButton({
  children,
  className = "",
  magnetStrength = 0.3,
  ...buttonProps
}: MagneticActionButtonProps) {
  const buttonReference = useRef<HTMLButtonElement>(null);
  const [magneticOffset, setMagneticOffset] = useState({ x: 0, y: 0 });

  return (
    <motion.button
      ref={buttonReference}
      className={className}
      onMouseMove={(event) => {
        if (!buttonReference.current) {
          return;
        }

        const buttonBounds = buttonReference.current.getBoundingClientRect();
        const buttonCenterX = buttonBounds.left + buttonBounds.width / 2;
        const buttonCenterY = buttonBounds.top + buttonBounds.height / 2;

        setMagneticOffset({
          x: (event.clientX - buttonCenterX) * magnetStrength,
          y: (event.clientY - buttonCenterY) * magnetStrength,
        });
      }}
      onMouseLeave={() => setMagneticOffset({ x: 0, y: 0 })}
      animate={{ x: magneticOffset.x, y: magneticOffset.y }}
      transition={magneticButtonSpring}
      {...buttonProps}
    >
      {children}
    </motion.button>
  );
}
