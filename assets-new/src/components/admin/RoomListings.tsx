import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Room } from '@/libs/Api';

const RoomListings: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch('/api/rooms');
        if (response.ok) {
          const data = await response.json();
          setRooms(data.rooms || []);
        }
      } catch (error) {
        console.error('Error fetching rooms:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  if (loading) {
    return <div>Loading rooms...</div>;
  }

  return (
    <div>
      <h2>Rooms</h2>
      <div className="row">
        <div className="col-sm-12">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Room #</th>
                <th>Type</th>
                <th>Accessible</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room) => (
                <tr key={room.roomid}>
                  <td>{room.roomName}</td>
                  <td>{room.type}</td>
                  <td>{room.accessible ? 'Yes' : 'No'}</td>
                  <td>£{room.roomPrice}</td>
                  <td>
                    <Link href={`/admin/rooms/${room.roomid}`} className="btn btn-sm btn-primary">
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RoomListings; 