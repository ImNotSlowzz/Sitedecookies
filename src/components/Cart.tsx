import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { openWhatsApp } from '@/utils/whatsapp';
import { Bee } from './Bee';

export function Cart() {
  const { items, addItem, decreaseItem, removeItem, total, itemCount } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const beeRef = useRef<HTMLDivElement>(null);

  // Open drawer when items are added externally via hash or event
  useEffect(() => {
    const openHandler = () => setIsOpen(true);
    window.addEventListener('open-cart', openHandler);
    return () => window.removeEventListener('open-cart', openHandler);
  }, []);

  // Animate drawer
  useEffect(() => {
    if (!drawerRef.current || !overlayRef.current) return;

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, pointerEvents: 'auto' });
      gsap.to(drawerRef.current, { x: '0%', duration: 0.4, ease: 'power3.out' });
    } else {
      document.body.style.overflow = '';
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, pointerEvents: 'none' });
      gsap.to(drawerRef.current, { x: '100%', duration: 0.4, ease: 'power3.in' });
    }
  }, [isOpen]);

  // Bee celebration on checkout
  const handleCheckout = () => {
    if (items.length === 0) return;
    if (beeRef.current) {
      gsap.fromTo(
        beeRef.current,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: 'back.out(2)',
          onComplete: () => {
            gsap.to(beeRef.current, {
              x: 300,
              y: -200,
              rotation: 360,
              duration: 0.8,
              ease: 'power2.in',
              onComplete: () => {
                openWhatsApp(items);
                gsap.set(beeRef.current, { scale: 0, opacity: 0, x: 0, y: 0, rotation: 0 });
                setIsOpen(false);
              },
            });
          },
        }
      );
    } else {
      openWhatsApp(items);
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        onClick={() => setIsOpen(false)}
        className="fixed inset-0 z-[55] bg-brown-dark/50 backdrop-blur-sm opacity-0 pointer-events-none"
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className="fixed top-0 right-0 bottom-0 z-[60] w-full sm:w-[420px] bg-cream shadow-2xl flex flex-col"
        style={{ transform: 'translateX(100%)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-brown-dark/10">
          <div className="flex items-center gap-3">
            <ShoppingBag className="text-honey-dark" size={24} />
            <h3 className="font-display font-extrabold text-xl text-brown-dark">
              Seu pedido
            </h3>
            {itemCount > 0 && (
              <span className="bg-honey text-brown-dark font-bold text-xs w-6 h-6 rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-9 h-9 rounded-full bg-brown-dark/5 hover:bg-brown-dark/10 flex items-center justify-center transition-colors"
          >
            <X size={20} className="text-brown-dark" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="text-6xl mb-4 opacity-30">🍪</div>
              <p className="font-display font-bold text-brown-dark text-lg mb-2">
                Carrinho vazio
              </p>
              <p className="font-body text-brown-dark/50 text-sm">
                Adicione um cookie pra começar seu pedido. 🐝
              </p>
              <button
                onClick={() => {
                  setIsOpen(false);
                  document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="mt-6 bg-honey hover:bg-honey-dark text-brown-dark font-display font-bold px-6 py-3 rounded-full transition-all hover:scale-105 active:scale-95"
              >
                Ver sabores
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 bg-white rounded-2xl p-3 shadow-sm"
                >
                  <div className="w-14 h-14 rounded-xl bg-honey/15 flex items-center justify-center text-2xl flex-shrink-0">
                    {item.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-display font-bold text-brown-dark text-base truncate">
                      {item.name}
                    </h4>
                    <p className="font-body text-brown-dark/50 text-sm">
                      R$ {item.price.toFixed(2).replace('.', ',')} cada
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => decreaseItem(item.id)}
                      className="w-7 h-7 rounded-full bg-brown-dark/5 hover:bg-brown-dark/10 flex items-center justify-center transition-colors"
                    >
                      <Minus size={14} className="text-brown-dark" />
                    </button>
                    <span className="font-display font-bold text-brown-dark w-6 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => addItem(item.id)}
                      className="w-7 h-7 rounded-full bg-honey/30 hover:bg-honey flex items-center justify-center transition-colors"
                    >
                      <Plus size={14} className="text-brown-dark" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="w-8 h-8 rounded-full hover:bg-red-50 flex items-center justify-center transition-colors flex-shrink-0"
                  >
                    <Trash2 size={16} className="text-red-400" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer with total and WhatsApp */}
        {items.length > 0 && (
          <div className="p-6 border-t border-brown-dark/10 bg-white/50">
            <div className="flex items-center justify-between mb-1">
              <span className="font-body text-brown-dark/60 text-sm">Subtotal</span>
              <span className="font-body text-brown-dark font-semibold">
                R$ {total.toFixed(2).replace('.', ',')}
              </span>
            </div>
            <div className="flex items-center justify-between mb-4">
              <span className="font-display font-bold text-brown-dark text-lg">Total</span>
              <span className="font-display font-black text-2xl text-honey-dark">
                R$ {total.toFixed(2).replace('.', ',')}
              </span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-display font-extrabold text-lg px-6 py-4 rounded-full transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-green-500/30 flex items-center justify-center gap-2"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              FINALIZAR PELO WHATSAPP
            </button>
            {/* Celebration bee */}
            <div
              ref={beeRef}
              className="absolute -top-10 right-10 opacity-0 pointer-events-none"
              style={{ width: 70, height: 60 }}
            >
              <Bee className="w-full h-full" />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
