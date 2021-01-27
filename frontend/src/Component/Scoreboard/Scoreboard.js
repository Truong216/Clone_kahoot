import React, {useState, useEffect} from 'react';
import './Scoreboard.css';
import { withRouter } from "react-router-dom";
import io from "socket.io-client";
const ENDPOINT = "http://localhost:4000";
const socket = io(
    ENDPOINT,
    {
    transports: ['websocket']
  });
function Scoreboard(props){
    const[quiz, setQuiz] = useState(props.location.state.data[0])
    const[gamePin, setGamePin] = useState(props.location.state.data[2])
    const [player, setPlayer] = useState([{ten: "loading", diem: 0}])
    // const [date, setDate] = useState(new Date())
    const [q, setQ] = useState(0)
    const size = 3;
    useEffect(() => {
        const q = props.location.search
        const r = q.replace('?','');
        console.log("chu:", r)
        setQ(Number(r))
    }, [q]); 
    const Nextquestion = () =>{
        const data = [quiz, props.location.state.data[1], gamePin]
        const date = new Date()
        const start_time = date.getTime()
        console.log(typeof(quiz.length))
        console.log(typeof(q))
        console.log("so q", q)
        console.log("quiz", quiz.length)
        console.log(q+1 < quiz.length)
        if(q + 1 < quiz.length){
            props.history.push({
                pathname: '/Chosing_answer',
                search: `${q + 1}`,
                state: { data: data },
            });
            socket.emit("start_game", gamePin, start_time)
        }
        else{
            props.history.push({pathname: '/ChosingGame'})
            socket.emit("end_game", gamePin)
        }
    }
    useEffect(() => {
        socket.emit('sort_player', gamePin);
    }, []); 
    useEffect(() =>{
        socket.on('sort_player_result', (player, game_Pin) => {
            console.log("type of state", typeof(gamePin))
            console.log("type of truyen", typeof(game_Pin))
            if(Number(game_Pin) === gamePin){
                setPlayer(player)
                console.log("data", player)
            }
        })
    }, [player])
    return(
        <div className="Container_ClientWait">
            <header className="ScoreBoard_title"><h3>Score Board</h3></header>
            <div className="display_score_board">
                <button className="Next_Button" onClick={() => {Nextquestion()}}>
                    Next
                </button>
                <div className="display_score_center">    
                        {/* {player.map((obj, i) => {
                            return  <div  className="score" key={i} style={i === 0 ? {backgroundColor: 'white', color: 'black'} : {}}>
                                        <h1>{obj.Name}</h1>
                                        <h1>{obj.score}</h1>
                                    </div>;
                        })} */}
                        {
                            player.slice(0, size).map((obj,i) => {
                                return  <div  className="score" key={i} style={i === 0 ? {backgroundColor: 'white', color: 'black'} : {}}>
                                    <h1>{obj.Name}</h1>
                                    <h1>{obj.score}</h1>
                                </div>;
                        })}
                        {/* {
                            player.slice(0, size).map((obj,i) => {
                                return  <div  className="score" key={i} style={i === 0 ? {backgroundColor: 'white', color: 'black'} : {}}>
                                            <h1>{obj.Name}</h1>
                                            <h1>{obj.score}</h1>
                                        </div>;
                            }
                        })} */}
                </div> 
            </div>
            <div className="display_info">
                <div>
                    <h1>{q + 1}/{quiz.length}</h1>
                </div>
                <div>
                    <h1>Game Pin: {gamePin}</h1>
                </div>
            </div>
        </div>
    )
}
export default withRouter(Scoreboard)