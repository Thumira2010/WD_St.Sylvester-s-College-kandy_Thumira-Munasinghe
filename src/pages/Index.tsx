import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import WhatIsAI from "@/components/WhatIsAI";
import AIInAction from "@/components/AIInAction";
import FriendOrFoe from "@/components/FriendOrFoe";
import Timeline from "@/components/Timeline";
import InteractiveSection from "@/components/InteractiveSection";
import AboutSection from "@/components/AboutSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navigation />
      <main>
        <HeroSection />
        <WhatIsAI />
        <AIInAction />
        <FriendOrFoe />
        <Timeline />
        <InteractiveSection />
        <AboutSection />
      </main>
    </div>
  );
};

export default Index;
