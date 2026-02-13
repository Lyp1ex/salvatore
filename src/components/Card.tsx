import type { PropsWithChildren } from "react";

type CardProps = PropsWithChildren<{
  className?: string;
}>;

export default function Card({ className, children }: CardProps) {
  return (
    <article
      className={`rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_16px_40px_rgba(0,0,0,.35)] backdrop-blur-xl ${className ?? ""}`}
    >
      {children}
    </article>
  );
}

