import './App.css'
import GuessRow from './GuessRow.js'
import OSKeyBoard from './OSKeyBoard.js'
import Title from './Title.js'

function App() {
  return (
    <div className="App">
      <Title />
      <GuessRow />
      <GuessRow />
      <GuessRow />
      <GuessRow />
      <GuessRow />
      <OSKeyBoard />
    </div>
  )
}

export default App