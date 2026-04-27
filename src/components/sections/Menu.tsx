"use client";

import { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";
import { useGsapReveal } from "@/lib/useGsapReveal";

type MenuTab = "breakfast" | "lunch" | "indian" | "chinese" | "grills" | "snacks";

export function MenuSection() {
  const ref = useRef<HTMLElement>(null);
  useGsapReveal(ref);
  const [tab, setTab] = useState<MenuTab>("breakfast");

  const menu = useMemo(
    () => ({
      breakfast: [
        { name: "Dosa Set", price: "6", note: "" },
        { name: "Masala Dosa", price: "6", note: "" },
        { name: "Poori Bhaji", price: "6", note: "" },
        { name: "Puttu Set", price: "6", note: "Godhambu Rice" },
        { name: "Vada Set", price: "5", note: "" },
        { name: "Ghee Roast", price: "6", note: "" },
        { name: "Idly Set", price: "6", note: "" },
        { name: "Porotta Set", price: "6", note: "" },
        { name: "Chappathi Set", price: "6", note: "" },
      ],
      lunch: [
        { name: "Motta Set", price: "8", note: "" },
        { name: "Barik Set", price: "9", note: "" },
        { name: "Chicken Dum Biriyani", price: "12", note: "" },
        { name: "Chicken Fry Biriyani", price: "13", note: "" },
        { name: "Beef Biriyani", price: "15", note: "" },
        { name: "Mutton Biriyani", price: "18", note: "" },
        { name: "Ghee Rice Beef Combo", price: "16", note: "" },
        { name: "Ghee Rice Chicken Combo", price: "16", note: "" },
        { name: "Ghee Rice Only", price: "7", note: "" },
        { name: "Biriyani Rice Only", price: "8", note: "" },
      ],
      indian: [
        { name: "Beef Curry / Fry", price: "15 / 16", note: "" },
        { name: "Chicken Curry / Mutton Curry", price: "12 / 18", note: "" },
        { name: "Fish Curry / Veg Curry", price: "8 / 8", note: "" },
        { name: "Breads", price: "1-1.50", note: "Porotta, Chappathi, Appam, Puttu" },
        { name: "Chicken 65 / Nadan Fry", price: "15 / 12", note: "" },
        { name: "Kothu Porotta", price: "14-17", note: "Chicken, Beef, Veg, Egg options" },
        { name: "Chicken Chilly / Pepper", price: "15", note: "" },
        { name: "Chicken Manjurian / Chukka", price: "15", note: "" },
        { name: "Kadai / Butter Chicken", price: "16 / 17", note: "" },
        { name: "Chicken Tikka / Masala", price: "15", note: "" },
      ],
      chinese: [
        { name: "Chicken / Beef Fried Rice", price: "18 / 20", note: "" },
        { name: "Egg / Veg Fried Rice", price: "15 / 15", note: "" },
        { name: "Shezwan Fried Rice", price: "23-24", note: "Chicken, Beef, Mixed options" },
        { name: "Noodles", price: "15-22", note: "Chicken, Beef, Egg, Veg, Mixed" },
        { name: "Soups", price: "12-14", note: "Chicken, Manchow, Hot & Sour, Sweet Corn" },
        { name: "Paneer Dishes", price: "14-16", note: "Kadai, Chilly, Manjurian, Butter Masala" },
        { name: "Gobi Dishes", price: "14-15", note: "65, Masala, Manjurian" },
        { name: "Dal Thadka / Fry", price: "10 / 8", note: "" },
        { name: "Mushroom / Veg Kadai", price: "14", note: "" },
      ],
      grills: [
        { name: "Grill Chicken (Full / Half)", price: "28 / 17", note: "" },
        { name: "Charcoal Normal (Full / Half)", price: "39 / 23", note: "" },
        { name: "Charcoal Pepper (Full / Half)", price: "41 / 24", note: "" },
        { name: "Shawarma (Normal & Spicy)", price: "6", note: "" },
        { name: "Arabic Shawarma", price: "14", note: "" },
        { name: "Broasted - Snack Meal", price: "14", note: "" },
        { name: "Broasted - Dinner Meal", price: "17", note: "" },
        { name: "Broasted - Jumbo / Family Meal", price: "35 / 69", note: "" },
        { name: "Broasted - Party Meal", price: "95", note: "" },
      ],
      snacks: [
        { name: "French Fries / Wedges", price: "6 / 7", note: "" },
        { name: "Burger (Chicken & Beef)", price: "8", note: "" },
        { name: "Zinger / Grill Burger", price: "12 / 14", note: "" },
        { name: "Zinger Porotta", price: "12", note: "" },
        { name: "Mega Zinger", price: "16", note: "" },
        { name: "Club Sandwiches", price: "14-16", note: "Zinger, Chicken, Shawarma, Mega" },
        { name: "Omelette S/W", price: "4", note: "" },
        { name: "Cheese Porotta", price: "3", note: "" },
        { name: "Juice (Medium / Large)", price: "8 / 10", note: "" },
        { name: "Special Juice / Sarbath", price: "10-12 / 8", note: "Avil Milk (12 DHS)" },
      ],
    }),
    [],
  );

  const tabs: { id: MenuTab; label: string; emoji: string }[] = [
    { id: "breakfast", label: "Breakfast", emoji: "🌅" },
    { id: "lunch", label: "Lunch", emoji: "🍛" },
    { id: "indian", label: "Indian Menu", emoji: "🥘" },
    { id: "chinese", label: "Chinese & Soups", emoji: "🍜" },
    { id: "grills", label: "Grills & Broasted", emoji: "🍗" },
    { id: "snacks", label: "Snacks & Juices", emoji: "🥤" },
  ];

  return (
    <section id="menu" ref={ref} className="relative py-20 sm:py-24">
      <Container>
        <p
          data-reveal
          className="text-xs font-semibold tracking-[0.22em] text-gold/90"
        >
          KERALA CUISINE
        </p>
        <h2
          data-reveal
          className="mt-4 font-[var(--font-heading)] text-3xl tracking-tight text-cream sm:text-4xl"
        >
          Nadan flavours, for every moment
        </h2>
        <p data-reveal className="mt-4 max-w-2xl text-cream/70 leading-7">
          Authentic Kerala home cooking — coconut, curry leaves & kodampuli
          in every dish. Full menu available in-restaurant.
        </p>

        <div data-reveal className="mt-10 flex flex-wrap justify-center gap-4 sm:gap-6 lg:justify-start">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={cn(
                "group flex flex-col items-center gap-3 transition-all",
              )}
            >
              <div
                className={cn(
                  "flex size-20 items-center justify-center rounded-full text-3xl shadow-lg ring-1 transition-all duration-300 group-hover:scale-105 sm:size-24 sm:text-4xl",
                  tab === t.id
                    ? "bg-gold ring-gold/40 shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                    : "bg-black/40 ring-white/10 group-hover:bg-white/10 group-hover:ring-gold/30",
                )}
              >
                <span className="transition-transform duration-300 group-hover:-translate-y-1">{t.emoji}</span>
              </div>
              <span 
                className={cn(
                  "text-xs font-semibold tracking-wide transition-colors sm:text-sm",
                  tab === t.id ? "text-gold" : "text-cream/60 group-hover:text-cream"
                )}
              >
                {t.label.toUpperCase()}
              </span>
            </button>
          ))}
        </div>

        <motion.div
          data-reveal
          layout
          className="mt-6 grid gap-3 rounded-3xl border border-gold/15 bg-black/30 p-5 ring-1 ring-white/10 sm:grid-cols-2"
        >
          <AnimatePresence mode="popLayout">
            {menu[tab].map((item, i) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.25, delay: Math.min(i * 0.04, 0.4) }}
                key={item.name}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 transition-all hover:-translate-y-1 hover:border-gold/30 hover:shadow-[0_8px_30px_rgba(212,175,55,0.12)]"
              >
                {/* Subtle golden gradient that activates on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                
                <div className="relative z-10 flex items-start justify-between gap-4">
                  <div>
                    <p className="font-[var(--font-heading)] text-lg text-cream transition-colors group-hover:text-gold">
                      {item.name}
                    </p>
                    {item.note && (
                      <p className="mt-2 text-sm text-cream/50 transition-colors group-hover:text-cream/80">
                        {item.note}
                      </p>
                    )}
                  </div>
                  <p className="shrink-0 rounded-full bg-gold/10 px-3 py-1 text-sm font-semibold text-gold/95 ring-1 ring-gold/20 transition-all duration-300 group-hover:bg-gold group-hover:text-black group-hover:ring-gold group-hover:shadow-[0_0_12px_rgba(212,175,55,0.4)]">
                    AED {item.price}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>
    </section>
  );
}
