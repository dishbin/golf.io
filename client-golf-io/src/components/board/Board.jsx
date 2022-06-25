import React, { useEffect, useState } from 'react';
import Slot from '../slot/Slot';
import './Board.css';

function Board({ socket, state, setState, board }) {
    
    const [slots, setSlots] = useState(null);

    const handlePlayerBoard = (data) => {
        console.log('player board');
        console.log(data);
        console.log(state);
        if (data.table.name === state.table.name && data.location === state.user.socketId) {
            console.log('setting data >>>>>>>>>');
            setSlots({...data.board.slots});
        }
    }

    useEffect(() => {
        socket.on('player board', data => handlePlayerBoard(data));
        socket.emit('get player board', {
            table: state.table,
            game: state.game,
            seat: state.currentSeat,
            player: state.game.players[state.currentSeat],
            user: state.user
        });
        return (() => {
            socket.off('player board', handlePlayerBoard);
        });
    }, [socket]);
    
    return (
        <div className='Board'>
            {(slots !== null) &&
                Object.values(slots).map(slot => <Slot 
                    socket={socket}
                    state={state}
                    setState={setState}
                    slot={slot}
                    slotName={slot.slotName}
                    key={slot.slotName}
                />)
            }
        </div>
    );
}

export default Board;