import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useCart } from '@/context/CartContext';

export function Navbar() {
  const { itemCount } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (logoRef.current) {
      gsap.fromTo(
        logoRef.current,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.3 }
      );
    }
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-cream/95 backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.08)] py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div ref={logoRef} className="flex items-center gap-2">
          <span className="text-2xl">🐝</span>
          <span className={`font-display font-extrabold text-xl md:text-2xl tracking-tight ${
            scrolled ? 'text-brown-dark' : 'text-brown-dark'
          }`}>
            Doce Angélica
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#products" className="font-body text-brown-dark/80 hover:text-honey transition-colors font-semibold">
            Sabores
          </a>
          <a href="#showcase" className="font-body text-brown-dark/80 hover:text-honey transition-colors font-semibold">
            O Recheio
          </a>
          <a href="#story" className="font-body text-brown-dark/80 hover:text-honey transition-colors font-semibold">
            Carinho
          </a>
          <a href="#hunger" className="font-body text-brown-dark/80 hover:text-honey transition-colors font-semibold">
            Fome?
          </a>
        </div>

        <a
          href="#products"
          className="flex items-center gap-2 bg-honey hover:bg-honey-dark text-brown-dark font-display font-bold px-5 py-2.5 rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg shadow-honey/30"
        >
          <span>Pedir</span>
          <span>🍪</span>
          {itemCount > 0 && (
            <span className="bg-brown-dark text-honey text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </a>
      </div>
    </nav>
  );
}
