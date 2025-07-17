import { createContext } from 'react';
import type { CartItem } from '../types/Cart';

export interface CartContextType {
  cartId: number | null;
  items: CartItem[];
  totalItems: number;
  refreshCart: () => Promise<void>;
}

export const CartContext = createContext<CartContextType | null>(null);
