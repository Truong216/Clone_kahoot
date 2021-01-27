import React from 'react'
import './App.css';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import Chosing_answer from './Component/Chosing_answer/Chosing_answer'
import Answer_Result from './Component/Answer_Result/Answer_Result'
import LoginName from './Component/LoginName/LoginName'
import LoginRoom from './Component/LoginRoom'
import Create_Game from './Component/Create_Game/Create_Game'
import Chosing_Game from './Component/Chosing_Game/Chosing_Game'
import HostWaitRoom from './Component/HostWaitRoom/HostWaitRoom'
import ClientWait from './Component/ClientWait/ClientWait'
import Scoreboard from './Component/Scoreboard/Scoreboard'
// let socket
function App() {
  return (
    <Router>
      <Route exact path ='/' component={LoginRoom} />
      <Route path='/LoginName' component={LoginName} />
      <Route path ='/ClientWait' component={ClientWait} />
      <Route path ='/Create_Game' component={Create_Game} />
      <Route path ='/Chosing_answer' component={Chosing_answer} />
      <Route path='/ChosingGame' component={Chosing_Game} />
      <Route path='/Scoreboard' component={Scoreboard} />
      <Route path='/Answer_Result' component={Answer_Result} />
      <Route path='/HostWaitRoom' component={HostWaitRoom} />
    </Router>
  );
}
export default App;