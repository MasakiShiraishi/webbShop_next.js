// src/app/ui/App.tsx
import { useCart } from '../lib/CartContext';
import Cart from './cart';


const CartWithProps: React.FC = () => {
  const { isOpen, closeCart, cartItems, removeFromCart } = useCart();

  return (
    <Cart
      isOpen={isOpen}
      onClose={closeCart}
      cartItems={cartItems}
      removeFromCart={removeFromCart}
    />
  );
}

export default CartWithProps;
