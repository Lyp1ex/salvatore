import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 130,
    damping: 20,
    mass: 0.25,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 right-0 top-0 z-[70] h-[3px] origin-left bg-[linear-gradient(90deg,var(--lux-gold),var(--lux-mint),var(--lux-gold))] shadow-[0_0_14px_rgba(196,164,92,.55)]"
    />
  );
}

