import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

function Lobby({ state, updateState }) {

    const [display, setDisplay] = useState('fetching');

    useEffect(() => {
        const socket = io('http://localhost:5000');

        socket.on('connect', () => {
            let newUserData = {
                username: state.username
            }
            socket.emit('new user', newUserData);
        })

        socket.on('new connection', (socketId) => {
            console.log(socketId);
            let newUserData = {
                socketId: socketId,
                username: state.username
            }
            socket.emit('new user', newUserData);
        });

        socket.on('connect_error', ()=>{
            setTimeout(() => {
                socket.connect()
            },5000);
        });

        socket.on('user connected', (data) => {
            updateState(data);
            socket.emit('update success');
        });

        socket.on('success', () => {
            setDisplay('succes!');
        });

        socket.on('disconnect', () => {
            console.log('server disconnected');
            setDisplay('disconnected');
        });

    },[]);

    return (
        <div>
            <p>{display}</p>
            <p>{state.lobby.userList}</p>
            <p>{state.lobby.tableList}</p>
            <p>{state.lobby.messageList}</p>
        </div>
    );
}

export default Lobby;