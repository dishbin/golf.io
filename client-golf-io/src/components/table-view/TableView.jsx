import React, { useEffect, useState } from 'react';
import './TableView.css';

function TableView({ socket, state, setState }) {

    useEffect(() => {

        socket.on('user seating', tables => socket.emit('getTables'));

        return (() => {
        })
    }, [socket]);

    return (
        <div className='TableView'>
            table view
        </div>
    );
}

export default TableView;