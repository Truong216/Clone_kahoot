import React, {useState, useEffect} from 'react';
import './Chosing_answer.css';
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
function Chosing_answer(props){
    const [quiz, setQuiz] = useState(props.location.state.data[0])
    const[gamePin, setGamePin] = useState(props.location.state.data[2])
    const [answer, setAnswer] = useState(0);
    const [player, setPlayer] = useState(props.location.state.data[1]);
    const [q, setQ] = useState(0);
    const [counter, setCounter] = useState(15);
    useEffect(() => {
      setInterval(() => {
        setCounter(counter => counter - 1);
      }, 1000);
      return () => {
        clearInterval(counter);
      };
    },[]);
    useEffect(() =>{
        if(counter === 0){
            const data = [quiz, player, gamePin]
            socket.emit("Time_up", q, quiz[q].correct, gamePin)
            props.history.push({
                pathname: '/Answer_Result',
                search: `${q}`,
                state: { data: data },
            });
        }
    })
      useEffect(() => {
          console.log(props)
          const q = props.location.search
          const r = q.replace('?','');
          console.log("chu:", r)
          setQ(Number(r))
      }, [q]);
     useEffect(() => {
        socket.on("player_answer", (data, game_Pin) => {
            if(Number(game_Pin) === gamePin){
                setAnswer(answer => answer + 1);
            }
        });
      }, []);  
      useEffect(() => {
        socket.emit('join_Room', gamePin);
    }, []); 
    return(
        <div className="Container_Chosing_answer">
            <header className="blue section">{quiz[q].question}</header>
            <main className="coral section">
                <div className="Main_Header">
                    <div className="Main_Header_graph">
                        <div className="Main_Header_graph_display">
                        </div>
                        <div className="Current_answer">
                            <div>
                                <div>{answer}</div>
                                <div>Answers</div>
                            </div>
                            <div className="Time_left">
                                {counter >= 0 ? counter : 0}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="Main_Bottom">
                    <div className="Answer_Option_1">
                        <div className="Answer_Icon">
                            <GrStatusWarningSmall className="display_icon"/>
                        </div>
                        <div className="Answer_Content">
                            {quiz[q].answer_1}
                        </div>
                        <div className="Answer_XO">
                           
                        </div>
                    </div>
                    <div className="Answer_Option_2">
                        <div className="Answer_Icon">
                            <GrStatusUnknownSmall className="display_icon"/>
                        </div>
                        <div className="Answer_Content">
                        {quiz[q].answer_2}
                        </div>
                        <div className="Answer_XO">
                        
                        </div>
                    </div>
                    <div className="Answer_Option_3">
                        <div className="Answer_Icon">
                            <GrStatusGoodSmall className="display_icon"/>
                        </div>
                        <div className="Answer_Content">
                        {quiz[q].answer_3}
                        </div>
                        <div className="Answer_XO">
                            
                        </div>
                    </div>
                    <div className="Answer_Option_4">
                        <div className="Answer_Icon">
                            <GrStatusCriticalSmall className="display_icon"/>
                        </div>
                        <div className="Answer_Content">
                        {quiz[q].answer_4}
                        </div>
                        <div className="Answer_XO">
                            
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
export default withRouter(Chosing_answer)
