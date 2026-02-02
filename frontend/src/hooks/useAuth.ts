import useSWR from 'swr';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// Common fetcher for user data
const fetcher = (url: string) => 
  fetch(url, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
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

  const csrf = () => fetch(`${process.env.NEXT_PUBLIC_API_URL}/sanctum/csrf-cookie`, { credentials: 'include' });

  const register = async ({ setErrors, ...props }: any) => {
    await csrf();

    setErrors([]);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(props),
      credentials: 'include',
    });

    if (response.ok) {
        mutate();
    } else {
        const data = await response.json();
        setErrors(Object.entries(data.errors || {}).flat());
    }
  };

  const login = async ({ setErrors, setStatus, ...props }: any) => {
    await csrf();

    setErrors([]);
    setStatus(null);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(props),
        credentials: 'include',
    });

    console.log('Login Response Status:', response.status);
    const text = await response.text();
    console.log('Login Response Body:', text);

    if (response.ok) {
        await mutate();
    } else {
        try {
             const data = JSON.parse(text);
             setErrors(Object.entries(data.errors || {}).flat());
        } catch (e) {
             console.error('Error parsing login response:', e);
             setErrors(['Error desconocido en el servidor']);
        }
    }
  };

  const logout = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/logout`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
        },
         credentials: 'include',
    });

    mutate(null);
    router.push('/login');
  };

  useEffect(() => {
    if (middleware === 'guest' && redirectIfAuthenticated && user) router.push(redirectIfAuthenticated);
    if (middleware === 'auth' && error) router.push('/login');
  }, [user, error, middleware, redirectIfAuthenticated, router]);

  return {
    user,
    register,
    login,
    logout,
  };
};
