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


    const keyResultUpdater = (keyVal) => {
        const resultedLetter = props.keyResults.filter(letter => letter.value === keyVal)
        return resultedLetter.length === 0 ? "" : resultedLetter[0].result 
    }

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

    
    const oskbRow0 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"]
    const oskbRow1 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"]
    const oskbRow2 = ["Z", "X", "C", "V", "B", "N", "M"]


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
                <OSKey name="ENTER" type="action" onClick={props.onEnter} result="" />
                {oskbRow2.map(val => <OSKey name={val}
                                            type="letter"
                                            onClick={() => nextLetterFiller(val)}
                                            result={keyResultUpdater(val)} />)}
                <OSKey name="DEL" type="action" onClick={() => lastLetterRemover()} result="" />
            </div>

        </div>
    )
}

export default OSKeyBoard