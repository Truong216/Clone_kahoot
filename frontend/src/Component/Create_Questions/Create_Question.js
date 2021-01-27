import React from 'react'
import './Create_Question.css'
export default function Create_Question(props) {
    const onInputChange = (e) => {
        props.handleChange(props.categoryIndex, e.target.name, e.target.value);
    }
    return (
        <div className="question-field">
             <label>Question {props.categoryIndex + 1}: </label>
            <input 
            className="question" 
            type="text" 
            name={'question'}
            value={props.question}
            onChange={onInputChange}
            />
            <br />
            <br />
            <label>Answer 1: </label>
            <input 
            type="text" 
            name={'answer_1'}
            value={props.answer_1}
            onChange={onInputChange}
            />
            <label>Answer 2: </label>
            <input 
            type="text" 
            name={'answer_2'}
            value={props.answer_2}
            onChange={onInputChange}
            />
            <br />
            <br />
            <label>Answer 3: </label>
            <input 
            type="text" 
            name={'answer_3'}
            value={props.answer_3}
            onChange={onInputChange}
            />
            <label>Answer 4: </label>
            <input 
            type="text" 
            name={'answer_4'}
            value={props.answer_4}
            onChange={onInputChange}
            />
            <br />
            <br />
            <label>Correct Answer (1-4) :</label>
            <input 
            type="number" 
            name={'correct'}
            value={props.correct}
            onChange={onInputChange}
            />
            {/* <button onClick={() => console.log(questions)}>xem</button>     */}
        </div>
    )
}
