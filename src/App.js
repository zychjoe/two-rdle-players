import './App.css'
import React, {useState} from 'react'
import Title from './Title.js'
import Player1Intro from './Player1Intro'
import Play from './Play.js'


/*
* Main App component
*/
function App() {

  /****************************************************************************
   * STATE HOOKS
   ***************************************************************************/

  //'gameDisplay' keeps track of the game stage
  const [gameDisplay, setGameDisplay] = useState("play")
  //'answer' ultimately holds player1's input answer for player 2 to guess
  const [answer, setAnswer] = useState(["G", "A", "M", "E", "R"])
  //fields to hold the players' names
  const [playerNames, setPlayerNames] = useState({"player1" : "",
                                                  "player2" : ""})
  
  /****************************************************************************
   * HELPER FUNCTIONS
   ***************************************************************************/

  /*
  * screenDisplayer: () ---> <div>
  * This is the router of the app. Simple switch on the 'gameDisplay' state to
  * update the user's screen for each game stage.
  * 
  * The function always returns a <div>; whatever appropriate js component.
  */
  const screenDisplayer = () => {
    switch (gameDisplay){
      case "player1Intro":
        return <Player1Intro setNames={(update) => setPlayerNames(update)}
                             setDisplay={() => setGameDisplay()} />
      case "wordSelection":
      case "player2Intro":
      case "play":
        return <Play answer={answer}/>
    }
  }

  /****************************************************************************
   * RENDER
   ***************************************************************************/
  return (
    <div className="App">
      <Title />
      {screenDisplayer()}
    </div>
  )
}

export default App