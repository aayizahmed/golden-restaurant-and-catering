"use client";

import { useRef } from "react";
import { Container } from "@/components/ui/Container";
import { site } from "@/content/site";
import { useGsapReveal } from "@/lib/useGsapReveal";

export function Footer() {
  const ref = useRef<HTMLElement>(null);
  useGsapReveal(ref);

  return (
    <footer ref={ref} className="relative border-t border-white/10 py-14">
      <Container>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="font-[var(--font-heading)] text-2xl text-cream">
              {site.name}
            </p>
            <p className="mt-3 text-sm text-cream/65">
              Authentic Kerala flavours in Fujairah — dine-in, takeaway, and
              catering for gatherings of any size.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {[
                { label: "Instagram", href: "#" },
                { label: "TikTok", href: "#" },
                { label: "WhatsApp", href: "#" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="rounded-full border border-white/10 bg-black/30 px-4 py-2 text-sm text-cream/70 transition hover:border-gold/25 hover:bg-white/5 hover:text-cream"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4">
            <p className="text-sm font-semibold text-cream">Newsletter</p>
            <p className="mt-2 text-sm text-cream/65">
              Seasonal menus, event nights, and chef’s table moments.
            </p>
            <form
              className="mt-4 flex gap-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                className="w-full rounded-full border border-white/10 bg-black/30 px-4 py-3 text-sm text-cream placeholder:text-cream/35 outline-none transition focus:border-gold/35 focus:ring-2 focus:ring-gold/25"
                placeholder="Email address"
                type="email"
                autoComplete="email"
              />
              <button
                type="submit"
                className="rounded-full bg-gold px-5 py-3 text-sm font-semibold text-black gold-glow transition hover:translate-y-[-1px]"
              >
                Join
              </button>
            </form>
            <p className="mt-2 text-xs text-cream/55">
              By subscribing, you agree to receive occasional updates.
            </p>
          </div>

          <div className="lg:col-span-4">
            <p className="text-sm font-semibold text-cream">Quick links</p>
            <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
              {[
                { label: "Catering", href: "#events" },
                { label: "Menu", href: "#menu" },
                { label: "Gallery", href: "#gallery" },
                { label: "Location", href: "#location" },
              ].map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="rounded-xl px-3 py-2 text-cream/70 transition hover:bg-white/5 hover:text-cream"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-cream/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p className="font-[var(--font-arabic)]" dir="rtl">
            أهلاً وسهلاً — نرحّب بكم في جولدن
          </p>
        </div>
      </Container>
    </footer>
  );
}

