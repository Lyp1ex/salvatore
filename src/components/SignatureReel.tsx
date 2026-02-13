import { motion, useReducedMotion } from "framer-motion";

type SignatureReelProps = {
  words: string[];
};

const laneDurations = [18, 22, 20];

export default function SignatureReel({ words }: SignatureReelProps) {
  const reduceMotion = useReducedMotion();

  const lanes = [words, [...words].reverse(), words.map((word) => `${word} •`)];

  return (
    <div className="signature-reel mt-5 overflow-hidden rounded-2xl border border-[rgba(212,176,93,.24)] bg-[rgba(9,10,14,.84)] p-2">
      <div className="signature-reel-line" aria-hidden />

      {lanes.map((lane, laneIndex) => {
        const row = [...lane, ...lane];
        return (
          <motion.div
            key={laneIndex}
            animate={
              reduceMotion
                ? undefined
                : laneIndex % 2 === 0
                  ? { x: ["0%", "-50%"] }
                  : { x: ["-50%", "0%"] }
            }
            transition={{
              duration: laneDurations[laneIndex],
              ease: "linear",
              repeat: Infinity,
            }}
            className="flex min-w-max gap-2 py-1"
          >
            {row.map((word, index) => (
              <span
                key={`${word}-${index}`}
                className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-300"
              >
                {word}
              </span>
            ))}
          </motion.div>
        );
      })}
    </div>
  );
}
