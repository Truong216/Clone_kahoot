import React, {useState, useEffect} from 'react'
import './LoginRoom.css';
import io from "socket.io-client";
import { withRouter } from "react-router-dom";
const ENDPOINT = "http://localhost:4000";
const socket = io(
    ENDPOINT,
    {
    transports: ['websocket']
  });
function Join_Game(props){
    const [gamePin, setGamePin] = useState();
    const [socket_id, setSocket_id] = useState('')
    const LoginRoom = () =>{
        socket.emit('check_GamePin', gamePin, function(Game_Pin_exist){
            if(Game_Pin_exist){
            const data = [gamePin, socket_id]  
              props.history.push({
                pathname: '/LoginName',
                state: { data: data }
            });
              console.log('GamePin chính xác')
            }
            else{
              alert("Game Pin không chính xác")
            }
        });
        console.log(gamePin)
    }
    useEffect(() => {
      socket.on('connect', () => {
        console.log(socket.id); 
        setSocket_id(socket.id);
     });
    }, [])
    useEffect(() => {
      socket.on("ok", () => {
          console.log("ok")
  });
  }, []); 
    return(
        <div className="Container_LoginRoom">
            <div className="display_center">    
                <div>
                    <h1 className="Login_title">Join a Game !!!</h1>
                    <div className="form-field">
                    <input id="pin" type="number" name="pin" placeholder ="Game Pin" onChange={(e) => setGamePin(e.target.value)}/>
                    </div>
                    <div>
                    <button id="joinButton" onClick={() => LoginRoom()}>ENTER</button>
                    </div>
                    <div className="Create_Game" onClick={() => props.history.push({pathname: '/ChosingGame'})}>
                      <h3>
                        Or create your game !!!
                      </h3>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default withRouter(Join_Game)