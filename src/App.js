import './App.css'
import React, {useState} from 'react'
import Guessing from './Guessing.js'
import Title from './Title.js'

function App() {

const [answer, setAnswer] = useState(["B", "L", "O", "K", "E"])

  return (
    <div className="App">
      <Title />
      <Guessing answer={answer}/>
    </div>
  )
}

export default App