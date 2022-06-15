import React, { useEffect, useState } from 'react';
import ChatMessage from '../chat-message/ChatMessage';
import './TableChat.css';

function TableChat({ socket }) {

    const [messages, setMessages] = useState({});

    const messageListener = (message) => {
        setMessages((prevMessages) => {
            const newMessages = {...prevMessages};
            newMessages[message.id] = message;
            return newMessages;
        })
    };

    const deleteMessageListener = (messageId) => {
        setMessages((prevMessages) => {
            const newMessages = {...prevMessages};
            delete newMessages[messageId];
            return newMessages;
        })
    };

    useEffect(() => {

        socket.on('table message', messageListener);
        socket.on('deleteMessage', deleteMessageListener);
        socket.emit('get table messages');
        
        return () => {
            socket.off('table message', messageListener);
            socket.off('deleteMessage', deleteMessageListener);
        };
    }, [socket]);

    return (
        <div className='TableChat'>
            {[...Object.values(messages)]
                .sort((a,b) => a.time - b.time)
                .map((message) => {
                    return (
                        <ChatMessage key={message.id} message={message} />
                    )
                })
                
            }
        </div>
    );
}

export default TableChat;