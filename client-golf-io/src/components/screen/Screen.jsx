import React, { useState, useEffect } from 'react';
import Lobby from '../lobby/Lobby';
import { io } from 'socket.io-client';
import './Screen.css';
import TableScreen from '../table-screen/TableScreen';

function Screen({ socket, state, setState }) {

    const handleUserDisconnected = (data) => {
        if (state.table !== undefined && state.table.name === data.table) {
            setState({
                ...state,
                table: data.table
            });
        }
    }

    useEffect(() => {
        socket.on('user disconnected', data => handleUserDisconnected(data));
    }, [socket]);

    if (socket && state.table && state.inGame) 
    {
        return (
            <div className='Screen'>
                <TableScreen socket={socket} state={state} setState={setState}/>
            </div>
        );
    } 
    else if ((state.inGame !== true) && socket) 
    {
        return (
            <div className='Screen'>
                <Lobby socket={socket} state={state} setState={setState}/>
            </div>
        );
    }
    else 
    {
        return (
            <div className='Screen'>
                <p>connecting...</p>
            </div>
        );
    }
}

export default Screen;