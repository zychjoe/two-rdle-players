import { render } from '@testing-library/react'
import GuessRow from './GuessRow.js'
import testValues from './testvalues.json'





for (let testRow of testValues.validRowsArray) {
    it('renders without crashing given' + testRow.description, () => {
            render(<GuessRow letters={testRow.row} />)
        })
    }
