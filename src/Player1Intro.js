/******************************************************************************
 * DEPENDENCIES
 *****************************************************************************/
import React, {useSate} from "react"
import './Player1Intro.css'


/*************************************************************
 * 
 *                 NOTHING
 *                    
 *                      TO
 * 
 *                         SEE
 * 
 *                              HERE!
 * 
 * 
 */


function Player1Intro(props) {

    

    return (
        <div className="p1-intro">
            <h1>Hello Player 1!</h1>
            <p>What may I call you?</p>
            <input id="p1-name" placeholder="Your Name Here"></input>
        </div>
    )
}

export default Player1Intro