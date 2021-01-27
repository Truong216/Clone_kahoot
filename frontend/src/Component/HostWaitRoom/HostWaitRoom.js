import React, {useEffect, useState} from 'react';
import './HostWaitRoom.css';
import { withRouter } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import io from "socket.io-client";
const ENDPOINT = "http://localhost:4000";
const socket = io(
    ENDPOINT,
    {
    transports: ['websocket']
  });
function HostWaitRoom(props){
    const [isLock, setIsLock] = useState(true)
    const[gamePin, setGamePin] = useState(props.location.state.data[1])
    const [listPlayer, setListPlayer] = useState([]);
    // const [date, setDate] = useDate(new Date())
    const [quiz, setQuiz] = useState([])
    const startGame = () => {
        const data = [quiz, listPlayer.length, gamePin]
        const date = new Date()
        const start_time = date.getTime()
        console.log("quiz truyen", quiz)
        props.history.push({
            pathname: '/Chosing_answer',
            search: '0',
            state: { data: data}
        });
        socket.emit("start_game", gamePin, start_time)
    } 
    const fetchQuiz = async (id) => {
        if(id !== undefined){
        const response = await fetch(
            `http://localhost:4000/quiz/sync/${id}`
        );
        const jsonData = await response.json()
        const temp = jsonData[0].quiz.question
        console.log("test", temp)
        setQuiz(jsonData[0].quiz.question)
        socket.emit("room_quiz", temp, gamePin)
        }
        else{
            console.log('sai id')
        }
    };
    useEffect(() => {
        socket.on("add_player", (game_pin, player) => {
            if(game_pin === gamePin){
                const list_player = player.filter(obj => obj.gamePin === gamePin);
                console.log(list_player)
                setListPlayer(list_player)
            }
    });
    }, [listPlayer]); 
    useEffect(() => {
            socket.emit('create_Room', gamePin);
    }, []); 
    useEffect(async () => {
        async function fetchData() {
        await  socket.on("id", (gamePin) => {
            setGamePin(gamePin);
            setIsLock(false)
        });
        }
        await fetchData();
        fetchQuiz(props.location.state.data[0]);
        console.log("props.state", props.location.state.data[0])
      }, []);
    return(
        <div className="Container_HostWaitRoom">
        <div className="display_header">
            <div className="display_header_container">
                <div className="header_style_GamePin">
                    <div>
                        <span className="header_text">Game</span>
                        <span>{isLock ? "Loading ..." : "Pin:"}</span>
                    </div>
                </div>
                <div className="header_style_GamePin_Number">
                    { isLock 
                        ? 
                        <div></div>
                        :
                        <div>
                            <span className="header_text">{~~(gamePin/10000)}</span>
                            <span>{gamePin%10000}</span>
                        </div>
                    }
                </div>
            </div>
        </div>
        <div className="display_status">
            <div className="status_number">
                <span className="header_text">
                    <FaUserAlt className="status_user"/>
                </span>
                <span className="header_number">
                    {listPlayer.length}
                </span>
            </div>
            <div className="status_option">
                {/* <button className="Login_Lock" onClick={Lock_click}>
                    <span className="Lock_icon">
                        {isLock ? <FaLock /> : <FaUnlock />}
                    </span>
                </button> */}
                <button className={listPlayer.length < 1 ? "Game_start_fails" : "Game_start"} disabled={listPlayer.length < 1} onClick={() => {startGame()}} >
                    <span className="start_status">
                        Start
                    </span>
                </button>
            </div>
        </div>
        <div className="display_section">
            <div className="display_center_Host">    
            {
                listPlayer.length > 0 
                ? 
                <ul className="WaitingMessage">
                    {listPlayer.map((obj, i) => {
                         return <li className="title_li" key={i}>{obj.Name}</li>;
                    })}
                </ul>
                :
                <div className="title_li">Waiting for player ...</div>
            }
            </div>
        </div>
        </div>
    )
}
export default withRouter(HostWaitRoom)