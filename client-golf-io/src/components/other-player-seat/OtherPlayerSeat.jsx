import React from 'react';

function OtherPlayerSeat({socket, state, setState, player}) {
    console.log(player);
    return (
        <div className='OtherPlayerSeat'>
            {player.name}
        </div>
    );
}

export default OtherPlayerSeat;