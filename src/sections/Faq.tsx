import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { HiChevronDown } from "react-icons/hi2";
import Button from "../components/Button";
import SectionTitle from "../components/SectionTitle";
import type { SiteConfig } from "../config/site";

type FaqProps = {
  site: SiteConfig;
};

export default function Faq({ site }: FaqProps) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="scroll-mt-24 py-14 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <SectionTitle title={site.faqTitle} eyebrow={site.faqEyebrow} />
        <p className="mb-6 max-w-3xl text-zinc-300">{site.faqIntro}</p>

        <div className="space-y-2.5">
          {site.faqItems.map((item, index) => {
            const active = index === openIndex;
            return (
              <article
                key={item.question}
                className="overflow-hidden rounded-2xl border border-[rgba(212,176,93,.24)] bg-[rgba(8,10,14,.72)]"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex((current) => (current === index ? -1 : index))}
                  className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
                >
                  <span className="text-sm font-semibold text-zinc-100 sm:text-base">{item.question}</span>
                  <motion.span animate={{ rotate: active ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <HiChevronDown className="text-zinc-300" />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {active ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.24, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <p className="border-t border-white/10 px-4 py-3 text-sm leading-relaxed text-zinc-300">
                        {item.answer}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </article>
            );
          })}
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <Button href="#contact" variant="primary">
            {site.faqCtaLabel}
          </Button>
          <Button href={site.socials.telegram.url} target="_blank" rel="noreferrer" variant="ghost">
            {site.exitCtaPrimary}
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
