import React from 'react'
import './GuessLetter.css'


/*
 * GuessLetter is one of five elements in a GuessRow. It has a value (string)
 * and a result (string).
 * 
 * The 'value' property can be either the empty string or a single capital
 * letter. The value is empty by default or after being deleted from the on-
 * screen keyboard (OSK). It will have a letter only after being input by the
 * OSK.
 * 
 * The 'result' value is the empty string by default.bIf the letter guessed
 * exists in the answer but in a different position the 'result' will be
 * "close". If the letter is correctly positioned, the 'result' will be
 * "perfect". If the letter is not in the answer at all, 'result' is "miss".
 */
function GuessLetter(props){

    return(
        <div className="g-letter" data-result={props.result}>
            <h1>{props.value}</h1>
        </div>
    )
}

export default GuessLetter