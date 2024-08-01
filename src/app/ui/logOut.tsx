'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LogOut() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check for the token in sessionStorage to set the initial authentication state
    const token = sessionStorage.getItem('auth');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('auth');
    setIsAuthenticated(false);
    router.push('/login');
  };
  if (!isAuthenticated) {
    return null; // Don't render anything if not authenticated
  }

  if (isAuthenticated) {
    return (
      <button
        onClick={handleLogout}
        className="w-36 bg-rose-400 hover:w-40 hover:bg-red-600 text-white py-2 rounded-lg">
        Log out
      </button>

    );
  }
}