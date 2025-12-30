import HeroSection from "@/components/HeroSection";
import ParallaxTitle from "@/components/ParallaxTitle";
import TimelineSection from "@/components/TimelineSection";
import ProjectsSection from "@/components/ProjectsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <HeroSection />
      
      <ParallaxTitle direction="left" speed={300}>
        CRÉATIVITÉ • INNOVATION • DESIGN •
      </ParallaxTitle>

      <TimelineSection />

      <ParallaxTitle direction="right" speed={250}>
        CODE • PASSION • EXCELLENCE •
      </ParallaxTitle>

      <ProjectsSection />

      <ParallaxTitle direction="left" speed={200}>
        COLLABORATION • VISION • IMPACT •
      </ParallaxTitle>

      <Footer />
    </main>
  );
};

export default Index;