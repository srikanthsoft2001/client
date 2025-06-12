import { createContext, useContext, useEffect, useState } from 'react';
import { getCart } from '@/api/cart';

// Define item shape
type CartItem = {
  quantity?: number; // Optional, in case it's undefined sometimes
};

type CartContextType = {
  itemCount: number;
  refreshCart: () => Promise<void>;
};

const CartContext = createContext<CartContextType>({
  itemCount: 0,
  refreshCart: async () => {},
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [itemCount, setItemCount] = useState(0);

  const refreshCart = async () => {
    try {
      const data = await getCart();
      if (data && Array.isArray(data.items)) {
        const totalItems = data.items.reduce(
          (acc: number, item: { quantity?: number }) =>
            acc + (typeof item.quantity === 'number' ? item.quantity : 0),
          0
        );

        setItemCount(totalItems);
      } else {
        setItemCount(0);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      setItemCount(0);
    }
  };

  useEffect(() => {
    refreshCart();
  }, []);

  return (
    <CartContext.Provider value={{ itemCount, refreshCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
