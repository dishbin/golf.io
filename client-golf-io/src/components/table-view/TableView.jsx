import React, { useEffect, useState } from 'react';
import './TableView.css';

function TableView({ socket, state, setState, setInGame }) {

    useEffect(() => {

        socket.on('user seating', tables => socket.emit('getTables'));

        return (() => {
            socket.off('user seating');
        })
    }, [socket]);

    const handleExit = () => {
        let tbl = state.table;
        let seat = Object.entries(tbl.seats).filter(pair => pair[1].name === state.username)[0];
        tbl.seats[seat[0]] = 'empty';
        socket.emit('player left', { table: tbl, seat: seat[0], user: seat[1]});
        setState({...state, table: {}, inGame: false});
    }

    return (
        <div className='TableView'>
            table view
            <button type='button' onClick={() => handleExit()} >exit game</button>
        </div>
    );
}

export default TableView;