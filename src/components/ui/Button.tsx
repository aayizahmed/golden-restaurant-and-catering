import Link from "next/link";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";

export function Button({
  href,
  children,
  className,
  variant = "primary",
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: ButtonVariant;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  const base =
    "group relative inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black";

  const variants: Record<ButtonVariant, string> = {
    primary:
      "bg-gold text-black gold-glow hover:translate-y-[-1px] hover:shadow-[0_10px_40px_rgba(212,175,55,0.18)]",
    secondary:
      "border border-gold/50 text-cream hover:border-gold/80 hover:bg-gold/10 hover:translate-y-[-1px]",
    ghost: "text-cream/90 hover:text-cream hover:bg-white/5",
  };

  // “liquid fill” effect via inner overlay
  const liquid =
    variant === "primary"
      ? "after:absolute after:inset-0 after:rounded-full after:bg-[radial-gradient(120px_80px_at_20%_10%,rgba(255,255,255,0.35),transparent_60%)] after:opacity-0 after:transition-opacity after:duration-300 group-hover:after:opacity-100"
      : "";

  return (
    <Link href={href} onClick={onClick} className={cn(base, variants[variant], liquid, className)}>
      <span className="relative z-10">{children}</span>
      <span className="pointer-events-none absolute inset-[-1px] rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <span className="absolute inset-0 rounded-full bg-[conic-gradient(from_180deg,rgba(212,175,55,0),rgba(212,175,55,0.55),rgba(205,127,50,0.35),rgba(212,175,55,0))] blur-md" />
      </span>
    </Link>
  );
}

