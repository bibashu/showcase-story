import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import emmaProfileAsset from "@/assets/emma-profile.jpg.asset.json";

const AnimatedCounter = ({ value, suffix = "", delay = 0 }: { value: number; suffix?: string; delay?: number }) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    const duration = 1500;
    const steps = 40;
    const increment = value / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(interval);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(interval);
  }, [started, value]);

  return <>{count}{suffix}</>;
};

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [displayedName, setDisplayedName] = useState("");
  const fullName = "Aby Ndiaye";

  useEffect(() => {
    const startDelay = setTimeout(() => {
      if (displayedName.length < fullName.length) {
        const timeout = setTimeout(() => {
          setDisplayedName(fullName.slice(0, displayedName.length + 1));
        }, 150);
        return () => clearTimeout(timeout);
      }
    }, 600);
    return () => clearTimeout(startDelay);
  }, [displayedName]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const leftX = useTransform(scrollYProgress, [0, 0.5], [0, -80]);
  const rightX = useTransform(scrollYProgress, [0, 0.5], [0, 80]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Split background */}
      <div className="absolute inset-0 flex">
        <div className="w-full lg:w-1/2 bg-background" />
        <div className="hidden lg:block w-1/2 bg-primary/5" />
      </div>

      {/* Diagonal separator */}
      <div className="hidden lg:block absolute inset-0 z-[1]">
        <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
          <polygon fill="hsl(var(--primary) / 0.05)" points="45,0 55,0 50,100 40,100" />
        </svg>
      </div>

      <motion.div style={{ opacity }} className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center min-h-screen py-20">
          {/* Left - Text */}
          <motion.div
            style={{ x: leftX }}
            className="flex-1 space-y-8 text-center lg:text-left lg:pr-16 order-2 lg:order-1"
          >
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-5 py-2 rounded-full">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm text-muted-foreground tracking-wide">
                  Disponible pour de nouveaux projets
                </span>
              </div>

              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9]">
                <span className="block mb-2 text-muted-foreground/80">Bonjour, je suis</span>
                <span className="block text-gradient relative">
                  {displayedName}
                  <motion.span
                    className="inline-block w-1 h-12 md:h-16 lg:h-20 bg-primary ml-1 align-middle"
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                  />
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-muted-foreground font-light max-w-lg mx-auto lg:mx-0">
                <span className="text-primary font-medium">Développeuse créative</span> passionnée
                par le design et les expériences digitales uniques.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <a
                href="#projets"
                className="group relative inline-flex items-center justify-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-full font-medium overflow-hidden transition-transform hover:scale-105"
              >
                <span className="relative z-10">Découvrir mes projets</span>
                <motion.span
                  className="relative z-10"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 border border-border bg-secondary/30 backdrop-blur-sm px-8 py-4 rounded-full font-medium hover:bg-secondary/50 transition-all hover:border-primary/50"
              >
                Me contacter
              </a>
            </motion.div>

            {/* Animated stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex gap-10 justify-center lg:justify-start pt-6"
            >
              {[
                { value: 5, suffix: "+", label: "Années d'exp." },
                { value: 30, suffix: "+", label: "Projets" },
              ].map((stat, i) => (
                <div key={i} className="relative">
                  <div className="text-4xl md:text-5xl font-display font-bold text-primary">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} delay={1200 + i * 300} />
                  </div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{stat.label}</div>
                  {i === 0 && (
                    <div className="absolute -right-5 top-1/2 -translate-y-1/2 w-px h-10 bg-border" />
                  )}
                </div>
              ))}
              <div>
                <div className="text-4xl md:text-5xl font-display font-bold text-primary">∞</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Passion</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Image */}
          <motion.div
            style={{ x: rightX }}
            className="flex-1 flex justify-center order-1 lg:order-2 mb-12 lg:mb-0"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85, x: 60 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
              className="relative"
            >
              {/* Decorative line frame */}
              <div className="absolute -inset-6 border border-primary/15 rounded-[2rem] transform rotate-3" />
              <div className="absolute -inset-3 border border-primary/10 rounded-[1.5rem] transform -rotate-1" />

              <div className="relative w-72 h-[22rem] md:w-80 md:h-[26rem] lg:w-[24rem] lg:h-[30rem] rounded-[50%] overflow-hidden">
                <img
                  src={emmaProfileAsset.url}
                  alt="Photo de profil d'Aby Ndiaye"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
              </div>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
                className="absolute -right-6 top-1/4 bg-card/90 backdrop-blur-sm border border-border px-4 py-2 rounded-full shadow-lg"
              >
                <span className="text-sm text-primary font-medium">✨ Créative</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
                className="absolute -left-6 bottom-1/4 bg-card/90 backdrop-blur-sm border border-border px-4 py-2 rounded-full shadow-lg"
              >
                <span className="text-sm text-primary font-medium">🎨 Design</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-3"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Défiler</span>
          <div className="w-6 h-10 rounded-full border border-border flex justify-center pt-2">
            <motion.div
              className="w-1 h-2 rounded-full bg-primary"
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;