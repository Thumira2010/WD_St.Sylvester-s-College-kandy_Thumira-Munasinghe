import { useEffect, useRef, useState } from "react";
import { Check, X } from "lucide-react";

const FriendOrFoe = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [sliderPosition, setSliderPosition] = useState(50);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const friendPoints = [
    "Saves lives with medical diagnostics",
    "Accelerates scientific research",
    "Creates new job opportunities",
    "Enhances education and learning",
    "Solves complex global challenges",
    "Increases productivity and efficiency",
  ];

  const foePoints = [
    "Potential job displacement",
    "Privacy and data concerns",
    "Algorithmic bias and discrimination",
    "Lack of transparency",
    "Autonomous weapons development",
    "Loss of human connection",
  ];

  return (
    <section id="friend-or-foe" ref={sectionRef} className="py-20 md:py-32 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5"></div>
      
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
            <span className="glow-text-blue">Friend</span>
            {" or "}
            <span className="glow-text-purple">Foe</span>?
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            AI brings incredible benefits and serious challenges. Understanding both sides is crucial.
          </p>
        </div>

        {/* Desktop Split View */}
        <div className="hidden md:grid md:grid-cols-2 gap-0 relative">
          {/* Vertical Divider */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent glow-blue"></div>

          {/* Friend Side */}
          <div className="p-8 lg:p-12 bg-gradient-to-r from-primary/10 to-transparent rounded-l-2xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-4 rounded-full bg-primary/20 glow-blue">
                <Check className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-3xl font-heading font-bold text-primary glow-text-blue">
                Friend
              </h3>
            </div>
            <div className="space-y-4">
              {friendPoints.map((point, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 glass rounded-lg hover:bg-primary/10 transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-foreground">{point}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Foe Side */}
          <div className="p-8 lg:p-12 bg-gradient-to-l from-secondary/10 to-transparent rounded-r-2xl">
            <div className="flex items-center gap-4 mb-8 justify-end">
              <h3 className="text-3xl font-heading font-bold text-secondary glow-text-purple">
                Foe
              </h3>
              <div className="p-4 rounded-full bg-secondary/20 glow-purple">
                <X className="h-8 w-8 text-secondary" />
              </div>
            </div>
            <div className="space-y-4">
              {foePoints.map((point, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 glass rounded-lg hover:bg-secondary/10 transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <X className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                  <p className="text-foreground">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Stack View */}
        <div className="md:hidden space-y-8">
          {/* Friend Side */}
          <div className="p-6 glass rounded-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-full bg-primary/20 glow-blue">
                <Check className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-primary glow-text-blue">
                Friend
              </h3>
            </div>
            <div className="space-y-3">
              {friendPoints.map((point, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg"
                >
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-foreground text-sm">{point}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Foe Side */}
          <div className="p-6 glass rounded-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-full bg-secondary/20 glow-purple">
                <X className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-secondary glow-text-purple">
                Foe
              </h3>
            </div>
            <div className="space-y-3">
              {foePoints.map((point, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 bg-secondary/5 rounded-lg"
                >
                  <X className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                  <p className="text-foreground text-sm">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg text-muted-foreground italic">
            "The question isn't whether AI is friend or foe — it's how we choose to develop and use it."
          </p>
        </div>
      </div>
    </section>
  );
};

export default FriendOrFoe;
