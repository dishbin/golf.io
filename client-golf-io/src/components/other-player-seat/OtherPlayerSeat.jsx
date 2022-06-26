import React, { useEffect, useState } from 'react';
import './OtherPlayerSeat.css';

function OtherPlayerSeat({socket, state, setState, player, position}) {

    const [playing, setPlaying] = useState(false);
    const [seatedPlayer, setSeatedPlayer] = useState(null);

    // const handleUpdatePlayers = (data) => {
    //     console.log(data);
    //     console.log('position: ' + position, data.players[position]);
    //     setSeatedPlayer(data.players[position]);
    //     if(playing === false) {
    //         setPlaying(true);
    //     }
    // }

    useEffect(() => {
        // socket.on('update players', data => handleUpdatePlayers(data));
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