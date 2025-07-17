import React, { useState, useEffect } from 'react';
import { CartContext } from './CartContext';
import { fetchCart } from '../api/apiService';
import type { CartItem } from '../types/Cart';

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [cartId, setCartId] = useState<number | null>(null);

  const refreshCart = async () => {
    try {
      const data = await fetchCart();
      setItems(data.items);
      const count = data.items.reduce((sum, item) => sum + item.quantity, 0);
      setTotalItems(count);
      setCartId(data.id);
    } catch (err) {
      console.error('Lỗi load giỏ hàng:', err);
    }
  };

  useEffect(() => {
    refreshCart();
  }, []);

  return (
    <CartContext.Provider value={{ items, cartId, refreshCart, totalItems }}>
      {children}
    </CartContext.Provider>
  );
};
