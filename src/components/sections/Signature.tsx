"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { dishes } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { useGsapReveal } from "@/lib/useGsapReveal";

import { SignatureMarquee } from "@/components/signature/SignatureMarquee";

export function SignatureSection() {
  const ref = useRef<HTMLElement>(null);
  useGsapReveal(ref);
  const reduced = useReducedMotion();
  const [showMarquee, setShowMarquee] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const t = window.setTimeout(() => setShowMarquee(true), 100);
    return () => window.clearTimeout(t);
  }, [reduced]);

  return (
    <section id="signature" ref={ref} className="relative py-20 sm:py-24">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p
              data-reveal
              className="text-xs font-semibold tracking-[0.22em] text-gold/90"
            >
              SIGNATURE DISHES
            </p>
            <h2
              data-reveal
              className="mt-4 font-[var(--font-heading)] text-3xl tracking-tight text-cream sm:text-4xl"
            >
              A rotating gallery of culinary icons
            </h2>
            <p data-reveal className="mt-4 max-w-2xl text-cream/70 leading-7">
              Explore our most celebrated creations—crafted with premium
              ingredients, plated with precision, and finished with a touch of
              gold.
            </p>
          </div>

          <motion.div
            data-reveal
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="flex gap-3"
          >
            <Button href="#menu" variant="secondary">
              View Menu
            </Button>
            <Button href="#events">Catering Enquiry</Button>
          </motion.div>
        </div>

        <div
          data-reveal
          className="mt-10 overflow-hidden rounded-3xl border border-gold/15 bg-black/30 ring-1 ring-white/10"
        >
          <div className="relative h-[420px] w-full">
            {showMarquee ? (
              <SignatureMarquee />
            ) : (
              <div className="grid h-full grid-cols-1 gap-3 p-4 sm:grid-cols-2 lg:grid-cols-4">
                {dishes.slice(0, 8).map((d) => (
                  <div
                    key={d.id}
                    className="glass rounded-2xl p-4 transition hover:translate-y-[-2px] hover:border-gold/30"
                  >
                    <p className="font-[var(--font-heading)] text-lg text-cream">
                      {d.name}
                    </p>
                    <p className="mt-2 text-sm text-cream/65">{d.note}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <p className="mt-3 text-xs text-cream/55">
          A glimpse into our golden selections.
        </p>
      </Container>
    </section>
  );
}

