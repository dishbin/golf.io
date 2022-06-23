import React, { useEffect } from 'react';
import './TableStatus.css';

function TableStatus({ socket, state, setState }) {

    useEffect(() => {
    }, [socket]);
    return (
        <div className='TableStatus'>
            status
        </div>
    );
}

export default TableStatus;