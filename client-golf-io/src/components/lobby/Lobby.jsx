import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import LobbyChat from '../lobby-chat/LobbyChat';
import LobbyChatInput from '../input-lobby-chat/LobbyChatInput';

function Lobby({ socket, state, updateState }) {

    return (
        <div>
            <div>
                <LobbyChat socket={socket} />
                <LobbyChatInput socket={socket} />
            </div>
        </div>
        
    );
}

export default Lobby;