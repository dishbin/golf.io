import { useState } from 'react';
import './App.css';
import Lobby from './components/Lobby';
import LogIn from './components/LogIn';

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
        <Lobby state={state} updateState={updateState} />
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
