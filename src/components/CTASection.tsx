import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMagneticButton } from '@/hooks/useMagneticButton';
import { useCart } from '@/context/CartContext';
import { openWhatsApp } from '@/utils/whatsapp';

gsap.registerPlugin(ScrollTrigger);

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const magneticRef = useMagneticButton(0.35);
  const { items, total } = useCart();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.cta-title',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );
      gsap.fromTo(
        '.cta-sub',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );
      gsap.fromTo(
        '.cta-btn',
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          delay: 0.3,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      // Pulsing glow on button
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.to('.cta-glow', {
          scale: 1.2,
          opacity: 0.5,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handlePedir = () => {
    if (items.length > 0) {
      openWhatsApp(items);
    } else {
      document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-32 md:py-40 bg-gradient-to-b from-honey via-honey to-honey-dark overflow-hidden"
    >
      {/* Decorative bees */}
      <div className="absolute top-16 left-[10%] text-5xl opacity-15">🐝</div>
      <div className="absolute bottom-24 right-[12%] text-4xl opacity-15">🐝</div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <h2 className="cta-title font-display font-black text-4xl sm:text-6xl lg:text-7xl text-brown-dark leading-tight mb-6">
          Tá esperando o quê?
        </h2>
        <p className="cta-sub font-body text-lg md:text-xl text-brown-dark/70 mb-10 max-w-lg mx-auto">
          Seu próximo cookie favorito está a um clique de distância.
        </p>

        <div className="relative inline-block">
          <div className="cta-glow absolute inset-0 bg-brown-dark/30 rounded-full blur-2xl" />
          <button
            ref={magneticRef as React.RefObject<HTMLButtonElement>}
            onClick={handlePedir}
            className="cta-btn relative bg-brown-dark hover:bg-brown-chocolate text-cream font-display font-black text-xl px-10 py-5 rounded-full transition-all shadow-2xl shadow-brown-dark/30 hover:scale-105 active:scale-95"
          >
            {items.length > 0 ? `PEDIR AGORA 🍪 • R$ ${total.toFixed(2).replace('.', ',')}` : 'PEDIR AGORA 🍪'}
          </button>
        </div>
      </div>
    </section>
  );
}
