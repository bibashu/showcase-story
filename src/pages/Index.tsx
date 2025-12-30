import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import ParallaxTitle from "@/components/ParallaxTitle";
import TimelineSection from "@/components/TimelineSection";
import ProjectsSection from "@/components/ProjectsSection";
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

        <TimelineSection />

        <ParallaxTitle direction="right" speed={250}>
          CODE • PASSION • BEAUTÉ •
        </ParallaxTitle>

        <ProjectsSection />

        <ParallaxTitle direction="left" speed={200}>
          INSPIRATION • VISION • HARMONIE •
        </ParallaxTitle>

        <Footer />
      </main>
    </>
  );
};

export default Index;