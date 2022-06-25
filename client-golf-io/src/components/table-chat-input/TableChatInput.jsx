import React, { useState } from 'react';
import './TableChatInput.css';

function TableChatInput({ socket, state, setState, table }) {

    const [value, setValue] = useState('');

    const submitForm = (e) => {
        let data = {
            user: state.user,
            location: state.table.name,
            value: value
        }
        e.preventDefault();
        socket.emit('new message', data);
        setValue('');
    };
    
    return (
        <div>
            <form onSubmit={submitForm}>
                <input 
                    className='text-input'
                    autoFocus
                    value={value}
                    placeholder={`say something to the ${state.table.name} table`}
                    onChange={(e) => {
                        setValue(e.currentTarget.value);
                    }}
                />
            </form>
        </div>
    );
}

export default TableChatInput;