import React, { useState, useEffect } from 'react';
import Lobby from '../lobby/Lobby';
import { io } from 'socket.io-client';

function Screen({ state, setState}) {

    const [inGame, setInGame] = useState(false);

    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io('http://localhost:3000');
        setSocket(newSocket);
        return () => newSocket.close();
    }, [setSocket]);

    if (inGame && socket) 
    {
        return (
            <div>
                {/* game screen here */}
            </div>
        );
    } 
    else if (!inGame && socket) 
    {
        return (
            <div>
                <Lobby socket={socket} state={state} setState={setState} />
            </div>
        );
    }
    else 
    {
        return (
            <div>
                <p>not connected</p>
            </div>
        );
    }
}

export default Screen;