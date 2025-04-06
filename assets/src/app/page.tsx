'use client';

import React, { useState, useEffect } from "react";
import Footer from "@/components/Footer";
import HotelContact from "@/components/HotelContact";
import HotelMap from "@/components/HotelMap";
import HotelLogo from "@/components/HotelLogo";
import HotelRoomInfo from "@/components/HotelRoomInfo";

import { Branding } from "@/types/branding";
import { Room } from "@/types/room";

export default function Home() {

    const [branding, setBranding] = useState<Branding | null>(null);
    const [rooms, setRooms] = useState<Room[]>([]);
    
    useEffect(() => {
        const fetchBranding = async () => {
            const response = await fetch('/api/branding');
            const data = await response.json();
            setBranding(data);
        };
        fetchBranding();

        const fetchRooms = async () => {
            const response = await fetch('/api/room');
            const data = await response.json();
            setRooms(data.rooms || []);
        };
        fetchRooms();
    }, []);

    if (!branding) {
        return (
            <div className="container-fluid text-center p-5">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden"></span>
                </div>
            </div>
        )
    }

    return (
        <div>
            
            <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
                <div className="container">
                <a className="navbar-brand d-flex align-items-center" href="#">
                    <span>{branding.name}</span>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="#rooms">Rooms</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#booking">Booking</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#amenities">Amenities</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#location">Location</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#contact">Contact</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/admin">Admin</a>
                    </li>
                    </ul>
                </div>
                </div>
            </nav>

            <HotelLogo branding={branding} />

            <section id="booking" className="py-3">
                <div className="container">
                    <div className="card shadow booking-card">
                        <div className="card-body p-4">
                        <h3 className="card-title text-center mb-4">Check Availability & Book Your Stay</h3>
                        <form>
                            <div className="row g-3">
                            <div className="col-md-6">
                                <label htmlFor="checkin" className="form-label">Check In</label>
                                <input type="date" className="form-control" id="checkin" />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="checkout" className="form-label">Check Out</label>
                                <input type="date" className="form-control" id="checkout" />
                            </div>
                            <div className="col-2"></div>
                            <div className="col-8 mt-4">
                                <button type="submit" className="btn btn-primary w-100 py-2">Check Availability</button>
                            </div>
                            <div className="col-2"></div>
                            </div>
                        </form>
                        </div>
                    </div>
                </div>
            </section>

            <section id="rooms" className="section-divider">
                <div className="container">
                <div className="text-center mb-5">
                    <h2 className="display-5">Our Rooms</h2>
                    <p className="lead text-muted">Comfortable beds and delightful breakfast from locally sourced ingredients</p>
                </div>
                
                <div className="row g-4">

                    {rooms.map((roomDetails) => {
                        return <div key={roomDetails.roomid}><HotelRoomInfo roomDetails={roomDetails} /></div>
                    })}
                </div>
                </div>
            </section>

            <HotelMap branding={branding} />
            <HotelContact contactDetails={branding?.contact} />
            <Footer branding={branding} />
        </div>
    );
}
