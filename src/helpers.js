import React from 'react'
import Player1Intro from './Player1Intro'
import Play from './Play.js'
  
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