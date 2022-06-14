import React, { useState } from 'react';
import './ChatMessage.css';

function ChatMessage({ message }) {

    const [userHover, setUserHover] = useState(false);
    const [messageHover, setMessageHover] = useState(false);

    return (
        <div className='ChatMessage' title={`Sent at ${new Date(message.time).toLocaleTimeString}`}>
            <span className={`username ${(userHover) ? 'hover' : ''}`} onMouseEnter={() => setUserHover(true)} onMouseLeave={() => setUserHover(false)}>{message.user.name}</span> : <span className={`message ${(messageHover) ? 'message-hover' : ''}`} onMouseEnter={() => setMessageHover(true)} onMouseLeave={() => setMessageHover(false)}>{message.value}</span>
        </div>
    );
}

export default ChatMessage;