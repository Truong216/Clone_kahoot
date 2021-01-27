import React, {useState, useEffect} from 'react';
import './ClientWait.css';
import { withRouter } from "react-router-dom";
import Player_Choose from '../Player_Choose/Player_Choose'
import io from "socket.io-client";
const ENDPOINT = "http://localhost:4000";
const socket = io(
    ENDPOINT,
    {
    transports: ['websocket']
  });
function ClientWait(props){
    const [status, setStatus] = useState(0)
    const [current, setCurrent] = useState(0)
    const [date, setDate] = useState(new Date())
    const[gamePin, setGamePin] = useState(props.location.state.data[2])
    const [socket_id, setSocket_id] = useState(props.location.state.data[1])
    const [score, setScore] = useState(0)
    const [point, setPoint] = useState(0)
    const [position, setPosition] = useState(0)
    const [timeUp, setTimeUp] = useState(false)
    const [correct, setCorrect] = useState(false)
    const[display, setDisplay] = useState(false)
    const handleClick = () => {
        setStatus(-1)
    }
    useEffect(() => {
        socket.on("answer_result", (q) => {
            setCurrent(q)
        });
    }, []); 
        // Time : {date.toLocaleTimeString()}
    useEffect(() => {
        socket.emit("send_id", props.location.state.data[1])
        console.log("gamepin", props.location.state.data[2])
        console.log("socket id", props.location.state.data[1])
    }, []); 
    useEffect(() => {
        socket.on("get_score", (score, point) => {
            setScore(score);
            setPoint(point);
            setTimeUp(true);
            setCorrect(point > 0)
            console.log("score", score)
            console.log("point", point)
        });
    }, [score, point]);
    useEffect(() => {
        const pin = Number(gamePin)
        socket.emit('join_Room', pin);
        console.log("joining")
        console.log("ma room", gamePin)
    }, []);  
    useEffect(() => {
        socket.on('dc_chua' , () =>{
            console.log("join thanh cong")
        });
    }, []);  
    useEffect(() => {
        socket.on('player_position' , (index) =>{
            setPosition(index)
            setDisplay(true)
        });
    }, [position]); 
    useEffect(() => {
        socket.on('startGame', (game_Pin) => {
            if(Number(gamePin) === game_Pin){
                console.log("bat dau tra loi")
                setStatus(1)
                setStatus(1)
                setCorrect(false)
                setTimeUp(false)
                setDisplay(false)
            }
        });
    }, []);  
    useEffect(() => {
        socket.on('new_room', (game_Pin) => {
            console.log("new")
            console.log("gamePin", gamePin)
            console.log("game_Pin", game_Pin)
            if(Number(gamePin) === game_Pin){
                props.history.push({
                    pathname: '/',
                });
            }
        });
    }, []);
    return(
        <div className="Container_ClientWait">
            <div className="display_score">
                {
                    status === 0 
                    ? 
                        <div className="display_center">    
                            <div>
                                <h1 className="title">You're in !</h1>
                                <h3 className="title_footer">See your nickname on screen ?</h3>
                            </div>
                        </div> 
                    :
                    (
                        status  > 0 
                        ? 
                            <Player_Choose onShowClick={()=>{handleClick()}} data ={socket_id} gamePin = {gamePin}/> 
                        :
                        (
                            timeUp 
                            ?    
                            (
                                correct
                                ?
                                    <div className="display_center" style={{width: '50%'}}>    
                                        <div style={{width: '50%'}}>
                                            <h1 className="title">Chính xác !!! + {point} điểm</h1>
                                            {
                                                display 
                                                ? 
                                                <h3 className="title_footer">Bạn xếp thứ {position + 1}</h3> 
                                                :
                                                <h3></h3>
                                            }
                                        </div>
                                    </div> 
                                :
                                    <div className="display_center">    
                                        <div>
                                            <h1 className="title">Sai</h1>
                                            {
                                                display 
                                                ? 
                                                <h3 className="title_footer">Bạn xếp thứ {position + 1}</h3> 
                                                :
                                                <h3></h3>
                                            }
                                        </div>
                                    </div> 
                            )
                            :
                                <div className="display_center">    
                                    <div>
                                        <h1 className="title">Đợi một chút !!!</h1>
                                    </div>
                                </div> 
                        )
                    )
                        
                }
            </div>
            <div className="display_info">
                <div>
                    <h1>{props.location.state.data[0]}</h1>
                </div>
                <div style={{backgroundColor: "#1d1d1d", color: "#ffffff", padding: "5px 15px"}}>
                    <h1>{score}</h1>
                </div>
            </div>
        </div>
    )
}
export default withRouter(ClientWait)