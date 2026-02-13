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

    if (!window.matchMedia("(pointer:fine)").matches) return;
    const rotateX = (y - 50) / -8;
    const rotateY = (x - 50) / 9;
    event.currentTarget.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const onMouseLeave = (event: MouseEvent<HTMLElement>) => {
    event.currentTarget.style.transform = "";
  };

  return (
    <article
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`glass-distort lux-sweep-card rounded-2xl border border-[rgba(212,176,93,.16)] bg-[linear-gradient(140deg,rgba(255,255,255,.06),rgba(11,13,17,.74))] p-5 shadow-[0_16px_40px_rgba(0,0,0,.45)] backdrop-blur-xl transition-transform duration-200 will-change-transform ${className ?? ""}`}
    >
      {children}
    </article>
  );
}
