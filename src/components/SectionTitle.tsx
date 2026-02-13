type SectionTitleProps = {
  title: string;
  eyebrow?: string;
};

export default function SectionTitle({ title, eyebrow }: SectionTitleProps) {
  return (
    <div className="mb-8 space-y-2">
      {eyebrow ? (
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-[var(--lux-gold-soft)]">{eyebrow}</p>
      ) : null}
      <h2 className="text-3xl font-extrabold leading-tight text-zinc-100 sm:text-4xl">{title}</h2>
    </div>
  );
}
