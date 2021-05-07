import React, { useEffect, useState } from 'react';
import Home from './components/Home';
import Player from './components/Player';
import CreateRoom from './components/CreateRoom';
import JoinRoom from './components/JoinRoom';
import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { useDataLayerValue } from './global-state/DataLayer';
import { io } from "socket.io-client";
import { server } from './config';

function App() {
  const [{ socket, loggedIn }, dispatch] = useDataLayerValue();

  useEffect(() => {
    if(socket !== null) return 
    const s = io(server);

    console.log(s);

    dispatch({
      type: "SET_SOCKET",
      socket: s
    });

  }, []);

  return (
    <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/create-room" exact>
            {
              socket ?
              <CreateRoom />
              :
              <Redirect to="/" />
            }
          </Route>
          <Route path="/join-room" exact>
            {
              socket ?
              <JoinRoom />
              :
              <Redirect to="/" />
            }
          </Route>
          <Route path="/player">
            {
              loggedIn ?
              <Player />
              :
              <Redirect to="/" />
            }
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
