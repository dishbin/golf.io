import React, { useEffect, useState } from 'react';
import './Seat.css';

function Seat({ socket, seat, table, seatName, state, setState }) {

    const [tableSeat, setTableSeat] = useState(seat);

    useEffect(() => {
    }, [socket]);

    const joinTable = (socket) => {
        socket.emit('join table', {
            socketId: socket.id,
            user: state.username,
            seat: seatName,
            table: table
        });
    }

    if (seat !== 'empty') {
        return (
            <div className='Seat filled'>
                <p>not empty seat</p>
            </div>
        );
    } else {
        return (
            <div 
                className='Seat empty'
                onClick={() => joinTable(socket)}
            >
                <p>empty seat</p>
            </div>
        );
    }
    
}

export default Seat;