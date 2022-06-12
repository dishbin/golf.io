import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import LobbyChat from '../lobby-chat/LobbyChat';
import LobbyChatInput from '../input-lobby-chat/LobbyChatInput';

function Lobby({ socket, state, setState }) {

    const handleUser = (newUser) => {
        let users = state.users;
        users.put(newUser.username, newUser);
        setState({...state, users: users});
    }

    const handleUsers = (userMap) => {
        setState({...state, users: userMap});
    }

    const handleTable = (newTable) => {
        let tables = state.tables;
        tables.put(newTable.name, newTable);
        setState({...state, tables: tables});
    }

    const handleTables = (tableMap) => {
        setState({...state, tabels: tableMap});
    }



    useEffect(() => {
        socket.emit('new user login', {username: state.username, socketId: socket.id});

        socket.on('new user', newUser => handleUser(newUser));
        socket.on('lobby users', userMap => handleUsers(userMap));

        socket.on('new table', newTable => handleTable(newTable));
        socket.on('lobby tables', tableMap => handleTables(tableMap));
    });

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