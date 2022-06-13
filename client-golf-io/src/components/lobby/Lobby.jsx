import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import LobbyChat from '../lobby-chat/LobbyChat';
import LobbyChatInput from '../input-lobby-chat/LobbyChatInput';
import LobbyView from '../lobby-view/LobbyView';

function Lobby({ socket, state, setState }) {

    const handleUser = (newUser) => {
        let users = state.users;
        users.put(newUser.username, newUser);
        setState({...state, users: users});
    }

    const handleUsers = (userMap) => {
        setState({...state, users: userMap});
    }



    useEffect(() => {
        socket.emit('new user login', {username: state.username, socketId: socket.id});
        socket.emit('')

        socket.on('new user', newUser => handleUser(newUser));
        socket.on('lobby users', userMap => handleUsers(userMap));
    });

    return (
        <div>
            <div>
                <LobbyChat socket={socket} />
                <LobbyChatInput socket={socket} />
                <LobbyView socket={socket} state={state} setState={setState} />
            </div>
        </div>
        
    );
}

export default Lobby;