import type { MouseEvent, PropsWithChildren } from "react";

type CardProps = PropsWithChildren<{
  className?: string;
}>;

export default function Card({ className, children }: CardProps) {
  const onMouseMove = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    event.currentTarget.style.setProperty("--mx", `${x}%`);
    event.currentTarget.style.setProperty("--my", `${y}%`);
  };

  return (
    <article
      onMouseMove={onMouseMove}
      className={`glass-distort lux-sweep-card rounded-2xl border border-[rgba(201,173,112,.22)] bg-[linear-gradient(145deg,rgba(20,22,28,.82),rgba(11,13,17,.94))] p-5 shadow-[0_18px_48px_rgba(0,0,0,.5)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(212,176,93,.44)] hover:shadow-[0_24px_52px_rgba(0,0,0,.58)] ${className ?? ""}`}
    >
      {children}
    </article>
  );
}
