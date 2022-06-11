import { useState, useEffect } from 'react';
import io from 'socket.io-client'; 
import './App.css';
import LogIn from './components/login/LogIn';
import Screen from './components/screen/Screen';

function App() {

  const appStateInit = {
    isLoggedIn: false,
    username: '',
    lobby: {
      userList: [],
      tableList: [],
      messageList: []
    }
  }

  const [state, setState] = useState(appStateInit);

  const updateState = (ste) => {
    const newStateKeys = Object.keys(ste);
    let newState = {...state};
    newStateKeys.forEach(key => {
      newState[key] = ste[key];
    });
    setState(newState);
  }

  
  if (state.isLoggedIn) {
    return (
      <div className="App">
       <Screen />
      </div>
    );
  }
  else {
    return (
      <div className="App">
        <LogIn state={state} updateState={updateState} />
      </div>
    );
  }
}

export default App;
