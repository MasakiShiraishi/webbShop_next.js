'use client'
import { useEffect, useState } from 'react';
import { Product } from '../lib/definitions';


export default function ProductsList() {
          const [products, setProducts] = useState<Product[]>([]);
          const [isMobile, setIsMobile] = useState(false);

          useEffect(() => {
                    const fetchProducts = async () => {
                              try {
                                        console.log('Fetching products...');
                                        const res = await fetch('/api/products');
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
          }, []);
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

          return (
                    <div>
                              <h2 className="text-3xl font-bold ml-6 mb-6">Lista</h2>
                              <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols3 xl:grid-cols-4 p-4">
                                        {products.map((product, index) => (
                                                  <li className="list-none border border-black hover:border-cyan-500 hover:border-4 rounded-lg m-4" key={index}>
                                                            <p className="text-xl font-bold p-2 ml-6">{product.title}</p>
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
                                                  </li>
                                        ))}
                              </ul>
                    </div>
          );
}


