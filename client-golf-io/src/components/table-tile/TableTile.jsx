import React, { useEffect } from 'react';
import Seat from '../seat/Seat';

function TableTile({ socket, table, state, setState }) {

    useEffect(() => {
        socket.on('new seating', seating => console.log('new seating in room: ' + seating.table, seating));
    }, [socket]);

    return (
        <div>
            <h3>{table.name}</h3>
            <div>
                <div>
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