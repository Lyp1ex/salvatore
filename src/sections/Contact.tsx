import { motion } from "framer-motion";
import { FaInstagram, FaTelegramPlane } from "react-icons/fa";
import Button from "../components/Button";
import type { SiteConfig } from "../config/site";

type ContactProps = {
  site: SiteConfig;
};

export default function Contact({ site }: ContactProps) {
  return (
    <footer id="contact" className="scroll-mt-24 pb-16 pt-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative overflow-hidden rounded-3xl border border-[rgba(196,164,92,.34)] bg-[linear-gradient(130deg,rgba(255,255,255,.08),rgba(8,9,13,.92))] p-6 shadow-[0_26px_90px_rgba(0,0,0,.6)] backdrop-blur-xl sm:p-10"
      >
        <div className="contact-pulse contact-pulse-one" aria-hidden />
        <div className="contact-pulse contact-pulse-two" aria-hidden />

        <div className="relative z-10">
          <h2 className="text-3xl font-extrabold text-zinc-100 sm:text-5xl">{site.contactTitle}</h2>
          <p className="mt-4 max-w-2xl text-zinc-300">{site.contactLine}</p>
          <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-[var(--lux-gold-soft)]">
            {site.contactHint}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <div className="cta-orbit" data-cursor="active">
              <span className="cta-orbit-ring" aria-hidden />
              <span className="cta-orbit-ring cta-orbit-ring-delay" aria-hidden />
              <Button
                href={site.socials.telegram.url}
                target="_blank"
                rel="noreferrer"
                variant="primary"
                className="gap-2 px-6 py-3 text-base"
              >
                <FaTelegramPlane />
                {site.mobileCtaLabel}
              </Button>
            </div>

            <Button
              href={site.socials.instagram.url}
              target="_blank"
              rel="noreferrer"
              variant="ghost"
              className="gap-2"
            >
              <FaInstagram />
              {site.socials.instagram.label}
            </Button>
          </div>

          <div className="mt-5 space-y-1 text-sm text-zinc-400">
            <p>{site.socials.telegram.handle}</p>
            <p>{site.socials.instagram.handle}</p>
          </div>

          <p className="mt-8 border-t border-white/10 pt-4 font-mono text-xs uppercase tracking-[0.18em] text-zinc-500">
            {site.madeWithLine}
          </p>
        </div>
      </motion.div>
    </footer>
  );
}
