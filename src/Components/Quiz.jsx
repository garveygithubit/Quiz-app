import React, { useRef, useState } from 'react';
import './Quiz.css';
import { data } from '../assets/data';

const Quiz = () => {
    const [index, setIndex] = useState(0);
    const [question, setQuestion] = useState(data[index]);
    const [lock, setLock] = useState(false);
    const [score, setScore] = useState(0);
    const [result, setResult] = useState(false);

    const Option1 = useRef(null);
    const Option2 = useRef(null);
    const Option3 = useRef(null);
    const Option4 = useRef(null);

    const option_array = [Option1, Option2, Option3, Option4];

    const checkAnswer = (e, ans) => {
        if (!lock) {
            if (question.ans === ans) {
                e.target.classList.add('correct');
                setScore((prev) => prev + 1);
            } else {
                e.target.classList.add('wrong');
                option_array[question.ans - 1].current.classList.add('correct');
            }
            setLock(true);
        }
    };

    const next = () => {
        if (lock) {
            if (index === data.length - 1) {
                setResult(true);
                return;
            }

            setIndex((prevIndex) => prevIndex + 1);
            setQuestion(data[index + 1]);
            setLock(false);
            option_array.forEach((option) => {
                option.current.classList.remove('correct');
                option.current.classList.remove('wrong');
            });
        }
    };

    const reset = () => {
            setIndex(0);
            setQuestion(data[0]);
            setScore(0);
            setLock(false);
            setResult(false);
    }

    return (
        <div className='container'>
            <h1>Quiz App</h1>
            <hr />
            {result ? (
                <div>
                    <h2>Your Score: {score} / {data.length}</h2>
                    <button onClick={reset}>Reset</button>
                </div>
            ) : (
                <>
                    <h2>{index + 1}. {question.question} </h2>
                    <ul>
                        <li ref={Option1} onClick={(e) => { checkAnswer(e, 1) }}>{question.option1}</li>
                        <li ref={Option2} onClick={(e) => { checkAnswer(e, 2) }}>{question.option2}</li>
                        <li ref={Option3} onClick={(e) => { checkAnswer(e, 3) }}>{question.option3}</li>
                        <li ref={Option4} onClick={(e) => { checkAnswer(e, 4) }}>{question.option4}</li>
                    </ul>
                    <button onClick={next}>Next</button>
                    <div className="index">{index + 1} of {data.length}</div>
                </>
            )}
        </div>
    );
};

export default Quiz;
