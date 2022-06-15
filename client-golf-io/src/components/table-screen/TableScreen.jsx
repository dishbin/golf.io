import React from 'react';
import TableView from '../table-view/TableView';
import TableChat from '../table-chat/TableChat';
import TableChatInput from '../table-chat-input/TableChatInput';

function TableScreen({ socket, state, setState, setInGame }) {
    return (
        <div className='TableScreen'>
            <TableView socket={socket} state={state} setState={setState} />
            <div className='chat-col'>
                {/* {(users) && 
                    <UserList socket={socket} users={users} />
                }    */}
                <TableChat socket={socket} />
                <TableChatInput socket={socket} state={state} setState={setState} />
            </div>
        </div>
    );
}

export default TableScreen;