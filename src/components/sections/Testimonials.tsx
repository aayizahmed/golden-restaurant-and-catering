"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { testimonials } from "@/content/site";
import { useGsapReveal } from "@/lib/useGsapReveal";
import { cn } from "@/lib/cn";

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={cn(
            "inline-flex size-4 items-center justify-center",
            i < count ? "text-gold" : "text-cream/20",
          )}
        >
          <svg viewBox="0 0 24 24" className="size-4 fill-current">
            <path d="M12 17.3l-6.18 3.7 1.64-7.03L2 9.24l7.19-.61L12 2l2.81 6.63 7.19.61-5.46 4.73 1.64 7.03z" />
          </svg>
        </span>
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  const ref = useRef<HTMLElement>(null);
  useGsapReveal(ref);
  const reduced = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const t = window.setInterval(() => setI((v) => (v + 1) % testimonials.length), 5200);
    return () => window.clearInterval(t);
  }, [reduced]);

  const current = testimonials[i]!;

  return (
    <section id="testimonials" ref={ref} className="relative py-20 sm:py-24">
      <Container>
        <p
          data-reveal
          className="text-xs font-semibold tracking-[0.22em] text-gold/90"
        >
          TESTIMONIALS
        </p>
        <h2
          data-reveal
          className="mt-4 font-[var(--font-heading)] text-3xl tracking-tight text-cream sm:text-4xl"
        >
          Gold-standard guest experiences
        </h2>

        <div
          data-reveal
          className="mt-10 overflow-hidden rounded-3xl border border-gold/15 bg-black/30 ring-1 ring-white/10"
        >
          <div className="relative p-6 sm:p-10">
            <div className="pointer-events-none absolute inset-0 opacity-70">
              <div className="absolute inset-0 bg-[radial-gradient(900px_450px_at_20%_10%,rgba(212,175,55,0.12),transparent_60%)]" />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current.name + String(i)}
                initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="relative"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="font-[var(--font-heading)] text-xl text-cream">
                      {current.name}
                    </p>
                    <p className="mt-0.5 text-xs text-cream/50">{current.role}</p>
                    {"time" in current && (
                      <p className="mt-0.5 text-xs text-cream/40">{(current as { time: string }).time}</p>
                    )}
                  </div>

                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <motion.div
                      initial={{ opacity: 0.5, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.7 }}
                      className="gold-glow rounded-full bg-gold/10 px-4 py-2 ring-1 ring-gold/20"
                    >
                      <Stars count={current.rating} />
                    </motion.div>
                    {/* Google Maps badge */}
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] text-cream/40">
                      <svg viewBox="0 0 24 24" className="size-3 fill-current text-[#4285F4]">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                      Google Maps
                    </span>
                  </div>
                </div>

                <p className="mt-6 text-lg leading-8 text-cream/80">
                  &ldquo;{current.quote}&rdquo;
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex items-center gap-2">
              {testimonials.map((t, idx) => (
                <button
                  key={t.name}
                  type="button"
                  aria-label={`Show testimonial ${idx + 1}`}
                  onClick={() => setI(idx)}
                  className={cn(
                    "h-2.5 rounded-full transition",
                    idx === i ? "w-8 bg-gold" : "w-2.5 bg-white/15 hover:bg-white/25",
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

