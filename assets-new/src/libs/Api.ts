// Define types for our API responses
export interface BrandingResponse {
  name?: string;
  logoUrl?: string;
  description?: string;
  contact?: {
    name?: string;
    address?: string;
    phone?: string;
    email?: string;
  };
  map?: {
    latitude: number;
    longitude: number;
  };
}

export interface RoomResponse {
  rooms: Room[];
}

export interface Room {
  roomid: number;
  roomName: string;
  type: string;
  accessible: boolean;
  image: string;
  description: string;
  features: string[];
  roomPrice: number;
}

export interface ReportEvent {
  start: Date;
  end: Date;
  title: string;
}

// Client-side data fetching hooks that use our server-side API routes
export async function fetchBranding(): Promise<BrandingResponse> {
  try {
    const response = await fetch('/api/branding');
    
    if (!response.ok) {
      throw new Error(`Failed to fetch branding: ${response.status}`);
    }
    
    return response.json();
  } catch (error) {
    console.error('Error fetching branding:', error);
    return {};
  }
}

export async function fetchRooms(): Promise<Room[]> {
  try {
    const response = await fetch('/api/rooms');
    
    if (!response.ok) {
      throw new Error(`Failed to fetch rooms: ${response.status}`);
    }
    
    const data: RoomResponse = await response.json();
    return data.rooms || [];
  } catch (error) {
    console.error('Error fetching rooms:', error);
    return [];
  }
}

export async function fetchRoomReport(roomid: number): Promise<ReportEvent[]> {
  try {
    const response = await fetch(`/api/report/room/${roomid}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch room report: ${response.status}`);
    }
    
    const data = await response.json();
    return data || [];
  } catch (error) {
    console.error('Error fetching room report:', error);
    return [];
  }
}

export async function fetchReport(): Promise<ReportEvent[]> {
  try {
    const response = await fetch('/api/report');
    
    if (!response.ok) {
      throw new Error(`Failed to fetch report: ${response.status}`);
    }
    
    const data = await response.json();
    return data || [];
  } catch (error) {
    console.error('Error fetching report:', error);
    return [];
  }
} 