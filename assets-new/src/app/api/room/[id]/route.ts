import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
try {
    const id = params.id;
    const roomApi = process.env.ROOM_API || 'http://localhost:3001';
    
    // Get the token from cookies
    const cookieStore = cookies();
    const token = cookieStore.get('token');
    if (!token) {
        return NextResponse.json(
        { errors: ['Authentication required'] },
        { status: 401 }
        );
    }
    
    const response = await fetch(`${roomApi}/room/${id}`, {
        headers: {
        'Cookie': `token=${token.value}`
        }
    });
    
    if (!response.ok) {
        const errorData = await response.json();
        return NextResponse.json(
        errorData,
        { status: response.status }
        );
    }
    
    const data = await response.json();
    return NextResponse.json(data);
    } catch (error) {
    console.error('Error fetching room:', error);
    return NextResponse.json([], { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
    ) {
    try {
        const id = params.id;
        const roomApi = process.env.ROOM_API || 'http://localhost:3001';
        
        const token = cookies().get('token');
        if (!token) {
        return NextResponse.json(
            { errors: ['Authentication required'] },
            { status: 401 }
        );
        }
        
        const response = await fetch(`${roomApi}/room/${id}`, {
        method: 'DELETE',
        headers: {
            'Cookie': `token=${token.value}`
        }
        });
        
        if (!response.ok) {
        const errorData = await response.json();
        return NextResponse.json(
            { errors: errorData.errors || ['Failed to delete room'] },
            { status: response.status }
        );
        }
        
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting room:', error);
        return NextResponse.json(
        { errors: ['An unexpected error occurred'] },
        { status: 500 }
        );
    }
}

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
    ) {
    try {
        const id = params.id;
        const roomApi = process.env.ROOM_API || 'http://localhost:3001';
        const body = await request.json();
        
        const token = cookies().get('token');
        if (!token) {
            return NextResponse.json(
                { errors: ['Authentication required'] },
                { status: 401 }
            );
        }
        
        const response = await fetch(`${roomApi}/room/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `token=${token.value}`
            },
            body: JSON.stringify(body),
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            console.log(errorData);
            return NextResponse.json(
                { errors: errorData.fieldErrors || ['Failed to update room'] },
                { status: response.status }
            );
        }
        
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error updating room:', error);
        return NextResponse.json(
        { errors: ['An unexpected error occurred'] },
        { status: 500 }
        );
    }
}