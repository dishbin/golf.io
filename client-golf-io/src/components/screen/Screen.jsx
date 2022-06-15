import React, { useState, useEffect } from 'react';
import Lobby from '../lobby/Lobby';
import { io } from 'socket.io-client';
import './Screen.css';
import TableScreen from '../table-screen/TableScreen';

function Screen({ state, setState}) {

    const [inGame, setInGame] = useState(false);

    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io('http://localhost:3000');
        setSocket(newSocket);
        return () => newSocket.close();
    }, [setSocket]);

    if (inGame && socket && state.table) 
    {
        return (
            <div className='Screen'>
                <TableScreen socket={socket} state={state} setState={setState} setInGame={setInGame} />
            </div>
        );
    } 
    else if (!inGame && socket) 
    {
        return (
            <div className='Screen'>
                <Lobby socket={socket} state={state} setState={setState} setInGame={setInGame}/>
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