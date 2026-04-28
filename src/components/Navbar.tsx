"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { nav, site } from "@/content/site";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);

  const goToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    // Check if horizontal pinning is active (desktop only)
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    const wrapper = document.querySelector(".hs-wrapper");
    const track = document.querySelector(".hs-track");

    if (isDesktop && wrapper && track) {
      // Find the target inside horizontal panels
      const panels = Array.from(track.querySelectorAll(".hs-panel"));
      const panelIdx = panels.findIndex((panel) => panel.querySelector(`#${id}`) || panel.id === id);

      if (panelIdx !== -1) {
        // Target is inside the horizontal pinning area
        const wrapperTop = wrapper.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: wrapperTop + panelIdx * window.innerWidth,
          behavior: "smooth",
        });
        return;
      }
    }

    // Default: Vertical section — standard scroll
    el.scrollIntoView({ behavior: "smooth" });
  };


  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      if (y < 60) {
        setHidden(false);
      } else if (y > lastY.current + 6) {
        setHidden(true);
        setOpen(false);
      } else if (y < lastY.current - 6) {
        setHidden(false);
      }
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-transform duration-300",
        hidden ? "-translate-y-full" : "translate-y-0",
      )}
    >
      <div
        className={cn(
          "mx-auto max-w-6xl px-5 sm:px-8",
          scrolled ? "pt-3" : "pt-5",
        )}
      >
        <div
          className={cn(
            "glass rounded-2xl px-4 py-3",
            scrolled ? "shadow-[0_20px_60px_rgba(0,0,0,0.55)]" : "",
          )}
        >
          <div className="flex items-center justify-between gap-3">
            <a href="#top" className="group flex items-center gap-2" aria-label="Golden Restaurant home" onClick={(e) => { e.preventDefault(); goToSection("top"); }}>
              <div className="relative size-10 overflow-hidden rounded-xl ring-1 ring-gold/30 shadow-[0_0_14px_rgba(212,175,55,0.25)] transition-shadow group-hover:shadow-[0_0_22px_rgba(212,175,55,0.45)]">
                <Image
                  src="/images/golden-new-logo.jpg"
                  alt="Golden Restaurant logo"
                  fill
                  className="object-cover"
                  sizes="40px"
                />
              </div>
              <span className="hidden font-[var(--font-heading)] text-base font-semibold tracking-wide text-cream sm:block">
                {site.name}
              </span>
            </a>

            <nav className="hidden items-center gap-6 md:flex">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => { e.preventDefault(); goToSection(item.href.replace("#", "")); }}
                  className="text-sm text-cream/75 transition hover:text-cream cursor-pointer"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <Button href="#events" className="hidden sm:inline-flex" onClick={(e: any) => { e.preventDefault(); goToSection("events"); }}>
                Catering Enquiry
              </Button>
              <button
                type="button"
                aria-label="Open menu"
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
                className="inline-flex items-center justify-center rounded-xl px-3 py-2 text-cream/80 ring-1 ring-white/10 hover:bg-white/5 hover:text-cream md:hidden"
              >
                <span className="relative block h-4 w-5">
                  <span
                    className={cn(
                      "absolute left-0 top-0 h-0.5 w-5 rounded bg-current transition",
                      open ? "translate-y-[7px] rotate-45" : "",
                    )}
                  />
                  <span
                    className={cn(
                      "absolute left-0 top-[7px] h-0.5 w-5 rounded bg-current transition",
                      open ? "opacity-0" : "",
                    )}
                  />
                  <span
                    className={cn(
                      "absolute left-0 top-[14px] h-0.5 w-5 rounded bg-current transition",
                      open ? "translate-y-[-7px] -rotate-45" : "",
                    )}
                  />
                </span>
              </button>
            </div>
          </div>

          {open ? (
            <div className="mt-3 grid gap-2 md:hidden">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => { e.preventDefault(); setOpen(false); goToSection(item.href.replace("#", "")); }}
                  className="rounded-xl px-3 py-2 text-sm text-cream/80 hover:bg-white/5 hover:text-cream cursor-pointer"
                >
                  {item.label}
                </a>
              ))}
              <Button href="#events" className="mt-1 w-full justify-center" onClick={(e: any) => { e.preventDefault(); setOpen(false); goToSection("events"); }}>
                Catering Enquiry
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}

