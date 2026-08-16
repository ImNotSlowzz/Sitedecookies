import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function StorySection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.story-text',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      gsap.fromTo(
        '.story-bee',
        { scale: 0, opacity: 0, rotation: -30 },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          },
        }
      );

      // Floating decorative elements
      gsap.utils.toArray<HTMLElement>('.story-float').forEach((el, i) => {
        gsap.to(el, {
          y: -15,
          rotation: 5,
          duration: 2.5 + i * 0.3,
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
      id="story"
      ref={sectionRef}
      className="relative py-28 md:py-36 bg-gradient-to-b from-honey-dark via-cream to-cream overflow-hidden"
    >
      {/* Floating decorations */}
      <span className="story-float absolute top-24 left-[10%] text-4xl opacity-20">🍯</span>
      <span className="story-float absolute top-40 right-[12%] text-3xl opacity-20">🌸</span>
      <span className="story-float absolute bottom-32 left-[18%] text-3xl opacity-15">🍪</span>
      <span className="story-float absolute bottom-20 right-[15%] text-4xl opacity-20">🍫</span>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Big bee */}
        <div className="story-bee mx-auto mb-10 w-32 h-27">
          <svg viewBox="0 0 120 100" className="w-full h-full drop-shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
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

        <p className="story-text font-body text-honey-dark font-bold tracking-widest uppercase text-sm mb-4">
          Por trás de cada doce
        </p>

        <h2 className="story-text font-display font-black text-3xl sm:text-4xl lg:text-5xl text-brown-dark leading-tight mb-8">
          Existe uma pequena dose de carinho. 🐝
        </h2>

        <p className="story-text font-body text-lg text-brown-dark/70 max-w-2xl mx-auto leading-relaxed">
          Cada cookie da Doce Angélica é feito à mão, com ingredientes selecionados e muito
          capricho. Da massa ao recheio, pensamos em cada detalhe pra chegar até você quentinho,
          macio e irresistível. Como uma abelha faz mel, a gente faz cookie: com paciência,
          cuidado e muita doçura. 💛
        </p>

        {/* Feature pills */}
        <div className="story-text flex flex-wrap justify-center gap-3 mt-10">
          {['Feito à mão', 'Sempre fresquinho', 'Recheio na medida', 'Entrega com carinho'].map(
            (pill) => (
              <span
                key={pill}
                className="bg-honey/15 text-brown-dark font-body font-semibold px-5 py-2 rounded-full text-sm"
              >
                {pill}
              </span>
            )
          )}
        </div>
      </div>
    </section>
  );
}
