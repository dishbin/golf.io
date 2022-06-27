import React, { useEffect } from 'react';
import './OtherPlayerBoard.css';
import OtherPlayerSlot from '../other-player-slot/OtherPlayerSlot';

function OtherPlayerBoard({ socket, state, setState, board, player }) {
    return (
        <div className='OtherPlayerBoard'>
            {(board.slots !== null) &&
                    Object.values(board.slots).map(slot => <OtherPlayerSlot 
                        socket={socket}
                        slot={slot}
                        key={slot.slotName}
                    />)
                }
        </div>
    );
}

export default OtherPlayerBoard;