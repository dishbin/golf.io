import React from 'react';
import './Slot.css';
import spadeImg from './suit-imgs/spade.png';
import clubImg from './suit-imgs/clubs.png';
import heartImg from './suit-imgs/hearts.png';
import diamondImg from './suit-imgs/diamonds.png';
import jokerImg from './suit-imgs/joker.png';

function Slot({ socket, state, setState, slot, slotName, isMyTurn, setIsMyTurn, turnPhase, setTurnPhase }) {
    
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

    const handleSlotChoice = (e) => {
        if (isMyTurn) {
            console.log('emitting slot choice!');
            socket.emit('slot choice', {
                slot: slot,
                user: state.user,
                player: state.player,
                location: state.table,
                table: state.table,
                seat: state.currentSeat,
                choiceType: 'board flip'
            });
            if (turnPhase === 'initial choice') {
                setTurnPhase('none');
                setIsMyTurn(false);
            }

        }
    }

    if (slot.isFaceUp) {
        return (
            <div className='Slot'>
                <span style={{ color: `${(slot.card.suit === 'clubs' || slot.card.suit === 'spades') ? 'black' : (slot.card.suit === 'joker') ? 'purple' : 'red'}`}}>{values[slot.card.value]}</span><img className='suit' src={suitImgs[slot.card.suit]}></img>
            </div>
        );
    }
    else 
    {
        return (
            <div className='Slot face-down' onClick={() => handleSlotChoice()}>
                <div className='face-down-border'>
                    <div className='face-down-back'></div>
                </div>
            </div>
        ); 
    }
    
}

export default Slot;