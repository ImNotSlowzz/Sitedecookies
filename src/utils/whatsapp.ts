import { WHATSAPP_NUMBER } from '@/data/products';
import type { CartItem } from '@/context/CartContext';

export function buildWhatsAppMessage(items: CartItem[]): string {
  if (items.length === 0) return '';

  let message = '🍪 *Pedido — Doce Angélica*\n\n';
  let total = 0;

  items.forEach((item) => {
    message += `${item.emoji} ${item.name} — ${item.quantity}x\n`;
    total += item.price * item.quantity;
  });

  message += `\n💰 *Total: R$ ${total.toFixed(2).replace('.', ',')}*\n\n`;
  message += 'Oi! Gostaria de fazer esse pedido. 💛';

  return message;
}

export function openWhatsApp(items: CartItem[]): void {
  const message = buildWhatsAppMessage(items);
  const encoded = encodeURIComponent(message);
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
  window.open(url, '_blank');
}
