import React, { useState } from 'react';
import './TableChatInput.css';

function TableChatInput({ socket, state, setState, table }) {

    const [value, setValue] = useState('');

    const submitForm = (e) => {
        e.preventDefault();
        socket.emit('new message', {
            location: state.table.name,
            value: value, 
        });
        setValue('');
    };
    
    return (
        <div>
            <form onSubmit={submitForm}>
                <input 
                    className='text-input'
                    autoFocus
                    value={value}
                    placeholder={`'say to ${state.table.name}`}
                    onChange={(e) => {
                        setValue(e.currentTarget.value);
                    }}
                />
            </form>
        </div>
    );
}

export default TableChatInput;