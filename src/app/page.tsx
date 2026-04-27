import { Navbar } from "@/components/Navbar";
import { SplashScreen } from "@/components/SplashScreen";
import { HorizontalScroll } from "@/components/HorizontalScroll";
import { HeroSection } from "@/components/sections/Hero";
import { AboutSection } from "@/components/sections/About";
import { SignatureSection } from "@/components/sections/Signature";
import { MenuSection } from "@/components/sections/Menu";
import { GallerySection } from "@/components/sections/Gallery";
import { TestimonialsSection } from "@/components/sections/Testimonials";
import { EventsSection } from "@/components/sections/Events";
import { LocationSection } from "@/components/sections/Location";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-full bg-black text-cream">
      <SplashScreen />
      <Navbar />
      <HorizontalScroll>
        <HeroSection />
        <AboutSection />
      </HorizontalScroll>
      <SignatureSection />
      <MenuSection />
      <GallerySection />
      <TestimonialsSection />
      <EventsSection />
      <LocationSection />
      <Footer />
    </div>
  );
}
