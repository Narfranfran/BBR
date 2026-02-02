import useSWR from 'swr';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { getCookie } from '@/utils/cookies';

// Common fetcher for user data
const fetcher = (url: string) => 
  fetch(url, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-XSRF-TOKEN': decodeURIComponent(getCookie('XSRF-TOKEN') || ''),
    },
    // Credentials included for Sanctum Cookies
    credentials: 'include',
  }).then((res) => {
    if (!res.ok) throw new Error('Not authenticated');
    return res.json();
  });

export const useAuth = ({ middleware, redirectIfAuthenticated }: { middleware?: 'auth' | 'guest', redirectIfAuthenticated?: string } = {}) => {
  const router = useRouter();

  const { data: user, error, mutate } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/user`, fetcher, {
    shouldRetryOnError: false,
  });

  const csrf = () => fetch(`${process.env.NEXT_PUBLIC_API_URL?.replace(/\/api\/?$/, '')}/sanctum/csrf-cookie`, { credentials: 'include' });

  const register = async ({ setErrors, ...props }: any) => {
    await csrf();

    setErrors([]);

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-XSRF-TOKEN': decodeURIComponent(getCookie('XSRF-TOKEN') || ''),
            },
            body: JSON.stringify(props),
            credentials: 'include',
        });

        if (response.ok) {
            await mutate();
        } else {
            const text = await response.text();
            try {
                const data = JSON.parse(text);
                setErrors(Object.entries(data.errors || {}).flat());
            } catch (e) {
                console.error('JSON Parse Error:', e);
                setErrors(['Error desconocido en el servidor (' + response.status + ')']);
            }
        }
    } catch (error) {
        console.error('Register Fetch Error:', error);
        setErrors(['Error de conexión']);
    }
  };

  const login = async ({ setErrors, setStatus, ...props }: any) => {
    await csrf();

    // Verification: wait briefly for cookie to be readable
    let token = getCookie('XSRF-TOKEN');
    console.log('Token before wait:', token);
    
    if (!token) {
        await new Promise(resolve => setTimeout(resolve, 500)); // Increased wait
        token = getCookie('XSRF-TOKEN');
        console.log('Token after wait:', token);
    }

    setErrors([]);
    setStatus(null);

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-XSRF-TOKEN': decodeURIComponent(token || ''),
            },
            body: JSON.stringify(props),
            credentials: 'include',
        });

        console.log('Login Status:', response.status);

        if (response.ok) {
            await mutate();
        } else {
            const text = await response.text();
            console.error('Login Failed Body:', text);
            try {
                 const data = JSON.parse(text);
                 setErrors(Object.entries(data.errors || {}).flat());
            } catch (e) {
                 console.error('Error parsing login response:', e);
                 setErrors(['Error desconocido en el servidor']);
            }
        }
    } catch (err) {
        console.error('Login Network Error:', err);
    }
  };

  const logout = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/logout`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'X-XSRF-TOKEN': decodeURIComponent(getCookie('XSRF-TOKEN') || ''),
        },
         credentials: 'include',
    });

    mutate(null);
    router.push('/login');
  };

  useEffect(() => {
    if (middleware === 'guest' && redirectIfAuthenticated && user) {
        router.push(redirectIfAuthenticated);
    }
    if (middleware === 'auth' && error) {
        router.push('/login');
    }
  }, [user, error, middleware, redirectIfAuthenticated, router]);

  return {
    user,
    register,
    login,
    logout,
    mutate,
  };
};
