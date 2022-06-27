import React, { useEffect, useState } from 'react';
import OtherPlayerBoard from '../other-player-board/OtherPlayerBoard';
import './OtherPlayerSeat.css';

function OtherPlayerSeat({socket, state, setState, player, position}) {

    const [playing, setPlaying] = useState(false);
    const [seatedPlayer, setSeatedPlayer] = useState(null);

    const [isThisPlayersTurn, setIsThisPlayersTurn] = useState(false);

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

    const handlePlayerTurn = (data) => {
        if (data.player.currentTurn === position) {
            setIsThisPlayersTurn(true);
        } else {
            setIsThisPlayersTurn(false);
        }
    }

    useEffect(() => {
        socket.on('player turn', data => handlePlayerTurn(data));
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
                <div className={`OtherPlayerSeat NPC ${(isThisPlayersTurn) ? 'is-this-players-turn' : ''}`}>
                    <p className='player-name'>NPC</p>
                    {(player.board) &&
                        <OtherPlayerBoard board={player.board} player={player} />
                    }
                </div>
            );
        } 
        else if (player.playerType === 'player' || player.playerType === undefined)
        {
            return (
                <div className={`OtherPlayerSeat ${(isThisPlayersTurn) ? 'is-this-players-turn' : ''}`} style={{ backgroundColor: player.textColor }}>
                    <p className='player-name'>{player.name}</p>
                    {(player.board) &&
                        <OtherPlayerBoard board={player.board} player={player} />
                    }
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