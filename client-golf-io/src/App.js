import React, { useState, useEffect } from 'react';
import './App.css';
import Connection from './components/connection/Connection';
import LogIn from './components/login/LogIn';
import Screen from './components/screen/Screen';

function App() {

  const appStateInit = {
    isLoggedIn: false,
    username: ''
  }

  const [state, setState] = useState(appStateInit);
  
  if (state.isLoggedIn) {
    return (
      <div className="App">
        <Connection state={state} setState={setState} />
      </div>
    );
  }
  else {
    return (
      <div className="App">
        <LogIn state={state} setState={setState} />
      </div>
    );
  }
}

export default App;
