"use client";

import React, {
  createContext,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ── Context ───────────────────────────────────────────────────────────────────
interface HScrollCtx {
  isHorizontal: boolean;
  goToSection: (id: string) => void;
}

const HScrollContext = createContext<HScrollCtx>({
  isHorizontal: false,
  goToSection: () => {},
});

export const useHScroll = () => useContext(HScrollContext);

// ── Section registry ──────────────────────────────────────────────────────────
const SECTIONS = [
  { id: "top",          label: "Home" },
  { id: "about",        label: "About" },
  { id: "signature",    label: "Signature" },
  { id: "menu",         label: "Menu" },
  { id: "gallery",      label: "Gallery" },
  { id: "testimonials", label: "Reviews" },
  { id: "events",       label: "Catering" },
  { id: "location",     label: "Location" },
];

// ── Component ─────────────────────────────────────────────────────────────────
export function HorizontalScroll({ children }: { children: ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);
  const [isHorizontal, setIsHorizontal] = useState(false);
  const [activeSection, setActiveSection] = useState("top");

  /* Navigate to a section by its HTML id */
  const goToSection = (id: string) => {
    const idx = SECTIONS.findIndex((s) => s.id === id);
    if (idx === -1) return;

    if (!isHorizontal) {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    
    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    if (!wrapper || !track) return;
    
    // Determine how many horizontal panels we have
    const N = track.querySelectorAll(".hs-panel").length;

    if (idx < N) {
      // It's a horizontal panel
      const wrapperTop = wrapper.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: wrapperTop + idx * window.innerWidth,
        behavior: "smooth",
      });
    } else {
      // It's a vertical section, scroll to it naturally
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    /* ── Desktop: horizontal pin ───────────────────────────────────────────── */
    mm.add("(min-width: 768px)", () => {
      const wrapper = wrapperRef.current;
      const track   = trackRef.current;
      if (!wrapper || !track) return;

      const panels     = Array.from(track.querySelectorAll<HTMLElement>(".hs-panel"));
      const N          = panels.length;
      const totalShift = (N - 1) * window.innerWidth;

      /* ── Main pin + x-tween ────────────────────────────────────────────── */
      /*   Content is ALWAYS fully visible — we NEVER touch opacity.          */
      /*   The cinematic feel comes from the panel slide alone.               */
      const tween = gsap.to(track, {
        x: () => -totalShift,
        ease: "none",
        scrollTrigger: {
          id: "hs-pin",
          trigger: wrapper,
          start: "top top",
          end: () => `+=${totalShift}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.round(self.progress * (N - 1));
            // Ensure we don't bleed into vertical section IDs if they somehow mismatch
            if (idx < N) {
              setActiveSection(SECTIONS[idx].id);
            }
          },
        },
      });

      setIsHorizontal(true);

      /* ── Progress bar (tracks entire page now) ─────────────────────────── */
      const bar = document.getElementById("hs-progress-bar");
      if (bar) {
        gsap.to(bar, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            id: "hs-progress",
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        });
      }

      /* ── Vertical sections active tracker ──────────────────────────────── */
      SECTIONS.forEach((sec, i) => {
        if (i < N) return; // Handled by horizontal pin
        ScrollTrigger.create({
          id: `tracker-${sec.id}`,
          trigger: `#${sec.id}`,
          start: "top center",
          end: "bottom center",
          onToggle: (self) => {
            if (self.isActive) setActiveSection(sec.id);
          },
        });
      });

      /* ── Subtle scale-in per panel — opacity untouched ─────────────────── */
      panels.forEach((panel, i) => {
        if (i === 0) return;
        gsap.fromTo(
          panel,
          { scale: 0.97 },
          {
            scale: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: tween,
              start: "left 96%",
              end: "left 5%",
              scrub: true,
            },
          },
        );
      });

      return () => {
        tween.kill();
        SECTIONS.forEach(sec => ScrollTrigger.getById(`tracker-${sec.id}`)?.kill());
        setIsHorizontal(false);
        setActiveSection("top");
      };
    });

    /* ── Mobile: normal vertical scroll ───────────────────────────────────── */
    mm.add("(max-width: 767px)", () => {
      setIsHorizontal(false);
    });

    return () => mm.revert();
  }, []);

  return (
    <HScrollContext.Provider value={{ isHorizontal, goToSection }}>
      {/* ── Gold progress bar ─────────────────────────────────────────────── */}
      <div
        id="hs-progress-bar"
        style={{ transformOrigin: "left center", transform: "scaleX(0)" }}
        className="pointer-events-none fixed bottom-0 left-0 z-[300] h-[2px] w-full
                   bg-gradient-to-r from-[#a8660a] via-[#d4af37] to-[#f5e6a3]"
        aria-hidden="true"
      />

      {/* ── Dot navigation (desktop only) ─────────────────────────────────── */}
      <nav
        aria-label="Section navigation"
        className="fixed right-5 top-1/2 z-[300] hidden -translate-y-1/2 flex-col gap-3 md:flex"
      >
        {SECTIONS.map((sec, i) => (
          <button
            key={sec.id}
            type="button"
            aria-label={`Go to ${sec.label}`}
            onClick={() => goToSection(sec.id)}
            className="group relative flex h-5 w-5 items-center justify-center"
          >
            <span
              className={[
                "block rounded-full transition-all duration-300",
                activeSection === sec.id
                  ? "h-3 w-3 bg-[#d4af37] shadow-[0_0_10px_rgba(212,175,55,0.9)]"
                  : "h-2 w-2 bg-white/25 group-hover:bg-white/55",
              ].join(" ")}
            />
            <span
              className="pointer-events-none absolute right-8 whitespace-nowrap rounded-lg
                         bg-black/90 px-2.5 py-1 text-xs font-medium text-[#d4af37]
                         opacity-0 ring-1 ring-[#d4af37]/20 transition-opacity duration-200
                         group-hover:opacity-100"
            >
              {sec.label}
            </span>
          </button>
        ))}
      </nav>

      {/* ── Horizontal scroll wrapper + track ────────────────────────────── */}
      <div ref={wrapperRef} className="hs-wrapper">
        <div
          ref={trackRef}
          className="hs-track flex will-change-transform"
        >
          {React.Children.map(children, (child, i) => (
            <div
              key={i}
              className="hs-panel relative flex-none"
              style={{ width: "100vw", minHeight: "100vh", overflowY: "auto" }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>
    </HScrollContext.Provider>
  );
}
