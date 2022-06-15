import React, { useEffect } from 'react';
import Seat from '../seat/Seat';
import './TableTile.css';

function TableTile({ socket, table, state, setState }) {

    useEffect(() => {
        socket.on('new seating', seating => console.log('new seating in room: ' + seating.table, seating));
    }, [socket]);

    return (
        <div className='TableTile'>
            <h3 className='table-name'>{table.name}</h3>
            <div>
                <div className='seat-array'>
                    {Object.entries(table.seats)
                        .map(seat => 
                            <Seat 
                                seatName={seat[0]}
                                seat={seat[1]}
                                socket={socket} 
                                table={table.id}
                                state={state} 
                                setState={setState}
                            />)}
                </div>
            </div>
        </div>
    );
}

export default TableTile;