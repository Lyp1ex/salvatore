import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function LuxuryCursor() {
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const smoothX = useSpring(x, { stiffness: 260, damping: 26, mass: 0.32 });
  const smoothY = useSpring(y, { stiffness: 260, damping: 26, mass: 0.32 });

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer:fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(finePointer && !reduced);
    if (!finePointer || reduced) return;

    const onMove = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);

      const element = event.target as HTMLElement | null;
      const hoverInteractive = !!element?.closest("a,button,[data-cursor='active']");
      setActive(hoverInteractive);
    };

    const onDown = () => setActive(true);
    const onUp = () => setActive(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        style={{ x: smoothX, y: smoothY }}
        animate={{ scale: active ? 1.5 : 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 18 }}
        className="lux-cursor-ring"
      />
      <motion.div
        style={{ x, y }}
        animate={{ scale: active ? 0.4 : 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 18 }}
        className="lux-cursor-dot"
      />
    </>
  );
}

