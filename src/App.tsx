import React, {FC, useState} from 'react';
import './styles.scss'

const questions = [
    {
        title: 'React - это ... ?',
        variants: ['библиотека', 'фреймворк', 'приложение'],
        correct: 0,
    },
    {
        title: 'Компонент - это ... ',
        variants: ['приложение', 'часть приложения или страницы', 'то, что я не знаю что такое'],
        correct: 1,
    },
    {
        title: 'Что такое JSX?',
        variants: [
            'Это простой HTML',
            'Это функция',
            'Это тот же HTML, но с возможностью выполнять JS-код',
        ],
        correct: 2,
    },
];

type ResultType = {
    setCurrentQues: (e: number) => void,
    correctAns: number,
    setCorrectAns: (e: number) => void
}

const Result:FC<ResultType> = ({setCurrentQues, correctAns, setCorrectAns}) => {

    const clearState = () => {
        setCurrentQues(0)
        setCorrectAns(0)
    }

    return (
        <div className="result">
            <img src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png"/>
            <h2>Вы отгадали {correctAns} ответа из {questions.length}</h2>
            <button onClick={clearState}>Попробовать снова</button>
        </div>
    )
};

type QuestionType = {
    title: string,
    variants: string[],
    correct: number
}

interface IGame {
    question: QuestionType,
    chooseVariant: (i: number) => void,
    currentQues: number
}

const Game: FC<IGame> = ({question, chooseVariant, currentQues}) => {

    const lengthProgress = Math.round(currentQues / (questions.length) * 100);
    return (
        <>
            <div className="progress">
                <div style={{width: `${lengthProgress}%`}} className="progress__inner"></div>
            </div>
            <h1>{question.title}</h1>
            <ul>
                {question.variants.map((ans, index) => (
                    <li onClick={() => chooseVariant(index)} key={ans}>{ans}</li>
                ))}
            </ul>
        </>
    )

};

const App = () => {
    const [currentQues, setCurrentQues] = useState(0)
    const question = questions[currentQues]

    const [correctAns, setCorrectAns] = useState(0)

    const chooseVariant = (i: number) => {
        console.log(currentQues, i)
        setCurrentQues(currentQues + 1)
        if (question.correct === i) {
            setCorrectAns(correctAns + 1)
        }
    }

    return (
        <div className="App">
            {
                currentQues !== questions.length ?
                    <Game currentQues={currentQues} question={question} chooseVariant={chooseVariant}/>
                    :
                    <Result setCurrentQues={setCurrentQues} correctAns={correctAns} setCorrectAns={setCorrectAns}/>
            }
        </div>
    )
};

export default App;
