import React, {useState} from "react"
import GuessRow from "./GuessRow"
import OSKeyBoard from "./OSKeyBoard"
import './Play.css'

function Play(props){

    let p1Won = false;

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

    const grid = [row0,
                  row1,
                  row2,
                  row3,
                  row4]

    const rowSetters = [(update) => setRow0(update),
                        (update) => setRow1(update),
                        (update) => setRow2(update),
                        (update) => setRow3(update),
                        (update) => setRow4(update)]


    const resultTracker = () => {
        let results = []
        for (let row of grid) {
            for (let letter of row.letters){
                if(results.includes(letter) || letter.result === ""){
                    continue
                }

                if(results.reduce(((prev, curr) => prev 
                                  && (curr.value !== letter.value)),
                                  true)){
                    results.push(letter)
                    continue
                }

                if(results.reduce(((prev, curr) => prev 
                                   || (curr.value == letter.value
                                       && curr.result === "perfect")),
                                  false)){
                    continue
                }

                switch (letter.result){
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


    const guessRowFinder = () => {
        for (let row of grid){
            if(row.canChange){

                return row
            }
            p1Won = true;
        }
    }

    /*
    * CheckGuess will be called on the click of the 'ENTER' OSKey.
    * 
    * We want to check the given GuessRow against the answer.
    * 
    * First, we want to find all GuessLetters in the correct position and
    * set their 'result' to "perfect".
    * 
    * If all five GuessLetters are in the right place, we want to set
    * IsSolved to true and end the game.
    * 
    * If the guess is not completely correct, we want to find any
    * letters that are in the answer but haven't been put in the
    * correct position and set their 'result' to "close".
    * 
    * Any remaining letters should have their 'result' set to "miss"
    *
    * 
    * EXAMPLES:
    * 
    * Answer -> [M][O][V][I][E]
    * Guess  -> [S][T][O][V][E]
    * 
    * Result-->
    * 
    *               [S]    [T]    [O]    [V]    [E]
    *              miss    miss  close  close  perfect
    * -------------------------------------------------------
    * Answer -> [B][E][E][R][S]
    * Guess  -> [E][E][R][I][E]
    * 
    * Result-->
    * 
    *               [E]    [E]    [R]    [I]    [E]
    *             close  perfect close   miss   miss
    * -------------------------------------------------------
    * Answer -> [B][L][O][K][E]
    * Guess  -> [B][O][O][S][T]
    * 
    * Result-->
    * 
    *               [B]    [O]    [O]    [S]    [T]
    *             perfect  miss perfect  miss  miss
    */
    const checkGuess = (gRow) => {
        let winningSoFar = true;
        let answerTracker = [{"value" : props.answer[0], "unmatched" : true},
                             {"value" : props.answer[1], "unmatched" : true},
                             {"value" : props.answer[2], "unmatched" : true},
                             {"value" : props.answer[3], "unmatched" : true},
                             {"value" : props.answer[4], "unmatched" : true}]
        let guess = gRow.letters
        let index = gRow.index
        console.log("ENTER")
        let newResults = []
      

    // First, we check if the given GuesRow has five filled letters.
    //  If not, we should just return unchanged.
        if (guess[4].value !== ""){
            //Now, let's see how many GuessLetters are in the right place.
            // If all five are perfect, we'll use 'winningSoFar' to end the game.
            for(let i = 0; i < 5; i++){
                if(guess[i].value === answerTracker[i].value){
                    guess[i].result = "perfect";
                    answerTracker[i].unmatched = false;
                }
                else{
                    winningSoFar = false;
                }
            }

            if (!winningSoFar){
                for(let aLetter of answerTracker){
                    for(let gLetter of guess){
                        if(!aLetter.unmatched){
                            break
                        }
                        if(gLetter.result !== "close"
                            && gLetter.result !== "perfect"
                            && gLetter.value == aLetter.value){
                            gLetter.result = "close";
                            aLetter.unmatched = false;
                            break;
                        }
                    }
                }
            }

           

            const guessWithMisses = guess.map((letter) => {
                if(letter.result === ""){
                    letter.result = "miss"
                }
                return letter
            })

            console.log(guessWithMisses[0])
            console.log(guessWithMisses[1])
            console.log(guessWithMisses[2])
            console.log(guessWithMisses[3])
            console.log(guessWithMisses[4])

            rowSetters[index]({"letters": guess,
                        "canChange" :false,
                        "index" : index}) 
        }
    }



    return(
        <div className="guessing-screen">
            <GuessRow id="row0" letters={row0.letters} />
            <GuessRow id="row1" letters={row1.letters} />
            <GuessRow id="row2" letters={row2.letters} />
            <GuessRow id="row3" letters={row3.letters} />
            <GuessRow id="row4" letters={row4.letters} />
            <OSKeyBoard keyResults={resultTracker()} currentRow={guessRowFinder()} rowSetters={rowSetters} onEnter={() => {checkGuess(guessRowFinder())}} />
        </div>
    )
}

export default Play