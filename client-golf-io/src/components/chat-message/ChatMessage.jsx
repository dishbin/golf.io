import React, { useState } from 'react';
import './ChatMessage.css';

function ChatMessage({ message }) {

    console.log(message);

    const [userHover, setUserHover] = useState(false);
    const [messageHover, setMessageHover] = useState(false);


    if (message.user !== 'server') {
        return (
            <div className='ChatMessage' title={`Sent at ${new Date(message.time).toLocaleTimeString}`}>
                <span 
                    className={`username ${(userHover) ? 'hover' : ''}`} 
                    onMouseEnter={() => setUserHover(true)} 
                    onMouseLeave={() => setUserHover(false)} 
                    style={(message.user) ? { color: message.user.textColor} : {color: 'white'}}
                >
                    {(message.user) ? message.user.name : 'anon'}
                </span><span 
                    className='message'
                >
                     {`: ${message.value}`}
                </span>
            </div>
        );
    }
    else 
    {   
        return (
            <div className='ChatMessage' title={`Sent at ${new Date(message.time).toLocaleTimeString}`}>
                <span 
                    className='message' 
                    onMouseEnter={() => setMessageHover(true)} 
                    onMouseLeave={() => setMessageHover(false)}
                >
                    {message.value}
                </span>
            </div>
        );
    }
    
}

export default ChatMessage;