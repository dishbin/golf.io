import React, { useEffect, useState } from 'react';
import DrawPile from '../draw-pile/DrawPile';
import DiscardPile from '../discard-pile/DiscardPile';
import './Decks.css';

function Decks({ socket, state, setState }) {

    const [discard, setDiscard] = useState(state.game.discard);
    const [drawpile, setDrawpile] = useState(state.game.deck);

    useEffect(() => {
    }, [socket]);

    return (
        <div className='Decks'>
            <DrawPile socket={socket} state={state} setState={setState} drawpile={drawpile} setDrawpile={setDrawpile} />
            <DiscardPile socket={socket} state={state} setState={setState} discard={discard} setDiscarde={setDiscard} />
        </div>
    );
}

export default Decks;