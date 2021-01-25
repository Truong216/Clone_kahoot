import React, {useState, useEffect} from 'react'
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect 
} from "react-router-dom";
import WaitRoom from './Component/WaitRoom/WaitRoom'
import Chosing_answer from './Component/Chosing_answer/Chosing_answer'
import Answer_Result from './Component/Answer_Result/Answer_Result'
import LoginName from './Component/LoginName/LoginName'
import LoginRoom from './Component/LoginRoom'
import Create_Game from './Component/Create_Game/Create_Game'
import Chosing_Game from './Component/Chosing_Game/Chosing_Game'
import Create_Question from './Component/Create_Questions/Create_Question'
import HostWaitRoom from './Component/HostWaitRoom/HostWaitRoom'
import ClientWait from './Component/ClientWait/ClientWait'
import Scoreboard from './Component/Scoreboard/Scoreboard'
import axios from './axios'
import { io } from 'socket.io-client'
// let socket
function App() {
  return (
    <Router>
      <Route exact path ='/' component={LoginRoom} />
      <Route path='/LoginName' component={LoginName} />
      <Route exact path ='/WaitRoom' component={WaitRoom} />
      <Route exact path ='/ClientWait' component={ClientWait} />
      <Route exact path ='/Create_Game' component={Create_Game} />
      <Route exact path ='/Chosing_answer' component={Chosing_answer} />
      <Route path='/ChosingGame' component={Chosing_Game} />
      <Route path='/Scoreboard' component={Scoreboard} />
      <Route path='/Answer_Result' component={Answer_Result} />
      <Route path='/HostWaitRoom' component={HostWaitRoom} />
    </Router>
  );
}
export default App;