import React, { useState } from 'react';

function LogIn({ state, updateState }) {

    const logInStateInit = {
        username: '',
        isLoggedIn: false
    }

    const [logInState, setLogInState] = useState(logInStateInit);

    const handleChange = (e) => {
        setLogInState({...logInState, username: e.target.value});
    };

    const handleLogIn = () => {
        console.log('log in')
        updateState({...logInState, isLoggedIn: true});
    };

    return (
        <div>
            <input type='text' value={logInState.username} onChange={handleChange} />
            <button type='button' onClick={handleLogIn}>join lobby</button>
        </div>
    );
}

export default LogIn;