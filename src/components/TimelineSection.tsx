import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface TimelineItem {
  year: string;
  title: string;
  company: string;
  description: string;
}

const timelineData: TimelineItem[] = [
  {
    year: "2024",
    title: "Lead Développeur",
    company: "Startup Innovante",
    description: "Direction technique et création de produits digitaux innovants.",
  },
  {
    year: "2022",
    title: "Développeur Senior",
    company: "Agence Créative",
    description: "Développement d'applications web et mobiles pour des clients premium.",
  },
  {
    year: "2020",
    title: "Développeur Full-Stack",
    company: "Tech Company",
    description: "Conception et développement de solutions sur mesure.",
  },
  {
    year: "2018",
    title: "Développeur Junior",
    company: "Studio Digital",
    description: "Premiers pas dans le développement web professionnel.",
  },
];

const TimelineSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section id="parcours" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <span className="text-primary font-medium tracking-widest uppercase text-sm">
            Mon Parcours
          </span>
          <h2 className="section-title mt-4">
            <span className="text-gradient">Expérience</span>
          </h2>
        </motion.div>

        <div ref={containerRef} className="relative">
          {/* Animated line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute left-1/2 top-0 bottom-0 w-px origin-top hidden md:block"
            style={{ 
              background: "linear-gradient(to bottom, transparent, hsl(var(--primary)), transparent)" 
            }}
          />

          <div className="space-y-24">
            {timelineData.map((item, index) => (
              <TimelineCard key={item.year} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const TimelineCard = ({ item, index }: { item: TimelineItem; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`flex items-center gap-8 ${
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      } flex-col md:text-left`}
    >
      {/* Content */}
      <div className={`flex-1 ${isLeft ? "md:text-right" : "md:text-left"}`}>
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="bg-card p-8 rounded-2xl border border-border hover:border-primary/50 transition-colors group"
        >
          <span className="text-5xl font-display font-bold text-gradient">
            {item.year}
          </span>
          <h3 className="text-2xl font-display font-semibold mt-4 text-foreground group-hover:text-primary transition-colors">
            {item.title}
          </h3>
          <p className="text-primary font-medium mt-1">{item.company}</p>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            {item.description}
          </p>
        </motion.div>
      </div>

      {/* Center dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="relative z-10 hidden md:flex items-center justify-center"
      >
        <div className="w-5 h-5 bg-primary rounded-full glow-effect" />
        <div className="absolute w-10 h-10 bg-primary/20 rounded-full animate-ping" />
      </motion.div>

      {/* Spacer */}
      <div className="flex-1 hidden md:block" />
    </motion.div>
  );
};

export default TimelineSection;