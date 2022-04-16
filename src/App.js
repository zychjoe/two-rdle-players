import './App.css'
import React, {useState} from 'react'
import Guessing from './Guessing.js'
import Title from './Title.js'

function App() {

const [answer, setAnswer] = useState(["P", "A", "S", "T", "Y"])

  return (
    <div className="App">
      <Title />
      <Guessing answer={answer}/>
    </div>
  )
}

export default App