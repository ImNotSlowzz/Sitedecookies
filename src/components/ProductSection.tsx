import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { products } from '@/data/products';
import { ProductCard } from './ProductCard';

gsap.registerPlugin(ScrollTrigger);

export function ProductSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.products-title-line',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="products"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-gradient-to-b from-cream via-cream to-honey-light/20 overflow-hidden"
    >
      {/* Decorative bee trail */}
      <div className="absolute top-20 right-[5%] text-5xl opacity-10">🐝</div>
      <div className="absolute bottom-32 left-[8%] text-4xl opacity-10">🍪</div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="products-title-line font-body text-honey-dark font-bold tracking-widest uppercase text-sm mb-3">
            Escolha o seu
          </p>
          <h2
            ref={titleRef}
            className="products-title-line font-display font-black text-4xl sm:text-5xl lg:text-6xl text-brown-dark leading-tight"
          >
            Qual vai ser o seu?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
