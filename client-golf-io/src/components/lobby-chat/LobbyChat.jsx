import React, { useEffect, useState } from 'react';
import ChatMessage from '../chat-message/ChatMessage';
import './LobbyChat.css';

function LobbyChat({ socket, state, setState }) {

    const [messages, setMessages] = useState({});

    const messageListener = (data) => {
        if (data.location === 'lobby') {
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
        })
    };

    useEffect(() => {

        socket.on('new message', data => messageListener(data));

        socket.on('delete message', data => deleteMessageListener(data));
        socket.emit('get all messages', {
            user: state.user,
            location: 'lobby'
        });
        
        return () => {
            socket.off('new message', messageListener);
            socket.off('delete message', deleteMessageListener);
        };
    }, [socket]);

    return (
        <div className='LobbyChat'>
            {(messages) &&
                [...Object.values(messages)]
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

export default LobbyChat;