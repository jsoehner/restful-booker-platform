'use client';

import React, { useState, useEffect } from "react";
import Footer from "@/components/Footer";
import HotelContact from "@/components/home/HotelContact";
import HotelMap from "@/components/home/HotelMap";
import HotelLogo from "@/components/home/HotelLogo";
import Availability from "@/components/home/Availability";

import { Branding } from "@/types/branding";

export default function Home() {

    const [branding, setBranding] = useState<Branding | null>(null);
        
    useEffect(() => {
        const fetchBranding = async () => {
            const response = await fetch('/api/branding');
            const data = await response.json();
            setBranding(data);
        };
        fetchBranding();
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
            <Availability />
            <HotelMap branding={branding} />
            <HotelContact contactDetails={branding?.contact} />
            <Footer branding={branding} />
        </div>
    );
}
