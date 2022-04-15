import React from "react"
import GuessLetter from "./GuessLetter"
import './GuessRow.css'

function GuessRow(props){
    return(
        <div className="guess-row">
            <GuessLetter value={props.letters[0].value} result={props.letters[0].result} />
            <GuessLetter value={props.letters[1].value} result={props.letters[1].result} />
            <GuessLetter value={props.letters[2].value} result={props.letters[2].result} />
            <GuessLetter value={props.letters[3].value} result={props.letters[3].result} />
            <GuessLetter value={props.letters[4].value} result={props.letters[4].result} />
        </div>
    )
}

export default GuessRow