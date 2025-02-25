'use client';

import React, { Suspense, useContext } from 'react';
import dynamic from 'next/dynamic';
import Loading from '@/components/admin/Loading';

// Dynamically import the MessageList component
const MessageList = dynamic(
  () => import('@/components/admin/MessageList'),
  { 
    loading: () => <Loading />,
    ssr: false
  }
);

export default function MessagesPage() {
  // We'll need to pass the setCount function from the parent layout
  // This can be done via React Context or by fetching it again here
  const setCount = async () => {
    try {
      const response = await fetch('/api/admin/notifications/count');
      if (response.ok) {
        // This is just to update the count, the actual component will handle this
      }
    } catch (error) {
      console.error('Error updating notification count:', error);
    }
  };

  return (
    <Suspense fallback={<Loading />}>
      <MessageList setCount={setCount} />
    </Suspense>
  );
} 