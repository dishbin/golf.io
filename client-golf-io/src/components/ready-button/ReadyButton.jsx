import React from 'react';
import './ReadyButton.css';

function ReadyButton({ socket, state }) {

    const handleReadyClick = () => {
        socket.emit('user is ready', {
            location: state.table,
            user: state.user,
            seat: state.currentSeat
        })
    }

    return (
        <div className='ReadyButton'>
            <button type='button' onClick={() => handleReadyClick()}>ready</button>
        </div>
    );
}

export default ReadyButton;