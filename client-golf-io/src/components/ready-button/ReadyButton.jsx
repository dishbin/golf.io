import React from 'react';
import './ReadyButton.css';

function ReadyButton({ socket, state }) {

    console.log(state);

    const handleReadyClick = () => {
        console.log('click');
        socket.emit('user is ready', {
            location: state.table,
            user: state.user,
        })
    }

    return (
        <div className='ReadyButton'>
            <button type='button' onClick={() => handleReadyClick()}>ready</button>
        </div>
    );
}

export default ReadyButton;