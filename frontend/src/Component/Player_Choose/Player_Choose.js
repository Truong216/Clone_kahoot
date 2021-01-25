import React, {useState, useEffect} from 'react';
import './Player_Choose.css';
import {FaUnlock} from "react-icons/fa";
import {  withRouter } from "react-router-dom";
import { 
    GrStatusWarningSmall, 
    GrStatusUnknownSmall,
    GrStatusGoodSmall,
    GrStatusCriticalSmall 
} from "react-icons/gr";
import io from "socket.io-client";
const ENDPOINT = "http://localhost:4000";
const socket = io(
    ENDPOINT,
    {
    transports: ['websocket']
  });
function Player_Choose(props){
    const answer = (i) =>{
        console.log(props.gamePin)
        socket.emit('Choose_Answer', i, props.data, props.gamePin);
    }
    return(
        <div className="Container">
            <div className="Main">
                <div className="Pl_Answer_Option_1" onClick={() => { props.onShowClick(); answer(1);}}>
                    <div className="Pl_Answer_Icon">
                        <GrStatusWarningSmall className="Pl_display_icon"/>
                    </div>
                </div>
                <div className="Pl_Answer_Option_2" onClick={() => { props.onShowClick(); answer(2);}}>
                    <div className="Pl_Answer_Icon">
                        <GrStatusUnknownSmall className="Pl_display_icon"/>
                    </div>
                </div>
                <div className="Pl_Answer_Option_3" onClick={() => { props.onShowClick(); answer(3);}}>
                    <div className="Pl_Answer_Icon">
                        <GrStatusGoodSmall className="Pl_display_icon"/>
                    </div>
                </div>
                <div className="Pl_Answer_Option_4" onClick={() => { props.onShowClick(); answer(4);}}>
                    <div className="Pl_Answer_Icon">
                        <GrStatusCriticalSmall className="Pl_display_icon"/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default withRouter(Player_Choose)