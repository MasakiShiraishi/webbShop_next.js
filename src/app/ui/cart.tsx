
import { XMarkIcon } from "@heroicons/react/24/outline";
import React, { useEffect } from 'react';
import { useCart } from "../lib/CartContext";
import Link from "next/link";


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

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  removeFromCart: (itemId: number) => void;
  updateQuantity: (itemId: number, quantity: number) => void;
}

const Cart: React.FC<CartProps> = () => {
  const { isOpen, closeCart, cartItems, removeFromCart, updateQuantity } = useCart();

  useEffect(() => {
    console.log('Current cart items:', cartItems);
  }, [cartItems]);

  if (!isOpen) return null

  // total price at shoping cart
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }


  return (
    <>
      <div className="fixed inset-0 bg-black opacity-70 z-40" onClick={closeCart}></div>
      <div className="fixed top-4 right-4 h-5/6 z-50 w-11/12 bg-slate-50 py-4 px-2 border border-gray-200 shadow-md">
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold">Cart</span>
          <XMarkIcon className="h-8 w-8 cursor-pointer" onClick={closeCart} />
        </div>
        <div className="mt-4">
          {cartItems && cartItems.length === 0 ? (
            <p className="text-center">Your cart is empty.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {cartItems?.map((item) => (
                <li key={item.id} className="flex py-2 justify-between items-center">
                  <img src={item.image} alt={item.title} className="w-16 h-16 object-cover" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">{item.title}</p>
                    <p className="text-sm text-gray-500">{item.price} USD</p>
                    <div className="flex items-center mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-1 bg-gray-300 rounded text-gray-700"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-1 bg-gray-300 rounded text-gray-700"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 font-medium">
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )

          }

        </div>
        <div className="flex justify-between mt-4 px-2 border-t border-gray-200 pt-4">
          <span className="text-lg font-bold">Total:</span>
          <span className="text-lg font-bold">{calculateTotal().toFixed(2)} USD</span>
        </div>

        <div className="flex justify-center mt-40">
          <div className="text-center">
            <Link href={{
              pathname: "/order/submit",
              query: {
                order: JSON.stringify({
                  items: cartItems,
                  total: calculateTotal(),
                }),
              },
            }}
            >
              <button className="text-2xl text-white font-bold p-2 border-solid border-2 border-slate-950 rounded-3xl bg-blue-300" onClick={closeCart}>
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Cart;