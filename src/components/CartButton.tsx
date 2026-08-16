import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export function CartButton() {
  const { itemCount, lastAddedId } = useCart();
  const btnRef = useRef<HTMLButtonElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (lastAddedId && btnRef.current) {
      gsap.fromTo(
        btnRef.current,
        { scale: 1 },
        { scale: 1.15, duration: 0.15, yoyo: true, repeat: 1, ease: 'power2.inOut' }
      );
    }
  }, [lastAddedId]);

  useEffect(() => {
    if (itemCount > 0 && badgeRef.current) {
      gsap.fromTo(
        badgeRef.current,
        { scale: 0 },
        { scale: 1, duration: 0.4, ease: 'back.out(3)' }
      );
    }
  }, [itemCount]);

  const openCart = () => {
    window.dispatchEvent(new Event('open-cart'));
  };

  return (
    <button
      ref={btnRef}
      onClick={openCart}
      className="fixed bottom-6 right-6 z-[50] w-16 h-16 rounded-full bg-honey hover:bg-honey-dark text-brown-dark shadow-xl shadow-honey/40 flex items-center justify-center transition-all hover:scale-105 active:scale-95"
      aria-label="Abrir carrinho"
    >
      <ShoppingBag size={26} />
      {itemCount > 0 && (
        <span
          ref={badgeRef}
          className="absolute -top-1 -right-1 bg-brown-dark text-honey font-bold text-sm w-7 h-7 rounded-full flex items-center justify-center shadow-lg"
        >
          {itemCount}
        </span>
      )}
    </button>
  );
}
