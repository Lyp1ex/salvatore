import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function AmbientLight() {
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(window.innerWidth / 2 || 400);
  const y = useMotionValue(window.innerHeight / 2 || 300);
  const smoothX = useSpring(x, { stiffness: 95, damping: 22, mass: 0.45 });
  const smoothY = useSpring(y, { stiffness: 95, damping: 22, mass: 0.45 });

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer:fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(finePointer && !reduced);
    if (!finePointer || reduced) return;

    const onMove = (event: MouseEvent) => {
      x.set(event.clientX - 220);
      y.set(event.clientY - 220);
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      style={{ x: smoothX, y: smoothY }}
      className="pointer-events-none fixed z-[30] h-[440px] w-[440px] rounded-full bg-[radial-gradient(circle,_rgba(212,176,93,.17)_0%,_rgba(120,213,199,.08)_28%,_transparent_70%)] blur-[28px]"
    />
  );
}

