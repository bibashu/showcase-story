import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import ParallaxTitle from "@/components/ParallaxTitle";
import TimelineSection from "@/components/TimelineSection";
import FormationSection from "@/components/FormationSection";
import ProjectsSection from "@/components/ProjectsSection";
import TechStackSection from "@/components/TechStackSection";
import CertificationsSection from "@/components/CertificationsSection";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      
      <main className="min-h-screen bg-background overflow-x-hidden">
        <HeroSection />
        
        <ParallaxTitle direction="left" speed={300}>
          CRÉATIVITÉ • ÉLÉGANCE • DESIGN •
        </ParallaxTitle>

        <TechStackSection />

        <ParallaxTitle direction="right" speed={250}>
          CODE • PASSION • BEAUTÉ •
        </ParallaxTitle>

        <TimelineSection />

        <ParallaxTitle direction="right" speed={220}>
          FORMATION • APPRENTISSAGE • CROISSANCE •
        </ParallaxTitle>

        <FormationSection />

        <ParallaxTitle direction="left" speed={200}>
          PROJETS • RÉALISATIONS • SUCCÈS •
        </ParallaxTitle>

        <ProjectsSection />

        <ParallaxTitle direction="right" speed={180}>
          CERTIFICATIONS • EXPERTISE • EXCELLENCE •
        </ParallaxTitle>

        <CertificationsSection />

        <ParallaxTitle direction="left" speed={160}>
          INSPIRATION • VISION • HARMONIE •
        </ParallaxTitle>

        <Footer />
      </main>
    </>
  );
};

export default Index;