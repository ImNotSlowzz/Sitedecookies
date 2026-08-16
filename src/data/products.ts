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
    image: 'https://images.pexels.com/photos/14571330/pexels-photo-14571330.jpeg?auto=compress&cs=tinysrgb&w=900&h=900&fit=crop',
    accentColor: '#5b3a1f',
  },
  {
    id: 'kinder',
    name: 'Kinder',
    emoji: '🍫',
    description: 'Cookie recheado com Kinder. Surpresa cremosa em cada mordida.',
    price: 15,
    image: 'https://images.pexels.com/photos/8498186/pexels-photo-8498186.jpeg?auto=compress&cs=tinysrgb&w=900&h=900&fit=crop',
    accentColor: '#e07b3a',
  },
  {
    id: 'pistache',
    name: 'Pistache',
    emoji: '💚',
    description: 'Cookie de pistache com recheio cremoso. Sofisticado e viciante.',
    price: 12,
    image: 'https://images.pexels.com/photos/8963942/pexels-photo-8963942.jpeg?auto=compress&cs=tinysrgb&w=900&h=900&fit=crop',
    accentColor: '#7fa650',
  },
];

export { WHATSAPP_NUMBER } from '@/data/config';
