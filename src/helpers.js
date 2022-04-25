import React from 'react'
import Player1Intro from './Player1Intro'
import Play from './Play'
import Modal from './Modal'




/*
 * isFilled: [letter objects] -> booleans
 * Returns true if all letters in the array have non-empty values.
 */
export const isFilled = (letters) => {
    return letters.reduce((prev, letter) => prev && letter.value !== "", true)
}


/*
 * checkGreens: [letter objects], [letter objects], function -> 
                                [ [letter objects],
                                [{"letter": capital letter, "unmatched": boolean}],
                                 boolean ]
 * This will compare each element of the first array against the element in the
 * second given array with a matching index. If their values match, we know
 * that guess letter is in the correct position and we will need to display it
 * as green to the user.
 * 
 * If all elements match, that means the guess is the correct answer and
 * 'winningsofar' will be set to true. We'll update the player two winning
 * boolean with the given setter function and end the game.
 * 
 * Otherwise we'll return an array containing two arrays with he results of the
 * check and a 'false' for use in CheckGuess().
 */
export const checkGreens = (guess, answerTracker, setP2Won) => {
    let winningSoFar = true
    for(let i = 0; i < 5; i++){
        if(guess[i].value === answerTracker[i].value){
            guess[i].result = "perfect";
            answerTracker[i].unmatched = false;
        }
        else{
            winningSoFar = false;
        }
    }
    if (winningSoFar){
        setP2Won(winningSoFar)

    }
    return [guess, answerTracker, winningSoFar]
}


export const checkYellows = (answerGreened, guessGreened) =>{
    for(let aLetter of answerGreened){
        for(let gLetter of guessGreened){
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

    return guessGreened
}

/*
* checkGuess: (GuessRow) ---> void
* This function will be called on the click of the 'ENTER' OSKey.
* 
* We want to check the given GuessRow against the answer.
* 
* First, we want to find all GuessLetters in the correct position and
* set their 'result' to "perfect".
* 
* If all five GuessLetters are in the right place, we want to set
* p2Won to true and end the game.
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
export const checkGuess = (answer, gRow, rowSetters, setP2Won) => {
    var answerTracker = [{"value" : answer[0], "unmatched" : true},
                        {"value" : answer[1], "unmatched" : true},
                        {"value" : answer[2], "unmatched" : true},
                        {"value" : answer[3], "unmatched" : true},
                        {"value" : answer[4], "unmatched" : true}]
                        
    //Now, let's see how many GuessLetters are in the right place.
    // If all five are perfect, we'll use 'winningSoFar' to end the game.
    let [guessGreened, answerGreened, p2Wins] = checkGreens(gRow.letters, answerTracker, setP2Won)
    
    if(!p2Wins){
        //Since we're still here, we know the answer was not completely correct.
        // We need to check any remaining GuessLetters against any remaining
        // lettters in the answer, while minding duplicates.
        let guessYellowed = checkYellows(answerGreened, guessGreened)

        //Finally, we need to record our guessed letters absent from the answer.
        let guessChecked = guessYellowed.map((letter) => {
                                            if(letter.result === ""){
                                                letter.result = "miss"
                                            }
                                            return letter
                                        })

        //And we'll update the state and re-render.
        rowSetters[gRow.index]({"letters": guessChecked,
                                "canChange" :false,
                                "index" : gRow.index})
    }
    else {
        //And we'll update the state and re-render.
        rowSetters[gRow.index]({"letters": guessGreened,
                                "canChange" :false,
                                "index" : gRow.index})
    }
}

/*
 * checkEnglishGuess : [letter objects] -> boolean
 * This function will take an array of letter objects, convert their values
 * into a string and check that string against an English dictionary API.
 * If the word is an English word, it will return 'true', if not, 'false'.
 * 
 * NOTE: This function is called AFTER a check to make sure each letter
 * object has a value. There will never be a call with an incomplete
 * guess.
 * 
 * EXAMPLES:
 * 
 * Given: [{"value": "B", "result": ""},
 *         {"value": "O", "result": ""},
 *         {"value": "N", "result": ""},
 *         {"value": "U", "result": ""},
 *         {"value": "S", "result": ""}]
 * 
 * Return: true
 * ----------------------------------------------------------------------
 * 
 * Given: [{"value": "B", "result": ""},
 *         {"value": "N", "result": ""},
 *         {"value": "N", "result": ""},
 *         {"value": "N", "result": ""},
 *         {"value": "S", "result": ""}]
 * 
 * Return: false
 */
export const checkEnglishGuess = (gRow, answer, rowSetters, setShowNotWord, setP2Won) => {
    // First, let's turn the array into a string & add it to the API URL
    const guessString = gRow.letters.reduce(((prev, curr) => prev + curr.value), "")
    const apiUrl = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + guessString

    const options = {
        method: 'GET'
    }

    fetch(apiUrl, options)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data)
                        if (data[0]){

                            checkGuess(answer, gRow, rowSetters, setP2Won)
                        }
                        else{
                            setShowNotWord(true)
                        }
                    })
                    .catch(err => console.error(err))
}

export const checkEnglishAnswer = (answer, setGameStage, setAnswerNotWord) => {
    const answerString = answer.reduce(((prev, curr) => prev + curr), "")
    const apiUrl = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + answerString

    const options = {
        method: 'GET'
    }

    fetch(apiUrl, options)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data)
                        if (data[0]){

                            setGameStage("play")
                        }
                        else{
                            setAnswerNotWord(true)
                        }
                    })
                    .catch(err => console.error(err))
}

export const onPlayEnter = (gRow, answer, rowSetters, setShowNotWord, setP2Won) => {
// First, we check if the given GuessRow has five filled letters && if
//  the word is a valid English word.
//  If not, we should just return unchanged.
    if (isFilled(gRow.letters)){
        checkEnglishGuess(gRow, answer, rowSetters, setShowNotWord, setP2Won)
    }
    else{
        console.log("incomplete guess")
    }
}