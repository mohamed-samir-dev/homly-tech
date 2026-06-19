import Header from "./components/Header";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import PromoBanner from "./components/PromoBanner";
import FeaturedProducts from "./components/FeaturedProducts";
import WhyUs from "./components/WhyUs";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Categories />
        {/* <PromoBanner /> */}
        <FeaturedProducts />
        <WhyUs />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
