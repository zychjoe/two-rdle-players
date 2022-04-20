import './App.css'
import React, {useState} from 'react'
import Title from './Title.js'
import { screenDisplayer, isEnglish } from './helpers.js'
import testvalues from './testvalues.json'


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
  const [answer, setAnswer] = useState(testvalues.answer)
  //fields to hold the players' names
  const [playerNames, setPlayerNames] = useState({"player1" : "",
                                                  "player2" : ""})


  /****************************************************************************
   * RENDER
   ***************************************************************************/
  return (
    <div className="App">
      <Title />
      {screenDisplayer(gameDisplay, () => setPlayerNames(), () => setPlayerNames(), answer)}
    </div>
  )
}

export default App