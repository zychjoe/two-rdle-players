import { render, screen } from '@testing-library/react'
import App, {answer, screenDisplayer} from './App'
import Play from './Play.js'

it('renders without crashing', () => {
  render(<App />)
})

test('renders w/ title', () => {
  render(<App />)
  const linkElement = screen.getByText(/player/i)
  expect(linkElement).toBeInTheDocument()
})


const gameStages = [{"given" : "play",
                     "expected" : <Play answer={answer}/>}]

for(let stage of gameStages){
  render(<App />)
  describe("screenDisplayer", () => {
    it('should accept ' + stage.given, () => expect(screenDisplayer(stage.given).toBe(stage.expected)))})
}

