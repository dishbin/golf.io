import React, { useEffect, useState } from 'react';
import OtherPlayerSeat from '../other-player-seat/OtherPlayerSeat';
import UserSeat from '../table-seat/UserSeat';
import './TableView.css';

function TableView({ socket, state, setState }) {

    const [players, setPlayers] = useState({
        left: 'empty',
        center: 'empty',
        right: 'empty'
    });

    const seatingArrangements = {
        A: {
            B: 'left',
            C: 'center',
            D: 'right'
        },
        B: {
            C: 'left',
            D: 'center',
            A: 'right'
        },
        C: {
            D: 'left',
            A: 'center',
            B: 'right'
        },
        D: {
            A: 'left',
            B: 'center',
            C: 'right'
        }
    };

    const handleUserSeating = (data) => {
        let seats = seatingArrangements[state.currentSeat];
        let position = seats[data.seat];
        let newPlayers = {...players};
        newPlayers[position] = data.table.seats[data.seat];
        setPlayers(newPlayers);
    }

    useEffect(() => {

        socket.on('user seating', data => handleUserSeating(data));

        return (() => {
            socket.off('user seating');
        });

    }, [socket]);

    const handleExit = () => {
        let tbl = state.table;
        let seat = Object.entries(tbl.seats).filter(pair => pair[1].name === state.username)[0];
        tbl.seats[seat[0]] = 'empty';
        socket.emit('player left', { table: tbl, seat: seat[0], user: seat[1]});
        setState({...state, table: {}, inGame: false});
    }

    return (
        <div className='TableView'>
            <div className='top-layer'>
                <div className='other-players-div'>
                    <div className='left-player'>
                        <OtherPlayerSeat key='left-player' player={players.left}/>
                    </div>
                    <div className='center-player'>
                        <OtherPlayerSeat key='center-player' player={players.center}/>
                    </div>
                    <div className='right-player'>
                        <OtherPlayerSeat key='right-player' player={players.right}/>
                    </div>
                </div>
            
            {(state.user) &&
                <UserSeat socket={socket} state={state} setState={setState} />

            }
            {/* <button type='button' onClick={() => handleExit()} >exit game</button> */}
            </div>
        </div>
    );
}

export default TableView;