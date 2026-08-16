export interface Product {
  id: string;
  name: string;
  emoji: string;
  description: string;
  price: number;
  image: string;
  accentColor: string;
}

export const products: Product[] = [
  {
    id: 'nutella',
    name: 'Nutella',
    emoji: '🍫',
    description: 'Cookie recheado com Nutella. O clássico que nunca falha.',
    price: 13,
    image: '/images/nutella.jpg',
    accentColor: '#5b3a1f',
  },
  {
    id: 'kinder',
    name: 'Kinder',
    emoji: '🍫',
    description: 'Cookie recheado com Kinder. Surpresa cremosa em cada mordida.',
    price: 15,
    image: '/images/kinder.jpg',
    accentColor: '#e07b3a',
  },
  {
    id: 'pistache',
    name: 'Pistache',
    emoji: '💚',
    description: 'Cookie de pistache com recheio cremoso. Sofisticado e viciante.',
    price: 12,
    image: '/images/pistache.jpg',
    accentColor: '#7fa650',
  },
];

export { WHATSAPP_NUMBER } from '@/data/config';