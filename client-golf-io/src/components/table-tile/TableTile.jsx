import React, { useEffect } from 'react';
import Seat from '../seat/Seat';
import './TableTile.css';

function TableTile({ socket, table, state, setState }) {

    const handlePlayerLeaving = (targetTable, seat, user) => {
        
    }

    useEffect(() => {
        socket.on('player left', data => handlePlayerLeaving(data.table, data.seat, data.user));
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
                                table={table}
                                state={state} 
                                setState={setState}
                            />)}
                </div>
            </div>
        </div>
    );
}

export default TableTile;