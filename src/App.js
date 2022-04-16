import './App.css'
import React, {useState} from 'react'
import Title from './Title.js'
import Player1Intro from './Player1Intro'
import Play from './Play.js'


function App() {

  const [gameDisplay, setGameDisplay] = useState("player1Intro")
  const [answer, setAnswer] = useState(["C", "O", "K", "E", "S"])
  const [playerNames, setPlayerNames] = useState({"player1" : "", "player2" : ""})
  

  const screenDisplayer = () => {
    switch (gameDisplay){
      case "player1Intro":
        return <Player1Intro setNames={(update) => setPlayerNames(update)} setDisplay={() => setGameDisplay()} />
      case "wordSelection":
      case "player2Intro":
      case "play":
        return <Play answer={answer}/>
    }
  }

  return (
    <div className="App">
      <Title />
      {screenDisplayer()}
    </div>
  )
}

export default App