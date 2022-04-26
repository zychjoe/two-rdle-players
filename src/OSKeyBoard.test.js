import {render} from '@testing-library/react'
import OSKeyBoard from './OSKeyBoard'
import testValues from './testvalues.json'

it('renders without crashing', () => {
  render(<OSKeyBoard keyResults={[{"A" : "miss"}]} 
                     currentRow={testValues['rowsUnchecked']["_empty"]}
                     rowSetters={[() => 1]}
                     onEnter={() => 1} />
                )
})