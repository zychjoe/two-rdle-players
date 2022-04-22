import { render } from '@testing-library/react'
import GuessRow from './GuessRow.js'


const validTestRows =[{"description" : "testRowBlank",
                       "row" : [{"value": "", "result": ""},
                                {"value": "", "result": ""},
                                {"value": "", "result": ""},
                                {"value": "", "result": ""},
                                {"value": "", "result": ""}]},
                      {"description" : "testRowPartial",
                       "row" : [{"value": "A", "result": ""},
                                {"value": "B", "result": ""},
                                {"value": "C", "result": ""},
                                {"value": "", "result": ""},
                                {"value": "", "result": ""}]},
                      {"description" : "testRowUnchecked",
                       "row" : [{"value": "D", "result": ""},
                                {"value": "E", "result": ""},
                                {"value": "F", "result": ""},
                                {"value": "G", "result": ""},
                                {"value": "H", "result": ""}]},
                      {"description" : "testRowPerfect",
                       "row" : [{"value": "I", "result": "perfect"},
                                {"value": "J", "result": "perfect"},
                                {"value": "K", "result": "perfect"},
                                {"value": "L", "result": "perfect"},
                                {"value": "M", "result": "perfect"}]},
                      {"description" : "testRowMixed",
                       "row" : [{"value": "N", "result": "perfect"},
                                {"value": "O", "result": "miss"},
                                {"value": "P", "result": "close"},
                                {"value": "Q", "result": "close"},
                                {"value": "R", "result": "perfect"}]}]


for (let testRow of validTestRows) {
    it('renders without crashing given' + testRow.description, () => {
            render(<GuessRow letters={testRow.row} />)
        })
    }
