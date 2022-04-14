import React from "react"
import "./OSKeyBoard.css"

/*
 * The On-Screen Keyboard is the method through which the players will type
 * into the app. It is made up of 26 letter keys (one for each letter) as
 * well as a DEL key and an ENTER key. The function of each of those will vary
 * and need to be accepted in props.
 */
function OSKeyBoard(props){
    return(
        <div className="oskb">
            <p>THIS IS A KEYBOARD!</p>
        </div>
    )
}

export default OSKeyBoard