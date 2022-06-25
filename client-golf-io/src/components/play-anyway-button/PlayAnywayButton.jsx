import React, { useState } from 'react';

function PlayAnywayButton({ socket, state }) {

    const [clicked, setClicked] = useState(false);

    const playAnyway = () => {
        socket.emit('play anyway', {
            seat: state.currentSeat,
            user: state.user,
            location: state.table,
            table: state.table
        });
        setClicked(true);
    }

    if (clicked) 
    {
        return (
            <div className='PlayAnywayButton'>
                waiting for other players...
            </div>
        ); 
    }
    else 
    {
        return (
            <div className='PlayAnywayButton'>
                <button type='button' className='play-anyway-button' onClick={() => playAnyway()}>play anyway</button>
            </div>
        ); 
    }
    
}

export default PlayAnywayButton;