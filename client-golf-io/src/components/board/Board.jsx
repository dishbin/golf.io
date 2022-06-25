import React, { useEffect, useState } from 'react';
import Slot from '../slot/Slot';

function Board({ socket, state, setState, board }) {
    
    const [slots, setSlots] = useState({...state.game.players[state.currentSeat].board.slots});

    useEffect(() => {
        socket.emit('get player board', {
            table: state.table,
            game: state.game,
            player: state.game.players[state.currentSeat],
            user: state.user
        });
    }, [socket]);
    
    return (
        <div className='Board'>
            {(slots) &&
                Object.entries(slots).
                    forEach(slot => 
                    <Slot 
                        socket={socket}
                        state={state}
                        setState={setState}
                        key={slot[0]}
                        slot={slot[1]}               
                    />)
            }
        </div>
    );
}

export default Board;