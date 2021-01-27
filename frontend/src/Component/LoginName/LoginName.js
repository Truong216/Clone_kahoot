import React, { useState } from 'react';
import './LoginName.css';
import io from "socket.io-client";
import { withRouter } from "react-router-dom";
const ENDPOINT = "http://localhost:4000";
const socket = io(
    ENDPOINT,
    {
    transports: ['websocket']
  });
function LoginName(props,data){
    const [Name, setName] = useState('')
    const LoginRoom = () =>{
        if(Name.length !== 0){
            socket.emit('Player_join', Name, props.location.state.data[0], props.location.state.data[1]);
            console.log(props.location.state.data[0])
            const data = [Name, props.location.state.data[1], props.location.state.data[0]] 
            props.history.push({
                pathname: '/ClientWait',
                state: { data: data }
            });
        }
        else{
            console.log("Nhap ma")
        }
    }
    return(
        <div className="Container_LoginName">
            <div className="display_center">    
                <div>
                    <h1 className="title_LoginName">Enter your Name !!!</h1>
                    <div className="form-field">
                        <input id="pin"type="text" name="pin" placeholder ="Nickname" onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div>
                    <button id="joinButton" onClick={() => LoginRoom()}>OK, go</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default withRouter(LoginName)