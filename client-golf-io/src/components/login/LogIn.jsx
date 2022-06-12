import React, { useState } from 'react';

function LogIn({ state, setState }) {

    const logInStateInit = {
        username: '',
        isLoggedIn: false
    }

    const handleChange = (e) => {
        setState({ ...state, username: e.target.value });
    };

    const handleLogIn = () => {
        setState({ ...state, isLoggedIn: true });
    };

    return (
        <div>
            <input type='text' value={state.username} onChange={handleChange} />
            <button type='button' onClick={handleLogIn}>join lobby</button>
        </div>
    );
}

export default LogIn;