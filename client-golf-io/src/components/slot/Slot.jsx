import React from 'react';
import './Slot.css';

function Slot({ socket, state, setState, slot, slotName }) {
    
    let values = {
        'ace': 'A',
        'two': '2',
        'three': '3',
        'four': '4',
        'five': '5',
        'six': '6',
        'seven': '7',
        'eight': '8',
        'nine': '9',
        'ten': '10',
        'jack': 'J',
        'queen': 'Q',
        'king': 'K',
        'joker': ''
    }


    return (
        <div className='Slot'>
            <span style={{ color: `${(slot.card.suit === 'clubs' || slot.card.suit === 'spades') ? 'black' : (slot.card.suit === 'joker') ? 'purple' : 'red'}`}}>{values[slot.card.value]}<div className={`${slot.card.suit} suit`}></div></span>
        </div>
    );
}

export default Slot;