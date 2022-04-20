import React, {useState} from "react"
import GuessRow from "./GuessRow"
import OSKeyBoard from "./OSKeyBoard"
import './Play.css'
import { onPlayEnter } from './helpers'

function Play(props){
   /****************************************************************************
    * STATE HOOKS
    ***************************************************************************/

   //The next five objects contain 3 key-value pairs:
   // "letters": an array of leter objects each with a value string and
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

    //These will be used to trigger the ending screen. We set these here and
    // not in the main app file becasue we will leave the top half of the
    // play screen untouched, and just change out the OSKB for a congrats
    // message to the winning player.
    //TODO: Make winning screens
    //const [p1Won, setP1Won] = useState(false)
    //const [p2Won, setP2Won] = useState(false)

   /*
    * resultracker: () ---> [letter object]
    * This function will take stock of the guessed letters and their results.
    * It will return an array of letter objects, one (1) object for each
    * leter guessed so far, with its most successful result. We will
    * use this array to give feedback to the user through the coloring of
    * OSKeys. 
    * 
    * There should only ever be one object for each letter value, so if a
    * letter has been guessed more than once we only want to track the best
    * guess:
    * 
    *   "perfect" > "close" > "miss"
    * 
    * We do not want to record any letters in the current GuessRow that have
    * been entered but not evaluated. If we see a result of "", we'll skip.
    * 
    * TODO: Refactor and clean up!
    */
    const resultTracker = () => {
        let results = []
        for (let row of grid) {
            for (let letter of row.letters){
                //If the letter is already in the results array with this
                // result, if this letter hasn't been evaluated, we move on.
                if(results.includes(letter) || letter.result === ""){
                    continue
                }
                //If we know the letter is not yet in the results array, we
                // can simply push it in and move on.
                if(results.reduce(((prev, curr) => prev 
                                  && (curr.value !== letter.value)),
                                  true)){
                    results.push(letter)
                    continue
                }
                //If the letter is already in the results array with a "perfect"
                // that's as good as it can be, so we'll move on.
                if(results.reduce(((prev, curr) => prev 
                                   || (curr.value == letter.value
                                       && curr.result === "perfect")),
                                  false)){
                    continue
                }
                //Now we know the letter is in the results array with a less
                // "perfect" result. That means the object in the array must
                // either be "close" or "miss". So...
                switch (letter.result){
                    //If this letter is perfect, we need to override its match
                    // in the results array.
                    case "perfect":
                        let newResults = results.map(rLetter => {
                            if (rLetter.value === letter.value){
                                return letter
                            }
                            else{
                                return rLetter
                            }
                        })
                        results = newResults
                    //And if we're here, we know ours is only "close" so we
                    // only need to upgrade an existing "miss"
                    case "close":
                        let newerResults = results.map(rLetter => {
                            if (rLetter.value === letter.value && rLetter.result === "miss"){
                                return letter
                            }
                            else{
                                return rLetter
                            }
                        })
                    
                    default:
                        continue
                }

            }

        }
        return results
    }


   /*
    * guessRowFinder: () ---> GuessRow || void
    * This quick function finds the next GuessRow to not have been evaluated.
    * 
    * If it runs through the for-loop and does not find one, that means all
    * five GuessRows have been evaluated and the answer was not found.
    * Player 1 wins!
    * 
    * TODO: Make a P1Wins screen
    */
    const guessRowFinder = () => {
        for (let row of grid){
            if(row.canChange){

                return row
            }
            //setP1Won(true);
        }
    }




   /****************************************************************************
    * RENDERER
    ***************************************************************************/
    return(
        <div className="guessing-screen">
            <GuessRow id="row0" letters={row0.letters} />
            <GuessRow id="row1" letters={row1.letters} />
            <GuessRow id="row2" letters={row2.letters} />
            <GuessRow id="row3" letters={row3.letters} />
            <GuessRow id="row4" letters={row4.letters} />
            <OSKeyBoard keyResults={resultTracker()} 
                        currentRow={guessRowFinder()}
                        rowSetters={rowSetters}
                        onEnter={() => {onPlayEnter(guessRowFinder(), props.answer, rowSetters)}} />
        </div>
    )
}

export default Play