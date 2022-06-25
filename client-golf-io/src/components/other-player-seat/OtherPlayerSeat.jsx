import React, { useEffect, useState } from 'react';
import './OtherPlayerSeat.css';

function OtherPlayerSeat({socket, state, setState, player, position}) {

    const [seatedPlayer, setSeatedPlayer] = useState('empty');

    const handleAllPlayers = (data) => {
        console.log(data);
        setSeatedPlayer(data.players.filter(player => player[0] === position)[0][1]);
    }

    useEffect(() => {
        socket.on('all players', data => handleAllPlayers(data));
    }, [socket]);

    console.log(seatedPlayer);

    if (seatedPlayer === 'empty') {
        return (
            <div className='OtherPlayerSeat empty'>
                empty
            </div>
        );
    }
    else if (seatedPlayer !== 'empty' && seatedPlayer.playerType === 'NPC')
    {
        return (
            <div className='OtherPlayerSeat NPC'>
                NPC
            </div>
        );
    } 
    else if (seatedPlayer !== 'empty' && seatedPlayer.playerType === undefined)
    {
        return (
            <div className='OtherPlayerSeat' style={{ backgroundColor: player.textColor }}>
                {seatedPlayer.name}
            </div>
        );
    }
}

export default OtherPlayerSeat;