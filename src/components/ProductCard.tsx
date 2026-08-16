import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus, Minus } from 'lucide-react';
import type { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';

gsap.registerPlugin(ScrollTrigger);

export function ProductCard({ product }: { product: Product }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const { addItem, lastAddedId } = useCart();
  const isJustAdded = lastAddedId === product.id;

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        card,
        { y: 60, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const handleMouseEnter = () => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (imgRef.current) {
      gsap.to(imgRef.current, { scale: 1.12, duration: 0.5, ease: 'power2.out' });
    }
  };

  const handleMouseLeave = () => {
    if (imgRef.current) {
      gsap.to(imgRef.current, { scale: 1, duration: 0.5, ease: 'power2.out' });
    }
  };

  const handleAdd = () => {
    addItem(product.id);
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { scale: 1 },
        { scale: 1.03, duration: 0.15, yoyo: true, repeat: 1, ease: 'power2.inOut' }
      );
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group relative bg-cream rounded-[2rem] overflow-hidden shadow-lg shadow-brown-dark/5 transition-shadow duration-500 hover:shadow-2xl hover:shadow-brown-dark/15 ${
        isJustAdded ? 'ring-4 ring-honey/50' : ''
      }`}
    >
      {/* Image */}
      <div className="relative h-64 sm:h-72 overflow-hidden rounded-t-[2rem]">
        <img
          ref={imgRef}
          src={product.image}
          alt={`Cookie ${product.name}`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brown-dark/30 to-transparent opacity-60" />
        <div
          className="absolute top-4 left-4 w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-lg"
          style={{ backgroundColor: product.accentColor + '30' }}
        >
          {product.emoji}
        </div>
        {isJustAdded && (
          <div className="absolute top-4 right-4 bg-honey text-brown-dark font-display font-bold text-xs px-3 py-1.5 rounded-full shadow-lg animate-bounce">
            Adicionado! 🐝
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-display font-extrabold text-2xl text-brown-dark mb-2">
          {product.name}
        </h3>
        <p className="font-body text-brown-dark/60 text-sm mb-4 leading-relaxed min-h-[40px]">
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-5">
          <span className="font-display font-black text-3xl text-honey-dark">
            R$ {product.price.toFixed(2).replace('.', ',')}
          </span>
        </div>

        <button
          onClick={handleAdd}
          className="w-full bg-brown-dark hover:bg-brown-chocolate text-cream font-display font-bold text-base px-6 py-3.5 rounded-full transition-all hover:scale-[1.02] active:scale-95 shadow-lg flex items-center justify-center gap-2 group/btn"
        >
          <Plus size={20} className="group-hover/btn:rotate-90 transition-transform duration-300" />
          Adicionar ao pedido
        </button>
      </div>

      {/* Decorative corner */}
      <div className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full bg-honey/5 group-hover:bg-honey/10 transition-colors duration-500" />
    </div>
  );
}
