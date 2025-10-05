import { useEffect, useRef } from "react";
import { Heart, GraduationCap, Palette, Bot, Globe, Briefcase } from "lucide-react";
import medicineImg from "@/assets/ai-medicine.jpg";
import educationImg from "@/assets/ai-education.jpg";
import artImg from "@/assets/ai-art.jpg";
import roboticsImg from "@/assets/ai-robotics.jpg";
import environmentImg from "@/assets/ai-environment.jpg";
import businessImg from "@/assets/ai-business.jpg";

const AIInAction = () => {
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

    const cards = sectionRef.current?.querySelectorAll(".action-card");
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const applications = [
    {
      icon: Heart,
      title: "Medicine",
      description: "AI helps doctors detect diseases faster and develop new treatments.",
      image: medicineImg,
      color: "neon-cyan",
    },
    {
      icon: GraduationCap,
      title: "Education",
      description: "Smart tutoring systems personalize learning for every student.",
      image: educationImg,
      color: "neon-green",
    },
    {
      icon: Palette,
      title: "Art",
      description: "AI creates beautiful paintings, music, and creative content.",
      image: artImg,
      color: "neon-violet",
    },
    {
      icon: Bot,
      title: "Robotics",
      description: "Intelligent machines that think, learn, and work autonomously.",
      image: roboticsImg,
      color: "neon-cyan",
    },
    {
      icon: Globe,
      title: "Environment",
      description: "AI predicts and helps fight climate change and protect nature.",
      image: environmentImg,
      color: "neon-green",
    },
    {
      icon: Briefcase,
      title: "Business",
      description: "Smart automation and analytics drive innovation and efficiency.",
      image: businessImg,
      color: "neon-violet",
    },
  ];

  return (
    <section id="ai-in-action" ref={sectionRef} className="py-20 md:py-32 px-4 relative">
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 glow-text-violet">
            AI in Action: Changing the World
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            From healthcare to creativity, AI is transforming every aspect of human life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {applications.map((app, index) => {
            const Icon = app.icon;
            return (
              <div
                key={index}
                className="action-card glass rounded-2xl overflow-hidden group hover:scale-105 transition-all duration-500 opacity-0 cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={app.image}
                    alt={app.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-80"></div>
                  <div className={`absolute top-4 right-4 p-3 rounded-xl bg-background/80 backdrop-blur-sm group-hover:glow-${app.color} transition-all duration-500`}>
                    <Icon className={`h-6 w-6 text-${app.color}`} />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl lg:text-2xl font-heading font-bold mb-3 text-foreground">
                    {app.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {app.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AIInAction;
