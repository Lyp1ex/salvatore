import { useRef } from "react";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, MouseEvent, ReactNode } from "react";

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
    "border border-[rgba(196,164,92,.62)] bg-[linear-gradient(112deg,var(--lux-gold),#d7bc73,var(--lux-gold-soft))] text-[#14110a] shadow-[0_0_28px_rgba(196,164,92,.3)] hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(196,164,92,.42)]",
  ghost:
    "border border-[rgba(212,176,93,.25)] bg-[rgba(255,255,255,.04)] text-zinc-100 backdrop-blur-sm hover:-translate-y-0.5 hover:border-[rgba(212,176,93,.5)] hover:bg-[rgba(212,176,93,.08)]",
};

const mergeClass = (variant: Variant, className?: string) =>
  `${baseClass} ${variantClass[variant]} ${className ?? ""}`;

export default function Button(props: ButtonProps) {
  const { children, variant = "primary", className, ...rest } = props;
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);

  const onMouseMove = (event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    if (!window.matchMedia("(pointer:fine)").matches) return;
    const element = ref.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const x = event.clientX - (rect.left + rect.width / 2);
    const y = event.clientY - (rect.top + rect.height / 2);
    element.style.transform = `translate(${x * 0.14}px, ${y * 0.14}px)`;
  };

  const onMouseLeave = () => {
    const element = ref.current;
    if (!element) return;
    element.style.transform = "";
  };

  if ("href" in props) {
    return (
      <a
        ref={ref as any}
        data-cursor="active"
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className={mergeClass(variant, className)}
        {...(rest as LinkProps)}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref as any}
      data-cursor="active"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={mergeClass(variant, className)}
      {...(rest as NativeButtonProps)}
    >
      {children}
    </button>
  );
}
