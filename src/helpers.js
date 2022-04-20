import React from 'react'
import Player1Intro from './Player1Intro'
import Play from './Play.js'
import api from './api.json'
  
/*
 * screenDisplayer: state variables ---> <div>
 * This is the router of the app. Simple switch on the 'gameDisplay' state to
 * update the user's screen for each game stage.
 * 
 * The function always returns a <div>; whatever appropriate js component.
 */
export const screenDisplayer = (gameDisplay, setPlayerNames, setGameDisplay, answer) => {
    switch (gameDisplay){
        case "player1Intro":
            return <Player1Intro setNames={(update) => setPlayerNames(update)}
                                 setDisplay={setGameDisplay} />
        case "wordSelection":
        case "player2Intro":
        case "play":
            return <Play answer={answer}/>
        default:
            throw new Error("screenDisplayer: Not a valid gameDisplay!")
    }
    }

/*
 * isEnglish : [letter objects] -> boolean
 * This function will take an array of letter objects, conevert their values
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
export const isEnglish = (letters) => {
    // First, let's turn the array into a string
    const guess = letters.reduce(((prev, curr) => prev + curr.value), "")
    const apiUrl = 'https://wordsapiv1.p.rapidapi.com/words/' + guess

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com',
            'X-RapidAPI-Key': api.api
        }
    }
    
    let didFetch

    fetch(apiUrl, options)
                    .then(response => {
                        didFetch = response.ok
                        console.log(didFetch)})
                    .catch(err => console.error(err))

    return didFetch
}
