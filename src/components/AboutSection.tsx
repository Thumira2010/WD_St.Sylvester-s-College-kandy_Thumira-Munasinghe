import { Code, Palette, Zap } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 md:py-32 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-card/20 to-transparent"></div>
      
      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-6 glow-text-cyan">
            About This Project
          </h2>
        </div>

        <div className="glass rounded-2xl p-8 lg:p-12 mb-12 animate-slide-up">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary via-secondary to-accent p-1 glow-cyan">
              <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                <Code className="h-16 w-16 text-primary" />
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-heading font-bold mb-4 text-foreground">
                Created with Passion & Innovation
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                This website was created to explore Artificial Intelligence through creativity, education, 
                and design. The project combines cutting-edge web technologies with engaging storytelling 
                to present AI in an accessible and visually stunning way.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Through interactive elements, beautiful animations, and comprehensive content, this site 
                aims to educate and inspire curiosity about the role of AI in our future.
              </p>
            </div>
          </div>
        </div>

        {/* Credits */}
        <div className="glass rounded-2xl p-8 mb-12 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <h3 className="text-2xl font-heading font-bold mb-6 text-center text-foreground">
            Built With
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-primary/5 rounded-xl hover:bg-primary/10 transition-colors">
              <Code className="h-8 w-8 text-primary mx-auto mb-3" />
              <h4 className="font-heading font-semibold mb-2">Technology</h4>
              <p className="text-sm text-muted-foreground">React, TypeScript, Tailwind CSS</p>
            </div>
            <div className="text-center p-4 bg-secondary/5 rounded-xl hover:bg-secondary/10 transition-colors">
              <Palette className="h-8 w-8 text-secondary mx-auto mb-3" />
              <h4 className="font-heading font-semibold mb-2">Design</h4>
              <p className="text-sm text-muted-foreground">Futuristic UI, Glassmorphism, Neon Effects</p>
            </div>
            <div className="text-center p-4 bg-accent/5 rounded-xl hover:bg-accent/10 transition-colors">
              <Zap className="h-8 w-8 text-accent mx-auto mb-3" />
              <h4 className="font-heading font-semibold mb-2">Animations</h4>
              <p className="text-sm text-muted-foreground">Canvas API, CSS Animations, Scroll Effects</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-muted-foreground">
          <p className="mb-2">© 2025 AI Explorer. Created for educational purposes.</p>
          <p className="text-sm">
            Exploring the future of artificial intelligence, one innovation at a time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
