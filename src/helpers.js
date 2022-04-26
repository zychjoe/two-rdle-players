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
 * checkGreens: [letter objects],
                [{"letter": capital letter, "matched": boolean}],
                state setter 
                    -> [ [letter objects],
                         [{"value": capital letter, "matched": boolean}],
                         boolean ]
 * This will compare each element of the first array against the element in the
 * second given array with a matching index. If their values match, we know
 * that guess letter is in the correct position and we will need to display it
 * as green to the user.
 * 
 * If all elements match, that means the guess is the correct answer and
 * 'winningsofar' will be set to true. We'll update the player two winning
 * boolean with the given setter function.
 * 
 * We'll then return an array containing two arrays with the results of the
 * check and 'winningSofar' for use in checkGuess().
 * 
 * EXAMPLES:
 * 
 * Given:
 * guess -- [{"B", ""}, | answerTracker -- [{"B", false}, | setP2Won -- 
 *           {"O", ""}, |                   {"O", false}, | (bool) => setP2Won(bool)
 *           {"O", ""}, |                   {"N", false}, |
 *           {"K", ""}, |                   {"U", false}, |
 *           {"S", ""}] |                   {"S", false}] |
 * 
 * Return:
 * guess -- [{"B", "perfect"}, | answerTracker -- [{"B", true},  | winningSoFar -- 
 *           {"O", "perfect"}, |                   {"O", true},  |    false
 *           {"O", ""},        |                   {"N", false}, |
 *           {"K", ""},        |                   {"U", false}, |
 *           {"S", "perfect"}] |                   {"S", true}]  |
 * 
 * ----------------------------------------------------------------------------
 * Given:
 * guess -- [{"B", ""}, | answerTracker -- [{"B", false}, | setP2Won -- 
 *           {"O", ""}, |                   {"O", false}, | (bool) => setP2Won(bool)
 *           {"O", ""}, |                   {"O", false}, |
 *           {"K", ""}, |                   {"K", false}, |
 *           {"S", ""}] |                   {"S", false}] |
 * 
 * Return:
 * guess -- [{"B", "perfect"}, | answerTracker -- [{"B", true},  | winningSoFar -- 
 *           {"O", "perfect"}, |                   {"O", true},  |    true
 *           {"O", "perfect"}, |                   {"N", true},  |
 *           {"K", "perfect"}, |                   {"U", true},  |
 *           {"S", "perfect"}] |                   {"S", true}]  |
 * 
 * 
 * 
 */
export const checkGreens = (guess, answerTracker, setP2Won) => {
    let winningSoFar = true
    for(let i = 0; i < 5; i++){
        if(guess[i].value === answerTracker[i].value){
            guess[i].result = "perfect";
            answerTracker[i].matched = true;
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

/*
 * checkYellows: [letter objects],
                 [{"value": capital letter, "matched": boolean}]
                          -> [letter objects]
 * This will compare any elements in the first array with an empty 'result'
 * against all the elements of the second array whose 'matched' field is
 * false. For each element checked, if the value matches the value of an
 * element with a false "matched" field, we'll set that element's result
 * to "close" and the matched element's "matched" to true.
 * 
 * We'll then return the updated guess array.
 * 
 * EXAMPLES:
 * 
 * Given:
 * guess -- [{"B", "perfect"}, | answerTracker -- [{"B", true}, 
 *           {"O", "perfect"}, |                   {"O", true},
 *           {"O", ""},        |                   {"N", false}
 *           {"K", ""},        |                   {"U", false}
 *           {"S", "perfect"}] |                   {"S", true}]
 * 
 * Return:
 * guess -- [{"B", "perfect"},
 *           {"O", "perfect"},
 *           {"O", ""},
 *           {"K", ""},
 *           {"S", "perfect"}]
 * 
 * ----------------------------------------------------------------------------
 * Given:
 * guess -- [{"B", "perfect"}, | answerTracker -- [{"B", true}, 
 *           {"U", ""},        |                   {"O", false},
 *           {"N", "perfect"}, |                   {"N", true},
 *           {"N", ""},        |                   {"U", false},
 *           {"Y", ""}]        |                   {"S", false}]
 * 
 * Return:
 * guess -- [{"B", "perfect"},
 *           {"U", "close"},
 *           {"N", "perfect"},
 *           {"N", ""},
 *           {"Y", ""}]
 * ----------------------------------------------------------------------------
 * Given:
 * guess -- [{"E", ""},        | answerTracker -- [{"S", false}, 
 *           {"X", ""},        |                   {"A", false},
 *           {"A", ""},        |                   {"X", false},
 *           {"M", ""},        |                   {"E", false},
 *           {"S", "perfect"}] |                   {"S", true}]
 * 
 * Return:
 * guess -- [{"E", "close"},
 *           {"X", "close"},
 *           {"A", "close"},
 *           {"M", ""},
 *           {"S", "perfect"}]
 * 
 * 
 * 
 */
export const checkYellows = (answerGreened, guessGreened) =>{
    for(let aLetter of answerGreened){
        for(let gLetter of guessGreened){
            if(!aLetter.matched){
                break
            }
            if(gLetter.result !== "close"
               && gLetter.result !== "perfect"
               && gLetter.value == aLetter.value){
                    gLetter.result = "close";
                    aLetter.matched = false;
                    break;
            }
        }
    }

    return guessGreened
}

/*
* checkGuess: [capital letter], GuessRow, [state setters], state setter ---> void
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
* Given answer values: [M][O][V][I][E]
* Given guess values:  [S][T][O][V][E]
* 
* Result-->
* 
*               [S]    [T]    [O]    [V]    [E]
*              miss    miss  close  close  perfect
* -------------------------------------------------------
* Given answer values: [B][E][E][R][S]
* Given guess values:  [E][E][R][I][E]
* 
* Result-->
* 
*               [E]    [E]    [R]    [I]    [E]
*             close  perfect close   miss   miss
* -------------------------------------------------------
* Given answer values: [B][L][O][K][E]
* Given guess values:  [B][O][O][S][T]
* 
* Result-->
* 
*               [B]    [O]    [O]    [S]    [T]
*             perfect  miss perfect  miss  miss
*/
export const checkGuess = (answer, gRow, rowSetters, setP2Won) => {
    var answerTracker = [{"value" : answer[0], "matched" : false},
                         {"value" : answer[1], "matched" : false},
                         {"value" : answer[2], "matched" : false},
                         {"value" : answer[3], "matched" : false},
                         {"value" : answer[4], "matched" : false}]
                        
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