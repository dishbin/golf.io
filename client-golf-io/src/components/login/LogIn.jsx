import React, { useState } from 'react';
import './LogIn.css';

function LogIn({ state, setState }) {

    const logInStateInit = {
        username: '',
        isLoggedIn: false
    }

    const handleChange = (e) => {
        setState({ ...state, username: e.target.value.replace(/[^\w]/g, '')});
    };

    const handleLogIn = () => {
        setState({ ...state, isLoggedIn: true });
    };

    return (
        <div className='LogIn'>
            <div className='header-div'>
                <h1>golf.io</h1>
            </div>
            <div className='info-div'>
                <p>a 2000s-chatroom-era style online game built using socket.io</p>
            </div>
            <div className='input-div'>
                <input type='text' className='name-input' value={state.username} maxLength='12' onChange={handleChange} />
                <button type='button' className='join-button' onClick={handleLogIn}>join lobby</button>
            </div>
            
        </div>
    );
}

export default LogIn;