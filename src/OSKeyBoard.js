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
/*

                <OSKey name="Q" type="letter" onClick={() => {nextLetterFiller("Q")}} result={keyResultUpdater("Q")} />
                <OSKey name="W" type="letter" onClick={() => {nextLetterFiller("W")}} result={keyResultUpdater("W")} />
                <OSKey name="E" type="letter" onClick={() => {nextLetterFiller("E")}} result={keyResultUpdater("E")} />
                <OSKey name="R" type="letter" onClick={() => {nextLetterFiller("R")}} result={keyResultUpdater("R")} />
                <OSKey name="T" type="letter" onClick={() => {nextLetterFiller("T")}} result={keyResultUpdater("T")} />
                <OSKey name="Y" type="letter" onClick={() => {nextLetterFiller("Y")}} result={keyResultUpdater("Y")} />
                <OSKey name="U" type="letter" onClick={() => {nextLetterFiller("U")}} result={keyResultUpdater("U")} />
                <OSKey name="I" type="letter" onClick={() => {nextLetterFiller("I")}} result={keyResultUpdater("I")} />
                <OSKey name="O" type="letter" onClick={() => {nextLetterFiller("O")}} result={keyResultUpdater("O")} />
                <OSKey name="P" type="letter" onClick={() => {nextLetterFiller("P")}} result={keyResultUpdater("P")} />


                <OSKey name="A" type="letter" onClick={() => {nextLetterFiller("A")}} result={keyResultUpdater("A")} />
                <OSKey name="S" type="letter" onClick={() => {nextLetterFiller("S")}} result={keyResultUpdater("S")} />
                <OSKey name="D" type="letter" onClick={() => {nextLetterFiller("D")}} result={keyResultUpdater("D")} />
                <OSKey name="F" type="letter" onClick={() => {nextLetterFiller("F")}} result={keyResultUpdater("F")} />
                <OSKey name="G" type="letter" onClick={() => {nextLetterFiller("G")}} result={keyResultUpdater("G")} />
                <OSKey name="H" type="letter" onClick={() => {nextLetterFiller("H")}} result={keyResultUpdater("H")} />
                <OSKey name="J" type="letter" onClick={() => {nextLetterFiller("J")}} result={keyResultUpdater("J")} />
                <OSKey name="K" type="letter" onClick={() => {nextLetterFiller("K")}} result={keyResultUpdater("K")} />
                <OSKey name="L" type="letter" onClick={() => {nextLetterFiller("L")}} result={keyResultUpdater("L")} />


                <OSKey name="Z" type="letter" onClick={() => {nextLetterFiller("Z")}} result={keyResultUpdater("Z")} />
                <OSKey name="X" type="letter" onClick={() => {nextLetterFiller("X")}} result={keyResultUpdater("X")} />
                <OSKey name="C" type="letter" onClick={() => {nextLetterFiller("C")}} result={keyResultUpdater("C")} />
                <OSKey name="V" type="letter" onClick={() => {nextLetterFiller("V")}} result={keyResultUpdater("V")} />
                <OSKey name="B" type="letter" onClick={() => {nextLetterFiller("B")}} result={keyResultUpdater("B")} />
                <OSKey name="N" type="letter" onClick={() => {nextLetterFiller("N")}} result={keyResultUpdater("N")} />
                <OSKey name="M" type="letter" onClick={() => {nextLetterFiller("M")}} result={keyResultUpdater("M")} />
                */

    
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
                <OSKey name="DEL" type="action" result="" />
            </div>

        </div>
    )
}

export default OSKeyBoard