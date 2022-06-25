import React, { useEffect, useState } from 'react';
import OtherPlayerSeat from '../other-player-seat/OtherPlayerSeat';
import UserSeat from '../table-seat/UserSeat';
import TableStatus from '../table-status/TableStatus';
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
            D: 'center',
            C: 'right',
            left: 'B',
            center: 'D',
            right: 'C'
        },
        B: {
            D: 'left',
            C: 'center',
            A: 'right',
            left: 'D',
            center: 'C',
            right: 'A'
        },
        C: {
            A: 'left',
            B: 'center',
            D: 'right',
            left: 'A',
            center: 'B',
            right: 'D'
        },
        D: {
            C: 'left',
            A: 'center',
            B: 'right',
            left: 'C',
            center: 'A',
            right: 'B'
        }
    };

    const handleUserSeating = (data) => {
        let players = Object.entries(data.table.seats);
        handlePlayers({
            players: players,
            table: data.table
        });
    }

    const handlePlayers = (data) => {
        if (state.table.name === data.table.name) {
            let seats = seatingArrangements[state.currentSeat];
            let newPlayers = {...players};
            data.players.forEach(player => {
                let position = seats[player[0]];
                if (position === undefined) {
                    position = 'user';
                }
                newPlayers[position] = player[1];
            }); 
            setPlayers(newPlayers);
        }
    }

    useEffect(() => {

        socket.on('user seating', data => handleUserSeating(data));
        socket.on('all players', data => handlePlayers(data));
        socket.emit('get players', {
            location: state.table,
            user: state.user
        });

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
                    <div className='player-div edge-player'>
                        <OtherPlayerSeat key='left-player' socket={socket} state={state} setState={setState} player={players.left} position={seatingArrangements[state.currentSeat]['left']}/>
                    </div>
                    <div className='player-div'>
                        <OtherPlayerSeat key='center-player' socket={socket} state={state} setState={setState} player={players.center} position={seatingArrangements[state.currentSeat]['center']}/>
                    </div>
                    <div className='player-div edge-player'>
                        <OtherPlayerSeat key='right-player' socket={socket} state={state} setState={setState} player={players.right} position={seatingArrangements[state.currentSeat]['right']}/>
                    </div>
                </div>
                <TableStatus socket={socket} state={state} setState={setState} players={players}/>
            {(state.user) &&
                <UserSeat 
                    socket={socket} 
                    state={state} 
                    setState={setState} 
                    seat={state.table.seats[state.currentSeat]}
                />

            }
            <button type='button' onClick={() => handleExit()} >exit game</button>
            </div>
        </div>
    );
}

export default TableView;