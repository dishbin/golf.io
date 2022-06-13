import React, { useEffect, useState } from 'react';
import LobbyChat from '../lobby-chat/LobbyChat';
import LobbyChatInput from '../input-lobby-chat/LobbyChatInput';
import LobbyView from '../lobby-view/LobbyView';

function Lobby({ socket, state, setState }) {

    const [user, setUsers] = useState({});

    const userListener = (user) => {
        setUsers((prevUsers) => {
            const newUsers = {...prevUsers};
            newUsers[user.id] = user;
            return newUsers;
        })
    };

    const deleteUserListener = (userId) => {
        setUsers((prevUsers) => {
            const newUsers = {...prevUsers};
            delete newUsers[userId];
            return newUsers;
        })
    };

    useEffect(() => {
        socket.emit('new user login', {username: state.username, socketId: socket.id});
        socket.emit('')

        socket.on('new user', newUser => userListener(newUser));
        socket.on('delete user', userId => deleteUserListener(userId));
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