'use client';
import { useCart } from "@/app/lib/CartContext";
import Orders from "@/app/ui/order";
import { useEffect } from "react";

export default function SubmitOrder() {
  const { cartItems } = useCart(); 

  useEffect (() => {
    if (cartItems.length === 0) {
       const timer = setTimeout(() => {
        window.location.href = '/';
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [cartItems]);

  if (cartItems.length === 0) {
    return <p className="text-3xl text-center mt-20">Your cart is empty.</p>;
  }

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
          <div className="m-4 p-2">
          <div>
            {cartItems.map(item => (
              <div key={item.id} className="flex place-items-center border-b py-2">
                <span className="p-2 basis-3/4">{item.title}</span>
                <span className="basis-1/4">{item.quantity} x ${item.price.toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 text-right font-bold">
            <span>Total: ${total.toFixed(2)}</span>
          </div>
          
          <Orders 
                  items={cartItems.map(item => ({
                    id: item.id,
                    title: item.title,
                    quantity: item.quantity,
                    total: item.price * item.quantity
                  }))}
                  />
                  </div>
  );
}