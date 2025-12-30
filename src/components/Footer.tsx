import { motion } from "framer-motion";
import { Mail, Github, Linkedin, ArrowUp } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact" className="py-20 border-t border-border relative">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Travaillons <span className="text-gradient">ensemble</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-md">
              Vous avez un projet en tête ? Discutons-en et créons quelque chose d'extraordinaire.
            </p>
            <motion.a
              href="mailto:contact@example.com"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 mt-6 bg-primary text-primary-foreground px-8 py-4 rounded-full font-medium"
            >
              <Mail className="w-5 h-5" />
              contact@example.com
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex gap-4 md:justify-end"
          >
            {[
              { icon: Github, href: "#", label: "GitHub" },
              { icon: Linkedin, href: "#", label: "LinkedIn" },
            ].map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="p-4 bg-secondary rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label={social.label}
              >
                <social.icon className="w-6 h-6" />
              </motion.a>
            ))}
          </motion.div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mt-16 pt-8 border-t border-border">
          <p className="text-muted-foreground text-sm">
            © 2024 Portfolio. Tous droits réservés.
          </p>
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -3 }}
            className="mt-4 md:mt-0 p-3 bg-secondary rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
            aria-label="Retour en haut"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;