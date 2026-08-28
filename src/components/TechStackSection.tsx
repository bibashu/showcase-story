import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Code2,
  Database,
  Palette,
  Globe,
  Server,
  Layout,
  FileCode,
  Layers,
  Cpu,
  Monitor,
  GitBranch,
  PenTool,
  Workflow,
  HardDrive,
  Binary,
  Box,
} from "lucide-react";

const skillCategories = [
  {
    title: "Langages & Frameworks",
    icon: Code2,
    skills: [
      { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", color: "007396" },
      { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", color: "3776AB" },
      { name: "PHP", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg", color: "777BB4" },
      { name: "Laravel", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg", color: "FF2D20" },
      { name: "C++", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg", color: "00599C" },
      { name: "Langage C", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg", color: "A8B9CC" },
      { name: "HTML5", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", color: "E34F26" },
      { name: "CSS3", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", color: "1572B6" },
      { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", color: "F7DF1E" },
      { name: "React JS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", color: "61DAFB" },
      { name: "React Native", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", color: "61DAFB" },
      { name: "Next JS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", color: "000000" },
      { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", color: "3178C6" },
      { name: "Tailwind CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg", color: "06B6D4" },
      { name: "Node JS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", color: "339933" },
      { name: "Django", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg", color: "092E20" },
      { name: "API REST", icon: Globe, color: "FF6B6B" },
    ],
  },
  {
    title: "Bases de données",
    icon: Database,
    skills: [
      { name: "SQL", icon: FileCode, color: "FFD93D" },
      { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", color: "4169E1" },
      { name: "Oracle", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg", color: "F80000" },
      { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", color: "4479A1" },
      { name: "NoSQL", icon: Layers, color: "4ECDC4" },
      { name: "Firebase", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg", color: "FFCA28" },
      { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", color: "47A248" },
    ],
  },
  {
    title: "Systèmes & Outils",
    icon: Monitor,
    skills: [
      { name: "Windows", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg", color: "0078D6" },
      { name: "Linux", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg", color: "FCC624" },
      { name: "GitHub", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", color: "181717" },
      { name: "GitLab", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg", color: "FC6D26" },
      { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", color: "F05032" },
      { name: "UI / UX", icon: PenTool, color: "FF6B9D" },
      { name: "WinDev", icon: HardDrive, color: "9B59B6" },
    ],
  },
  {
    title: "Bureautique & Design",
    icon: Palette,
    skills: [
      { name: "Word", icon: FileCode, color: "2B579A" },
      { name: "Excel", icon: Layout, color: "217346" },
      { name: "Access", icon: Database, color: "A4373A" },
      { name: "Photoshop", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-original.svg", color: "31A8FF" },
      { name: "Illustrator", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg", color: "FF9A00" },
      { name: "InDesign", icon: Layers, color: "FF3366" },
    ],
  },
];

const allSkills = skillCategories.flatMap((cat) => cat.skills);

const SkillCard = ({ skill, index }: { skill: any; index: number }) => {
  const IconComponent = skill.icon;
  const hasIcon = !!IconComponent;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{
        y: -10,
        scale: 1.08,
        transition: { duration: 0.2 },
      }}
      className="group relative"
    >
      <div className="relative bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-5 flex flex-col items-center gap-3 transition-all duration-300 group-hover:border-primary/50 group-hover:bg-card h-full">
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10"
          style={{ backgroundColor: `#${skill.color}20` }}
        />

        <div className="relative w-12 h-12 md:w-14 md:h-14 flex items-center justify-center">
          {skill.logo ? (
            <img
              src={skill.logo}
              alt={`${skill.name} logo`}
              className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
            />
          ) : (
            <div
              className="w-full h-full rounded-xl flex items-center justify-center transition-all duration-300"
              style={{ backgroundColor: `#${skill.color}15` }}
            >
              <IconComponent
                className="w-7 h-7 transition-all duration-300 group-hover:scale-110"
                style={{ color: `#${skill.color}` }}
              />
            </div>
          )}
        </div>

        <span className="text-xs md:text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors text-center leading-tight">
          {skill.name}
        </span>
      </div>
    </motion.div>
  );
};

const TechStackSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section ref={containerRef} className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(340_70%_65%_/_0.05),_transparent_60%)]" />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-primary text-sm tracking-[0.3em] uppercase font-medium">
            Technologies
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-bold mt-4">
            Mes <span className="text-gradient">Compétences</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Un ensemble de compétences techniques et créatives acquis au fil de mon parcours
          </p>
        </motion.div>

        {skillCategories.map((category, catIndex) => {
          const CategoryIcon = category.icon;
          return (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: catIndex * 0.15 }}
              className="mb-16 last:mb-0"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <CategoryIcon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display text-xl md:text-2xl font-semibold">
                  {category.title}
                </h3>
                <div className="flex-1 h-px bg-gradient-to-r from-primary/30 to-transparent" />
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                {category.skills.map((skill, skillIndex) => (
                  <SkillCard
                    key={skill.name}
                    skill={skill}
                    index={catIndex * 4 + skillIndex * 0.05}
                  />
                ))}
              </div>
            </motion.div>
          );
        })}

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-24 overflow-hidden"
        >
          <div className="relative py-6 border-y border-border/50 bg-secondary/20">
            <div className="flex gap-4">
              <motion.div
                className="flex gap-6 items-center"
                animate={{ x: [0, -1800] }}
                transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
              >
                {[...allSkills, ...allSkills, ...allSkills].map((skill, i) => {
                  const IconComponent = skill.icon;
                  return (
                    <div
                      key={`marquee-${i}`}
                      className="flex items-center gap-2 px-4 py-2 bg-card/50 rounded-full border border-border whitespace-nowrap"
                    >
                      {skill.logo ? (
                        <img
                          src={skill.logo}
                          alt={skill.name}
                          className="w-5 h-5 object-contain"
                        />
                      ) : IconComponent ? (
                        <IconComponent
                          className="w-4 h-4"
                          style={{ color: `#${skill.color}` }}
                        />
                      ) : null}
                      <span className="text-sm text-muted-foreground">{skill.name}</span>
                    </div>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechStackSection;
