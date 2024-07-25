'use client'
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface CartItem {
  _id: string;
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  quantity: number;
}

interface CartContextProps {
  isOpen: boolean;
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: number) => void;
  updateQuantity: (itemId: number, quantity: number) => void;
  closeCart: () => void;
  openCart: () => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Load cart items from localStorage on initial render
  useEffect(() => {
    const loadCartItems = () => {
      if (typeof window !== 'undefined') {
        const storedCartItems = localStorage.getItem('cartItems');
        if (storedCartItems) {
          const parsedItems = JSON.parse(storedCartItems);
          console.log('Loaded cart items from localStorage:', parsedItems);
          setCartItems(parsedItems);
        } else {
          console.log('No cart items found in localStorage.');
        }
      }
    };
    loadCartItems();
  }, []);

   // Save cart items to localStorage whenever they change
   useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      console.log('Saved cart items to localStorage:', cartItems);
    }
  }, [cartItems]);

  const addToCart = (item: CartItem) => {
    // create "CartItem" from Product
    const cartItem: CartItem = {
      ...item,
      quantity: 1 
    };
    setCartItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id);
      if (existingItem) {
        return prevItems.map(i =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      } else {
        return [...prevItems, cartItem];
      }
    });
  };

  const removeFromCart = (itemId: number) => {
    console.log(`Removing item from cart: ${itemId}`);
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };
 
  // change to products quantity in cart 
  const updateQuantity = (itemId: number, quantity: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      )
    );
  };
  
  const openCart = () => {
    console.log('Opening cart');
    setIsOpen(true);
  };

  const closeCart = () => {
    console.log('Closing cart');
    setIsOpen(false);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, isOpen, updateQuantity,openCart,closeCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextProps => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  // console.log('useCart hook called');
  return context;
};
