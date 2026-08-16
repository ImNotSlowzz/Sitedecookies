import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMagneticButton } from '@/hooks/useMagneticButton';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const cookieRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const beeRef = useRef<HTMLDivElement>(null);
  const magneticPrimary = useMagneticButton(0.25);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.hero-logo', { y: -40, opacity: 0, duration: 0.6 })
        .from(
          '.hero-title-word',
          { y: 60, opacity: 0, rotation: 8, stagger: 0.08, duration: 0.7 },
          '-=0.2'
        )
        .from('.hero-subtitle', { y: 30, opacity: 0, duration: 0.6 }, '-=0.3')
        .from('.hero-btn', { y: 20, opacity: 0, stagger: 0.12, duration: 0.5 }, '-=0.2')
        .from(
          '.hero-decor',
          { scale: 0, opacity: 0, stagger: 0.1, duration: 0.6, ease: 'back.out(1.7)' },
          '-=0.4'
        )
        .fromTo(
          cookieRef.current,
          { scale: 0.5, opacity: 0, rotation: -30 },
          { scale: 1, opacity: 1, rotation: 0, duration: 1, ease: 'elastic.out(1, 0.7)' },
          '-=0.8'
        )
        .fromTo(
          beeRef.current,
          { x: -200, y: -100, opacity: 0, scale: 0.5 },
          { x: 0, y: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out' },
          '-=0.6'
        );

      // Floating cookie
      if (cookieRef.current && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.to(cookieRef.current, {
          y: -15,
          rotation: 3,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      // Bee floating around cookie
      if (beeRef.current && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.to(beeRef.current, {
          x: 30,
          y: -20,
          rotation: 8,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      // Parallax on scroll
      gsap.to(cookieRef.current, {
        y: 120,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToProducts = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToOrder = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-12"
      style={{
        background:
          'radial-gradient(ellipse at 70% 30%, #FFF4D6 0%, #FFF8E7 40%, #FDF6EC 100%)',
      }}
    >
      {/* Decorative floating shapes */}
      <div className="hero-decor absolute top-32 left-[8%] w-16 h-16 rounded-full bg-honey/20 blur-sm" />
      <div className="hero-decor absolute top-48 right-[12%] w-10 h-10 rounded-full bg-pistache/20" />
      <div className="hero-decor absolute bottom-40 left-[15%] w-20 h-20 rounded-full bg-honey/10" />
      <div className="hero-decor absolute bottom-32 right-[20%] w-6 h-6 rounded-full bg-brown-chocolate/10" />
      <div className="hero-decor absolute top-1/2 left-[5%] text-4xl opacity-30">🍯</div>
      <div className="hero-decor absolute bottom-1/3 right-[8%] text-3xl opacity-25">🌸</div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8 items-center">
        {/* Left: Text */}
        <div className="text-center md:text-left order-2 md:order-1">
          <div className="hero-logo inline-flex items-center gap-2 mb-6 bg-honey/15 px-4 py-2 rounded-full">
            <span className="text-lg">🐝</span>
            <span className="font-body text-brown-dark font-semibold text-sm tracking-wide">
              Cookies artesanais recheados
            </span>
          </div>

          <h1
            ref={titleRef}
            className="font-display font-black text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-brown-dark leading-[1.05] mb-6"
          >
            <span className="hero-title-word inline-block">O</span>{' '}
            <span className="hero-title-word inline-block">cookie</span>{' '}
            <span className="hero-title-word inline-block">que</span>{' '}
            <span className="hero-title-word inline-block">vai</span>{' '}
            <span className="hero-title-word inline-block">virar</span>{' '}
            <br className="hidden sm:block" />
            <span className="hero-title-word inline-block text-honey-dark">seu</span>{' '}
            <span className="hero-title-word inline-block text-honey-dark">novo</span>{' '}
            <span className="hero-title-word inline-block text-honey-dark">vício</span>{' '}
            <span className="hero-title-word inline-block">🍪</span>
          </h1>

          <p className="hero-subtitle font-body text-lg md:text-xl text-brown-dark/70 mb-8 max-w-md mx-auto md:mx-0 leading-relaxed">
            Recheados, macios e feitos para transformar aquela vontade de doce em felicidade.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button
              ref={magneticPrimary as React.RefObject<HTMLButtonElement>}
              onClick={scrollToOrder}
              className="hero-btn group relative bg-honey hover:bg-honey-dark text-brown-dark font-display font-extrabold text-lg px-8 py-4 rounded-full transition-all shadow-xl shadow-honey/40 hover:shadow-2xl hover:shadow-honey/50 hover:scale-105 active:scale-95"
            >
              QUERO MEU COOKIE 🍪
            </button>
            <button
              onClick={scrollToProducts}
              className="hero-btn bg-transparent border-2 border-brown-dark/20 hover:border-brown-dark text-brown-dark font-display font-bold text-lg px-8 py-4 rounded-full transition-all hover:bg-brown-dark hover:text-cream"
            >
              VER SABORES ↓
            </button>
          </div>
        </div>

        {/* Right: Cookie image with bee */}
        <div className="relative order-1 md:order-2 flex items-center justify-center">
          <div
            ref={cookieRef}
            className="relative w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] lg:w-[460px] lg:h-[460px]"
          >
            {/* Glow */}
            <div className="absolute inset-0 rounded-full bg-honey/30 blur-3xl scale-110" />
            <img
              src="https://images.pexels.com/photos/14571330/pexels-photo-14571330.jpeg?auto=compress&cs=tinysrgb&w=900&h=900&fit=crop"
              alt="Cookie recheado gourmet"
              className="relative w-full h-full object-cover rounded-full shadow-2xl shadow-brown-dark/30"
              loading="eager"
            />
          </div>

          {/* Bee near cookie */}
          <div
            ref={beeRef}
            className="absolute top-0 right-0 md:top-[-20px] md:right-[-20px] w-20 h-17 md:w-28 md:h-24 pointer-events-none z-20"
            style={{ width: 90, height: 75 }}
          >
            <svg viewBox="0 0 120 100" className="w-full h-full drop-shadow-[0_6px_16px_rgba(0,0,0,0.15)]">
              <ellipse cx="42" cy="32" rx="22" ry="14" fill="rgba(255,255,255,0.82)" stroke="rgba(40,30,20,0.15)" strokeWidth="1" />
              <ellipse cx="78" cy="32" rx="22" ry="14" fill="rgba(255,255,255,0.82)" stroke="rgba(40,30,20,0.15)" strokeWidth="1" />
              <ellipse cx="60" cy="62" rx="28" ry="24" fill="#F5C518" />
              <path d="M40 55 Q60 50 80 55 L80 63 Q60 58 40 63 Z" fill="#2A1B0F" />
              <path d="M38 70 Q60 67 82 70 L82 78 Q60 75 38 78 Z" fill="#2A1B0F" />
              <ellipse cx="60" cy="82" rx="18" ry="8" fill="#2A1B0F" />
              <circle cx="60" cy="45" r="20" fill="#F5C518" />
              <path d="M52 30 Q49 22 53 18" stroke="#2A1B0F" strokeWidth="2" fill="none" strokeLinecap="round" />
              <path d="M68 30 Q71 22 67 18" stroke="#2A1B0F" strokeWidth="2" fill="none" strokeLinecap="round" />
              <circle cx="53" cy="17" r="2.5" fill="#2A1B0F" />
              <circle cx="67" cy="17" r="2.5" fill="#2A1B0F" />
              <circle cx="53" cy="44" r="5" fill="#fff" />
              <circle cx="67" cy="44" r="5" fill="#fff" />
              <circle cx="54" cy="45" r="2.8" fill="#2A1B0F" />
              <circle cx="68" cy="45" r="2.8" fill="#2A1B0F" />
              <circle cx="55" cy="44" r="1" fill="#fff" />
              <circle cx="69" cy="44" r="1" fill="#fff" />
              <circle cx="47" cy="50" r="3.5" fill="#ff9aa2" opacity="0.55" />
              <circle cx="73" cy="50" r="3.5" fill="#ff9aa2" opacity="0.55" />
              <path d="M54 52 Q60 56 66 52" stroke="#2A1B0F" strokeWidth="2" fill="none" strokeLinecap="round" />
              <circle cx="60" cy="60" r="3" fill="#3D2817" opacity="0.7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="font-body text-xs text-brown-dark/50 font-semibold tracking-widest uppercase">Scroll</span>
        <div className="w-6 h-10 border-2 border-brown-dark/20 rounded-full flex justify-center pt-1.5">
          <div className="w-1.5 h-2 bg-brown-dark/40 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
