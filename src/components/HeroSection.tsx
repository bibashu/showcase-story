import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Laptop, Code, Terminal, Cpu, ChevronRight, Mail } from "lucide-react";
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

const FloatingTechElement = ({
  children,
  className = "",
  delay = 0,
  duration = 4,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.6 }}
    className={`absolute ${className}`}
  >
    <motion.div
      animate={{ y: [0, -12, 0], rotate: [0, 1, 0] }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay * 0.3,
      }}
    >
      {children}
    </motion.div>
  </motion.div>
);

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
  const leftX = useTransform(scrollYProgress, [0, 0.5], [0, -60]);
  const rightX = useTransform(scrollYProgress, [0, 0.5], [0, 60]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Decorative tech background grid */}
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-[0.06] pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="hero-grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="hsl(var(--accent))" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>

      {/* Soft gradient glow */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-accent/5 blur-3xl pointer-events-none" />

      <motion.div
        style={{ opacity }}
        className="container mx-auto px-6 lg:px-12 py-20 relative z-10"
      >
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 min-h-[calc(100vh-10rem)]">
          {/* Left content column */}
          <motion.div
            style={{ x: leftX }}
            className="flex-1 z-10 text-center lg:text-left order-2 lg:order-1"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-secondary tracking-widest uppercase">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                </span>
                <span className="text-xs font-bold text-primary">
                  Fullstack Developer • Sénégal
                </span>
              </div>

              <div className="space-y-2">
                <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.9] text-foreground">
                  <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="block italic text-accent mb-2"
                  >
                    {displayedName.split(" ")[0] || "A"}
                  </motion.span>
                  <span className="relative inline-block">
                    {displayedName.split(" ").slice(1).join(" ") || ""}
                    <motion.span
                      className="inline-block w-1 h-12 md:h-16 lg:h-20 bg-primary ml-1 align-middle"
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                    />
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 1.5, duration: 0.8 }}
                      className="absolute -bottom-2 right-0 w-24 h-1.5 bg-primary origin-left"
                    />
                  </span>
                </h1>
              </div>

              <p className="text-lg md:text-xl text-muted-foreground max-w-md mx-auto lg:mx-0 leading-relaxed font-light">
                Architecte de solutions numériques mêlant{" "}
                <span className="text-accent font-semibold">performance technique</span> et{" "}
                <span className="text-primary font-semibold">élégance visuelle</span>.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <motion.a
                  href="#projets"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="group inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold shadow-lg shadow-primary/25 transition-all"
                >
                  <span>Démarrer un projet</span>
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </motion.span>
                </motion.a>

                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 border border-border bg-card/80 backdrop-blur-sm text-card-foreground px-8 py-4 rounded-full font-semibold hover:border-primary/50 hover:bg-card transition-all"
                >
                  <Mail className="w-4 h-4" />
                  Me contacter
                </motion.a>

                <div className="hidden md:flex -space-x-2">
                  {["JS", "PY", "TS"].map((lang, i) => (
                    <motion.div
                      key={lang}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 + i * 0.1 }}
                      whileHover={{ scale: 1.15, zIndex: 10 }}
                      className="w-11 h-11 rounded-full bg-muted border-2 border-background flex items-center justify-center text-[10px] font-bold text-muted-foreground cursor-default"
                    >
                      {lang}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Animated stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="grid grid-cols-2 gap-8 max-w-sm mx-auto lg:mx-0 pt-8 border-t border-border"
              >
                <div className="text-center lg:text-left">
                  <div className="text-3xl md:text-4xl font-display font-bold text-foreground">
                    <AnimatedCounter value={5} suffix="+" delay={1200} />
                  </div>
                  <div className="text-[10px] uppercase tracking-tighter text-muted-foreground font-bold mt-1">
                    Années d'expertise
                  </div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-3xl md:text-4xl font-display font-bold text-foreground">
                    <AnimatedCounter value={30} suffix="+" delay={1500} />
                  </div>
                  <div className="text-[10px] uppercase tracking-tighter text-muted-foreground font-bold mt-1">
                    Projets livrés
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right image column */}
          <motion.div
            style={{ x: rightX }}
            className="flex-1 relative flex justify-center lg:justify-end items-center order-1 lg:order-2"
          >
            {/* Floating git commit card */}
            <FloatingTechElement className="top-4 -left-4 lg:left-8 z-30" delay={1.2} duration={5}>
              <div className="bg-card/90 backdrop-blur-xl border border-border p-4 rounded-2xl shadow-soft flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <code className="text-xs font-mono text-muted-foreground">
                  git commit -m &quot;feat: magic&quot;
                </code>
              </div>
            </FloatingTechElement>

            {/* Current stack card */}
            <FloatingTechElement className="bottom-24 -right-4 lg:-right-8 z-30" delay={1.4} duration={6}>
              <div className="bg-accent text-accent-foreground p-5 rounded-2xl shadow-soft transform rotate-3">
                <div className="text-[10px] font-bold uppercase opacity-80 mb-1">Current Stack</div>
                <div className="text-sm font-bold flex items-center gap-2">
                  <Laptop className="w-4 h-4" />
                  Next.js / Tailwind / Node
                </div>
              </div>
            </FloatingTechElement>

            {/* Floating code icon */}
            <FloatingTechElement className="-top-2 right-8 lg:right-0 z-30" delay={1.6} duration={4.5}>
              <div className="w-16 h-16 rounded-2xl bg-card shadow-lg border border-border flex items-center justify-center transform rotate-12 hover:rotate-0 transition-transform duration-500">
                <Code className="w-8 h-8 text-primary" />
              </div>
            </FloatingTechElement>

            {/* Floating terminal icon */}
            <FloatingTechElement className="bottom-8 left-0 lg:-left-4 z-20" delay={1.8} duration={5.5}>
              <div className="w-12 h-12 rounded-full bg-secondary/80 border border-secondary flex items-center justify-center">
                <Terminal className="w-5 h-5 text-accent" />
              </div>
            </FloatingTechElement>

            {/* Floating CPU icon */}
            <FloatingTechElement className="top-1/3 -right-2 lg:-right-12 z-20" delay={2} duration={4}>
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Cpu className="w-5 h-5 text-primary" />
              </div>
            </FloatingTechElement>

            {/* Profile composition */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
              className="relative w-72 lg:w-96 aspect-[3/4]"
            >
              {/* Dual decorative borders */}
              <motion.div
                animate={{ rotate: [6, 3, 6] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full border-[12px] border-secondary translate-x-6 translate-y-6"
              />
              <motion.div
                animate={{ rotate: [-3, -1, -3] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full border-2 border-accent -translate-x-4 -translate-y-4"
              />

              {/* Main image container */}
              <div className="relative w-full h-full rounded-full overflow-hidden bg-muted border-4 border-background shadow-soft">
                <img
                  src={emmaProfileAsset.url}
                  alt="Photo de profil d'Aby Ndiaye"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Soft glow behind photo */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/10 to-accent/10 blur-xl -z-10 scale-110" />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
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
