import React, { useEffect } from 'react';
import TableView from '../table-view/TableView';
import TableChat from '../table-chat/TableChat';
import TableChatInput from '../table-chat-input/TableChatInput';
import './TableScreen.css';

function TableScreen({ socket, state, setState, setInGame }) {

    const handleTableUsers = (seat, user) => {
        let newUsers = {...state.users};
        newUsers[seat] = user;
        if (socket.id === user.socketId) {
            setState({...state, users: newUsers, user: user});
        } else {
            setState({...state, users: newUsers});
        }
    }

    useEffect(() => {
        socket.on('table user', data => handleTableUsers(data.seat, data.user));
        socket.emit('get table users', state.table);
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