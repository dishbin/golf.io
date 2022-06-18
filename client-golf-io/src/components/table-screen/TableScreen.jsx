import React, { useEffect } from 'react';
import TableView from '../table-view/TableView';
import TableChat from '../table-chat/TableChat';
import TableChatInput from '../table-chat-input/TableChatInput';
import './TableScreen.css';

function TableScreen({ socket, state, setState, setInGame }) {

    const handleSeating = (data) => {
        console.log('seating');
        console.log(data);
        let newUsers = {...state.table.users};
        newUsers[data.seat] = data.user;
        console.log(socket.id);
        console.log(data.user.socketId);
        if (socket.id === data.user.socketId) {
            setState({...state, users: newUsers, user: data.user});
        } else {
            setState({...state, users: newUsers});
        }
    }

    const handleLeaving = (data) => {
        console.log('leaving');
        console.log(data);
        console.log(socket.id);
        console.log(data.user.socketId);
        if (socket.id === data.user.socketId) {
            setState({...state, table: {}, inGame: false});
        } else {
            setState({...state, table: data.table});
        }
    }

    useEffect(() => {
        socket.on('user seating', data => handleSeating(data));
        socket.emit('get table users', state.table);
        socket.on('user got up', data => handleLeaving(data));
    }, [socket]);

    return (
        <div className='TableScreen'>
            <TableView socket={socket} state={state} setState={setState} setInGame={setInGame} />
            <div className='chat-col'>
                {/* {(users) && 
                    <UserList socket={socket} users={users} />
                }    */}
                <TableChat socket={socket} state={state} setState={setState}/>
                <TableChatInput socket={socket} state={state} setState={setState} />
            </div>
        </div>
    );
    
}

export default TableScreen;