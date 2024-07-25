'use client';
import { useState } from 'react';

interface OrderItem {
  id: number;
  title: string;
  quantity: number;
  total: number;
}

interface OrdersProps {
  items: OrderItem[]; 
}

export default function Orders({ items }: OrdersProps) {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    email: '',    
    deliveryOption: 1,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items, ...formData }),
    });
    if (response.ok) {
      setFormData({  name: '', address: '', email: '', deliveryOption: 1 });
      setTimeout(() => {
        window.location.href = '/order/sendOrder';
      }, 2000);
    } else {
      console.error('Error: Failed to submit review');
    }
  };
  return (
          <div className="max-w-sm mx-auto w-full">
            <form onSubmit={handleSubmit} className="mt-4 p-1">
              <div className="justify-center rounded-lg w-full sm:w-4/5 ml-0 sm:ml-6 lg:ml-8 hover:bg-white hover:bg-opacity-50">
                <div className="flex justify-center">
                  <input
                    className="block w-11/12 sm:w-4/5 lg:w-3/4 mt-4 px-3 py-2 text-base placeholder-gray-500 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    id="full-name"
                    name="name"
                    type="text"
                    placeholder="Input full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="flex justify-center">
                  <input
                    className="block w-11/12 sm:w-4/5 lg:w-3/4 mt-4 px-3 py-2 text-base placeholder-gray-500 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    id="address"
                    name="address"
                    type="text"
                    placeholder="Input Address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="flex justify-center">
                  <input
                    className="block w-11/12 sm:w-4/5 lg:w-3/4 mt-4 px-3 py-2 text-base placeholder-gray-500 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    id="email-address"
                    name="email"
                    type="email"
                    placeholder="Input Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="flex flex-col justify-center items-center mt-4">
                  <label htmlFor="delivery-option" className="text-center text-sm">
                    Choose your delivery option from 1 to 3:
                  </label>
                  <ol className="text-sm mt-2">
                    <li>1. Free Delivery to the nearest Pickup Point</li>
                    <li>2. $ 2.9 Home Delivery</li>
                    <li>3. $ 3.50 Priority Home Delivery</li>
                  </ol>
                  <input
                    className="block w-11/12 sm:w-4/5 lg:w-3/4 mt-4 px-3 py-2 text-base placeholder-gray-500 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    id="delivery-option"
                    name="deliveryOption"
                    type="number"
                    min="1"
                    max="3"
                    placeholder="Choose your delivery..."
                    value={formData.deliveryOption}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="mt-4 mb-2 w-3/5 lg:w-2/5 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                  >
                    Submit Order
                  </button>
                </div>
              </div>
            </form>
          </div>
        );
      };     
