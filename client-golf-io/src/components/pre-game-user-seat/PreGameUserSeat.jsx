import React, { useState, useEffect } from 'react';
import ReadyButton from '../ready-button/ReadyButton';

function PreGameUserSeat({ socket, state, setState, seat }) {

    const [isReady, setIsReady] = useState(false);

    const handleUserReady = (data) => {
        if (data.user.id === seat.id) {
            setIsReady(true);
        }
        setState({...state, table: data.table});
    }

    useEffect(() => {
        socket.on('user is ready', data => handleUserReady(data));
    }, [socket]);

    if (isReady) {
        return (
            <div className='UserSeat'>
                ready!
            </div>
        );
    }
    else 
    {
        return (
            <div className='UserSeat'>
                <ReadyButton socket={socket} state={state} />
            </div>
        );
    }
}

export default PreGameUserSeat;