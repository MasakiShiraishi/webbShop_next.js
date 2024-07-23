// // ui/App.tsx
// import React,{ useEffect, useState } from 'react';
// import ProductsList from './products'; // このパスは実際のファイルの場所に合わせて修正する必要があります
// import Cart from './cart'; // このパスは実際のファイルの場所に合わせて修正する必要があります
// import { Product } from '../lib/definitions'; // このパスは実際のファイルの場所に合わせて修正する必要があります

// export default function App() {
//   // 親コンポーネントでカートの状態を管理
//   const [cartItems, setCartItems] = useState<Product[]>([]);
//   const [isCartOpen, setIsCartOpen] = useState(false);

//   // // カートに商品を追加する関数
//   // const addToCart = (product: Product) => {
//   //   setCartItems(prevCartItems => [...prevCartItems, product]);
//   // };

//   // カートから商品を削除する関数
//   // const removeFromCart = (product: Product) => {
//   //   const updatedCartItems = cartItems.filter(item => item !== product);
//   //   setCartItems(updatedCartItems);
//   // };
//    // Load cart from localStorage on mount
//    useEffect(() => {
//     const savedCartItems = localStorage.getItem('cartItems');
//     if (savedCartItems) {
//       setCartItems(JSON.parse(savedCartItems));
//     }
//   }, []);

//   // Save cart to localStorage whenever it changes
//   useEffect(() => {
//     localStorage.setItem('cartItems', JSON.stringify(cartItems));
//   }, [cartItems]);

//   // Add product to cart
//   const addToCart = (product: Product) => {
//     setCartItems((prevCartItems) => {
//       // Check if product already in cart
//       const isProductInCart = prevCartItems.some(item => item.id === product.id);
//       if (!isProductInCart) {
//         return [...prevCartItems, product];
//       }
//       return prevCartItems; // Return existing cart if product is already in it
//     });
//   };

//   // Remove product from cart
//   const removeFromCart = (product: Product) => {
//     const updatedCartItems = cartItems.filter(item => item.id !== product.id);
//     setCartItems(updatedCartItems);
//   };

//   // カートの表示/非表示を切り替える関数
//   const toggleCart = () => {
//     setIsCartOpen(!isCartOpen);
//   };

//   return (
//     <div className="App">
//       {/* ProductsList コンポーネントに必要な props を渡す */}
//       <ProductsList addToCart={addToCart} />

//       {/* Cart コンポーネントに必要な props を渡す */}
//       <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cartItems={cartItems} removeFromCart={removeFromCart} />
//       </div>
//   );
// }


// ui/App.tsx
// import React from 'react';
// import Cart from './cart';
// import { CartProvider, useCart } from '../lib/CartContext';
// import ProductsList from './products';

// export default function App() {
//   return (
//     <CartProvider>
//       <div className="App">
//         <header>
//           {/* Here you can place a button to open/close the cart */}
//         </header>
//         <ProductsListWithProps />
//         <CartWithProps />
//       </div>
//     </CartProvider>
//   );
// }

// function ProductsListWithProps() {
//   const { addToCart } = useCart();
//   return <ProductsList addToCart={addToCart} />;
// }

// function CartWithProps() {
//   const { isOpen, closeCart, cartItems, removeFromCart } = useCart();
//   return <Cart isOpen={isOpen} onClose={closeCart} cartItems={cartItems} removeFromCart={removeFromCart} />;
// }

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
