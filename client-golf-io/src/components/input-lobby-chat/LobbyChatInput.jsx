import React, { useState } from 'react';
import './LobbyChatInput.css';

function LobbyChatInput({ socket, state, setState }) {

    const [value, setValue] = useState('');

    const submitForm = (e) => {
        e.preventDefault();
        socket.emit('new message', {
            user: state.user,
            location: 'lobby',
            value: value
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
                    placeholder='say to lobby'
                    onChange={(e) => {
                        setValue(e.currentTarget.value);
                    }}
                />
            </form>
        </div>
    );
}

export default LobbyChatInput;