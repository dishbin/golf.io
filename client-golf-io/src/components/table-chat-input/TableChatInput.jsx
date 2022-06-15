import React, { useState } from 'react';
import './TableChatInput.css';

function TableChatInput({ socket, state, setState, table }) {

    const [value, setValue] = useState('');

    const submitForm = (e) => {
        e.preventDefault();
        socket.emit('table message', {value: value, table: state.table.id});
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