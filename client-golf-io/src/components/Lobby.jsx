import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import LobbyChat from './LobbyChat';
import LobbyChatInput from './LobbyChatInput';

function Lobby({ state, updateState }) {

    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io('http://localhost:3000');
        setSocket(newSocket);
        return () => newSocket.close();
    }, [setSocket]);



    return (
        
        <div>
            { socket ? (
                    <div>
                        <LobbyChat socket={socket} />
                        <LobbyChatInput socket={socket} />
                    </div>
                ) : (
                    <div>
                        <p>not connected</p>
                    </div>
                )
            }
        </div>
    );
}

export default Lobby;