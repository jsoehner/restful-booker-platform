import { NextResponse } from 'next/server';
import { BrandingResponse } from '@/libs/Api';

// Server-side API route that proxies requests to the branding service
export async function GET() {
  try {
    const brandingApi = process.env.BRANDING_API || 'http://localhost:3002';
    const response = await fetch(`${brandingApi}/branding/`, {
      next: { revalidate: 60 } // Cache for 60 seconds
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch branding: ${response.status}`);
    }
    
    const data: BrandingResponse = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching branding:', error);
    return NextResponse.json({}, { status: 500 });
  }
} 