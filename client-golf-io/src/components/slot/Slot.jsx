import React from 'react';
import './Slot.css';
import spadeImg from './suit-imgs/spade.png';

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

    let suitImgs = {
        spade: spadeImg
    }


    if (slot.isFaceUp) {
        return (
            <div className='Slot'>
                <span style={{ color: `${(slot.card.suit === 'clubs' || slot.card.suit === 'spades') ? 'black' : (slot.card.suit === 'joker') ? 'purple' : 'red'}`}}>{values[slot.card.value]}<img className='suit' src={suitImgs[slot.card.suit]}></img></span>
            </div>
        );
    }
    else 
    {
        return (
            <div className='Slot face-down'>

            </div>
        ); 
    }
    
}

export default Slot;