
'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import Footer from '@/components/Footer';
import { Branding } from '@/types/branding';
import HomeNav from '@/components/HomeNav';
import Breadcrumb from '@/components/reservation/Breadcrumb';
import RoomDetails from '@/components/reservation/RoomDetails';
import SimilarRooms from '@/components/reservation/SimilarRooms';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";

import '@/styles/reservations.css';
import { Room } from '@/types/room';

interface Event {
    start: Date;
    end: Date;
    title: string;
}

export default function Reservation({params}: {params: Promise<{ id: string }>}) {

    const unwrappedParams = React.use(params);
    
    const [branding, setBranding] = useState<Branding | null>(null);
    const [room, setRoom] = useState<Room | null>(null);
    
    const localizer = momentLocalizer(moment);
    const [events, setEvents] = useState<Event[]>([]);
    const [newEvent, setNewEvent] = useState<Event[]>([]);
    
    useEffect(() => {
        const fetchRoom = async () => {
            const response = await fetch(`/api/room/${unwrappedParams.id}`);
            const data = await response.json();
            setRoom(data);
        };
        fetchRoom();

        const fetchBranding = async () => {
            const response = await fetch('/api/branding');
            const data = await response.json();
            setBranding(data);
        };
        fetchBranding();
    }, []);

    if (!room || !branding) {
        return (
            <div className="container-fluid text-center p-5">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden"></span>
                </div>
            </div>
        )
    }

    const handleSelect = (event: any) => {
        console.log(event);
    };

    return (
        <div>
            <HomeNav branding={branding} />

            <Breadcrumb roomType={room.type} />

            <div className="container my-5">
                <div className="row">
                    <RoomDetails room={room} />

                    <div className="col-lg-4">
                        <div className="card border-0 shadow booking-card">
                        <div className="card-body">
                            <h2 className="card-title fs-4 fw-bold mb-3">Book This Room</h2>
                            
                            <div className="d-flex align-items-baseline mb-4">
                            <span className="fs-2 fw-bold text-primary me-2">$129</span>
                            <span className="text-muted">per night</span>
                            </div>

                            <form>

                            <div className="mb-4">
                                <Calendar
                                    localizer={localizer}
                                    onSelectSlot={handleSelect}
                                    defaultView="month"
                                    selectable
                                    popup={true}
                                    events={newEvent.concat(events)}
                                    style={{ height: "60vh" }}
                                    views={['month']}
                                />
                            </div>

                            <div className="card bg-light border-0 mb-4">
                                <div className="card-body">
                                <h3 className="fs-5 mb-3">Price Summary</h3>
                                <div className="d-flex justify-content-between mb-2">
                                    <span>$129 x 2 nights</span>
                                    <span>$258</span>
                                </div>
                                <div className="d-flex justify-content-between mb-2">
                                    <span>Cleaning fee</span>
                                    <span>$25</span>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <span>Service fee</span>
                                    <span>$15</span>
                                </div>
                                <hr />
                                <div className="d-flex justify-content-between fw-bold">
                                    <span>Total</span>
                                    <span>$298</span>
                                </div>
                                </div>
                            </div>

                            <button type="button" className="btn btn-primary w-100 mb-3">Reserve Now</button>
                            <p className="text-center text-muted small mb-0">You won't be charged yet</p>
                            </form>
                        </div>
                        </div>
                    </div>
                </div>
            </div>

            <SimilarRooms id={room.roomid} />

            <Footer branding={branding} />
        </div>
    )
}