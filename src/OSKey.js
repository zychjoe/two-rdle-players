/******************************************************************************
 * DEPENDENCIES
 *****************************************************************************/
import React from "react"
import './OSKey.css'

/*
 * OSKey (short for On-Screen Key) makes up our On-Screen Keyboard (OSKB).
 * 
 * The 'type' will be either "leter" or "function". There will be twenty-six
 * (26) "letter" OSKeys, one for each letter in the alphabet. Their
 * arrangement will macth a QWERTY keyboard.
 * 
 * There will be two (2) "action" keys in the OSKB; 'ENTER' and 'DEL'. Their
 * functions will vary from screen to screen.
 * 
 * Any other screens which need player input through buttons will utilize
 * an 'action' OSKey. 
 */
function OSKey(props){
    return(
        <button className="osk" 
                data-type={props.type}
                data-result={props.result}
                onClick={props.onClick}>
                    {props.name}
        </button>
    )
}

export default OSKey