import React, {useState, useEffect} from 'react'
import './Chosing_Game.css'
import io from "socket.io-client";
import {  withRouter } from "react-router-dom";
const ENDPOINT = "http://localhost:4000";
const socket = io(
    ENDPOINT,
    {
    transports: ['websocket']
  });
function Chosing_Game(props) {
    const [listQuiz, setListQuiz] = useState([]);
    const fetchQuiz = async () => {
        const response = await fetch(
            'http://localhost:4000/quiz/sync'
          );
        const jsonData = await response.json()
        console.log("list quiz", jsonData)
        setListQuiz(jsonData)
      };
    const startGame = (data) =>{
      socket.emit('check_Id', data, function(message){
        if(message){
          socket.emit('Host_Join', data)
          console.log("data truyen host_join", data)
        }
        else{
          console.log("xin chon cau khac")
        }
    });
    }
    useEffect(() => {
      socket.on("ok", (gamePin, id_quiz) => {
          const Pin = [id_quiz, gamePin]
          console.log("id_quiz", id_quiz)
          props.history.push({
            pathname: '/HostWaitRoom',
            state: { data: Pin }
        });
  });
  }, []); 
    useEffect(() => {
        fetchQuiz();
      }, []);
    useEffect(() => {
        socket.on("newquiz", quiz => {
          console.log(quiz)
          setListQuiz({...listQuiz, quiz:{quiz}});
          console.log(listQuiz)
        });
      }, []); 
      const reformattedArray = () => {
        const rObj = {}
        listQuiz.map(obj => {
          console.log(obj.quiz.name)
        })
        console.log(rObj)
      }
    return (
        <>
            <a id="back" href="../">Back</a>
            <h1 id="title">Start a Kahoot Game</h1>
            <h4 id="subtitle">Choose a Game Below or <a id="link" onClick={() => {props.history.push({pathname: '/Create_Game'})}}>Create your Own!</a></h4>
            <div id="game-list">
            {listQuiz.map((obj, i) => {
              return <div onClick={() => startGame(obj._id) } id="title" key={i}>{obj.quiz.quiz_name}</div>;
            })}
            </div>
        </>
    )
}
export default withRouter(Chosing_Game)