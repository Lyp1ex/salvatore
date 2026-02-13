type SectionTitleProps = {
  title: string;
  eyebrow?: string;
};

export default function SectionTitle({ title, eyebrow }: SectionTitleProps) {
  return (
    <div className="mb-8">
      {eyebrow ? (
        <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.28em] text-[rgba(214,190,137,.9)]">{eyebrow}</p>
      ) : null}
      <div className="flex items-center gap-4">
        <h2 className="text-3xl font-extrabold leading-tight text-zinc-100 sm:text-4xl">{title}</h2>
        <span className="h-px flex-1 bg-[linear-gradient(90deg,rgba(201,173,112,.44),rgba(124,140,158,.28),rgba(255,255,255,0))]" />
      </div>
    </div>
  );
}
