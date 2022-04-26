/******************************************************************************
 * DEPENDENCIES
 *****************************************************************************/
import React from "react"
import OSKey from "./OSKey"
import { keyResultUpdater, nextLetterFiller, lastLetterRemover } from "./helpers"
import "./OSKeyBoard.css"



/*
 * The On-Screen Keyboard is the method through which the players will type
 * into the app. It is made up of 26 letter keys (one for each letter) as
 * well as a 'DEL' key and an 'ENTER' key. The function of each of those will
 * vary and need to be accepted in props.
 */
function OSKeyBoard(props){
/****************************************************************************  
* CONSTANTS REPRESENTING KEYBOARD LAYOUT
****************************************************************************/
    const oskbRow0 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"]
    const oskbRow1 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"]
    const oskbRow2 = ["Z", "X", "C", "V", "B", "N", "M"]


/****************************************************************************
 * RENDERER
 ****************************************************************************/
    return(
        <div className="oskb">
            <div className="top-row">
                {oskbRow0.map(val => <OSKey key={val}
                                            name={val}
                                            type="letter"
                                            onClick={() => nextLetterFiller(val,
                                                                            props.currentRow,
                                                                            props.rowSetters)}
                                            result={keyResultUpdater(val,
                                                                     props.keyResults)} />)}
            </div>
            <div className="middle-row">
                {oskbRow1.map(val => <OSKey key={val}
                                            name={val}
                                            type="letter"
                                            onClick={() => nextLetterFiller(val,
                                                                            props.currentRow,
                                                                            props.rowSetters)}
                                            result={keyResultUpdater(val,
                                                                     props.keyResults)} />)}
            </div>
            <div className="final-row">
                <OSKey key="ENTER"
                       name="ENTER"
                       type="action"
                       onClick={props.onEnter}
                       result="" />
                {oskbRow2.map(val => <OSKey key={val}
                                            name={val}
                                            type="letter"
                                            onClick={() => nextLetterFiller(val,
                                                                            props.currentRow,
                                                                            props.rowSetters)}
                                            result={keyResultUpdater(val,
                                                                     props.keyResults)} />)}
                <OSKey key="DEL"
                       name="DEL"
                       type="action"
                       onClick={() => lastLetterRemover(props.currentRow,
                                                        props.rowSetters)}
                       result="" />
            </div>

        </div>
    )
}

export default OSKeyBoard