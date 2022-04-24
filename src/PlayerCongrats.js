import React from "react"
import GuessRow from './GuessRow'
import './PlayerCongrats.css'


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

const PlayerCongrats = (props) => {
    return (
        <div className="congrats" id="p1-congrats">
            <h1>Player {props.pNum} wins!</h1>
            <p>The word was:</p>
            <GuessRow letters={answerRowBuilder(props.answer).letters} />
        </div>
    )
}

export default PlayerCongrats