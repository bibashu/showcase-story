import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Award, ExternalLink, Calendar, CheckCircle } from "lucide-react";

const certifications = [
  {
    id: 1,
    title: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    date: "2024",
    credentialId: "AWS-SAA-C03",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg",
    color: "from-orange-500/20 to-yellow-500/20",
    borderColor: "border-orange-500/30",
    skills: ["Cloud Architecture", "AWS Services", "Security"],
  },
  {
    id: 2,
    title: "Google UX Design Professional",
    issuer: "Google",
    date: "2023",
    credentialId: "GUXD-2023",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg",
    color: "from-blue-500/20 to-green-500/20",
    borderColor: "border-blue-500/30",
    skills: ["UX Research", "Wireframing", "Prototyping"],
  },
  {
    id: 3,
    title: "Meta Front-End Developer",
    issuer: "Meta",
    date: "2023",
    credentialId: "META-FED-2023",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.svg",
    color: "from-blue-600/20 to-indigo-500/20",
    borderColor: "border-blue-600/30",
    skills: ["React", "JavaScript", "Responsive Design"],
  },
  {
    id: 4,
    title: "Certified Scrum Master",
    issuer: "Scrum Alliance",
    date: "2022",
    credentialId: "CSM-2022",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg",
    color: "from-purple-500/20 to-pink-500/20",
    borderColor: "border-purple-500/30",
    skills: ["Agile", "Team Leadership", "Sprint Planning"],
  },
];

const CertificationsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section ref={containerRef} id="certifications" className="py-32 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ type: "spring", delay: 0.2 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border border-primary/20 mb-6"
          >
            <Award className="w-8 h-8 text-primary" />
          </motion.div>
          <span className="block text-primary text-sm tracking-[0.3em] uppercase font-medium mb-4">
            Certifications
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-bold">
            Mes <span className="text-gradient">Diplômes</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
            Des certifications reconnues qui valident mes compétences et mon expertise
          </p>
        </motion.div>

        {/* Certifications grid - Bento style */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 50, rotateX: -15 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative"
            >
              <div className={`relative bg-card/50 backdrop-blur-sm border ${cert.borderColor} rounded-3xl p-8 overflow-hidden transition-all duration-500 group-hover:border-primary/50`}>
                {/* Gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${cert.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                {/* Floating particles */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 rounded-full bg-primary"
                      animate={{
                        y: [-20, -40],
                        x: [i * 10, i * 15],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.3,
                      }}
                    />
                  ))}
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-start gap-4 mb-6">
                    {/* Logo */}
                    <motion.div
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      className="relative w-16 h-16 rounded-2xl bg-secondary/50 border border-border p-3 flex-shrink-0"
                    >
                      <img
                        src={cert.logo}
                        alt={cert.issuer}
                        className="w-full h-full object-contain"
                      />
                      {/* Verified badge */}
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                        <CheckCircle className="w-3 h-3 text-white" />
                      </div>
                    </motion.div>

                    {/* Title & Issuer */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {cert.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mt-1">{cert.issuer}</p>
                    </div>
                  </div>

                  {/* Meta info */}
                  <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      <span>{cert.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-mono bg-secondary/50 px-2 py-0.5 rounded">
                        {cert.credentialId}
                      </span>
                    </div>
                  </div>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {cert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs px-3 py-1.5 rounded-full bg-secondary/50 border border-border text-muted-foreground group-hover:border-primary/30 group-hover:text-foreground transition-all"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* View credential link */}
                  <motion.a
                    href="#"
                    whileHover={{ x: 5 }}
                    className="inline-flex items-center gap-2 text-sm text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Voir le certificat
                    <ExternalLink className="w-4 h-4" />
                  </motion.a>
                </div>

                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-24 h-24 opacity-10">
                  <div className="absolute top-4 right-4 w-full h-full border-t-2 border-r-2 border-primary rounded-tr-3xl" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-16 max-w-3xl mx-auto"
        >
          <div className="relative bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border border-primary/20 rounded-2xl p-8">
            <div className="grid grid-cols-3 gap-8 text-center">
              {[
                { value: "4+", label: "Certifications" },
                { value: "100%", label: "Taux de réussite" },
                { value: "2024", label: "Dernière obtenue" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 1 + i * 0.1 }}
                >
                  <div className="text-3xl md:text-4xl font-display font-bold text-primary">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
            
            {/* Decorative glow */}
            <div className="absolute inset-0 bg-primary/5 blur-2xl rounded-full -z-10" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CertificationsSection;
