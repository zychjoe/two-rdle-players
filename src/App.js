import './App.css'
import React, {useState} from 'react'
import Title from './Title.js'
import WordSelection from './WordSelection'
import Play from './Play'
import testvalues from './testvalues.json'


/*
* Main App component
*/
const App = () => {
  /****************************************************************************
   * STATE HOOKS
   ***************************************************************************/

  //'gameDisplay' keeps track of the game stage
  const [gameDisplay, setGameDisplay] = useState("wordSelection")
  //'answer' ultimately holds player1's input answer for player 2 to guess
  const [answer, setAnswer] = useState(testvalues.answer)
  //fields to hold the players' names
  const [playerNames, setPlayerNames] = useState({"player1" : "",
                                                  "player2" : ""})


  /*
   * screenDisplayer: state variables ---> <div>
   * This is the router of the app. Simple switch on the 'gameDisplay' state to
   * update the user's screen for each game stage.
   * 
   * The function always returns a <div>; whatever appropriate js component.
   */
   const screenDisplayer = () => {
      switch (gameDisplay){
        case "player1Intro":
        case "wordSelection":
          return <WordSelection answer={answer}
                                setAnswer={(update) => setAnswer(update)}
                                setGameDisplay={(update) => setGameDisplay(update)} />
        case "player2Intro":
        case "play":
            return <Play answer={answer}/>
        default:
            throw new Error("screenDisplayer: Not a valid gameDisplay!")
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