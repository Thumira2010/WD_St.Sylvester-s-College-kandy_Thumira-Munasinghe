import { useEffect, useRef } from "react";
import { Sparkles } from "lucide-react";

const Timeline = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-slide-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    const events = sectionRef.current?.querySelectorAll(".timeline-event");
    events?.forEach((event) => observer.observe(event));

    return () => observer.disconnect();
  }, []);

  const events = [
    {
      year: "1956",
      title: "Birth of AI",
      description: "The term 'Artificial Intelligence' was coined at the Dartmouth Conference, marking the official beginning of AI as a field.",
      color: "neon-cyan",
    },
    {
      year: "1997",
      title: "Deep Blue Wins",
      description: "IBM's Deep Blue defeated world chess champion Garry Kasparov, proving AI could outthink humans in complex games.",
      color: "neon-violet",
    },
    {
      year: "2011",
      title: "Watson's Victory",
      description: "IBM Watson won Jeopardy!, demonstrating advanced natural language processing and knowledge retrieval.",
      color: "neon-green",
    },
    {
      year: "2016",
      title: "AlphaGo Triumph",
      description: "Google's AlphaGo defeated world champion Lee Sedol in Go, showcasing the power of deep reinforcement learning.",
      color: "neon-cyan",
    },
    {
      year: "2020",
      title: "AI Everywhere",
      description: "AI became integrated into daily life through virtual assistants, recommendation systems, and autonomous vehicles.",
      color: "neon-violet",
    },
    {
      year: "2030",
      title: "The Future",
      description: "AI is predicted to revolutionize healthcare, education, and solve complex global challenges like climate change.",
      color: "neon-green",
      future: true,
    },
  ];

  return (
    <section id="timeline" ref={sectionRef} className="py-20 md:py-32 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/10 to-background"></div>
      
      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 glow-text-green">
            The Future of AI
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Journey through the key milestones that shaped artificial intelligence.
          </p>
        </div>

        <div className="relative">
          {/* Vertical line for desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent"></div>

          {/* Vertical line for mobile */}
          <div className="md:hidden absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent"></div>

          <div className="space-y-12 md:space-y-16">
            {events.map((event, index) => (
              <div
                key={index}
                className={`timeline-event opacity-0 relative ${
                  index % 2 === 0 ? "md:text-right" : "md:text-left"
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className={`md:w-1/2 ${index % 2 === 0 ? "md:pr-12 md:ml-auto" : "md:pl-12"} pl-16 md:pl-0`}>
                  <div className={`glass rounded-2xl p-6 lg:p-8 hover:scale-105 transition-all duration-500 ${event.future ? 'glow-green' : ''}`}>
                    <div className="flex items-center gap-3 mb-4">
                      {event.future && (
                        <Sparkles className="h-6 w-6 text-accent animate-pulse" />
                      )}
                      <span className={`text-3xl lg:text-4xl font-heading font-bold text-${event.color}`}>
                        {event.year}
                      </span>
                    </div>
                    <h3 className="text-xl lg:text-2xl font-heading font-bold mb-3 text-foreground">
                      {event.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>

                {/* Timeline dot */}
                <div className={`absolute top-8 left-8 md:left-1/2 md:transform md:-translate-x-1/2 w-4 h-4 rounded-full bg-${event.color} glow-${event.color} ${event.future ? 'animate-pulse-glow' : ''}`}></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
