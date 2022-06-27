import React, { useEffect, useState } from 'react';
import './Seat.css';

function Seat({ socket, seat, table, seatName, state, setState }) {

    const [tableSeat, setTableSeat] = useState(seat);

    useEffect(() => {
    }, [socket]);

    const joinTable = (socket) => {
        socket.emit('join table', {
            socketId: state.user.socketId,
            user: state.user,
            seat: seatName,
            table: table.name
        });
    }

    if (seat !== 'empty') {
        return (
            <div className='Seat filled' style={{ backgroundColor: `${state.user.textColor}` }}>
                {seat.name}
            </div>
        );
    } else {
        return (
            <div 
                className='Seat'
                onClick={() => joinTable(socket)}
            >
            </div>
        );
    }
    
}

export default Seat;