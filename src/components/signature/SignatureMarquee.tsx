"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const signatureImages = [
  { src: "/images/dosa.jpg", alt: "Crispy Dosa with Chutneys" },
  { src: "/images/poori.jpg", alt: "Fluffy Poori Bhaji" },
  { src: "/images/biryani.jpg", alt: "Golden Special Biriyani" },
];

export function SignatureMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trackRef.current) return;
    const track = trackRef.current;
    
    // Smooth infinite scrolling using GSAP
    // xPercent: -50 works because the doubled array is exactly twice the width
    const animation = gsap.to(track, {
      xPercent: -50,
      ease: "none",
      duration: 18,
      repeat: -1,
    });

    return () => {
      animation.kill();
    };
  }, []);

  // We duplicate the array multiple times to ensure enough items to fill ultrawide screens
  // and seamlessly loop exactly at the 50% mark.
  const loopItems = [...signatureImages, ...signatureImages, ...signatureImages, ...signatureImages];

  return (
    <div className="flex h-full w-full items-center overflow-hidden bg-black/20">
      <div 
        ref={trackRef} 
        className="flex gap-4 px-4 w-max will-change-transform"
      >
        {loopItems.map((img, i) => (
          <div 
            key={`${img.src}-${i}`} 
            className="group relative h-[360px] w-[260px] shrink-0 overflow-hidden rounded-2xl ring-1 ring-white/10 transition hover:ring-gold/40 sm:w-[300px]"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(min-width: 640px) 300px, 260px"
              priority={i < 4}
            />
            {/* Elegant overlay to make it look premium */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-40" />
            <div className="absolute bottom-6 left-6 right-6 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <p className="font-[var(--font-heading)] text-lg font-medium text-gold drop-shadow-md">
                {img.alt}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
