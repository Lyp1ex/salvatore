import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "ghost";

type SharedProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

type LinkProps = SharedProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type NativeButtonProps = SharedProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type ButtonProps = LinkProps | NativeButtonProps;

const baseClass =
  "lux-sweep-btn inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold tracking-[0.02em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(201,173,112,.35)] disabled:cursor-not-allowed disabled:opacity-55";

const variantClass: Record<Variant, string> = {
  primary:
    "border border-[rgba(196,164,92,.55)] bg-[linear-gradient(130deg,#d0b178,#b99252,#9b753f)] text-[#19150f] shadow-[0_10px_30px_rgba(0,0,0,.38)] hover:border-[rgba(212,176,93,.78)] hover:brightness-105",
  ghost:
    "border border-[rgba(212,176,93,.28)] bg-[rgba(255,255,255,.03)] text-zinc-100 backdrop-blur-sm hover:border-[rgba(212,176,93,.5)] hover:bg-[rgba(212,176,93,.08)]",
};

const mergeClass = (variant: Variant, className?: string) =>
  `${baseClass} ${variantClass[variant]} ${className ?? ""}`;

export default function Button(props: ButtonProps) {
  const { children, variant = "primary", className, ...rest } = props;

  if ("href" in props) {
    return (
      <a
        data-cursor="active"
        className={mergeClass(variant, className)}
        {...(rest as LinkProps)}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      data-cursor="active"
      className={mergeClass(variant, className)}
      {...(rest as NativeButtonProps)}
    >
      {children}
    </button>
  );
}
