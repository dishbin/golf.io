import React, { useEffect, useState } from 'react';
import InitialChoice from '../initial-choice/InitialChoice';
import Slot from '../slot/Slot';
import './Board.css';

function Board({ socket, state, setState, board }) {
    
    const [slots, setSlots] = useState(null);

    const [isMyTurn, setIsMyTurn] = useState(false);

    const [turnPhase, setTurnPhase] = useState('none');

    const [showAlert, setShowAlert] = useState(false);

    const handlePlayerBoard = (data) => {
        if (data.table.name === state.table.name && data.location === state.user.socketId) {
            setSlots({...data.board.slots});
        }
    }

    const handleTurn = (data) => {
        setTurnPhase('initial choice');
        setIsMyTurn(true);
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 2000);
    }

    useEffect(() => {
        socket.on('player board', data => handlePlayerBoard(data));
        socket.on('your turn', data => handleTurn(data));
        socket.emit('get player board', {
            table: state.table,
            game: state.game,
            seat: state.currentSeat,
            player: state.game.players[state.currentSeat],
            user: state.user
        });
        if (isMyTurn) {
        }
        return (() => {
            socket.off('player board', handlePlayerBoard);
        });
    }, [socket]);
    
    return (
        <div className={`mat-div ${(isMyTurn) ? 'is-my-turn' : ''}`}>
            {/* {(isMyTurn && showAlert && turnPhase === 'initial choice') && 
                <div className='alert'>
                    <InitialChoice socket={socket} state={state} setState={setState} />
                </div>
            } */}
            <div className='Board'>
                {(slots !== null) &&
                    Object.values(slots).map(slot => <Slot 
                        socket={socket}
                        state={state}
                        setState={setState}
                        slot={slot}
                        slotName={slot.slotName}
                        key={slot.slotName}
                        isMyTurn={isMyTurn}
                        setIsMyTurn={setIsMyTurn}
                        turnPhase={turnPhase}
                        setTurnPhase={setTurnPhase}
                    />)
                }
            </div>
        </div>
    );
}

export default Board;