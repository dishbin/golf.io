import React, { useEffect, useState } from 'react';
import Decks from '../decks/Decks';
import './TableStatus.css';

function TableStatus({ socket, state, setState, players }) {

    

    const [seats, setSeats] = useState({
        left: 'empty',
        center: 'empty',
        right: 'empty',
        user: 'empty'
    });

    console.log(seats);

    const seatingArrangements = {
        A: {
            B: 'left',
            D: 'center',
            C: 'right'
        },
        B: {
            D: 'left',
            C: 'center',
            A: 'right'
        },
        C: {
            A: 'left',
            B: 'center',
            D: 'right'
        },
        D: {
            C: 'left',
            A: 'center',
            B: 'right'
        }
    };

    const handleUserReady = (data) => {
        let newSeats = {};
        let dataSeats = data.table.seats;
        Object.entries(dataSeats).forEach(seat => {
            if (seat[0] === state.currentSeat) {
                newSeats.user = seat[1];
            }
            else 
            {
                let seating = seatingArrangements[state.currentSeat];
                let position = seating[seat[0]];
                newSeats[position] = seat[1];
            } 
        });
        setSeats(newSeats);
    }

    const handleAllReadyUsers = (data) => {
        let newSeats = {};
        Object.entries(data.seats).forEach(seat => {
            if (seat[0] === state.currentSeat) {
                newSeats.user = seat[1];
            }
            else 
            {
                let seating = seatingArrangements[state.currentSeat];
                let position = seating[seat[0]];
                newSeats[position] = seat[1];
            } 
        });
        setSeats(newSeats);
    }

    const handleGameStart = (data) => {
        setState({
            ...state,
            game: data.game,
            gameIsRunning: true
        });
        handleAllReadyUsers({
            seats: data.game.players
        });
    } 

    useEffect(() => {
        socket.emit('get ready users', {
            user: state.user,
            location: state.table
        });
        socket.on('all ready users', data => handleAllReadyUsers(data));
        socket.on('user is ready', data => handleUserReady(data));

        socket.on('game start', data => handleGameStart(data));


    }, [socket]);

    if (state.game === undefined || state.gameIsRunning !== true) {
        return (
            <div className='TableStatus'>
                <div className='ready-light-div'>
                    <div className={`ready-light ${(seats.left.isReady === true && seats.left.isReady !== undefined) ? 'ready' : ''}`}></div>
                    <div className={`ready-light ${(seats.center.isReady === true && seats.center.isReady !== undefined) ? 'ready' : ''}`}></div>
                    <div className={`ready-light ${(seats.user.isReady === true && seats.user.isReady !== undefined) ? 'ready' : ''}`}></div>
                    <div className={`ready-light ${(seats.right.isReady === true && seats.right.isReady !== undefined) ? 'ready' : ''}`}></div>
                </div>
            </div>
        );
    }
    else
    {
        return (
            <div className='TableStatus'>
                <Decks socket={socket} state={state} setState={setState} />
            </div>
        );
    }
    
}

export default TableStatus;