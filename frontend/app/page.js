import Faqs from "@/components/landing-page/Faqs";
import Footer from "@/components/landing-page/Footer";
import HeroSection from "@/components/landing-page/HeroSection";
import Navigation from "@/components/landing-page/Navigation";
import Pricing from "@/components/landing-page/Pricing";
import Testimonials from "@/components/landing-page/Testimonials";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen items-center justify-center">
      <Navigation />
      <HeroSection />
      <Testimonials />
      <Pricing />
      <Faqs />
      <Footer />
    </main>
  );
}
