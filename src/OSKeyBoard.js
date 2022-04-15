import React from "react"
import OSKey from "./OSKey"
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
            <div className="first-row">
                <OSKey name="Q" type="letter" />
                <OSKey name="W" type="letter" />
                <OSKey name="E" type="letter" />
                <OSKey name="R" type="letter" />
                <OSKey name="T" type="letter" />
                <OSKey name="Y" type="letter" />
                <OSKey name="U" type="letter" />
                <OSKey name="I" type="letter" />
                <OSKey name="O" type="letter" />
                <OSKey name="P" type="letter" />
            </div>
            <div className="second-row">
                <OSKey name="A" type="letter" />
                <OSKey name="S" type="letter" />
                <OSKey name="D" type="letter" />
                <OSKey name="F" type="letter" />
                <OSKey name="G" type="letter" />
                <OSKey name="H" type="letter" />
                <OSKey name="J" type="letter" />
                <OSKey name="K" type="letter" />
                <OSKey name="L" type="letter" />
            </div>
            <div className="third-row">
                <OSKey name="ENTER" type="action" onClick={props.onEnter}/>
                <OSKey name="Z" type="letter" />
                <OSKey name="X" type="letter" />
                <OSKey name="C" type="letter" />
                <OSKey name="V" type="letter" />
                <OSKey name="B" type="letter" />
                <OSKey name="N" type="letter" />
                <OSKey name="M" type="letter" />
                <OSKey name="DEL" type="action" />
            </div>

        </div>
    )
}

export default OSKeyBoard