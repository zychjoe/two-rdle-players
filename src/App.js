import './App.css'
import GuessLetter from './GuessLetter.js'
import Title from './Title.js'

function App() {
  return (
    <div className="App">
      <Title />
      <div>
      <GuessLetter value="A" result="" />
      <GuessLetter value="B" result="close" />
      <GuessLetter value="C" result="perfect" />
      <GuessLetter value="D" result="" />
      <GuessLetter value="E" result="" />
      </div>
    </div>
  )
}

export default App