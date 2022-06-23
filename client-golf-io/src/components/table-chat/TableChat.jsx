import React, { useEffect, useState } from 'react';
import ChatMessage from '../chat-message/ChatMessage';
import './TableChat.css';

function TableChat({ socket, state, setState }) {

    const [messages, setMessages] = useState({});

    const messageListener = (data) => {
        if (data.location === state.table.name) {
            setMessages((prevMessages) => {
                const newMessages = {...prevMessages};
                newMessages[data.message.id] = data.message;
                return newMessages;
            });
        }
    };

    const deleteMessageListener = (data) => {
        setMessages((prevMessages) => {
            const newMessages = {...prevMessages};
            delete newMessages[data.message.id];
            return newMessages;
        });
    };

    useEffect(() => {
        socket.emit('get all messages', {
            location: state.table.name,
            user: state.user, 
            table: state.table
        });
        socket.on('new message', data => messageListener(data));
        socket.on('delete message', data => deleteMessageListener(data));
        
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