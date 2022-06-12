import React, { useEffect, useState } from 'react';

function LobbyChat({ socket }) {

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
        // const messageListener = (message) => {
        //     setMessages((prevMessages) => {
        //         const newMessages = {...prevMessages};
        //         newMessages[message.id] = message;
        //         return newMessages;
        //     })
        // };

        // const deleteMessageListener = (messageId) => {
        //     setMessages((prevMessages) => {
        //         const newMessages = {...prevMessages};
        //         delete newMessages[messageId];
        //         return newMessages;
        //     })
        // };

        socket.on('message', messageListener);
        socket.on('deleteMessage', deleteMessageListener);
        socket.emit('getMessages');

        return () => {
            socket.off('message', messageListener);
            socket.off('deleteMessage', deleteMessageListener);
        };
    }, [socket]);

    return (
        <div className='lobby-chat'>
            {[...Object.values(messages)]
                .sort((a,b) => a.time - b.time)
                .map((message) => {
                    return (
                    <div 
                        key={message.id}
                        title={`Sent at ${new Date(message.time).toLocaleTimeString}`}

                    >
                        <p>{message.value}</p>
                    </div>
                    )
                })
                
            }
        </div>
    );
}

export default LobbyChat;