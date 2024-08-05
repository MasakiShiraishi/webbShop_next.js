'use client'
import { useCart } from "@/app/lib/CartContext";
import { CartItem, Product } from "@/app/lib/definitions";
import SearchResults from "@/app/ui/searchResults";

const convertToCartItem = (product: Product): CartItem => ({
  ...product,
  quantity: 1 
});

export default function Results(){
  const { addToCart } = useCart();

  const handleAddToCart = (product: Product) => {
    addToCart(convertToCartItem(product));
  };
  return(
    <SearchResults addToCart={handleAddToCart} />
  )
}