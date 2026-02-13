import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
};

const colors = ["#b9965a", "#8a95a3", "#6b7482", "#9a8868"];

const random = (min: number, max: number) => Math.random() * (max - min) + min;

const createParticles = (count: number, width: number, height: number): Particle[] =>
  Array.from({ length: count }, () => ({
    x: random(0, width),
    y: random(0, height),
    vx: random(-0.08, 0.08),
    vy: random(-0.05, 0.05),
    size: random(0.8, 2.2),
    alpha: random(0.12, 0.3),
  }));

type BackgroundFXProps = {
  lite?: boolean;
};

export default function BackgroundFX({ lite = false }: BackgroundFXProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (lite) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let rafId = 0;
    let particles: Particle[] = [];

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.6);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      const targetCount = prefersReducedMotion
        ? 8
        : Math.min(22, Math.max(10, Math.floor((width * height) / 120000)));
      particles = createParticles(targetCount, width, height);
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);
      context.globalCompositeOperation = "lighter";

      for (let i = 0; i < particles.length; i += 1) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -12) p.x = width + 12;
        if (p.x > width + 12) p.x = -12;
        if (p.y < -12) p.y = height + 12;
        if (p.y > height + 12) p.y = -12;

        context.beginPath();
        context.fillStyle = `${colors[i % colors.length]}${Math.floor(p.alpha * 255)
          .toString(16)
          .padStart(2, "0")}`;
        context.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        context.fill();
      }

      rafId = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, [lite]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-base">
      <div className="blob blob-one" />
      <div className="blob blob-two" />
      <div className="blob blob-three" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(185,150,90,0.14)_0%,_transparent_45%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_18%,_rgba(138,149,163,0.12)_0%,_transparent_42%)]" />
      <div className="grid-layer absolute inset-0" />
      <div className="noise-layer absolute inset-0" />
      {lite ? null : <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-35" />}
    </div>
  );
}
