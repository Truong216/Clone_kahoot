import React, {useState, useEffect} from 'react';
import './Answer_Result.css';
import {FaCheck, FaTimes} from "react-icons/fa";
import { 
    GrStatusWarningSmall, 
    GrStatusUnknownSmall,
    GrStatusGoodSmall,
    GrStatusCriticalSmall 
} from "react-icons/gr";
import {  withRouter } from "react-router-dom";
import { Socket } from 'socket.io-client';
import io from "socket.io-client";
const ENDPOINT = "http://localhost:4000";
const socket = io(
    ENDPOINT,
    {
    transports: ['websocket']
  });
function Answer_Result(props){
    const[quiz, setQuiz] = useState(props.location.state.data[0])
    const [player, setPlayer] = useState(props.location.state.data[1])
    const[gamePin, setGamePin] = useState(props.location.state.data[2])
    const [q, setQ] = useState(0)
    const [answer, setAnswer] = useState([0, 0, 0, 0])
    useEffect(() => {
        const q = props.location.search
        const r = q.replace('?','');
        console.log("chu:", r)
        setQ(Number(r))
    }, [q]);
    useEffect(() => {
        socket.on("answer_summary", (data, game_Pin) => {
            if(Number(game_Pin) === gamePin){
                setAnswer(data)
                console.log("data", data)
                console.log("answer", answer)
            }
        });
        return () => {
            setAnswer([0, 0, 0, 0]); 
          };
    }, []); 
    const Nextquestion = () =>{
        const data = [quiz, props.location.state.data[1], gamePin]
        props.history.push({
            pathname: '/Scoreboard',
            search: `${q}`,
            state: { data: data },
        });
    }
    useEffect(() => {
        socket.emit('join_Room', gamePin);
    }, []); 
    useEffect(() =>{
        socket.emit('get_data', gamePin)
    }, [])
    return(
        <div className="Container_Answer_Result">
            <header className="blue section">{quiz[q].question}</header>
            <main className="coral section">
                <div className="Main_Header">
                    <div className="Main_Header_graph">
                        <div className="Main_Header_graph_display">
                            <div className="Main_Header_graph_result">
                                <div>
                                   <div className="graph_number_1">{answer[0]}</div>
                        <div className="Graph_show_1" style={{height: `${answer[0] > 0 ? (answer[0]/player) * 80 : 5}%`}}></div>
                                </div>
                                <div>
                                    <div className="graph_number_2">{answer[1]}</div>
                        <div className="Graph_show_2" style={{height: `${answer[1] > 0 ? (answer[1]/player) * 80 : 5}%`}}></div>
                                </div>
                                <div>
                                     <div className="graph_number_3">{answer[2]}</div>
                        <div className="Graph_show_3" style={{height: `${answer[2] > 0 ? (answer[2]/player) * 80 : 5}%`}}></div>
                                </div>
                                <div>
                                    <div className="graph_number_4">{answer[3]}</div>
                        <div className="Graph_show_4" style={{height: `${answer[3] > 0 ? (answer[3]/player) * 80 : 5}%`}}></div>
                                </div>
                            </div>
                            <div className="Main_Header_graph_icon">
                                <div className="tam_1">
                                <GrStatusWarningSmall className="display_icon"/>
                                </div>
                                <div className="tam_2">
                                <GrStatusUnknownSmall className="display_icon"/>
                                </div>
                                <div className="tam_3">
                                <GrStatusGoodSmall className="display_icon"/> 
                                </div>
                                <div className="tam_4">
                                <GrStatusCriticalSmall className="display_icon"/>
                                </div>
                            </div>
                        </div>
                        <button className="Next_Button" onClick={() => {Nextquestion()}}>
                            Next
                        </button>
                    </div>
                    <div className="Main_Header_endgame">
                        <div className="End_Game"onClick={() => Socket.emit("in danh sach")}>End Game</div>
                    </div>
                </div>
                <div className="Main_Bottom">
                    <div className="Answer_Option_1" style={ Number(quiz[q].correct) === 1  ? {opacity:1} : {opacity:0.25}}>
                        <div className="Answer_Icon">
                            <GrStatusWarningSmall className="display_icon"/>
                        </div>
                        <div className="Answer_Content">
                            {quiz[q].answer_1}
                        </div>
                        <div className="Answer_XO">
                        {Number(quiz[q].correct) === 1 ? <FaCheck className="display_chose_result"/> : <FaTimes className="display_chose_result"/>}    
                        </div>
                    </div>
                    <div className="Answer_Option_2" style={ Number(quiz[q].correct) ===2  ? {opacity:1} : {opacity:0.25}}>
                        <div className="Answer_Icon">
                            <GrStatusUnknownSmall className="display_icon"/>
                        </div>
                        <div className="Answer_Content">
                            {quiz[q].answer_2}
                        </div>
                        <div className="Answer_XO">
                        {Number(quiz[q].correct) === 2 ? <FaCheck className="display_chose_result"/> : <FaTimes className="display_chose_result"/>} 
                        </div>
                    </div>
                    <div className="Answer_Option_3" style={ Number(quiz[q].correct) === 3  ? {opacity:1} : {opacity:0.25}}>
                        <div className="Answer_Icon">
                            <GrStatusGoodSmall className="display_icon"/>
                        </div>
                        <div className="Answer_Content">
                            {quiz[q].answer_3}
                        </div>
                        <div className="Answer_XO">
                        {Number(quiz[q].correct) === 3 ? <FaCheck className="display_chose_result"/> : <FaTimes className="display_chose_result"/>} 
                        </div>
                    </div>
                    <div className="Answer_Option_4" style={ Number(quiz[q].correct) === 4  ? {opacity:1} : {opacity:0.25}}>
                        <div className="Answer_Icon">
                            <GrStatusCriticalSmall className="display_icon"/>
                        </div>
                        <div className="Answer_Content">
                            {quiz[q].answer_4}
                        </div>
                        <div className="Answer_XO">
                        {Number(quiz[q].correct) === 4 ? <FaCheck className="display_chose_result"/> : <FaTimes className="display_chose_result"/>} 
                        </div>
                    </div>
                </div>
            </main>
            <footer className="purple section">
                <div className="Current_Question">{q + 1}/{quiz.length}</div>
                <div className="Current_Question">Game Pin: {gamePin}</div>
            </footer>
        </div>
    )
}
export default withRouter(Answer_Result)
