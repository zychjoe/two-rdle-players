import React from 'react'
import GuessLetter from './GuessLetter'
import './Title.css'


/*
 * The Title box will always be on top of the game. This element is completely
 * static.
 */
function Title(){
    return(
        <div className="title">
            <h1 id="player-heading">PLAYER</h1>
            <div id="twordle-heading">
            <GuessLetter value="T" result="close" />
            <GuessLetter value="W" result="perfect" />
            <GuessLetter value="O" result="" />
            <GuessLetter value="R" result="miss" />
            <GuessLetter value="D" result="miss" />
            <GuessLetter value="L" result="miss" />
            <GuessLetter value="E" result="miss" />
            </div>
        </div>
    )
}

export default Title