"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Container } from "@/components/ui/Container";
import { useGsapReveal } from "@/lib/useGsapReveal";
import { cn } from "@/lib/cn";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(7, "Please enter a valid phone"),
  date: z.string().min(1, "Select a preferred date"),
  guests: z
    .string()
    .min(1, "Select guests")
    .refine((v) => Number(v) > 0, "Guests must be at least 1"),
  message: z.string().min(8, "Tell us a little about your catering needs"),
});

type FormValues = z.infer<typeof schema>;

export function EventsSection() {
  const ref = useRef<HTMLElement>(null);
  useGsapReveal(ref);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      guests: "2",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setStatus("sending");
    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
      reset();
      window.setTimeout(() => setStatus("idle"), 3500);
    } catch {
      setStatus("error");
      window.setTimeout(() => setStatus("idle"), 3500);
    }
  };

  const field =
    "mt-1 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-cream placeholder:text-cream/35 outline-none transition focus:border-gold/35 focus:ring-2 focus:ring-gold/25";

  return (
    <section id="events" ref={ref} className="relative py-20 sm:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <p
              data-reveal
              className="text-xs font-semibold tracking-[0.22em] text-gold/90"
            >
              CATERING
            </p>
            <h2
              data-reveal
              className="mt-4 font-[var(--font-heading)] text-3xl tracking-tight text-cream sm:text-4xl"
            >
              Catering services, elevated
            </h2>
            <p data-reveal className="mt-4 text-cream/70 leading-7">
              From office lunches to family functions, we prepare Kerala
              favourites and crowd-pleasing platters—fresh, on-time, and tailored
              to your budget and guest count.
            </p>

            <div data-reveal className="mt-8 grid gap-3">
              {[
                { k: "Custom menus", v: "Veg & non-veg, mild to spicy" },
                { k: "Bulk orders", v: "Biriyani • curry • sides • desserts" },
                { k: "Reliable delivery", v: "Prepared fresh, packed safely" },
              ].map((x) => (
                <div key={x.k} className="glass rounded-2xl p-4">
                  <p className="text-sm font-semibold text-cream">{x.k}</p>
                  <p className="mt-1 text-sm text-cream/65">{x.v}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div
              data-reveal
              className="rounded-3xl border border-gold/15 bg-black/30 p-6 ring-1 ring-white/10 sm:p-8"
            >
              <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="text-sm text-cream/75">
                    Name
                    <input
                      {...register("name")}
                      className={field}
                      placeholder="Your full name"
                      autoComplete="name"
                    />
                    {errors.name ? (
                      <p className="mt-1 text-xs text-burgundy">
                        {errors.name.message}
                      </p>
                    ) : null}
                  </label>
                  <label className="text-sm text-cream/75">
                    Email
                    <input
                      {...register("email")}
                      className={field}
                      placeholder="you@email.com"
                      autoComplete="email"
                    />
                    {errors.email ? (
                      <p className="mt-1 text-xs text-burgundy">
                        {errors.email.message}
                      </p>
                    ) : null}
                  </label>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <label className="text-sm text-cream/75 sm:col-span-1">
                    Phone
                    <input
                      {...register("phone")}
                      className={field}
                      placeholder="+971 …"
                      autoComplete="tel"
                    />
                    {errors.phone ? (
                      <p className="mt-1 text-xs text-burgundy">
                        {errors.phone.message}
                      </p>
                    ) : null}
                  </label>
                  <label className="text-sm text-cream/75 sm:col-span-1">
                    Delivery / event date
                    <input {...register("date")} className={field} type="date" />
                    {errors.date ? (
                      <p className="mt-1 text-xs text-burgundy">
                        {errors.date.message}
                      </p>
                    ) : null}
                  </label>
                  <label className="text-sm text-cream/75 sm:col-span-1">
                    People
                    <select {...register("guests")} className={cn(field, "pr-10")}>
                      {Array.from({ length: 20 }).map((_, i) => (
                        <option key={i + 1} value={String(i + 1)}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                    {errors.guests ? (
                      <p className="mt-1 text-xs text-burgundy">
                        {errors.guests.message}
                      </p>
                    ) : null}
                  </label>
                </div>

                <label className="text-sm text-cream/75">
                  Catering details
                  <textarea
                    {...register("message")}
                    rows={4}
                    className={cn(field, "resize-none")}
                    placeholder="Occasion, delivery location, timing, dietary notes, spice level…"
                  />
                  {errors.message ? (
                    <p className="mt-1 text-xs text-burgundy">
                      {errors.message.message}
                    </p>
                  ) : null}
                </label>

                <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="submit"
                    className="group relative inline-flex items-center justify-center rounded-full bg-gold px-6 py-3 text-sm font-semibold text-black gold-glow transition hover:translate-y-[-1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:opacity-70"
                    disabled={status === "sending"}
                  >
                    {status === "sending" ? "Sending…" : "Enquire Catering"}
                    <span className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <span className="absolute inset-0 rounded-full bg-[radial-gradient(120px_80px_at_20%_10%,rgba(255,255,255,0.35),transparent_60%)]" />
                    </span>
                  </button>

                  <p className="text-sm text-cream/60">
                    {status === "sent"
                      ? "Thank you — we’ll reply shortly."
                      : status === "error"
                        ? "Something went wrong. Please try again."
                        : "We respond within 24 hours."}
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

