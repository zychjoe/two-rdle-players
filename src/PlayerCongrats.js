/******************************************************************************
 * DEPENDENCIES
 *****************************************************************************/
import React from "react"
import GuessRow from './GuessRow'
import {answerRowBuilder} from "./helpers"
import './PlayerCongrats.css'



/*
 * PlayerConrgrats contains the congratulations messages for the winning
 * player. 
 * 
 * We want to display who won, and what the answer was. Then, we want them to 
 * have the chance to rematch or switch roles to play again.
 * 
 * TODO: Replay buttons
 */
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