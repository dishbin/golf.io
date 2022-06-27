import React, { useEffect, useState } from 'react';
import Seat from '../seat/Seat';
import './TableTile.css';

function TableTile({ socket, table, state, setState }) {

    const [isFull, setIsFull] = useState(false);

    const handleFullTable = (data) => {
        if (data.table.id === table.id) {
            setIsFull(true);
        }
    }

    const handleTableNoLongerFull = (data) => {
        if (data.table.id === table.id) {
            setIsFull(false);
        }
    }

    useEffect(() => {
        if (table.isFull === true) {
            setIsFull(true);
        }
        socket.on('table is full', data => handleFullTable(data));
        socket.on('table not full', data => handleTableNoLongerFull(data));

        return (() => {
            socket.off('table is full', handleFullTable);
            socket.off('table not full', handleTableNoLongerFull);
        })
    }, [socket]);


    return (
        <div className='TableTile' style={{backgroundColor: `${(isFull) ? 'gray' : 'white'}`}}>
            <h3 className='table-name' style={{color: `${(isFull) ? 'red' : 'gray'}`}}>{table.name}</h3>
            <div>
                <div className='seat-array'>
                    {(table !== null && table !== undefined) &&
                    Object.entries(table.seats)
                        .map(seat => 
                            <Seat 
                                key={seat[0]}
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