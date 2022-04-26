/******************************************************************************
 * API VARIABLES
 *****************************************************************************/
const baseAPI = 'https://api.dictionaryapi.dev/api/v2/entries/en/'
const options = {
    method: 'GET'
}


/******************************************************************************
 * PLAY.JS HELPERS
 *****************************************************************************/
/*
 * checkGreens: [letter object],
 *              [{"letter": capital letter, "matched": boolean}],
 *              state setter 
 *                  -> [ [letter object],
 *                       [{"value": capital letter, "matched": boolean}],
 *                       boolean ]
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
 * checkYellows: [letter object],
 *               [{"value": capital letter, "matched": boolean}]
 *                        -> [letter object]
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
* checkGuess: [capital letter], GuessRow, [state setter], state setter ---> void
* This function will be called on the click of the 'ENTER' OSKey.
* 
* We want to check the given GuessRow against the answer.
* 
* We'll use checkGreens and checkYellows to find matches.
* 
* Any remaining letters should have their 'result' set to "miss"
*
* Once we have done the check, we'll update all states and re-render.
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
                        
    //First, let's see how many GuessLetters are in the right place.
    let [guessGreened, answerGreened, p2Wins] = checkGreens(gRow.letters, answerTracker, setP2Won)
    
    if(!p2Wins){
        //In this case, not every letter was correct so we'll look for yellows-
        let guessYellowed = checkYellows(answerGreened, guessGreened)

        //-and we need to record our guessed letters absent from the answer.
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
        //The guess was completely correct, so let's re-render for P2's victory.
        rowSetters[gRow.index]({"letters": guessGreened,
                                "canChange" :false,
                                "index" : gRow.index})
    }
}

/*
 * checkEnglishGuess : GuessRow,
 *                     [capital letter],
 *                     [state setter],
 *                     state setter,
 *                     state setter
 *                          -> void
 * 
 * This function will use an API check to assess if the given guess is English.
 * If so, it will check the guess for accuracy. If not, it will trigger a modal
 * explaining that the word is not in the 'word list', i.e. it isn't recognized
 * by our dictionary API.
 * 
 * NOTE: This function is called AFTER a check to make sure each letter
 * object has a value. There will never be a call with an incomplete
 * answer.
 */
export const checkEnglishGuess = (gRow, answer, rowSetters, setShowNotWord, setP2Won) => {
    // First, let's turn the array into a string & add it to the API URL
    const guessString = gRow.letters.reduce(((prev, curr) => prev + curr.value), "")
    const apiUrl =  baseAPI + guessString

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

/*
 * isFilled: [letter object] -> boolean
 * Returns true if all letters in the array have non-empty values.
 */
export const isFilled = (letters) => {
    return letters.reduce((prev, letter) => prev && letter.value !== "", true)
}

/*
 * onPlayEnter : GuessRow,
 *               [capital letter],
 *               [state setter],
 *               state setter,
 *               state setter
 *                     -> void
 * 
 * This function will be called by the OSKey "ENTER" on the Play screen. It
 * will check that each letter object in the given GuessWord has a filled value.
 * 
 * Assuming it does, it will begin the guess checking process by calling checkEnglishGuess.
 */
export const onPlayEnter = (gRow, answer, rowSetters, setShowNotWord, setP2Won) => {
    if (isFilled(gRow.letters)){
        checkEnglishGuess(gRow, answer, rowSetters, setShowNotWord, setP2Won)
    }
    else{
        console.log("incomplete guess")
    }
}
/*****************************************************************************
 * OSKEYBOARD.JS HELPERS
 *****************************************************************************/
   /*
    * keyResultUpdater: capital letter,  [letter object] -> string
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
export const keyResultUpdater = (keyVal, keyResults) => {
    const resultedLetter = (
        keyResults.filter(letter => letter.value === keyVal))

    //There should never be more than one object in the results array
    if(resultedLetter.length > 1){
        throw new Error("keyResultUpdater: Too many of the same leter in"
                        +"results array")
    }
    return resultedLetter.length === 0 ? "" : resultedLetter[0].result 
}

/*
* nextLetterFiller: capital letter, GuessRow, [state setters] -> void
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
export const nextLetterFiller = (newVal, currRow, rowSetters) => {
    for(let i = 0; i < 5; i++){
        if(currRow.letters[i].value === ""){
            currRow.letters[i].value = newVal
            rowSetters[currRow.index]({"letters": currRow.letters,
                                            "canChange" : currRow.canChange,
                                            "index" : currRow.index})
            break
        }
    }
}

/*
* lastLetterRemover: GuessRow, [state setters] ---> void
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
export const lastLetterRemover = (currRow, rowSetters) => {
    for(let i = 4; i >= 0; i--){
        if(currRow.letters[i].value !== ""){
            currRow.letters[i].value = ""
            rowSetters[currRow.index]({"letters": currRow.letters,
                                            "canChange" : currRow.canChange,
                                            "index" : currRow.index})
            break
        }
    }
}




/******************************************************************************
 * WORDSELECTION.JS HELPERS
 *****************************************************************************/


/*
 * checkEnglishAnswer : [capital letter],
 *                      state setter,
 *                      state setter
 *                          -> void
 * 
 * This function will use an API check to assess if the given answer is English.
 * If so, it will check the answer for accuracy. If not, it will trigger a modal
 * explaining that the word is not in the 'word list', i.e. it isn't recognized
 * by our dictionary API.
 * 
 * NOTE: This function is called AFTER a check to make sure each letter
 * object has a value. There will never be a call with an incomplete
 * guess.
 */
export const checkEnglishAnswer = (answer, setGameStage, setAnswerNotWord) => {
    const answerString = answer.reduce(((prev, curr) => prev + curr), "")
    const apiUrl = baseAPI + answerString

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
