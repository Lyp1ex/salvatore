import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export default function StorylineRail() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 130, damping: 24, mass: 0.24 });
  const markerY = useTransform(progress, [0, 1], ["0%", "100%"]);

  return (
    <div className="pointer-events-none fixed bottom-10 left-4 top-24 z-40 hidden w-6 items-center lg:flex">
      <div className="storyline-rail h-full w-[2px]" />
      <motion.div style={{ scaleY: progress }} className="storyline-fill absolute h-full w-[2px] origin-top" />
      <motion.div style={{ top: markerY }} className="storyline-dot absolute left-[-4px]" />
    </div>
  );
}

