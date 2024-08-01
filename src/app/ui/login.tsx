'use client'
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem('auth');
    if (token) {
      // If token exists, redirect to the orders page
      router.push('/order/customersOrders');
    }
  }, []);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = isLogin ? '/api/auth/login' : '/api/auth/register';
    try {
      const response = await axios.post(url, { username, password });
      if (response.data.message === 'Login successful') {
        // added 'response.data.token'
        sessionStorage.setItem('auth', response.data.token);
        router.push('/order/customersOrders');
      } else if (response.data.message === 'User registered successfully') {
        setIsLogin(true); // Switch to login after registration
      }
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError('');
  };



  return (
    <div className="bg-gray-50 h-screen flex justify-center items-start pt-32">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6">{isLogin ? 'Login' : 'Register'}</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              name="username"
              type="text"
              placeholder="Input username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Input password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg">
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
        <p className="mt-4 text-center">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button onClick={toggleForm} className="text-blue-500 underline">
            {isLogin ? 'Register here' : 'Login here'}
          </button>
        </p>
      </div>
    </div>
  );
};
