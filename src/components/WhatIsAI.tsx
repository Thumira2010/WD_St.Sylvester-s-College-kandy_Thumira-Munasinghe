import { useEffect, useRef } from "react";
import { Brain, Cpu, MessageCircle } from "lucide-react";

const WhatIsAI = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-slide-up");
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = sectionRef.current?.querySelectorAll(".ai-card");
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const aiConcepts = [
    {
      icon: Brain,
      title: "Machine Learning",
      description: "AI systems that learn from data and improve over time without being explicitly programmed.",
      color: "tech-blue",
    },
    {
      icon: Cpu,
      title: "Neural Networks",
      description: "Computing systems inspired by biological neural networks that process complex patterns.",
      color: "tech-purple",
    },
    {
      icon: MessageCircle,
      title: "Natural Language Processing",
      description: "AI that understands, interprets, and generates human language naturally.",
      color: "tech-green",
    },
  ];

  return (
    <section id="what-is-ai" ref={sectionRef} className="py-20 md:py-32 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background"></div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 glow-text-blue">
            What is Artificial Intelligence?
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Artificial Intelligence is the science of creating intelligent machines that can think, learn, 
            and solve problems like humans — but often faster and more accurately.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {aiConcepts.map((concept, index) => {
            const Icon = concept.icon;
            return (
              <div
                key={index}
                className="ai-card glass rounded-2xl p-6 lg:p-8 group hover:scale-105 transition-all duration-500"
              >
                <div className="mb-6 inline-flex p-4 rounded-xl bg-card/50 group-hover:glow-blue transition-all duration-500">
                  <Icon className="h-10 w-10 lg:h-12 lg:w-12 text-primary group-hover:scale-110 transition-transform duration-500" />
                </div>
                <h3 className="text-xl lg:text-2xl font-heading font-bold mb-4 text-foreground">
                  {concept.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {concept.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhatIsAI;
