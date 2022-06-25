import React from 'react';
import './DrawPile.css';

function DrawPile({ socket, state, setState, drawpile, setDrawpile }) {

    return (
        <div className='DrawPile'>
            <button type='button' className='deck-button'></button>
        </div>
    );
}

export default DrawPile;