import React, { useEffect, useState } from 'react';
import ReadyButton from '../ready-button/ReadyButton';
import './UserSeat.css';

function UserSeat({ socket, seat, state, setState }) {

    const [isPlaying, setIsPlaying] = useState(false);

    const handleUserReady = (data) => {
        console.log(data);
        console.log(seat);
        if (data.user.id === seat.id) {
            setIsPlaying(true);
        }
        setState({...state, table: data.table});
    }

    useEffect(() => {

        socket.on('user is ready', data => handleUserReady(data));

    }, [socket]);

    console.log(seat);
    if (isPlaying) {
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

export default UserSeat;