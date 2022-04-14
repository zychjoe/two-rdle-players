import './App.css'
import GuessLetter from './GuessLetter.js'

function App() {
  return (
    <div className="App">
      <GuessLetter value="A" result="" />
      <GuessLetter value="B" result="close" />
      <GuessLetter value="C" result="perfect" />
      <GuessLetter value="D" result="" />
      <GuessLetter value="E" result="" />
    </div>
  )
}

export default App