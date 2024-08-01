'use client'
import React, { useEffect, useState } from 'react';
import { Order, Product } from '../lib/definitions';
import LogOut from './logOut';
import { useRouter } from 'next/navigation';
import { useAuth } from '../lib/auth';


export default function CustomersOrdersList() {
  const [customersOrder, setCustomersOrder] = useState<Order[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState(true); // Add loading state
  const router = useRouter();

  useAuth();

  useEffect(() => {
    // Check authentication on page load
    const token = sessionStorage.getItem('auth');
    if (!token) {
      // Redirect to login page if not authenticated
      router.push('/login');
      return;
    }
    const fetchCustomersOrders = async () => {
      try {
        console.log('Fetching customersOrder...');
        const res = await fetch('/api/fetchOrders', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          throw new Error('Failed to fetch customersOrder');
        }
        const data = await res.json();
        console.log('Fetched data:', data);
        if (data.customersOrder) {
          setCustomersOrder(data.customersOrder);
        } else {
          throw new Error('No orders found');
        }
        setLoading(false);// Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching customersOrder:', error);
        setLoading(false); //Also set loading to false in case of error
      }
    };

    fetchCustomersOrders();
  }, [router]);
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

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();

        // Ensure data is extracted correctly
        console.log('Fetched products:', data); // Log fetched products
        if (Array.isArray(data)) {
          setProducts(data); // Direct array
        } else if (Array.isArray(data.products)) {
          setProducts(data.products); // Nested inside an object
        } else {
          throw new Error('Unexpected products data structure');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  //-------------Handle edit changes---------
  const handleEditChange = (index: number, field: string, value: any) => {
    const updatedOrders = [...customersOrder];

    if (field.startsWith('item')) {
      const [_, itemIndex, itemField] = field.split('.');
      const item = updatedOrders[index].items[Number(itemIndex)];

      if (itemField === 'id') {
        // Parse the input value to a number
        const newId = Number(value);

        // Check if the parsed ID is a valid number
        if (isNaN(newId)) {
          console.warn(`Invalid product ID: ${value}`);
          return;
        }

        // Update the item ID
        item.id = newId;

        console.log('Current products:', products); // Log the current products array

        // Find the product by ID
        const product = products.find((prod) => prod.id === item.id);
        if (product) {
          // Update title and price automatically
          item.title = product.title;
          item.total = product.price * item.quantity;
        } else {
          console.warn(`Product with ID ${item.id} not found.`);
          item.title = ''; // Reset title if no product found
          item.total = 0;  // Reset total if no product found
        }
      } else if (itemField === 'quantity') {
        item.quantity = Number(value);
        const product = products.find((prod) => prod.id === item.id);
        if (product) {
          item.total = product.price * item.quantity;
        }
      } else {
        // Handle other item fields
        (item as any)[itemField] = value;
      }
    } else {
      // Handle non-item fields
      (updatedOrders[index] as any)[field] = value;
    }

    setCustomersOrder(updatedOrders);
  };
  // Normalize input by removing leading zeros
  const normalizeInput = (value: string): string => {
    // Remove leading zeros only if the result is still a number 
    return value.replace(/^0+(?=\d)/, '');
  }


  // 
  const validateOrder = (order: Order) => {
    // Validate the order items
    const hasInvalidQuantity = order.items.some((item) => item.quantity < 1);
    const hasInvalidId = order.items.some((item) => item.id < 1 || item.id > 20);
    const isNameEmpty = !order.name.trim();
    const isAddressEmpty = !order.address.trim();
    const isEmailEmpty = !order.email.trim();
    const isDeliveryOptionNr = order.deliveryOption < 1 || order.deliveryOption > 3;

    if (hasInvalidQuantity) return "Input one or more quantity.";
    if (hasInvalidId) return "Input 1 to 20 for products ID.";
    if (isDeliveryOptionNr) return "Input 1 to 3 for delivery options number.";
    if (isNameEmpty) return "Name cannot be empty.";
    if (isAddressEmpty) return "Address cannot be empty.";
    if (isEmailEmpty) return "Email cannot be empty.";

    return ''; // No errors
  };

  // Save order changes
  const saveOrderChanges = async (index: number) => {
    const order = customersOrder[index];
    const error = validateOrder(order);
    if (error) {
      setErrorMessage(error);
      return;
    }

    try {
      const res = await fetch('/api/updateOrder', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      });
      if (!res.ok) {
        throw new Error('Failed to update order');
      }
      setEditIndex(null);
      setErrorMessage('');
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  return (
    <div>
      <div className="flex justify-between m-6">
        <h2 className="text-3xl text-center font-bold ">Order's list</h2>
        {/* added log out button */}
        <LogOut />
      </div>
      {loading ? ( // Show a loading indicator while data is being fetched
        <p className="text-3xl text-center font-bold m-6">Loading...</p>
      ) :
        customersOrder.length > 0 ? (
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4">
            {customersOrder.map((order, index) => (
              <li
                key={index}
                className="list-none border border-black hover:border-cyan-500 hover:border-4 rounded-lg m-4"
              >
                {editIndex === index ? (
                  <>
                    <div className="p-2 ml-6">
                      <div className="text-xl font-bold">
                        Items:
                        <ul>
                          {order.items.map((item, itemIndex) => (
                            <li
                              key={itemIndex}
                              className="text-lg border border-solid border-current"
                            >
                              <label htmlFor={`item-ID-${index}-${itemIndex}`} className="flex">
                                Item ID:
                              </label>
                              <input
                                className="border-dashed border-2 border-slate-700 hover:border-double hover:border-4 hover:bg-sky-200 mx-6 text-center w-24"
                                type="number"
                                id={`item-ID-${index}-${itemIndex}`}
                                name="item-ID"
                                placeholder="Input item ID"
                                min="1"
                                max="20"
                                value={item.id}
                                onChange={(e) =>
                                  handleEditChange(
                                    index,
                                    `item.${itemIndex}.id`,
                                    e.target.value)
                                }
                                required
                                onInput={(e) => {
                                  const target = e.target as HTMLInputElement;
                                  target.value = normalizeInput(target.value);
                                }}
                              />

                              <input
                                className="pr-4"
                                id={`item-title-${index}-${itemIndex}`}
                                name="item-title"
                                type="text"
                                value={item.title}
                                disabled
                              />
                              <label htmlFor={`item-quantity-${index}-${itemIndex}`} className="flex">
                                Item Quantity
                              </label>
                              <input
                                className="border-dashed border-2 border-slate-700 hover:border-double hover:border-4 hover:bg-sky-200 mx-6 text-center w-24"
                                type="number"
                                id={`item-quantity-${index}-${itemIndex}`}
                                name="item-quantity"
                                min="1"
                                value={item.quantity}
                                onChange={(e) =>
                                  handleEditChange(
                                    index,
                                    `item.${itemIndex}.quantity`,
                                    e.target.value
                                  )
                                }
                                onInput={(e) => {
                                  const target = e.target as HTMLInputElement;
                                  target.value = normalizeInput(target.value);
                                }}
                              />
                              <input
                                id={`item-total-${index}-${itemIndex}`}
                                name="item-total"
                                type="number"
                                value={item.total}
                                disabled
                              />
                            </li>
                          ))}
                        </ul>
                      </div>
                      <input
                        className="border-dashed border-2 border-slate-700 hover:border-double hover:border-4 hover:bg-sky-200 text-xl font-bold"
                        type="text"
                        name="name"
                        placeholder="Input full name"
                        value={order.name}
                        onChange={(e) =>
                          handleEditChange(index, 'name', e.target.value)
                        }
                        required
                      />
                      <input
                        className="border-dashed border-2 border-slate-700 hover:border-double hover:border-4 hover:bg-sky-200 text-xl font-bold"
                        id="address"
                        name="address"
                        type="text"
                        placeholder="Input Address"
                        value={order.address}
                        onChange={(e) =>
                          handleEditChange(index, 'address', e.target.value)
                        }
                        required
                      />
                      <input
                        className="border-dashed border-2 border-slate-700 hover:border-double hover:border-4 hover:bg-sky-200 text-xl font-bold"
                        id="email-address"
                        name="email"
                        type="email"
                        placeholder="Input Email"
                        value={order.email}
                        onChange={(e) =>
                          handleEditChange(index, 'email', e.target.value)
                        }
                        required
                      />
                      <input
                        className="border-dashed border-2 border-slate-700 hover:border-double hover:border-4 hover:bg-sky-200 text-xl font-bold"
                        id="delivery-option"
                        name="deliveryOption"
                        type="number"
                        min="1"
                        max="3"
                        placeholder="Choose your delivery..."
                        value={order.deliveryOption}
                        onChange={(e) =>
                          handleEditChange(index, 'deliveryOption', e.target.value)
                        }
                        onInput={(e) => {
                          const target = e.target as HTMLInputElement;
                          target.value = normalizeInput(target.value);
                        }}
                        required
                      />
                    </div>
                    <button
                      className="p-2 bg-blue-500 text-white"
                      onClick={() => saveOrderChanges(index)}
                    >
                      Save
                    </button>
                    <button
                      className="p-2 bg-red-500 text-white"
                      onClick={() => setEditIndex(null)}
                    >
                      Cancel
                    </button>
                    <div className="text-2xl text-red-500 mt-2">{errorMessage}</div>

                  </>
                ) : (
                  <>
                    <div className="text-xl font-bold p-2 ml-2">
                      Items:
                      <ul>
                        {order.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="text-lg border border-solid border-current">
                            <p>ID: {item.id}</p>
                            <p>Title: {item.title}</p>
                            <p>Quantity: {item.quantity}</p>
                            <p>Total: {item.total}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <p className="text-xl font-bold p-2 ml-6">Name: {order.name}</p>
                    <p className="text-xl font-bold p-2 ml-6">Address: {order.address}</p>
                    <p className="text-xl font-bold p-2 ml-6">Email: {order.email}</p>
                    <p className="text-xl font-bold p-2 ml-6">Delivery Option: {order.deliveryOption}</p>
                    <button className="p-2 bg-green-500 text-white" onClick={() => setEditIndex(index)}>Edit</button>
                  </>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-3xl text-center font-bold m-6">No orders found.</p>
        )}
    </div>
  );
}