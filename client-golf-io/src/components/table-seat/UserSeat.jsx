import React, { useEffect, useState } from 'react';
import Board from '../board/Board';
import PreGameUserSeat from '../pre-game-user-seat/PreGameUserSeat';
import './UserSeat.css';

function UserSeat({ socket, seat, state, setState }) {

    const [isPlaying, setIsPlaying] = useState(false);

    const handleGameStart = (data) => {
        console.log(data);
        setState({
            ...state,
            game: data.game,
            gameIsRunning: true,
            player: data.game.players[state.currentSeat],
            board: data.game.players[state.currentSeat].board
        });
    }

    useEffect(() => {

        socket.on('game start', data => handleGameStart(data));

    }, [socket]);
    
    if (state.gameIsRunning === true) {
        return (
            <div className='UserSeat'>
                <Board socket={socket} state={state} setState={setState} board={state.board} />
            </div>
        );
    }
    else 
    {
        return (
            <div className='UserSeat'>
                <PreGameUserSeat socket={socket} state={state} setState={setState} seat={seat} />
            </div>
        );
    }
    
}

export default UserSeat;