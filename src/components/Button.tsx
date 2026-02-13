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
  "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60";

const variantClass: Record<Variant, string> = {
  primary:
    "border border-cyan-300/50 bg-gradient-to-r from-cyan-300/80 to-emerald-300/80 text-[#021112] shadow-[0_0_28px_rgba(62,255,221,.2)] hover:-translate-y-0.5 hover:shadow-[0_0_32px_rgba(62,255,221,.35)]",
  ghost:
    "border border-white/20 bg-white/5 text-zinc-100 backdrop-blur-sm hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/10",
};

const mergeClass = (variant: Variant, className?: string) =>
  `${baseClass} ${variantClass[variant]} ${className ?? ""}`;

export default function Button(props: ButtonProps) {
  const { children, variant = "primary", className, ...rest } = props;

  if ("href" in props) {
    return (
      <a className={mergeClass(variant, className)} {...(rest as LinkProps)}>
        {children}
      </a>
    );
  }

  return (
    <button className={mergeClass(variant, className)} {...(rest as NativeButtonProps)}>
      {children}
    </button>
  );
}

