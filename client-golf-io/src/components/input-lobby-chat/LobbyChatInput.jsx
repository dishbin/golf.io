import React, { useState } from 'react';
import './LobbyChatInput.css';

function LobbyChatInput({ socket }) {

    const [value, setValue] = useState('');
    const submitForm = (e) => {
        e.preventDefault();
        socket.emit('message', value);
        setValue('');
    };
    
    return (
        <div>
            <form onSubmit={submitForm}>
                <input 
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