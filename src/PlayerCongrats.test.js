import {render} from '@testing-library/react'
import PlayerCongrats from './PlayerCongrats'
import testValues from './testvalues.json'

it('renders without crashing', () => {
  render(<PlayerCongrats answer={testValues["answers"]["bonus"]} 
                         pNum="1" />)
})