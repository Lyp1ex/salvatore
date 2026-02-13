import { motion } from "framer-motion";
import { FaInstagram, FaTelegramPlane } from "react-icons/fa";
import Button from "../components/Button";
import type { SiteConfig } from "../config/site";

type ContactProps = {
  site: SiteConfig;
};

export default function Contact({ site }: ContactProps) {
  const socialList = [
    { ...site.socials.telegram, icon: <FaTelegramPlane /> },
    { ...site.socials.instagram, icon: <FaInstagram /> },
  ];

  return (
    <footer id="contact" className="scroll-mt-24 pb-12 pt-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="rounded-3xl border border-[rgba(196,164,92,.26)] bg-[linear-gradient(135deg,rgba(255,255,255,.08),rgba(10,11,14,.8))] p-6 shadow-neon backdrop-blur-xl sm:p-9"
      >
        <h2 className="text-3xl font-extrabold text-zinc-100 sm:text-4xl">{site.contactTitle}</h2>
        <p className="mt-4 max-w-2xl text-zinc-300">{site.contactLine}</p>
        <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-[var(--lux-gold-soft)]">
          {site.contactHint}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          {socialList.map((social) => {
            const isPrimary = social.label === "Telegram";
            const button = (
              <Button
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                variant={isPrimary ? "primary" : "ghost"}
                className="gap-2"
              >
                <span className="text-base">{social.icon}</span>
                <span>{social.label}</span>
              </Button>
            );

            if (!isPrimary) return button;

            return (
              <div key={social.label} className="cta-orbit" data-cursor="active">
                <span className="cta-orbit-ring" aria-hidden />
                <span className="cta-orbit-ring cta-orbit-ring-delay" aria-hidden />
                {button}
              </div>
            );
          })}
        </div>

        <div className="mt-5 space-y-1 text-sm text-zinc-400">
          <p>{site.socials.telegram.handle}</p>
          <p>{site.socials.instagram.handle}</p>
        </div>

        <p className="mt-8 border-t border-white/10 pt-4 font-mono text-xs uppercase tracking-[0.18em] text-zinc-500">
          {site.madeWithLine}
        </p>
      </motion.div>
    </footer>
  );
}
