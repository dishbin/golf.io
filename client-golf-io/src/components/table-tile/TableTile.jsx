import React from 'react';

function TableTile({ socket, table, state, setState }) {
    console.log('>>>>>>>>>>>>>>>>>');
    console.log(table);

    return (
        <div>
            {table.name}
            <div>
                {Object.entries(table.seats).map(seat => <p key={seat[0]}>{seat[0]} : {seat[1]}</p>)}
            </div>
        </div>
    );
}

export default TableTile;