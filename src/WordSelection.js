import React, {useState, useEffect} from "react"
import OSKeyBoard from "./OSKeyBoard"
import GuessRow from "./GuessRow"
import {checkEnglishAnswer} from './helpers'
import Modal from './Modal'
import './WordSelection.css'

const WordSelection = (props) => {

    const [answerNotWord, setAnswerNotWord] = useState(false)

    useEffect (() => {
        if(answerNotWord){
            setTimeout(() => setAnswerNotWord(false), 750)
        }
    })

    const answerRowBuilder = (answer) => {
        return {"letters" : answer.map(letterVal => {
                                if(letterVal == ""){
                                    return {"value" : letterVal, "result" : ""}
                                }
                                else {
                                    return {"value" : letterVal, "result" : "perfect"}
                                }
                            }),
                "canChange" : true,
                "index" : 0}
    }

    const answerSetters = [(update) => {
        const newAnswer = update.letters.map(letter => letter.value)
        props.setAnswer(newAnswer)
    }]

    const onSelectEnter = () => {
        if (props.answer[4] !== ""){
            checkEnglishAnswer(props.answer,
                               (update) => props.setGameDisplay(update),
                               (update) => setAnswerNotWord(update))
        }
    }

    return (
        <div className="word-select">
            <div className="instructions">
                <div><h1>Player One:</h1></div>
                <div><p>Please enter a five letter word.</p></div>
            </div>
            <GuessRow id="answer" letters={answerRowBuilder(props.answer).letters} />
            <Modal className="not-a-word" visible={answerNotWord} text="Not in our word list" />
            <div className="instructions">
                <div><p>Press 'ENTER' to lock it in!</p></div>
            </div>
            <OSKeyBoard keyResults={[{"letter": "", "result" : ""}, {"letter": "", "result" : ""}]}
                                    currentRow={answerRowBuilder(props.answer)}
                                    rowSetters={answerSetters}
                                    onEnter={() => onSelectEnter()} />
        </div>
    )
}

export default WordSelection
