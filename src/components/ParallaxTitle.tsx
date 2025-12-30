import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface ParallaxTitleProps {
  children: React.ReactNode;
  direction?: "left" | "right";
  speed?: number;
}

const ParallaxTitle = ({ children, direction = "left", speed = 200 }: ParallaxTitleProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "left" ? [speed, -speed] : [-speed, speed]
  );

  return (
    <div ref={ref} className="overflow-hidden py-8">
      <motion.h2
        style={{ x }}
        className="parallax-title text-foreground whitespace-nowrap"
      >
        {children}
      </motion.h2>
    </div>
  );
};

export default ParallaxTitle;