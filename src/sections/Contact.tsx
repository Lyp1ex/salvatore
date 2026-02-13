import { motion } from "framer-motion";
import { FaInstagram, FaTelegramPlane } from "react-icons/fa";
import Button from "../components/Button";
import QuoteWizard from "../components/QuoteWizard";
import type { SiteConfig } from "../config/site";

type ContactProps = {
  site: SiteConfig;
};

export default function Contact({ site }: ContactProps) {
  return (
    <footer id="contact" className="scroll-mt-24 pb-16 pt-14 sm:pt-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative overflow-hidden rounded-[2rem] border border-[rgba(196,164,92,.3)] bg-[linear-gradient(150deg,rgba(17,19,24,.94),rgba(9,10,13,.98))] p-4 shadow-[0_28px_96px_rgba(0,0,0,.62)] backdrop-blur-xl sm:p-10"
      >
        <div className="relative z-10">
          <h2 className="text-3xl font-extrabold text-zinc-100 sm:text-5xl">{site.contactTitle}</h2>
          <p className="mt-4 max-w-2xl text-zinc-300">{site.contactLine}</p>
          <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-[var(--lux-gold-soft)]">
            {site.contactHint}
          </p>

          <div className="mt-7 grid gap-5 xl:grid-cols-[1.08fr_.92fr]">
            <div className="rounded-2xl border border-[rgba(212,176,93,.24)] bg-[rgba(9,11,15,.84)] p-5">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--lux-gold-soft)]">{site.finalCtaEyebrow}</p>
              <p className="mt-2 text-sm leading-relaxed text-zinc-300">{site.finalCtaLine}</p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <Button
                  href={site.socials.telegram.url}
                  target="_blank"
                  rel="noreferrer"
                  variant="primary"
                  className="w-full gap-2 px-6 py-3 text-base"
                >
                  <FaTelegramPlane />
                  {site.mobileCtaLabel}
                </Button>

                <Button
                  href={site.socials.instagram.url}
                  target="_blank"
                  rel="noreferrer"
                  variant="ghost"
                  className="w-full gap-2"
                >
                  <FaInstagram />
                  {site.socials.instagram.label}
                </Button>
              </div>

              <div className="mt-5 space-y-1 text-sm text-zinc-400">
                <p>{site.socials.telegram.handle}</p>
                <p>{site.socials.instagram.handle}</p>
              </div>
            </div>

            <QuoteWizard site={site} />
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
