import React from "react"
import OSKeyBoard from "./OSKeyBoard"
import GuessRow from "./GuessRow"
import './WordSelection.css'

const WordSelection = (props) => {

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
            props.setGameDisplay("play")
        }
    }

    return (
        <div className="word-select">
            <div className="instructions">
                <div><h1>Player One:</h1></div>
                <div><p>Please enter a five letter word.</p></div>
            </div>
            <GuessRow id="answer" letters={answerRowBuilder(props.answer).letters} />
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
