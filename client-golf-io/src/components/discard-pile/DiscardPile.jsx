import React from 'react';
import './DiscardPile.css';
import spadeImg from './suit-imgs/spade.png';
import clubImg from './suit-imgs/clubs.png';
import heartImg from './suit-imgs/hearts.png';
import diamondImg from './suit-imgs/diamonds.png';
import jokerImg from './suit-imgs/joker.png';

function DiscardPile({ socket, state, setState, discard, setDiscard }) {

    console.log(discard);

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
        spades: spadeImg,
        clubs: clubImg,
        hearts: heartImg,
        diamonds: diamondImg,
        joker: jokerImg
    }

    if (discard.cards.length > 0) {
        return (
            <div className='DiscardPile'>
                <button type='button' className='discard-button'><span style={{ color: `${(discard.cards[0].suit === 'clubs' || discard.cards[0].suit === 'spades') ? 'black' : (discard.cards[0].suit === 'joker') ? 'purple' : 'red'}`}}>{values[discard.cards[0].value]}</span><img className='suit' src={suitImgs[discard.cards[0].suit]}></img></button>
            </div>
        );
    }
    else 
    {
        return (
            <div className='DiscardPile'>
                <button type='button' className='empty-slot'></button>
            </div>
        );
    }
    
}

export default DiscardPile;