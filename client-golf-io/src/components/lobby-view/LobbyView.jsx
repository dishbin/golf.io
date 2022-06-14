import React, { useEffect, useState } from 'react';
import TableTile from '../table-tile/TableTile';
import './LobbyView.css';

function LobbyView({ socket, state, setState }) {

    const [tables, setTables] = useState({});

    const tableListener = (table) => {
        setTables((prevTables) => {
            const newTables = {...prevTables};
            newTables[table.id] = table;
            return newTables;
        })
    };

    const deleteTableListener = (tableId) => {
        setTables((prevTables) => {
            const newTables = {...prevTables};
            delete newTables[tableId];
            return newTables;
        })
    };

    useEffect(() => {

        socket.on('table', table => tableListener(table));
        socket.on('delete table', deleteTableListener);
        socket.emit('getTables');

        return (() => {
            socket.off('table', tableListener);
            socket.off('delete table', deleteTableListener);
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