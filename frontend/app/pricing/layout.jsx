// PricingLayout.jsx
import Footer from "@/components/landing-page/Footer";
import Navigation from "@/components/landing-page/Navigation";

const PricingLayout = ({ children }) => {
  return (
    <section className="w-full min-h-screen flex flex-col bg-gray-100 dark:bg-background">
      <Navigation />
        <main className="flex-1">{children}</main>
      <Footer />
    </section>
  );
};

export default PricingLayout;
