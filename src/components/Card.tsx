import type { PropsWithChildren } from "react";

type CardProps = PropsWithChildren<{
  className?: string;
}>;

export default function Card({ className, children }: CardProps) {
  return (
    <article
      className={`rounded-2xl border border-[rgba(212,176,93,.16)] bg-[linear-gradient(140deg,rgba(255,255,255,.06),rgba(11,13,17,.74))] p-5 shadow-[0_16px_40px_rgba(0,0,0,.45)] backdrop-blur-xl ${className ?? ""}`}
    >
      {children}
    </article>
  );
}
