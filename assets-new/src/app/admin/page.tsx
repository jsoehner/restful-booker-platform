'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Login from '@/components/admin/Login';
import Cookies from 'universal-cookie';

export default function AdminPage() {
  const [isAuthenticated, setAuthenticate] = useState<boolean | null>(null);
  const router = useRouter();
  
  useEffect(() => {
    const cookies = new Cookies();
    const token = cookies.get('token');
    
    if (token) {
      // Validate token
      const validateToken = async () => {
        try {
          const response = await fetch('/api/auth/validate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
          });
          
          if (response.ok) {
            setAuthenticate(true);
            router.push('/admin/rooms');
          } else {
            setAuthenticate(false);
          }
        } catch (error) {
          console.error('Error validating token:', error);
          setAuthenticate(false);
        }
      };
      
      validateToken();
    } else {
      setAuthenticate(false);
    }
  }, [router]);
  
  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }
  
  return (
    <div>
      <Login setAuthenticate={setAuthenticate} />
    </div>
  );
} 