"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Container } from "@/components/ui/Container";
import { galleryImages } from "@/content/site";
import { useGsapReveal } from "@/lib/useGsapReveal";

export function GallerySection() {
  const ref = useRef<HTMLElement>(null);
  useGsapReveal(ref);
  const [index, setIndex] = useState(-1);

  const slides = useMemo(
    () => galleryImages.map((img) => ({ src: img.src, alt: img.alt })),
    [],
  );

  return (
    <section id="gallery" ref={ref} className="relative py-20 sm:py-24">
      <Container>
        <p
          data-reveal
          className="text-xs font-semibold tracking-[0.22em] text-gold/90"
        >
          GALLERY
        </p>
        <h2
          data-reveal
          className="mt-4 font-[var(--font-heading)] text-3xl tracking-tight text-cream sm:text-4xl"
        >
          Atmosphere, artistry, appetite
        </h2>
        <p data-reveal className="mt-4 max-w-2xl text-cream/70 leading-7">
          A glimpse of our dining room, signature plates, and golden rituals.
        </p>

        <div data-reveal className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {galleryImages.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => setIndex(i)}
              className="group w-full overflow-hidden rounded-2xl border border-white/10 bg-black/30 ring-1 ring-white/5 transition hover:border-gold/25"
            >
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover opacity-90 transition duration-500 group-hover:scale-[1.03] group-hover:opacity-100"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-transparent opacity-70" />
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="absolute inset-0 bg-[radial-gradient(600px_260px_at_30%_15%,rgba(212,175,55,0.16),transparent_60%)]" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </Container>

      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index}
        slides={slides}
      />
    </section>
  );
}

