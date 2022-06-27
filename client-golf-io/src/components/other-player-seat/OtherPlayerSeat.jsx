import React, { useEffect, useState } from 'react';
import './OtherPlayerSeat.css';

function OtherPlayerSeat({socket, state, setState, player, position}) {

    const [playing, setPlaying] = useState(false);
    const [seatedPlayer, setSeatedPlayer] = useState(null);

    // const handlePlayerBoard = (data) => {
    //     if (data.table.name === state.table.name && data.player.id === seatedPlayer.id) {
    //         setSeatedPlayer(data.player);
    //     }
    // }

    const handlePlayerFlippingCard = (data) => {
        if (data.playerSeat === position) {
            setSeatedPlayer(data.player);
        }
    }

    useEffect(() => {
        socket.on('player flipped card', data => handlePlayerFlippingCard(data));
        // socket.on('player board', data => handlePlayerBoard(data));
    }, [socket]);

        if (player === 'empty') {
            return (
                <div className='OtherPlayerSeat empty'>
                    empty
                </div>
            );
        } 
        else if (player.playerType === 'NPC')
        {
            return (
                <div className='OtherPlayerSeat NPC'>
                    NPC
                </div>
            );
        } 
        else if (player.playerType === 'player' || player.playerType === undefined)
        {
            return (
                <div className='OtherPlayerSeat' style={{ backgroundColor: player.textColor }}>
                    {player.name}
                </div>
            );
        } else {
            return (
                <div>
                    wut
                </div>
            )
        }
    
}

export default OtherPlayerSeat;