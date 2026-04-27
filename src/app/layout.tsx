import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Noto_Sans_Arabic, Playfair_Display } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const notoArabic = Noto_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Golden Restaurant | Fujairah, UAE",
  description:
    "A luxury Middle Eastern fine dining destination in Fujairah, UAE — where tradition meets modern sophistication.",
  openGraph: {
    title: "Golden Restaurant | Fujairah, UAE",
    description:
      "Luxury Middle Eastern fine dining in Fujairah — tradition, artistry, and modern sophistication.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${playfair.variable} ${inter.variable} ${notoArabic.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
