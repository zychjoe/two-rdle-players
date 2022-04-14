import React from 'react'
import GuessLetter from './GuessLetter'
import './Title.css'

function Title(){
    return(
        <div className="title">
            <h1 id="player-heading">PLAYER</h1>
            <div id="twordle-heading">
            <GuessLetter value="T" result="perfect" />
            <GuessLetter value="W" result="close" />
            <GuessLetter value="O" result="" />
            <GuessLetter value="R" result="perfect" />
            <GuessLetter value="D" result="close" />
            <GuessLetter value="L" result="" />
            <GuessLetter value="E" result="perfect" />
            </div>
        </div>
    )
}

export default Title