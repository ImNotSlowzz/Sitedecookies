import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function HungerSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const phrases = gsap.utils.toArray<HTMLElement>('.hunger-text');

      phrases.forEach((phrase) => {
        gsap.fromTo(
          phrase,
          { opacity: 0, y: 80, scale: 0.85 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: phrase,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Floating cookie elements
      gsap.utils.toArray<HTMLElement>('.hunger-float').forEach((el, i) => {
        gsap.to(el, {
          y: -20,
          x: i % 2 === 0 ? 10 : -10,
          rotation: i % 2 === 0 ? 8 : -8,
          duration: 3 + i * 0.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hunger"
      ref={sectionRef}
      className="relative py-32 md:py-40 bg-brown-dark overflow-hidden"
    >
      {/* Floating cookies */}
      <span className="hunger-float absolute top-20 left-[10%] text-5xl opacity-15">🍪</span>
      <span className="hunger-float absolute top-40 right-[12%] text-4xl opacity-10">🍫</span>
      <span className="hunger-float absolute bottom-32 left-[15%] text-3xl opacity-10">🍪</span>
      <span className="hunger-float absolute bottom-20 right-[18%] text-5xl opacity-15">🍪</span>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <h2 className="hunger-text font-display font-black text-5xl sm:text-7xl lg:text-8xl text-honey leading-none mb-6">
          Só um?
        </h2>
        <h2 className="hunger-text font-display font-black text-5xl sm:text-7xl lg:text-8xl text-cream/60 leading-none mb-6">
          Impossível.
        </h2>
        <h2 className="hunger-text font-display font-black text-5xl sm:text-7xl lg:text-8xl text-honey leading-none">
          Pede mais um.
        </h2>

        <p className="hunger-text font-body text-lg text-cream/50 mt-12 max-w-md mx-auto">
          A gente sabe. Um nunca é suficiente. 🐝
        </p>
      </div>
    </section>
  );
}
