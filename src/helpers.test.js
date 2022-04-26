import {  checkGreens, checkYellows } from './helpers'
import testValues from './testvalues.json'

const checkGreensData = [ { "description": "eerie/bonus",
                            "guess" : testValues["rowsUnchecked"]["eerie"]["letters"],
                            "answerTracker" : testValues["answerTrackers"]["bonus"],
                            "setP2Won" : () => "hello, wordle!",
                            "expected" : [ [{"value": "E", "result": ""},
                                            {"value": "E", "result": ""},
                                            {"value": "R", "result": ""},
                                            {"value": "I", "result": ""},
                                            {"value": "E", "result": ""}],
                                           [{"value": "B", "matched": false},
                                            {"value": "O", "matched": false},
                                            {"value": "N", "matched": false},
                                            {"value": "U", "matched": false},
                                            {"value": "S", "matched": false}],
                                            false ]}, 
                          { "description": "books/bonus",
                            "guess" : testValues["rowsUnchecked"]["books"]["letters"],
                            "answerTracker" : testValues["answerTrackers"]["bonus"],
                            "setP2Won" : () => "hello, wordle!",
                            "expected" : [ [{"value": "B", "result": "perfect"},
                                            {"value": "O", "result": "perfect"},
                                            {"value": "O", "result": ""},
                                            {"value": "K", "result": ""},
                                            {"value": "S", "result": "perfect"}],
                                           [{"value": "B", "matched": true},
                                            {"value": "O", "matched": true},
                                            {"value": "N", "matched": false},
                                            {"value": "U", "matched": false},
                                            {"value": "S", "matched": true}],
                                            false ] },
                          { "description": "bonus/bonus",
                            "guess" : testValues["rowsUnchecked"]["bonus"]["letters"],
                            "answerTracker" : testValues["answerTrackers"]["bonus"],
                            "setP2Won" : () => "hello, wordle!",
                            "expected" : [ [{"value": "B", "result": "perfect"},
                                            {"value": "O", "result": "perfect"},
                                            {"value": "N", "result": "perfect"},
                                            {"value": "U", "result": "perfect"},
                                            {"value": "S", "result": "perfect"}],
                                           [{"value": "B", "matched": true},
                                            {"value": "O", "matched": true},
                                            {"value": "N", "matched": true},
                                            {"value": "U", "matched": true},
                                            {"value": "S", "matched": true}],
                                            true ] }
                                        ]

describe('checkGreens', () => {
    checkGreensData.map(t => {
        it('should check ' + t.description, () => {
            expect(checkGreens(t.guess, t.answerTracker, t.setP2Won)).toEqual(t.expected)
    })})
})


const checkYellowsData = [ { "description": "eerie/bunny",
                             "guessGreened" : checkGreens(testValues["rowsUnchecked"]["eerie"]["letters"], testValues["answerTrackers"]["bunny"], () => "hello, wordle!")[0],
                             "answerGreened" : testValues["answerTrackers"]["bunny"],
                             "expected" : [  {"value": "E", "result": ""},
                                             {"value": "E", "result": ""},
                                             {"value": "R", "result": ""},
                                             {"value": "I", "result": ""},
                                             {"value": "E", "result": ""}  ]  }, 
                           { "description": "exams/saxes",
                             "guessGreened" : checkGreens(testValues["rowsUnchecked"]["exams"]["letters"], testValues["answerTrackers"]["saxes"], () => "hello, wordle!")[0],
                             "answerGreened" : testValues["answerTrackers"]["saxes"],
                             "expected" : [ {"value": "E", "result": "close"},
                                            {"value": "X", "result": "close"},
                                            {"value": "A", "result": "close"},
                                            {"value": "M", "result": ""},
                                            {"value": "S", "result": "perfect"} ] } ]

describe('checkYellows', () => {
    checkYellowsData.map(t => {
        it('should check ' + t.description, () => {
            expect(checkYellows(t.answerGreened, t.guessGreened)).toEqual(t.expected)
    })})
})
//checkGuess
//checkEnglishGuess
//isFilled
//onPlayEnter
//resultTracker
//guessRowFinder

//keyResultUpdater
//nextLetterFiller
//lastLetterRemover


//answerRowBuilder
//checkEnglishAnswer
