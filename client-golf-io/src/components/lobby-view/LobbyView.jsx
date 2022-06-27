import React, { useEffect, useState } from 'react';
import TableTile from '../table-tile/TableTile';
import './LobbyView.css';

function LobbyView({ socket, state, setState }) {

    const [tables, setTables] = useState({});

    const tableListener = (data) => {
        setTables((prevTables) => {
            const newTables = {...prevTables};
            newTables[data.table.id] = data.table;
            return newTables;
        });
    };

    const deleteTableListener = (tableId) => {
        setTables((prevTables) => {
            const newTables = {...prevTables};
            delete newTables[tableId];
            return newTables;
        });
    };

    const handleSeating = (data) => {
        setTables((prevTables) => {
            const newTables = {...prevTables};
            newTables[data.table.id] = data.table;
            return newTables;
        });
    }

    const handleLeaving = (data) => {
        setTables((prevTables) => {
            const newTables = {...prevTables};
            newTables[data.table.id] = data.table;
            return newTables;
        });
    }

    const handleDisconnection = (data) => {
        if (data.table.name !== 'lobby') {
            setTables((prevTables) => {
                let newTables = {...prevTables};
                newTables[data.table.id] = data.table;
                return newTables;
            });
        }
        
    }

    useEffect(() => {

        socket.on('new table', data => tableListener(data));
        socket.on('delete table', data => deleteTableListener(data));

        socket.on('user seating', data => handleSeating(data));
        socket.on('user got up', data => handleLeaving(data));

        socket.on('user disconnected', data => handleDisconnection(data));

        socket.emit('get all tables', {
            user: state.user
        });

        return (() => {
            socket.off('new table', tableListener);
            socket.off('delete table', deleteTableListener);
            socket.off('user seating', handleSeating);
            socket.off('user disconnected', handleDisconnection);
        })
    }, [socket]);

    return (
        <div className='LobbyView'>
            {(Object.keys(tables).length > 0) &&
                Object.values(tables).map(table => {
                    return <TableTile key={table.name} socket={socket} table={table} state={state} setState={setState} />
                })
            }
        </div>
    );
}

export default LobbyView;