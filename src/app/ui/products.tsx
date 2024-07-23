'use client'
import React,{ useCallback, useEffect, useState } from 'react';
import { Product } from '../lib/definitions';
import ArrowToHome from './ArrowToHome';

// for the category
interface ProductsListProps {
          category?: string;
          addToCart: (item: CartItem) => void;
}

export default function ProductsList({ category, addToCart }: ProductsListProps) {
          const [products, setProducts] = useState<Product[]>([]);
          const [isMobile, setIsMobile] = useState(false);

          useEffect(() => {
                    const fetchProducts = async () => {
                              try {
                                        console.log('Fetching products...');
                                        // check to the category
                                        const url = category ? `/api/products?category=${category}` : '/api/products';
                                        const res = await fetch(url);
                                        if (!res.ok) {
                                                  throw new Error('Failed to fetch products');
                                        }
                                        const data = await res.json();
                                        console.log('Fetched data:', data);
                                        setProducts(data.products);
                              } catch (error) {
                                        console.error('Error fetching products:', error);
                              }
                    };

                    fetchProducts();
          }, [category]);
          // check for display size
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
          
          const handleAddToCartClick = useCallback((product: Product) => {
            console.log('Adding to cart:', product);
            // console.log(typeof addToCart);
            addToCart(product);
            // console.log(typeof addToCart);
          }, [addToCart]);

          return (
                    <>
                              <ArrowToHome />
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
                    </>
          );
}



