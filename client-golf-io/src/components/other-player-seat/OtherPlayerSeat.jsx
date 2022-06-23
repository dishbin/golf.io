import React from 'react';

function OtherPlayerSeat({socket, state, setState, player}) {
    return (
        <div className='OtherPlayerSeat'>
            {player.name}
            {(player.isReady === true) &&
                <p>ready</p>
            }
        </div>
    );
}

export default OtherPlayerSeat;