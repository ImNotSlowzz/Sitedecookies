import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Bee } from './Bee';

gsap.registerPlugin(ScrollTrigger);

export function BeeMascot() {
  const beeRef = useRef<HTMLDivElement>(null);
  const wingLRef = useRef<SVGEllipseElement>(null);
  const wingRRef = useRef<SVGEllipseElement>(null);

  useEffect(() => {
    const bee = beeRef.current;
    if (!bee) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.set(bee, { xPercent: -50, yPercent: -50 });

      const flightPath = gsap.timeline({ repeat: -1, defaults: { ease: 'sine.inOut' } });

      const isMobile = window.innerWidth < 768;

      if (isMobile) {
        flightPath
          .to(bee, { x: 50, y: -20, duration: 2.5, rotation: 8 })
          .to(bee, { x: -30, y: -40, duration: 3, rotation: -8 })
          .to(bee, { x: 60, y: -10, duration: 2.5, rotation: 5 })
          .to(bee, { x: 0, y: 0, duration: 2, rotation: 0 });
      } else {
        flightPath
          .to(bee, { x: 120, y: -30, duration: 3, rotation: 10 })
          .to(bee, { x: -80, y: -60, duration: 3.5, rotation: -12 })
          .to(bee, { x: 140, y: -20, duration: 2.5, rotation: 8 })
          .to(bee, { x: -40, y: -50, duration: 3, rotation: -6 })
          .to(bee, { x: 0, y: 0, duration: 2.5, rotation: 0 });
      }

      // Wing flap animation
      if (wingLRef.current && wingRRef.current) {
        gsap.to([wingLRef.current, wingRRef.current], {
          scaleY: 0.3,
          duration: 0.08,
          yoyo: true,
          repeat: -1,
          ease: 'none',
          transformOrigin: 'center bottom',
        });
      }

      // ScrollTrigger: move bee between sections
      ScrollTrigger.create({
        trigger: '#products',
        start: 'top 80%',
        end: 'bottom top',
        onEnter: () => {
          gsap.to(bee, { opacity: 1, duration: 0.5 });
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={beeRef}
      className="fixed top-0 left-0 z-[45] pointer-events-none"
      style={{ width: 80, height: 67, opacity: 0.9 }}
    >
      <svg viewBox="0 0 120 100" className="w-full h-full drop-shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
        <ellipse ref={wingLRef} cx="42" cy="32" rx="22" ry="14" fill="rgba(255,255,255,0.82)" stroke="rgba(40,30,20,0.15)" strokeWidth="1" />
        <ellipse ref={wingRRef} cx="78" cy="32" rx="22" ry="14" fill="rgba(255,255,255,0.82)" stroke="rgba(40,30,20,0.15)" strokeWidth="1" />
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
  );
}
