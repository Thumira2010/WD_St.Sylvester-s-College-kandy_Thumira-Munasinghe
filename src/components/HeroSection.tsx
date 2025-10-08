import { useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "./ui/button";

const HeroSection = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Performance-tuned parameters
    const DPR_CAP = 2; // cap devicePixelRatio to avoid huge buffers on high-DPI screens
    // Dynamically size particle count by viewport area so desktops don't explode
    const baseArea = window.innerWidth * window.innerHeight;
    const PARTICLE_DENSITY = 0.00006; // particles per pixel (tuned low for desktop)
    const PARTICLE_COUNT = Math.max(
      28,
      Math.floor(baseArea * PARTICLE_DENSITY)
    );
    const CONNECTION_DISTANCE = 80; // shorter connection distance
    const SHADOW_BLUR = 4; // lower shadow blur

    // Debounced resize to avoid frequent recalcs
    let resizeTimer: number | undefined;
    const resizeCanvas = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        const dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP);
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;
        canvas.width = Math.floor(window.innerWidth * dpr);
        canvas.height = Math.floor(window.innerHeight * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }, 120);
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Particle system (lighter)
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
        this.radius = Math.random() * 1.6 + 0.5;
        const colors = ["#0EA5E9", "#7C3AED", "#34D399", "#60A5FA"];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = SHADOW_BLUR;
        ctx.shadowColor = this.color;
        ctx.fill();
      }
    }

    const particles: Particle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());

    // Simple uniform grid spatial partitioning to avoid full O(n^2) neighbor checks
    const GRID_CELL = 120; // cell size in px
    const grid = new Map<string, Particle[]>();
    const cellKey = (x: number, y: number) =>
      `${Math.floor(x / GRID_CELL)}:${Math.floor(y / GRID_CELL)}`;
    const rebuildGrid = () => {
      grid.clear();
      for (const p of particles) {
        const k = cellKey(p.x, p.y);
        const arr = grid.get(k);
        if (arr) arr.push(p);
        else grid.set(k, [p]);
      }
    };

    let rafId: number | null = null;
    let running = true;

    // Pause when hidden to save CPU
    const handleVisibility = () => {
      running = !document.hidden;
      if (running && rafId === null) animate();
    };
    document.addEventListener("visibilitychange", handleVisibility);

    const animate = () => {
      if (!running) {
        rafId = null;
        return;
      }

      // Soft clear with very low alpha to create trailing without heavy compositing
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "rgba(6, 8, 20, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update particles and rebuild spatial grid
      for (const p of particles) p.update();
      rebuildGrid();

      // Draw particles
      for (const p of particles) p.draw();

      // Draw connections by querying nearby grid cells
      ctx.lineWidth = 0.45;
      for (const p of particles) {
        const cx = Math.floor(p.x / GRID_CELL);
        const cy = Math.floor(p.y / GRID_CELL);

        // check this cell and all neighbors (3x3) instead of full list
        for (let ox = -1; ox <= 1; ox++) {
          for (let oy = -1; oy <= 1; oy++) {
            const cell = grid.get(`${cx + ox}:${cy + oy}`);
            if (!cell) continue;
            for (const q of cell) {
              if (q === p) continue;
              const dx = p.x - q.x;
              const dy = p.y - q.y;
              const dist = dx * dx + dy * dy;
              const maxDist = CONNECTION_DISTANCE * CONNECTION_DISTANCE;
              if (dist < maxDist) {
                const alpha =
                  0.12 * (1 - Math.sqrt(dist) / CONNECTION_DISTANCE);
                ctx.beginPath();
                ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(q.x, q.y);
                ctx.stroke();
              }
            }
          }
        }
      }

      rafId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      document.removeEventListener("visibilitychange", handleVisibility);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const scrollToNext = () => {
    const nextSection = document.querySelector("#what-is-ai");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      // use the site's global background token so the hero matches the rest of the site
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      // inline style forces the HSL background color reliably: hsl(var(--background))
      style={{ background: "hsl(var(--background))" }}
    >
      {/* canvas blends additively with the gradient */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-heading font-bold mb-6 glow-text-blue">
          Artificial Intelligence:
          <br />
          <span className="glow-text-purple">Friend or Foe?</span>
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-8 md:mb-12 max-w-3xl mx-auto">
          Explore how AI shapes our world — from powerful innovations to
          mysterious risks.
        </p>

        <Button
          onClick={scrollToNext}
          className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg font-heading font-semibold rounded-full glow-blue transition-all duration-300 hover:scale-105"
        >
          Start Exploring
        </Button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-float">
        <button
          onClick={scrollToNext}
          className="text-primary hover:text-primary/80 transition-colors"
          aria-label="Scroll down"
        >
          <ChevronDown className="h-10 w-10 animate-pulse" />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
