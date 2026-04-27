"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { site } from "@/content/site";

export function HeroSection() {
  return (
    <section id="top" className="lux-bg relative overflow-hidden pt-28 sm:pt-36">
      {/* Ambient glow orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/8 blur-[120px]" />
        <div className="absolute right-1/4 bottom-1/4 h-80 w-80 translate-x-1/2 translate-y-1/2 rounded-full bg-red-900/10 blur-[100px]" />
      </div>

      <Container className="relative">
        <div className="flex flex-col items-center text-center">

          {/* Logo mark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8"
          >
            <div className="relative mx-auto size-28 overflow-hidden rounded-2xl shadow-[0_0_60px_rgba(212,175,55,0.4)] ring-2 ring-gold/35 sm:size-32">
              <Image
                src="/images/golden-logo.png"
                alt="Golden Restaurant logo"
                fill
                priority
                className="object-cover"
                sizes="128px"
              />
            </div>
          </motion.div>

          {/* Badge */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-black/30 px-4 py-2 text-xs font-semibold tracking-[0.22em] text-cream/80"
          >
            <span className="size-1.5 rounded-full bg-gold shadow-[0_0_18px_rgba(212,175,55,0.35)]" />
            FUJAIRAH • KERALA • CATERING • LUXURY
          </motion.p>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 font-[var(--font-heading)] text-4xl leading-[1.05] tracking-tight text-cream sm:text-5xl lg:text-6xl"
          >
            {site.tagline}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.28 }}
            className="mt-5 max-w-2xl text-base leading-7 text-cream/70 sm:text-lg"
          >
            Authentic Kerala home cooking and rich Middle Eastern hospitality —
            fragrant biryanis, coastal seafood, and warm nadan curries in the
            heart of Fujairah.
          </motion.p>

          {/* Arabic tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.36 }}
            className="mt-3 font-[var(--font-arabic)] text-lg text-cream/60"
            dir="rtl"
          >
            {site.arabicTagline}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.42 }}
            className="mt-10 flex flex-col gap-3 sm:flex-row"
          >
            <Button href="#events" className="justify-center px-8">
              Enquire Catering
            </Button>
            <Button href="#menu" variant="secondary" className="justify-center px-8">
              View Menu
            </Button>
          </motion.div>

          {/* Stats ribbon */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.52 }}
            className="mt-12 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 ring-1 ring-white/5 w-full max-w-xl"
          >
            {[
              { k: "Nadan Kerala Flavours", v: "Authentic recipes" },
              { k: "Malabar Specialities", v: "Biriyani • Seafood • Curry" },
              { k: "Private Catering", v: "Events & gatherings" },
            ].map((item) => (
              <div key={item.k} className="min-w-0 bg-black/40 px-4 py-4">
                <p className="text-xs font-semibold text-gold/90">{item.k}</p>
                <p className="mt-1 text-xs text-cream/65">{item.v}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </Container>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 to-transparent" />
    </section>
  );
}
