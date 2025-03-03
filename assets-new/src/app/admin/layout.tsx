'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Cookies from 'universal-cookie';
import Nav from '@/components/admin/Nav';
import Loading from '@/components/admin/Loading';

// API function to validate authentication
async function postValidation(cookies: Cookies): Promise<boolean> {
  try {
    const token = cookies.get('token');
    if (!token) return false;
    
    const response = await fetch('/api/auth/validate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });
    
    return response.ok;
  } catch (error) {
    console.error('Error validating authentication:', error);
    return false;
  }
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setAuthenticate] = useState<boolean | null>(null);
  const [count, updateCount] = useState(0);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const cookies = new Cookies();
    
    const validateAuth = async () => {
      const isValid = await postValidation(cookies);
      setAuthenticate(isValid);
      
      // Redirect to login if not authenticated and not already on login page
      if (!isValid && pathname !== '/admin') {
        router.push('/admin');
      }
    };
    
    validateAuth();
  }, [pathname, router]);
  
  const setCount = async () => {
    try {
      const response = await fetch('/api/message/count');
      if (response.ok) {
        const data = await response.json();
        updateCount(data.count || 0);
      }
    } catch (error) {
      console.error('Error fetching notification count:', error);
    }
  };

  if (isAuthenticated === null) {
    return (
      <div>
        <Nav 
          setAuthenticate={setAuthenticate} 
          isAuthenticated={isAuthenticated} 
          setCount={setCount} 
          count={count} 
        />
        <Loading />
      </div>
    );
  }

  return (
    <div>
      <Nav 
        setAuthenticate={setAuthenticate} 
        isAuthenticated={isAuthenticated} 
        setCount={setCount} 
        count={count} 
      />
      <div className="container">
        {children}
      </div>
    </div>
  );
} 