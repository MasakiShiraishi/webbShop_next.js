'use client'
import { Bars3Icon, ShoppingCartIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useState } from 'react';
import Cart from './cart';

export default function Header() {
          const [isMenuOpen, setIsMenuOpen] = useState(false);
          const [isCartOpen, setIsCartOpen] = useState(false);

          const toggleMenu = () => {
                    setIsMenuOpen(!isMenuOpen);
          };

          const toggleCart = () => {
                    setIsCartOpen(!isCartOpen);
          };

          const closeMenu = () =>{
                    setIsMenuOpen(false);
          };

          const closeCart = () =>{
                    setIsCartOpen(false);
          };


          return (
                    <header className="bg-neutral-100">
                              <div className="flex py-4 px-4">
                                        <Bars3Icon className="h-12 w-11 cursor-pointer" onClick={toggleMenu} />
                                        <img className="ml-2 h-12 w-28" src="/webbshop.png" alt="Webb Shop" />
                                        <div className="ml-auto">
                                                  <ShoppingCartIcon className="h-12 w-11" onClick={toggleCart}/>
                                        </div>
                              </div>
                               {/* call from cart.tsx */}
                              <Cart isOpen={isCartOpen} onClose={closeCart} /> 
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
                                                  </ul>
                                        </div>
                                        </>
                              )}
                    </header>
          );
}
