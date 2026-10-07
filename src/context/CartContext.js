import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

import { initialCart } from '../data/inventory';

const CartContext = createContext(null);

const VAT_RATE = 0.12;
const DISCOUNT = 50;

export function CartProvider({ children }) {
  const [items, setItems] = useState(initialCart);
  const [orderNumber, setOrderNumber] = useState('1043');

  const updateQuantity = useCallback((id, delta) => {
    setItems((current) =>
      current
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity + delta } : item))
        .filter((item) => item.quantity > 0),
    );
  }, []);

  const addItem = useCallback((product) => {
    setItems((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) {
        return current.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...current, { ...product, quantity: 1 }];
    });
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setOrderNumber((current) => String(Number(current) + 1));
  }, []);

  const value = useMemo(() => {
    const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
    const discount = subtotal > 0 ? DISCOUNT : 0;
    const vat = Math.round((subtotal - discount) * VAT_RATE);
    const total = subtotal - discount + vat;

    return {
      items,
      orderNumber,
      itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
      subtotal,
      discount,
      vat,
      total,
      updateQuantity,
      addItem,
      clearCart,
    };
  }, [items, orderNumber, updateQuantity, addItem, clearCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used inside a CartProvider');
  }
  return context;
}