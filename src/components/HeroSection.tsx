import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import profileImage from "@/assets/profile.jpg";

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const floatingElements = [
    { size: "w-2 h-2", delay: 0, duration: 4, x: "10%", y: "20%" },
    { size: "w-3 h-3", delay: 0.5, duration: 5, x: "85%", y: "15%" },
    { size: "w-1.5 h-1.5", delay: 1, duration: 3.5, x: "75%", y: "70%" },
    { size: "w-2.5 h-2.5", delay: 0.3, duration: 4.5, x: "15%", y: "75%" },
    { size: "w-2 h-2", delay: 0.8, duration: 3, x: "90%", y: "45%" },
  ];

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-20"
    >
      {/* Animated background gradient */}
      <motion.div 
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(ellipse at 30% 20%, hsl(340 70% 65% / 0.08), transparent 50%)",
            "radial-gradient(ellipse at 70% 80%, hsl(340 70% 65% / 0.08), transparent 50%)",
            "radial-gradient(ellipse at 30% 20%, hsl(340 70% 65% / 0.08), transparent 50%)",
          ]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating particles */}
      {floatingElements.map((el, i) => (
        <motion.div
          key={i}
          className={`absolute ${el.size} rounded-full bg-primary/30`}
          style={{ left: el.x, top: el.y }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: el.duration,
            delay: el.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <motion.div
        style={{ y, opacity, scale }}
        className="container mx-auto px-6 relative z-10"
      >
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Profile image - More creative layout */}
          <motion.div
            style={{ y: imageY }}
            className="relative flex-shrink-0 order-1 lg:order-2"
          >
            <div className="relative">
              {/* Decorative elements */}
              <motion.div
                className="absolute -top-8 -left-8 w-24 h-24 border border-primary/20 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute -bottom-4 -right-4 w-16 h-16 bg-primary/10 rounded-full blur-xl"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              
              {/* Main image container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                className="relative"
              >
                {/* Artistic frame */}
                <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 via-transparent to-primary/10 rounded-3xl transform rotate-3" />
                <div className="absolute -inset-2 bg-gradient-to-tl from-primary/10 via-transparent to-primary/20 rounded-2xl transform -rotate-2" />
                
                <div className="relative w-72 h-80 md:w-80 md:h-96 rounded-2xl overflow-hidden glow-effect">
                  <img
                    src={profileImage}
                    alt="Photo de profil d'Emma"
                    className="w-full h-full object-cover"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                  
                  {/* Decorative corner accent */}
                  <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-primary/50 rounded-tr-lg" />
                  <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-primary/50 rounded-bl-lg" />
                </div>
              </motion.div>

              {/* Floating tag */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute -right-4 top-1/3 bg-card/80 backdrop-blur-sm border border-border px-4 py-2 rounded-full"
              >
                <span className="text-sm text-primary font-medium">✨ Créative</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Text content */}
          <motion.div
            style={{ y: textY }}
            className="flex-1 space-y-8 text-center lg:text-left order-2 lg:order-1"
          >
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-2 bg-secondary/50 backdrop-blur-sm border border-border px-5 py-2 rounded-full"
              >
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm text-muted-foreground tracking-wide">
                  Disponible pour de nouveaux projets
                </span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9]"
              >
                <span className="block mb-2">Bonjour, je suis</span>
                <span className="block text-gradient relative">
                  Emma
                  <motion.span
                    className="absolute -bottom-2 left-0 w-full h-1 bg-primary/30 rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                  />
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-xl md:text-2xl text-muted-foreground font-light max-w-lg mx-auto lg:mx-0"
              >
                <span className="text-primary">Développeuse créative</span> passionnée 
                par le design et les expériences digitales uniques.
              </motion.p>
            </div>

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

            {/* Social proof / stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex gap-8 justify-center lg:justify-start pt-4"
            >
              {[
                { value: "5+", label: "Années d'exp." },
                { value: "30+", label: "Projets" },
                { value: "∞", label: "Passion" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl md:text-3xl font-display font-bold text-primary">{stat.value}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
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