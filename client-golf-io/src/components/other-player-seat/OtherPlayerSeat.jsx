import React from 'react';
import './OtherPlayerSeat.css';

function OtherPlayerSeat({socket, state, setState, player}) {

    console.log(player);

    if (player === 'empty') {
        return (
            <div className='OtherPlayerSeat empty'>
                empty
            </div>
        );
    }
    else if (player.name.substring(0,4) === 'NPC-')
    {
        return (
            <div className='OtherPlayerSeat NPC'>
                NPC
            </div>
        );
    } 
    else
    {
        return (
            <div className='OtherPlayerSeat' style={{ backgroundColor: player.textColor }}>
                {player.name}
            </div>
        );
    }
}

export default OtherPlayerSeat;