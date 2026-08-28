import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Calendar, MapPin, School, BookOpen, Award } from "lucide-react";

interface FormationItem {
  period: string;
  diploma: string;
  school: string;
  location: string;
  level: string;
  icon: React.ElementType;
  color: string;
}

const formations: FormationItem[] = [
  {
    period: "Novembre 2021 - Juillet 2023",
    diploma: "Licence Professionnelle en Génie Logiciel",
    school: "Université Dakar-Bourguiba",
    location: "Dakar",
    level: "Licence",
    icon: GraduationCap,
    color: "from-rose-400 to-pink-500",
  },
  {
    period: "Février 2018 - Juin 2020",
    diploma: "Licence 2 : Economie et Gestion",
    school: "Université Virtuelle du Sénégal (UVS)",
    location: "Guédiawaye",
    level: "Licence 2",
    icon: BookOpen,
    color: "from-violet-400 to-purple-500",
  },
  {
    period: "Octobre 2015 - Juillet 2017",
    diploma: "BFEM, Baccalauréat",
    school: "Ecole Privée Savoir Plus",
    location: "Keur Massar",
    level: "Secondaire",
    icon: School,
    color: "from-cyan-400 to-blue-500",
  },
  {
    period: "Octobre 2006 - Juillet 2010",
    diploma: "CFEE",
    school: "Ecole Privée Sanka 2",
    location: "Malika",
    level: "Primaire",
    icon: Award,
    color: "from-emerald-400 to-teal-500",
  },
];

const FormationSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section ref={containerRef} id="formation" className="py-32 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ type: "spring", delay: 0.2 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border border-primary/20 mb-6"
          >
            <GraduationCap className="w-8 h-8 text-primary" />
          </motion.div>
          <span className="block text-primary text-sm tracking-[0.3em] uppercase font-medium mb-4">
            Formation
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-bold">
            Mon <span className="text-gradient">Parcours</span> Académique
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
            Les étapes de ma formation qui ont façonné mon expertise technique et ma vision professionnelle.
          </p>
        </motion.div>

        {/* Formation cards */}
        <div className="max-w-4xl mx-auto space-y-6">
          {formations.map((formation, index) => (
            <FormationCard key={formation.period} formation={formation} index={index} isInView={isInView} />
          ))}
        </div>

        {/* Decorative bottom element */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-card/50 backdrop-blur-sm border border-border rounded-full">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm text-muted-foreground">
              Formation continue et apprentissage permanent
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const FormationCard = ({
  formation,
  index,
  isInView,
}: {
  formation: FormationItem;
  index: number;
  isInView: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const cardInView = useInView(ref, { once: true, margin: "-50px" });
  const Icon = formation.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={cardInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="group relative"
    >
      <div className="relative bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 md:p-8 overflow-hidden transition-all duration-300 group-hover:border-primary/50">
        {/* Gradient background on hover */}
        <div className={`absolute inset-0 bg-gradient-to-r ${formation.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-start gap-6">
          {/* Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={cardInView ? { scale: 1, rotate: 0 } : {}}
            transition={{ delay: 0.2 + index * 0.1, type: "spring" }}
            className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${formation.color} flex items-center justify-center shadow-lg`}
          >
            <Icon className="w-7 h-7 text-white" />
          </motion.div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col md:flex-row md:items-center gap-3 mb-3">
              <h3 className="font-display text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                {formation.diploma}
              </h3>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-secondary/50 text-xs font-medium text-muted-foreground w-fit">
                {formation.level}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
              <span className="flex items-center gap-1.5">
                <School className="w-4 h-4 text-primary" />
                {formation.school}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-primary" />
                {formation.location}
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="font-medium text-foreground">{formation.period}</span>
            </div>
          </div>

          {/* Decorative corner */}
          <div className="absolute top-0 right-0 w-24 h-24 opacity-10 hidden md:block">
            <div className="absolute top-4 right-4 w-full h-full border-t-2 border-r-2 border-primary rounded-tr-2xl" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FormationSection;
