"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const LETTERS = ["G", "O", "L", "D", "E", "N"];

export function SplashScreen() {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(false);

  // phase: "in" → letters animate in | "hold" → pause | "split" → curtain splits open
  const [phase, setPhase] = useState<"in" | "hold" | "split">("in");

  useEffect(() => {
    // Only run on client – check sessionStorage after hydration
    if (reduced) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches) return;
    if (sessionStorage.getItem("splash_seen")) return;
    setVisible(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!visible) return;

    // letters finish animating in ≈ 1.6 s (stagger 0.08 × 6 + 0.6 duration)
    const holdTimer = window.setTimeout(() => setPhase("hold"), 1700);
    const splitTimer = window.setTimeout(() => setPhase("split"), 2300);
    const doneTimer = window.setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem("splash_seen", "1");
    }, 3100);

    return () => {
      window.clearTimeout(holdTimer);
      window.clearTimeout(splitTimer);
      window.clearTimeout(doneTimer);
    };
  }, [reduced, visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[9999] overflow-hidden bg-[#0a0800]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeIn" }}
        >
          {/* ── ambient radial glows ── */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_50%_50%,rgba(212,175,55,0.13),transparent_70%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(800px_400px_at_30%_25%,rgba(205,127,50,0.07),transparent_60%)]" />

          {/* ── top curtain panel ── */}
          <motion.div
            className="pointer-events-none absolute inset-x-0 top-0 bg-[#0a0800]"
            style={{ bottom: "50%" }}
            animate={phase === "split" ? { y: "-100%" } : { y: 0 }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          />

          {/* ── bottom curtain panel ── */}
          <motion.div
            className="pointer-events-none absolute inset-x-0 bottom-0 bg-[#0a0800]"
            style={{ top: "50%" }}
            animate={phase === "split" ? { y: "100%" } : { y: 0 }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          />

          {/* ── GOLDEN word ── */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="flex items-end gap-[0.04em] select-none"
              animate={
                phase === "split"
                  ? { opacity: 0, scale: 1.18 }
                  : { opacity: 1, scale: 1 }
              }
              transition={{ duration: 0.35, ease: "easeIn" }}
            >
              {LETTERS.map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 48, filter: "blur(12px)" }}
                  animate={
                    phase === "in" || phase === "hold"
                      ? { opacity: 1, y: 0, filter: "blur(0px)" }
                      : {}
                  }
                  transition={{
                    delay: 0.12 + i * 0.08,
                    duration: 0.62,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{
                    fontFamily: "var(--font-cormorant), 'Georgia', serif",
                    fontSize: "clamp(4.5rem, 14vw, 11rem)",
                    fontWeight: 300,
                    letterSpacing: "0.12em",
                    lineHeight: 1,
                    // gold gradient per-letter
                    background:
                      "linear-gradient(160deg, #f5e6a3 0%, #d4af37 40%, #c8860a 70%, #a8660a 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    // subtle glow
                    textShadow: "none",
                    filter:
                      "drop-shadow(0 0 28px rgba(212,175,55,0.45)) drop-shadow(0 0 6px rgba(212,175,55,0.3))",
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.div>

            {/* thin gold rule that appears under the word */}
            <motion.div
              className="absolute"
              style={{ top: "calc(50% + clamp(3rem, 9vw, 7rem))" }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={
                phase === "hold"
                  ? { scaleX: 1, opacity: 1 }
                  : phase === "split"
                  ? { scaleX: 0, opacity: 0 }
                  : { scaleX: 0, opacity: 0 }
              }
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                style={{
                  width: "clamp(120px, 20vw, 260px)",
                  height: "1px",
                  background:
                    "linear-gradient(90deg, transparent, rgba(212,175,55,0.8), transparent)",
                }}
              />
            </motion.div>

            {/* tagline */}
            <motion.p
              className="absolute text-center tracking-[0.28em] uppercase"
              style={{
                top: "calc(50% + clamp(4rem, 11vw, 8.5rem))",
                fontSize: "clamp(0.6rem, 1.2vw, 0.78rem)",
                color: "rgba(212,175,55,0.65)",
                letterSpacing: "0.28em",
              }}
              initial={{ opacity: 0, y: 8 }}
              animate={
                phase === "hold"
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 8 }
              }
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Restaurant &amp; Catering · Fujairah, UAE
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
