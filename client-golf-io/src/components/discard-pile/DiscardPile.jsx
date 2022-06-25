import React from 'react';
import './DiscardPile.css';

function DiscardPile({ socket, state, setState, discard, setDiscard }) {

    if (discard.length > 0) {
        return (
            <div className='DiscardPile'>
                <button type='button' className='discard-button'></button>
                <p>discard</p>
            </div>
        );
    }
    else 
    {
        return (
            <div className='DiscardPile'>
                <button type='button' className='empty-slot'></button>
                <p>discard</p>
            </div>
        );
    }
    
}

export default DiscardPile;