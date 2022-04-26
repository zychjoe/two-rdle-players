import {render} from '@testing-library/react'
import OSKey from './OSKey'

it('renders without crashing', () => {
  render(<OSKey key="A" 
                data-type="letter"
                data-result="miss"
                onClick={() => "hellow, wordle!"}>
                A</OSKey>
                )
})