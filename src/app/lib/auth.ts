import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Set auto-logout time in milliseconds (15 minutes)
const AUTO_LOGOUT_TIME = 15 * 60 * 1000;

// Custom hooks to check authentication and set auto-logout
export const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const handleLogout = () => {
      sessionStorage.removeItem('auth');
      router.push('/login');
    };

    const token = sessionStorage.getItem('auth');
    if (!token) {
      handleLogout();
      return;
    }

    // Decode the token and check the expiry date
    const decodedToken: any = JSON.parse(atob(token.split('.')[1]));
    if (decodedToken.exp * 1000 < Date.now()) {
      handleLogout();
      return;
    }

    const logoutTimer = setTimeout(() => {
      handleLogout();
    }, AUTO_LOGOUT_TIME);

    const resetLogoutTimer = () => {
      clearTimeout(logoutTimer);
      setTimeout(handleLogout, AUTO_LOGOUT_TIME);
    };

    // Monitor user activity and reset logout timers
    window.addEventListener('mousemove', resetLogoutTimer);
    window.addEventListener('keydown', resetLogoutTimer);

    return () => {
      window.removeEventListener('mousemove', resetLogoutTimer);
      window.removeEventListener('keydown', resetLogoutTimer);
      clearTimeout(logoutTimer);
    };
  }, [router]);
};
