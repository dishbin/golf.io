import React from 'react';

function OtherPlayerSeat({socket, state, setState, player}) {

    if (player === 'empty') {
        return (
            <div className='OtherPlayerSeat'>
                empty seat
            </div>
        );
    }
    else
    {
        return (
            <div className='OtherPlayerSeat'>
                {player.name}
                {(player.isReady === true) &&
                    <p>ready</p>
                }
            </div>
        );
    }
}

export default OtherPlayerSeat;