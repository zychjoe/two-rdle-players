import {render} from '@testing-library/react'
import WordSelection from './WordSelection'
import testValues from './testvalues.json'

it('renders without crashing', () => {
  render(<WordSelection answer={testValues["answers"]["bonus"]}
                        setAnswer={() => "hello, wordle!"}
                        setGameDisplay={() => "hellow, wordle!"} />)
})