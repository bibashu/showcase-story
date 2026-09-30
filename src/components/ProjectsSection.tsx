import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Github, X, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  images: string[];
  link?: string;
  github?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "API Covoiturage",
    description: "API REST de covoiturage : trajets, réservations, véhicules, paiements, avis, messagerie temps réel et notifications (push et WhatsApp).",
    tags: ["NestJS", "PostgreSQL", "Redis", "Socket.io", "Docker"],
    images: [
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80",
      "https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=800&q=80",
    ],
    github: "https://github.com/bibashu/api-covoiturage",
  },
  {
    id: 2,
    title: "ArtisanHub",
    description: "Annuaire d'artisans : recherche d'artisans qualifiés près de chez soi, fiches détaillées avec créations en vidéo et audio, ajout d'annonces.",
    tags: ["React", "TypeScript", "Tailwind", "shadcn/ui"],
    images: [
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80",
    ],
    github: "https://github.com/bibashu/artisan-front",
  },
  {
    id: 3,
    title: "ProdManager",
    description: "Application full-stack de gestion de produits : authentification JWT, catalogue, ajout et modification de produits avec upload d'images.",
    tags: ["React", "Express", "PostgreSQL", "HeroUI"],
    images: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&q=80",
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    ],
    github: "https://github.com/bibashu/ProdManager",
  },
  {
    id: 4,
    title: "Tontine App",
    description: "Gestion de tontines : tableau de bord, création de tontines, gestion des membres et des groupes, suivi des paiements.",
    tags: ["JavaScript", "Firebase", "HTML/CSS"],
    images: [
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      "https://images.unsplash.com/photo-1543286386-713bdd548da4?w=800&q=80",
    ],
    github: "https://github.com/bibashu/tontine_app",
  },
  {
    id: 5,
    title: "API E-commerce",
    description: "Backend e-commerce : inscription et connexion sécurisées, gestion des produits, des partenaires et de la messagerie.",
    tags: ["Node.js", "Express", "MongoDB", "JWT"],
    images: [
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    ],
    github: "https://github.com/bibashu/Ecommerce-react-nodeJS",
  },
  {
    id: 6,
    title: "Projet Coach",
    description: "Application de coaching : inscription, connexion et tableau de suivi de progression, avec données stockées sur Firebase.",
    tags: ["React", "Firebase", "React Router"],
    images: [
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    ],
    github: "https://github.com/bibashu/projet_coach",
  },
];

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openProject = (project: Project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
  };

  const closeProject = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => 
        prev === selectedProject.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedProject.images.length - 1 : prev - 1
      );
    }
  };

  return (
    <section id="projets" className="py-32 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <span className="text-primary font-medium tracking-widest uppercase text-sm">
            Portfolio
          </span>
          <h2 className="section-title mt-4">
            Mes <span className="text-gradient">Projets</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index} 
              onClick={() => openProject(project)}
            />
          ))}
        </div>
      </div>

      {/* Project Gallery Modal */}
      <Dialog open={!!selectedProject} onOpenChange={closeProject}>
        <DialogContent className="max-w-5xl w-[95vw] max-h-[90vh] p-0 overflow-hidden bg-card border-border">
          <DialogTitle className="sr-only">
            {selectedProject?.title} - Galerie
          </DialogTitle>
          
          {selectedProject && (
            <div className="relative">
              {/* Header */}
              <div className="absolute top-0 left-0 right-0 z-20 p-6 bg-gradient-to-b from-background/90 to-transparent">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-display font-bold text-foreground">
                      {selectedProject.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mt-1">
                      {currentImageIndex + 1} / {selectedProject.images.length}
                    </p>
                  </div>
                  {selectedProject.github && (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mr-12 inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
                    >
                      <Github className="w-4 h-4" />
                      Voir le code
                    </a>
                  )}
                </div>
              </div>

              {/* Main Image */}
              <div className="relative h-[60vh] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    src={selectedProject.images[currentImageIndex]}
                    alt={`${selectedProject.title} - Image ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                  />
                </AnimatePresence>

                {/* Navigation Arrows */}
                {selectedProject.images.length > 1 && (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-background/80 backdrop-blur-sm rounded-full border border-border hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-background/80 backdrop-blur-sm rounded-full border border-border hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </motion.button>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              <div className="p-4 bg-card border-t border-border">
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                  {selectedProject.images.map((image, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        index === currentImageIndex 
                          ? "border-primary ring-2 ring-primary/30" 
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      {index === currentImageIndex && (
                        <motion.div
                          layoutId="activeThumb"
                          className="absolute inset-0 bg-primary/20"
                        />
                      )}
                    </motion.button>
                  ))}
                </div>

                {/* Project Info */}
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {selectedProject.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {selectedProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-secondary text-xs font-medium rounded-full text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

const ProjectCard = ({ 
  project, 
  index, 
  onClick 
}: { 
  project: Project; 
  index: number;
  onClick: () => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <motion.div
        whileHover={{ y: -10 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="relative bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300"
      >
        {/* Image */}
        <div className="relative h-64 overflow-hidden">
          <motion.img
            src={project.images[0]}
            alt={project.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
          
          {/* Image count badge */}
          <div className="absolute top-4 right-4 px-3 py-1 bg-background/80 backdrop-blur-sm rounded-full text-xs font-medium text-foreground border border-border">
            {project.images.length} photos
          </div>
          
          {/* Overlay actions */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-primary/10 backdrop-blur-sm flex items-center justify-center gap-4"
          >
            <motion.span
              whileHover={{ scale: 1.1 }}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium"
            >
              Voir la galerie
            </motion.span>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <h3 className="text-2xl font-display font-semibold group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-secondary text-xs font-medium rounded-full text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              <Github className="w-4 h-4" />
              Voir sur GitHub
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectsSection;
