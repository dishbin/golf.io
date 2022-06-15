import React from 'react';
import TableView from '../table-view/TableView';
import TableChat from '../table-chat/TableChat';
import TableChatInput from '../table-chat-input/TableChatInput';
import './TableScreen.css';

function TableScreen({ socket, state, setState, setInGame }) {

    console.log(state);

    if (state.table) {
        return (
            <div className='TableScreen'>
                <TableView socket={socket} state={state} setState={setState} />
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
    else 
    {
        return (
            <div className='TableScreen'>
                <p>connecting</p>
            </div>
        );
    }
    
}

export default TableScreen;