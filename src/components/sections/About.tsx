"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { useGsapReveal } from "@/lib/useGsapReveal";

function useCountUp(target: number, enabled: boolean) {
  const reduced = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!enabled) return;
    if (reduced) return;
    let raf = 0;
    const start = performance.now();
    const dur = 900;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [enabled, reduced, target]);

  return reduced ? (enabled ? target : 0) : value;
}

export function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  useGsapReveal(ref);

  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) setInView(true);
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const stats = useMemo(
    () => [
      { label: "Menu choices", value: 60, suffix: "+" },
      { label: "Grills & Broasted", value: 15, suffix: "+" },
      { label: "Fresh juices", value: 12, suffix: "+" },
    ],
    [],
  );

  const v0 = useCountUp(stats[0]!.value, inView);
  const v1 = useCountUp(stats[1]!.value, inView);
  const v2 = useCountUp(stats[2]!.value, inView);

  return (
    <section id="about" ref={ref} className="relative py-20 sm:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <p
              data-reveal
              className="text-xs font-semibold tracking-[0.22em] text-gold/90"
            >
              OUR STORY
            </p>
            <h2
              data-reveal
              className="mt-4 font-[var(--font-heading)] text-3xl tracking-tight text-cream sm:text-4xl"
            >
              Flavours for every craving
            </h2>
            <p data-reveal className="mt-5 max-w-xl text-cream/70 leading-7">
              Golden Restaurant brings together the best of authentic Kerala mornings, 
              sizzling charcoal grills, and satisfying fast food. From soft puttu 
              and nadan curries to loaded zinger clubs and fresh juices, we serve 
              familiar, comforting tastes right in the heart of Fujairah.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-3">
              {[
                { value: `${v0}${stats[0]!.suffix}`, label: stats[0]!.label },
                { value: `${v1}${stats[1]!.suffix}`, label: stats[1]!.label },
                { value: `${v2}${stats[2]!.suffix}`, label: stats[2]!.label },
              ].map((s) => (
                <div
                  key={s.label}
                  data-reveal
                  className="glass rounded-2xl p-4"
                >
                  <p className="font-[var(--font-heading)] text-2xl text-cream">
                    {s.value}
                  </p>
                  <p className="mt-1 text-xs text-cream/65">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6">
            <div
              data-reveal
              className="relative overflow-hidden rounded-3xl border border-gold/15 bg-black/30 ring-1 ring-white/10"
            >
              <div className="absolute inset-0 bg-[radial-gradient(800px_450px_at_40%_30%,rgba(212,175,55,0.12),transparent_60%)]" />
              <div className="relative aspect-[4/3]">
                <Image
                  src="/images/golden-exterior-night.jpg"
                  alt="Golden Restaurant & Catering exterior"
                  fill
                  className="object-cover opacity-90"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-5">
                <div className="glass gold-glow inline-flex items-center gap-3 rounded-2xl px-4 py-3">
                  <span className="size-2 rounded-full bg-gold" />
                  <p className="text-sm text-cream/85">
                    Kerala specialities • Grills & Broasted • Takeaway
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

