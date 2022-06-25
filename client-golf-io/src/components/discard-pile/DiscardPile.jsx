import React from 'react';
import './DiscardPile.css';

function DiscardPile({ socket, state, setState, discard, setDiscard }) {
    return (
        <div className='DiscardPile'>
            <button type='button' className='discard-button'>discard</button>
        </div>
    );
}

export default DiscardPile;