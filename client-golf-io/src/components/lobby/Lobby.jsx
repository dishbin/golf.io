import React, { useEffect, useState } from 'react';
import LobbyChat from '../lobby-chat/LobbyChat';
import LobbyChatInput from '../input-lobby-chat/LobbyChatInput';
import LobbyView from '../lobby-view/LobbyView';
import './Lobby.css';
import UserList from '../user-list/UserList';

function Lobby({ socket, state, setState }) {

    const [users, setUsers] = useState({});

    const userListener = (user) => {
        setUsers((prevUsers) => {
            const newUsers = {...prevUsers};
            newUsers[user.id] = user;
            setState({...state, users: newUsers, user: user});
            return newUsers;
        });
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

        socket.on('lobby user', newUser => {
            userListener(newUser)  
        });
        socket.on('delete user', userId => deleteUserListener(userId));

        socket.on('in room', data => console.log(data));

        return (() => {
            socket.off('new user login');
            socket.off('lobby user');
            socket.off('delete user');
            socket.off('in room');
        })
    }, [socket]);

    return (
        <div className='Lobby'>
            <LobbyView socket={socket} state={state} setState={setState} />
            <div className='chat-col'>
                {(users) && 
                    <UserList socket={socket} users={users} />
                }   
                <LobbyChat socket={socket} />
                <LobbyChatInput socket={socket} state={state} setState={setState} />
            </div>
        </div>
    );
}


export default Lobby;