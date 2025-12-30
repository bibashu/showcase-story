import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Rocket, Code, GraduationCap, Calendar, MapPin, ArrowUpRight } from "lucide-react";

interface TimelineItem {
  year: string;
  endYear?: string;
  title: string;
  company: string;
  location: string;
  description: string;
  skills: string[];
  icon: React.ElementType;
  color: string;
}

const timelineData: TimelineItem[] = [
  {
    year: "2024",
    title: "Lead Développeuse",
    company: "Startup Innovante",
    location: "Paris, France",
    description: "Direction technique et création de produits digitaux innovants. Management d'une équipe de 5 développeurs.",
    skills: ["Leadership", "Architecture", "React", "Node.js"],
    icon: Rocket,
    color: "from-rose-500 to-pink-600",
  },
  {
    year: "2022",
    endYear: "2024",
    title: "Développeuse Senior",
    company: "Agence Créative",
    location: "Lyon, France",
    description: "Développement d'applications web et mobiles pour des clients premium. Conception d'interfaces innovantes.",
    skills: ["React Native", "TypeScript", "AWS", "GraphQL"],
    icon: Code,
    color: "from-violet-500 to-purple-600",
  },
  {
    year: "2020",
    endYear: "2022",
    title: "Développeuse Full-Stack",
    company: "Tech Company",
    location: "Bordeaux, France",
    description: "Conception et développement de solutions sur mesure. Optimisation des performances et de l'expérience utilisateur.",
    skills: ["Vue.js", "Python", "PostgreSQL", "Docker"],
    icon: Briefcase,
    color: "from-cyan-500 to-blue-600",
  },
  {
    year: "2018",
    endYear: "2020",
    title: "Développeuse Junior",
    company: "Studio Digital",
    location: "Toulouse, France",
    description: "Premiers pas dans le développement web professionnel. Formation continue et montée en compétences rapide.",
    skills: ["HTML/CSS", "JavaScript", "PHP", "MySQL"],
    icon: GraduationCap,
    color: "from-emerald-500 to-teal-600",
  },
];

const TimelineSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="parcours" className="py-32 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary font-medium tracking-widest uppercase text-sm mb-6"
          >
            Mon Parcours
          </motion.span>
          <h2 className="section-title">
            Une Histoire de <span className="text-gradient">Passion</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-6 text-lg">
            Chaque étape de mon parcours m'a permis de développer mes compétences et ma vision du développement web.
          </p>
        </motion.div>

        <div ref={containerRef} className="relative max-w-5xl mx-auto">
          {/* Animated progress line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-border hidden md:block">
            <motion.div
              className="w-full bg-gradient-to-b from-primary via-primary to-primary/50 origin-top"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Mobile line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent md:hidden" />

          <div className="space-y-12 md:space-y-24">
            {timelineData.map((item, index) => (
              <TimelineCard key={item.year} item={item} index={index} />
            ))}
          </div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { value: "6+", label: "Années d'expérience" },
            { value: "50+", label: "Projets réalisés" },
            { value: "30+", label: "Clients satisfaits" },
            { value: "15+", label: "Technologies maîtrisées" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6 bg-card/50 backdrop-blur-sm rounded-2xl border border-border hover:border-primary/30 transition-colors"
            >
              <span className="text-4xl md:text-5xl font-display font-bold text-gradient">{stat.value}</span>
              <p className="text-muted-foreground text-sm mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const TimelineCard = ({ item, index }: { item: TimelineItem; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const isLeft = index % 2 === 0;
  const Icon = item.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`relative flex items-start gap-6 md:gap-12 ${
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      } flex-row pl-20 md:pl-0`}
    >
      {/* Content */}
      <div className={`flex-1 ${isLeft ? "md:text-right" : "md:text-left"}`}>
        <motion.div
          whileHover={{ scale: 1.02, y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="relative bg-card p-6 md:p-8 rounded-2xl border border-border hover:border-primary/50 transition-all duration-300 group overflow-hidden"
        >
          {/* Gradient overlay on hover */}
          <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
          
          {/* Year badge */}
          <div className={`flex items-center gap-2 mb-4 ${isLeft ? "md:justify-end" : "md:justify-start"}`}>
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ delay: 0.4, type: "spring" }}
              className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${item.color} rounded-full`}
            >
              <Calendar className="w-4 h-4 text-white" />
              <span className="text-sm font-bold text-white">
                {item.year}{item.endYear ? ` - ${item.endYear}` : " - Présent"}
              </span>
            </motion.div>
          </div>

          {/* Title & Company */}
          <h3 className="text-2xl font-display font-bold text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
            {item.title}
            <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </h3>
          
          <div className={`flex items-center gap-4 mt-2 text-sm ${isLeft ? "md:justify-end" : "md:justify-start"} flex-wrap`}>
            <span className="text-primary font-semibold">{item.company}</span>
            <span className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="w-3 h-3" />
              {item.location}
            </span>
          </div>

          {/* Description */}
          <p className="text-muted-foreground mt-4 leading-relaxed">
            {item.description}
          </p>

          {/* Skills */}
          <div className={`flex flex-wrap gap-2 mt-5 ${isLeft ? "md:justify-end" : "md:justify-start"}`}>
            {item.skills.map((skill, i) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="px-3 py-1 bg-secondary text-xs font-medium rounded-full text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors cursor-default"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Center icon */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={isInView ? { scale: 1, rotate: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.3, type: "spring" }}
        className="absolute left-0 md:relative md:left-auto z-10 flex items-center justify-center"
      >
        <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-shadow`}>
          <Icon className="w-7 h-7 text-white" />
        </div>
        {/* Pulse effect */}
        <motion.div
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className={`absolute inset-0 bg-gradient-to-br ${item.color} rounded-2xl`}
        />
      </motion.div>

      {/* Spacer */}
      <div className="flex-1 hidden md:block" />
    </motion.div>
  );
};

export default TimelineSection;
