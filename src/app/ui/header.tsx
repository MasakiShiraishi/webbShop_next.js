'use client'
import { Bars3Icon, ShoppingCartIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useState } from 'react';
import Cart from './cart';
import { useCart } from '../lib/CartContext';
import SearchMoter from './searchMoter';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isOpen, openCart, closeCart, cartItems, removeFromCart, updateQuantity } = useCart();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Calculate total item count
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  return (
    <header className="bg-neutral-100">
      <div className="flex items-center justify-center py-4 px-4">
        <Bars3Icon className="h-10 w-10  cursor-pointer" onClick={toggleMenu} />
        <Link href="/">
          <img className="h-10 w-auto ml-4" src="/webbshop.png" alt="Webb Shop" />
        </Link>
        <div className="flex-auto ms:flex ms:justify-center items-center mx-4">
          <div className="relative">
            <SearchMoter/>
          </div>
        </div>
        <div className="relative ml-4">
          <ShoppingCartIcon className="h-8 w-8 cursor-pointer" onClick={openCart} />
          {/* Display item count */}
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </div>
      </div>
      {/* call from cart.tsx */}
      {/* <Cart isOpen={isCartOpen} onClose={closeCart} />  */}
      <Cart
        isOpen={isOpen}
        onClose={closeCart}
        cartItems={cartItems}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
      />
      {isMenuOpen && (
        <>
          <div className="fixed inset-0 bg-black opacity-70 z-40"></div>
          <div className="fixed top-0 left-0 h-full z-50 w-3/4 bg-slate-50 py-4 px-2 border border-gray-200 shadow-md">
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold">Menu</span>
              <XMarkIcon className="h-8 w-8 cursor-pointer" onClick={closeMenu} />
            </div>
            <ul className="flex flex-col text-2xl space-y-5 mt-20">
              <Link href="/products">
                <li onClick={closeMenu}>All products</li>
              </Link>
              <Link href="/products/mens-clothing">
                <li onClick={closeMenu}>Men&apos;s clothing</li>
              </Link>
              <Link href="/products/jewelery">
                <li onClick={closeMenu}>Jewelery</li>
              </Link>
              <Link href="/products/electronics">
                <li onClick={closeMenu}>Electronics</li>
              </Link>
              <Link href="/products/womens-clothing">
                <li onClick={closeMenu}>Women&apos;s clothing</li>
              </Link>
              <Link href="/login">
                <li onClick={closeMenu}>Order&apos;s list</li>
              </Link>
            </ul>
          </div>
        </>
      )}
    </header>
  );
}
