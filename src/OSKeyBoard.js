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
    /****************************************************************************  
    * CONSTANTS REPRESENTING KEYBOARD LAYOUT
    ****************************************************************************/
    const oskbRow0 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"]
    const oskbRow1 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"]
    const oskbRow2 = ["Z", "X", "C", "V", "B", "N", "M"]

    /****************************************************************************
    * HELPER FUNCTIONS
    ****************************************************************************/
   /*
    * keyResultUpdater: (string) ---> string
    * This function tells the keys in the keyboard if the OSKey's value has
    * already been guessed by player2, and if so, what the result of the
    * guess was. We will use this information to color the OSKeys for 
    * Player 2.
    * 
    * The given string should only ever be in the form of a single uppercase
    * letter.
    * 
    * The function returns a 'result' in the form of a string.
    *   "perfect": the letter has been found in the answer at least one correct
    *               position
    *   "close": the letter has been found in the answer at least once but
    *               the correct position is still unknown
    *   "miss": the letter does not appear in the answer
    *   "": the letter has not been guessed
    */
    const keyResultUpdater = (keyVal) => {
        const resultedLetter = (
            props.keyResults.filter(letter => letter.value === keyVal))

        //There should never be more than one object in the results array
        if(resultedLetter.length > 1){
            throw new Error("keyResultUpdater: Too many of the same leter in"
                            +"results array")
        }
        return resultedLetter.length === 0 ? "" : resultedLetter[0].result 
    }

    /*
    * nextLetterFiller: (string) ---> void
    * This function will be handed to the letter OSKeys for their
    * click-events. It will itrate through the current GuessRow (props.currRow)
    * and find the first letter object assigned a value of the empty string.
    * It will then set that object's value to the given new value (newVal).
    * 
    * The given string should only ever be in the form of a single uppercase
    * letter.
    * 
    * If the GuessRow letters all already have a non-empty string value,
    * nothing happens.
    * 
    * Once the letter object's value is set, we call a setState given by
    * props.rowSetters.
    */
    const nextLetterFiller = (newVal) => {
        let currRow = props.currentRow 
        for(let i = 0; i < 5; i++){
            if(currRow.letters[i].value === ""){
                currRow.letters[i].value = newVal
                props.rowSetters[currRow.index]({"letters": currRow.letters,
                                                "canChange" : currRow.canChange,
                                                "index" : currRow.index})
                break
            }
        }
    }

    /*
    * lastLetterRemover: () ---> void
    * The reversal of nexletterFiller, lastLetterRemover will be called by the
    * 'DEL' OSKey. It iterates backwards trhough the current GuessRow and finds
    * the most recent letter to receive a non-empty string value. It then
    * resets the value to the empty string, effectively deleting the letter
    * guessed.
    * 
    * If the GuessRow letters all already have empty string values, nothing
    * happens.
    * 
    * Once the letter object's value is reset to "", we call a setState given
    * by props.rowSetters.
    */
    const lastLetterRemover = () => {
        let currRow = props.currentRow 
        for(let i = 4; i >= 0; i--){
            if(currRow.letters[i].value !== ""){
                currRow.letters[i].value = ""
                props.rowSetters[currRow.index]({"letters": currRow.letters,
                                                "canChange" : currRow.canChange,
                                                "index" : currRow.index})
                break
            }
        }
    }

    /****************************************************************************
    * RENDERER
    ****************************************************************************/
    return(
        <div className="oskb">
            <div className="top-row">
                {oskbRow0.map(val => <OSKey name={val}
                                            type="letter"
                                            onClick={() => nextLetterFiller(val)}
                                            result={keyResultUpdater(val)} />)}
            </div>
            <div className="middle-row">
            {oskbRow1.map(val => <OSKey name={val}
                                            type="letter"
                                            onClick={() => nextLetterFiller(val)}
                                            result={keyResultUpdater(val)} />)}
            </div>
            <div className="final-row">
                <OSKey name="ENTER" 
                       type="action"
                       onClick={props.onEnter}
                       result="" />
                {oskbRow2.map(val => <OSKey name={val}
                                            type="letter"
                                            onClick={() => nextLetterFiller(val)}
                                            result={keyResultUpdater(val)} />)}
                <OSKey name="DEL"
                       type="action"
                       onClick={() => lastLetterRemover()}
                       result="" />
            </div>

        </div>
    )
}

export default OSKeyBoard