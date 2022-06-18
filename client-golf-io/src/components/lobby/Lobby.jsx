import React, { useEffect, useState } from 'react';
import LobbyChat from '../lobby-chat/LobbyChat';
import LobbyChatInput from '../input-lobby-chat/LobbyChatInput';
import LobbyView from '../lobby-view/LobbyView';
import './Lobby.css';
import UserList from '../user-list/UserList';

function Lobby({ socket, state, setState, setInGame }) {

    const [users, setUsers] = useState({});

    const userListener = (data) => {
        setUsers((prevUsers) => {
            const newUsers = {...prevUsers};
            newUsers[data.user.id] = data.user;
            if (data.user.socketId === socket.id) {
                setState({...state, users: newUsers, user: data.user});
            }
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

    const handleSeating = (data) => {
        setState({
            ...state,
            table: data.table,
            inGame: true
        });
    }

    useEffect(() => {
        socket.emit('new user login', {username: state.username, socketId: socket.id});

        socket.on('new user connected', data => userListener(data));

        socket.on('delete user', userId => deleteUserListener(userId));

        socket.on('joined', data => handleSeating(data));

        return (() => {
            socket.off('new user login');
            socket.off('new user connected');
            socket.off('delete user');
            socket.off('in room');
        })
    }, [socket]);

    return (
        <div>
            {(state.user) &&
                <div className='Lobby'>
                    <LobbyView socket={socket} state={state} setState={setState} />
                    <div className='chat-col'>
                        {(users) && 
                            <UserList socket={socket} users={users} />
                        }
                        <LobbyChat socket={socket} state={state} setState={setState} />
                        <LobbyChatInput socket={socket} state={state} setState={setState} />
                    </div>
                </div>     
            }     
        </div>
    );
}


export default Lobby;