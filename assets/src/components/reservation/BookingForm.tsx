import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Room as RoomType } from "@/types/room";

interface RoomDetailsProps {
    room: RoomType;
}

interface Event {
    start: Date;
    end: Date;
    title: string;
}

const BookingForm: React.FC<RoomDetailsProps> = ({ room }) => {

    const localizer = momentLocalizer(moment);
    const [events, setEvents] = useState<Event[]>([]);
    const [newEvent, setNewEvent] = useState<Event[]>([]);
    const [slots, setSlots] = useState<number>(0);

    const urlParams = useSearchParams();
    const checkin = urlParams.get('checkin');
    const checkout = urlParams.get('checkout');

    useEffect(() => {
        const fetchRoomReport = async () => {
            try {
            const response = await fetch(`/api/report/room/${room.roomid}`);
            if (response.ok) {
                const data = await response.json();
                
                setEvents(data);
            }
            } catch (error) {
                console.error('Error fetching room report:', error);
            }
        };

        const setCurrentSelection = async () => {
            if (checkin && checkout) {
                const startMoment = moment(checkin, "YYYY-MM-DD");
                const endMoment = moment(checkout, "YYYY-MM-DD");

                const diff = endMoment.diff(startMoment, 'days');
                setSlots(diff);

                const start = startMoment.toDate();
                const end = endMoment.add(1).toDate();

                setNewEvent([{start, end, title: 'Selected' }]);
            }
        };
        
        fetchRoomReport();
        setCurrentSelection();
    }, [room.roomid]);

    const handleSelect = (result: { start: Date; end: Date; slots: Date[] }) => {
        const start = result.start;
        const end = result.end;
        setSlots(result.slots.length);

        if (start && end && result.slots.length > 1) {
            setNewEvent([{ start, end, title: 'Selected' }]);
        }
    };

    console.log('newEvent', newEvent);

    if(newEvent.length === 0) {
        return (
            <div className="col-lg-4">
                <div className="card border-0 shadow booking-card">
                    <div className="container-fluid text-center p-5">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden"></span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="col-lg-4">
            <div className="card border-0 shadow booking-card">
            <div className="card-body">
                <h2 className="card-title fs-4 fw-bold mb-3">Book This Room</h2>
                
                <div className="d-flex align-items-baseline mb-4">
                    <span className="fs-2 fw-bold text-primary me-2">£{room.roomPrice}</span>
                    <span className="text-muted">per night</span>
                </div>
                    <form>
                        <div className="mb-4">
                            <Calendar
                                localizer={localizer}
                                onSelectSlot={handleSelect}
                                defaultView="month"
                                selectable
                                events={newEvent.concat(events)}
                                style={{ height: "400px" }}
                                views={['month']}
                            />
                        </div>

                        <div className="card bg-light border-0 mb-4">
                            <div className="card-body">
                            <h3 className="fs-5 mb-3">Price Summary</h3>
                            <div className="d-flex justify-content-between mb-2">
                                <span>£{room.roomPrice} x {slots} nights</span>
                                <span>£{room.roomPrice * slots}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-2">
                                <span>Cleaning fee</span>
                                <span>£25</span>
                            </div>
                            <div className="d-flex justify-content-between">
                                <span>Service fee</span>
                                <span>£15</span>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between fw-bold">
                                <span>Total</span>
                                <span>£{room.roomPrice * slots + 40}</span>
                            </div>
                            </div>
                        </div>

                        <button type="button" className="btn btn-primary w-100 mb-3">Reserve Now</button>
                        <p className="text-center text-muted small mb-0">You won't be charged yet</p>
                    </form>
                </div>
            </div>
        </div>
    )

}

export default BookingForm;