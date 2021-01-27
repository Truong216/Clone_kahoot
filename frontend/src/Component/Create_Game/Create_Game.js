import React, { useState } from 'react'
import axios from 'axios';
import './Create_Game.css';
import io from "socket.io-client";
import {  withRouter } from "react-router-dom";
import Create_Question from '../Create_Questions/Create_Question';
const socket = io();
function Create_Game(props) {
    const [question_array, setQuestion_array] = useState([0])
    const [questions, setQuestions] = useState([{
        question: '',
        answer_1: '',
        answer_2: '',
        answer_3: '',
        answer_4: '',
        correct: 0,
    }])
    const [test, setTest] = useState({
        question: '',
        answer_1: '',
        answer_2: '',
        answer_3: '',
        answer_4: '',
        correct: 0,
    })
    const [quiz, setQuiz] = useState({
        quiz_name: '',
        question: []
    })
    const addQuestion = () =>{
        setQuestion_array([...question_array, question_array.length]);
        setQuestions([...questions, test])
    }
    const handleChange = (index, property, value) => {
        // 1. Make a shallow copy of the items
        const newquestions = [...questions];
        // 2. Make a shallow copy of the item you want to mutate
        const question = {...questions[index]};
        // 3. Replace the property you're intested in
        question[property] = value;
        // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
        newquestions[index] = question;
        // 5. Set the state to our new copy
        setQuestions(newquestions)
    }
    const quiz_nameChange = e => {
        const { name, value } = e.target;
        setQuiz(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const sendquiz = async() => {
        const update = {...quiz,  question: questions}
        console.log("quiz sau khi gui", update)
        axios.post("http://localhost:4000/quiz/new", {
            quiz: update
        }).then(console.log("gui thanh cong"));
    }
    return (
        <>
            <h1 className="title">Quiz Creator Studio</h1>  
            <div className="form-field">
                <label className="quizTitle">Quiz Title</label>
                <input className="name" value={quiz.quiz_name} name={'quiz_name'} type="text" onChange={quiz_nameChange}/>
            </div>
            <br />
            <br />
            <div className="allQuestions">
                {question_array.map((c,i) => 
                    <Create_Question 
                    handleChange={handleChange}
                    key={i}
                    categoryIndex={i}
                    question = {c.question}
                    answer_1 = {c.answer_1}
                    answer_2 = {c.answer_2}
                    answer_3 = {c.answer_3}
                    answer_4 = {c.answer_4}
                    correct = {c.correct}
                    />)
                }
            </div>
            <br />
            <button onClick={addQuestion}>Add another question</button>
            <br />
            <br />
            <div className="form-field">
                <button onClick={() => sendquiz()}>Create Quiz</button>
            </div>
            <br />
            <button onClick={() => props.history.goBack()}>Cancel quiz and return to quiz selection</button>
        </>
    )
}
export default withRouter(Create_Game)