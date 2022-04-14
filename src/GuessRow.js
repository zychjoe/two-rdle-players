import React from "react"
import GuessLetter from "./GuessLetter"
import './GuessRow.css'

function GuessRow(){
    return(
        <div className="guess-row">
            <GuessLetter value="A" result="" />
            <GuessLetter value="B" result="close" />
            <GuessLetter value="C" result="perfect" />
            <GuessLetter value="D" result="" />
            <GuessLetter value="E" result="" />
        </div>
    )
}

export default GuessRow