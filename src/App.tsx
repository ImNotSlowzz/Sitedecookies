import { CartProvider } from '@/context/CartContext';
import { useLenis } from '@/hooks/useLenis';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { ProductSection } from '@/components/ProductSection';
import { CookieShowcase } from '@/components/CookieShowcase';
import { StorySection } from '@/components/StorySection';
import { HungerSection } from '@/components/HungerSection';
import { CTASection } from '@/components/CTASection';
import { Footer } from '@/components/Footer';
import { Cart } from '@/components/Cart';
import { CartButton } from '@/components/CartButton';
import { BeeMascot } from '@/components/BeeMascot';

function App() {
  useLenis();

  return (
    <CartProvider>
      <div className="min-h-screen bg-cream overflow-x-hidden">
        <Navbar />
        <BeeMascot />
        <Hero />
        <ProductSection />
        <CookieShowcase />
        <StorySection />
        <HungerSection />
        <CTASection />
        <Footer />
        <Cart />
        <CartButton />
      </div>
    </CartProvider>
  );
}

export default App;
