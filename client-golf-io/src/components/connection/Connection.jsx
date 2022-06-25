import React, { useState, useEffect } from 'react';
import Screen from '../screen/Screen';
import { io } from 'socket.io-client';

function Connection({ state, setState }) {

    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io('http://localhost:3000');
        setSocket(newSocket);
        return () => newSocket.close();
    }, [setSocket]);

    return (
        <div>
            {(socket) &&
                <Screen socket={socket} state={state} setState={setState} />
            }
        </div>
    );
}

export default Connection;