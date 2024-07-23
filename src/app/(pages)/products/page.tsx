
'use client'
import React from 'react';
import ProductsList from "@/app/ui/products";
import { useCart } from '@/app/lib/CartContext';
import { CartItem, Product } from '@/app/lib/definitions';


const convertToCartItem = (product: Product): CartItem => ({
  ...product,
  quantity: 1 
});

export default function Products() {
  const { addToCart } = useCart();

  const handleAddToCart = (product: Product) => {
    addToCart(convertToCartItem(product));
  };

  return (
    <ProductsList category="" addToCart={handleAddToCart} />
  );
}