import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function CookieShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const leftHalfRef = useRef<HTMLDivElement>(null);
  const rightHalfRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax image
      gsap.to(imgRef.current, {
        y: -60,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      });

      // Split cookie animation
      gsap.to(leftHalfRef.current, {
        x: -40,
        rotation: -5,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          end: 'center center',
          scrub: 1,
        },
      });

      gsap.to(rightHalfRef.current, {
        x: 40,
        rotation: 5,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          end: 'center center',
          scrub: 1,
        },
      });

      // Progressive text reveals
      const phrases = gsap.utils.toArray<HTMLElement>('.showcase-phrase');
      phrases.forEach((phrase, i) => {
        gsap.fromTo(
          phrase,
          { opacity: 0, y: 40, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: phrase,
              start: 'top 85%',
              end: 'bottom 60%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="showcase"
      ref={sectionRef}
      className="relative py-32 md:py-40 overflow-hidden bg-gradient-to-b from-honey via-honey to-honey-dark"
    >
      {/* Texture overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(0,0,0,0.1) 0%, transparent 50%)',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <p className="font-body text-brown-dark/60 font-bold tracking-widest uppercase text-sm mb-16">
          Olha esse recheio
        </p>

        {/* Split cookie visual */}
        <div ref={imgRef} className="relative w-full h-[280px] sm:h-[360px] mb-20 flex items-center justify-center">
          <div ref={leftHalfRef} className="absolute w-[140px] h-[140px] sm:w-[200px] sm:h-[200px] rounded-full overflow-hidden shadow-2xl">
            <img
              src="https://images.pexels.com/photos/5241511/pexels-photo-5241511.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop"
              alt="Cookie partido - metade esquerda"
              className="w-[200%] h-full object-cover"
              style={{ objectPosition: 'left center' }}
              loading="lazy"
            />
          </div>
          <div ref={rightHalfRef} className="absolute w-[140px] h-[140px] sm:w-[200px] sm:h-[200px] rounded-full overflow-hidden shadow-2xl">
            <img
              src="https://images.pexels.com/photos/5241510/pexels-photo-5241510.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop"
              alt="Cookie partido - metade direita"
              className="w-[200%] h-full object-cover"
              style={{ objectPosition: 'right center' }}
              loading="lazy"
            />
          </div>
          {/* Chocolate drip effect */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-2 h-16 bg-brown-chocolate/40 rounded-full blur-sm" />
          </div>
        </div>

        {/* Progressive narrative */}
        <div className="space-y-12 md:space-y-16">
          <h2 className="showcase-phrase font-display font-black text-3xl sm:text-5xl lg:text-6xl text-brown-dark leading-tight">
            Crocante por fora.
          </h2>
          <h2 className="showcase-phrase font-display font-black text-3xl sm:text-5xl lg:text-6xl text-brown-chocolate leading-tight">
            Recheado por dentro.
          </h2>
          <h2 className="showcase-phrase font-display font-black text-3xl sm:text-5xl lg:text-6xl text-brown-dark leading-tight">
            Perfeito em qualquer hora.
          </h2>
        </div>
      </div>
    </section>
  );
}
