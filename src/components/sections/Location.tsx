"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { Container } from "@/components/ui/Container";
import { business, site } from "@/content/site";
import { useGsapReveal } from "@/lib/useGsapReveal";

const MapComponent = dynamic(() => import("@/components/Map"), {
  ssr: false,
  loading: () => (
    <div className="h-[420px] w-full animate-pulse rounded-3xl bg-white/5 ring-1 ring-white/10" />
  ),
});

export function LocationSection() {
  const ref = useRef<HTMLElement>(null);
  useGsapReveal(ref);

  return (
    <section id="location" ref={ref} className="relative py-20 sm:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <p
              data-reveal
              className="text-xs font-semibold tracking-[0.22em] text-gold/90"
            >
              LOCATION
            </p>
            <h2
              data-reveal
              className="mt-4 font-[var(--font-heading)] text-3xl tracking-tight text-cream sm:text-4xl"
            >
              Find us in Fujairah
            </h2>
            <p data-reveal className="mt-4 text-cream/70 leading-7">
              Easy to reach, designed to linger. Tap directions and arrive to a
              dining room lit in warm gold.
            </p>

            <div data-reveal className="mt-8 grid gap-3">
              <div className="glass rounded-2xl p-4">
                <p className="text-sm font-semibold text-cream">Hours</p>
                <p className="mt-2 text-sm text-cream/65">
                  Hours: please call to confirm
                </p>
              </div>
              <div className="glass rounded-2xl p-4">
                <p className="text-sm font-semibold text-cream">Address</p>
                <p className="mt-2 text-sm text-cream/65">
                  {business.addressLine}
                </p>
              </div>
              <div className="glass rounded-2xl p-4">
                <p className="text-sm font-semibold text-cream">Contact</p>
                <p className="mt-2 text-sm text-cream/65">{business.phone}</p>
                <p className="mt-1 text-sm text-cream/55">
                  ⭐ {business.rating} ({business.reviewsCount} reviews)
                </p>
              </div>

              <div data-reveal className="mt-2 flex gap-3">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    `${site.name} ${business.plusCode} ${business.area} ${site.city} ${site.country}`,
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-gold/50 px-5 py-3 text-sm font-semibold text-cream transition hover:bg-gold/10 hover:border-gold/80"
                >
                  Get Directions
                </a>
                <a
                  href={`tel:${business.phoneTel}`}
                  className="inline-flex items-center justify-center rounded-full bg-gold px-5 py-3 text-sm font-semibold text-black gold-glow transition hover:translate-y-[-1px]"
                >
                  Call Now
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div
              data-reveal
              className="overflow-hidden rounded-3xl border border-gold/15 bg-black/30 ring-1 ring-white/10"
            >
              <div className="relative h-[420px]">
                <div className="absolute inset-0">
                  <MapComponent />
                </div>
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_450px_at_30%_20%,rgba(212,175,55,0.12),transparent_60%)]" />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

