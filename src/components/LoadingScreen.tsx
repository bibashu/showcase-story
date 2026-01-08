import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [displayedName, setDisplayedName] = useState("");
  const fullName = "Emma";

  // Typing effect for the name
  useEffect(() => {
    if (displayedName.length < fullName.length) {
      const timeout = setTimeout(() => {
        setDisplayedName(fullName.slice(0, displayedName.length + 1));
      }, 150);
      return () => clearTimeout(timeout);
    }
  }, [displayedName]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {progress <= 100 && (
        <motion.div
          className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center overflow-hidden"
          exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
        >
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-96 h-96 rounded-full"
                style={{
                  background: `radial-gradient(circle, hsl(340 70% 65% / ${0.05 + i * 0.02}), transparent 70%)`,
                  left: `${20 + i * 15}%`,
                  top: `${10 + i * 20}%`,
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 3 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>

          {/* Main content */}
          <div className="relative z-10 text-center">
            {/* Animated name reveal */}
            <motion.div className="overflow-hidden mb-8">
              <motion.h1
                className="font-display text-6xl md:text-8xl font-bold text-gradient"
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              >
                {displayedName}
                <motion.span
                  className="inline-block w-1 h-12 md:h-16 bg-primary ml-1"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                />
              </motion.h1>
            </motion.div>

            {/* Subtitle with stagger */}
            <motion.div className="overflow-hidden mb-12">
              <motion.p
                className="text-muted-foreground text-lg tracking-[0.3em] uppercase"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Portfolio Créatif
              </motion.p>
            </motion.div>

            {/* Progress bar */}
            <div className="w-64 mx-auto">
              <div className="h-px bg-border relative overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-primary"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
              <motion.span
                className="text-xs text-muted-foreground mt-4 block font-mono"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {progress}%
              </motion.span>
            </div>
          </div>

          {/* Scrolling text marquee */}
          <div className="absolute bottom-20 left-0 right-0 overflow-hidden">
            <motion.div
              className="flex whitespace-nowrap"
              animate={{ x: [0, -1000] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              {[...Array(4)].map((_, i) => (
                <span
                  key={i}
                  className="text-[8rem] font-display font-bold text-border/30 mx-8"
                >
                  BIENVENUE • CRÉATIVITÉ • DESIGN • PASSION •
                </span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
