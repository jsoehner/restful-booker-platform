'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Loading from '@/components/admin/Loading';

// Dynamically import the RoomDetails component
const RoomDetails = dynamic(
  () => import('@/components/admin/RoomDetails'),
  { 
    loading: () => <Loading />,
    ssr: false
  }
);

export default function RoomDetailsPage({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<Loading />}>
      <RoomDetails id={params.id} />
    </Suspense>
  );
} 