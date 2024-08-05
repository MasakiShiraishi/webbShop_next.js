'use client'
import React, { useState, useEffect, useCallback } from 'react';
import { CartItem, Product } from '@/app/lib/definitions';
import { useSearchParams } from 'next/navigation';


interface ProductsListProps {
  addToCart: (item: CartItem) => void;
}

export default function SearchResults({ addToCart }: ProductsListProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchPerformed, setSearchPerformed] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`/api/products?search=${encodeURIComponent(query)}`);
        const data = await res.json();

        if (data && Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          setProducts([]);
        }
        setSearchPerformed(true);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
        setSearchPerformed(true);
      }
    };

    if (query.trim() !== '') {
      fetchProducts();
    } else {
      setProducts([]);
      setSearchPerformed(false);
    }
  }, [query]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const truncateDescription = (description: string, maxLength: number) => {
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength) + '...';
  };
  // Memoized function to add products to the cart
  const handleAddToCartClick = useCallback(
    (product: Product) => {
      const cartItem: CartItem = {
        ...product,
        quantity: 1, // Add quantity for CartItem
      };
      console.log('Adding to cart:', cartItem);
      addToCart(cartItem);
    },
    [addToCart]
  );

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Search Results for "{query}"</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.length > 0 ? (
          <div>
            <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols3 xl:grid-cols-4 p-4">
              {products.map((product) => (
                <li className="list-none border border-black hover:border-cyan-500 hover:border-4 rounded-lg m-4" key={product.id}>
                  <p className="text-xl font-bold p-2 ml-6">
                    {product.title}
                  </p>
                  <div className="flex justify-between p-2 mx-4 bg-slate-100 rounded-xl">
                    <div>
                      <p className="text-xl font-semibold italic underline decoration-sky-600" style={{ marginLeft: '60px' }}>
                        {product.price} USD
                      </p>
                      <p>
                        {isMobile ? truncateDescription(product.description, 100) : product.description}
                      </p>
                    </div>
                    <div>
                      <img src={product.image} alt={product.title} style={{ maxWidth: '150px', maxHeight: '150px' }} />
                    </div>
                  </div>
                  <div className="mt-2">

                    <button onClick={() => handleAddToCartClick(product)} className="bg-blue-300 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded">
                      Add to Cart
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : searchPerformed ? (
          <p className="text-2xl text-center text-gray-500 mt-12">No products found</p>
        ) : null}
      </div>
    </div>
  );
}
