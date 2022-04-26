/******************************************************************************
 * DEPENDENCIES
 *****************************************************************************/
import React, {useState, useEffect} from "react"
import GuessRow from "./GuessRow"
import OSKeyBoard from "./OSKeyBoard"
import Modal from "./Modal"
import {onPlayEnter, resultTracker, guessRowFinder} from './helpers'
import PlayerCongrats from "./PlayerCongrats"
import './Play.css'

function Play(props){
/******************************************************************************
 * STATE HOOKS
 *****************************************************************************/

   //The next five objects contain 3 key-value pairs:
   // "letters": an array of letter objects each with a value string and
   //               a result string
   // "canChange": a boolean (default 'true') that urns false after a row has
   //               has been evaluated
   // "index": an int signifying which row the object represents
    const [row0, setRow0] = useState({"letters" : [{"value": "", "result": ""},
                                                   {"value": "", "result": ""},
                                                   {"value": "", "result": ""},
                                                   {"value": "", "result": ""},
                                                   {"value": "", "result": ""}],
                                      "canChange" : true,
                                      "index" : 0})

    const [row1, setRow1] = useState({"letters" : [{"value": "", "result": ""},
                                                   {"value": "", "result": ""},
                                                   {"value": "", "result": ""},
                                                   {"value": "", "result": ""},
                                                   {"value": "", "result": ""}],
                                      "canChange" : true,
                                      "index" : 1})

    const [row2, setRow2] = useState({"letters" : [{"value": "", "result": ""},
                                                   {"value": "", "result": ""},
                                                   {"value": "", "result": ""},
                                                   {"value": "", "result": ""},
                                                   {"value": "", "result": ""}],
                                      "canChange" : true,
                                      "index" : 2})

    const [row3, setRow3] = useState({"letters" : [{"value": "", "result": ""},
                                                   {"value": "", "result": ""},
                                                   {"value": "", "result": ""},
                                                   {"value": "", "result": ""},
                                                   {"value": "", "result": ""}],
                                      "canChange" : true,
                                      "index" : 3})

    const [row4, setRow4] = useState({"letters" : [{"value": "", "result": ""},
                                                   {"value": "", "result": ""},
                                                   {"value": "", "result": ""},
                                                   {"value": "", "result": ""},
                                                   {"value": "", "result": ""}],
                                      "canChange" : true,
                                      "index" : 4})

    //We'll use this array to find rows at specific indices...
    const grid = [row0,
                  row1,
                  row2,
                  row3,
                  row4]

    //...and use this one to do the same with the setter functions
    const rowSetters = [(update) => setRow0(update),
                        (update) => setRow1(update),
                        (update) => setRow2(update),
                        (update) => setRow3(update),
                        (update) => setRow4(update)]

    //This hook will help us display a modal if a guessed word isn't acceptable
    const [showNotWord, setShowNotWord] = useState(false)

    //We want to hide the "not in our list" modal shortly after it is displayed
    useEffect (() => {
        if(showNotWord){
            setTimeout(() => setShowNotWord(false), 750)
        }
    })

    //These will be used to trigger the ending screen. We set these here and
    // not in the main app file becasue we will leave the top half of the
    // play screen untouched, and just change out the OSKB for a congrats
    // message to the winning player.
    const [p1Won, setP1Won] = useState(false)
    const [p2Won, setP2Won] = useState(false)


/******************************************************************************
 * COMPONENT DISPLAYERS
 *****************************************************************************/
   /*
    * topDisplayer: () ---> <div>
    * This is a router. We either want to display instructions or
    * a "Game Over" message.
    */
    const topDisplayer =() => {
        if (p1Won || p2Won){
            return (
                <div className="game-over">
                  <h1>GAME OVER</h1>
                </div>
            )
        }
        else{
            return (
                <div className="instructions">
                    <div><h1>Player Two:</h1></div>
                    <div><p>Start Guessing!</p></div>
                </div>
            )
        }
    }

   /*
    * bottomDisplayer: () ---> <div>
    * This is another router. During the game, we want to display the OSKB.
    * Once someone wins, we'll display the wionner and the correct answer.
    */
    //TODO: Add a replay button
    //      (or maybe 2, one for a rematch and one to switch players)
    const bottomDisplayer = () => {
        if (p1Won){
            return <PlayerCongrats answer={props.answer} pNum="1" />
        }

        else if (p2Won){
            return <PlayerCongrats answer={props.answer} pNum="2"/>
        }
        else{
            return <OSKeyBoard keyResults={resultTracker(grid)} 
                               currentRow={guessRowFinder(grid, (update) => setP1Won(update))}
                               rowSetters={rowSetters}
                               onEnter={() => {onPlayEnter(guessRowFinder(grid, (update) => setP1Won(update)),
                                                           props.answer,
                                                           rowSetters, 
                                                           (update) => setShowNotWord(update),
                                                           (update) => setP2Won(update))}} />
        }
    }



/******************************************************************************
 * RENDERER
 *****************************************************************************/
    return(
        <div className="guessing-screen">
             {topDisplayer()}
            <GuessRow id="row0" letters={row0.letters} />
            <GuessRow id="row1" letters={row1.letters} />
            <GuessRow id="row2" letters={row2.letters} />
            <GuessRow id="row3" letters={row3.letters} />
            <GuessRow id="row4" letters={row4.letters} />
            <Modal className="not-a-word"
                   visible={showNotWord} text="Not in our word list" />
            {bottomDisplayer()}
        </div>
    )
}

export default Play