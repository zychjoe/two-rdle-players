import React from "react"
import GuessLetter from "./GuessLetter"
import './GuessRow.css'

function GuessRow(props){
    return(
        <div className="guess-row">
            <GuessLetter value={props.letters[0][0]} result={props.letters[0][1]} />
            <GuessLetter value={props.letters[1][0]} result={props.letters[1][1]} />
            <GuessLetter value={props.letters[2][0]} result={props.letters[2][1]} />
            <GuessLetter value={props.letters[3][0]} result={props.letters[3][1]} />
            <GuessLetter value={props.letters[4][0]} result={props.letters[4][1]} />
        </div>
    )
}

export default GuessRow