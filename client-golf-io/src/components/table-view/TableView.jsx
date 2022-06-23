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
                        <OtherPlayerSeat key='left-player' player={players.left}/>
                    </div>
                    <div className='player-div center-div'>
                        <OtherPlayerSeat key='center-player' player={players.center}/>
                    </div>
                    <div className='player-div edge-player'>
                        <OtherPlayerSeat key='right-player' player={players.right}/>
                    </div>
                </div>
                <TableStatus socket={socket} state={state} setState={setState} />
            {(state.user) &&
                <UserSeat 
                    socket={socket} 
                    state={state} 
                    setState={setState} 
                    seat={state.table.seats[state.currentSeat]}
                />

            }
            {/* <button type='button' onClick={() => handleExit()} >exit game</button> */}
            </div>
        </div>
    );
}

export default TableView;