import { render, screen } from '@testing-library/react'
import { screenDisplayer } from './helpers'
import Play from './Play'
import testvalues from './testvalues.json'


const gameStages = [{"givenDisplay" : "play",
                    "expected" : <Play answer={testvalues.answer}/>}]

for(let stage of gameStages){
    describe("screenDisplayer", () => {
        it('should accept ' + stage.givenDisplay,
                                () => expect(screenDisplayer(stage.givenDisplay,
                                                                () => "foo",
                                                                () => "bar",
                                                                testvalues.answer)).toEqual(stage.expected))})
}

describe("screenDisplayer", () => {
    it("should throw an error", () => {
        expect(() => screenDisplayer("asdfsdf",
                                    () => "foo",
                                    () => "bar",
                                    testvalues.answer)).toThrow("screenDisplayer: Not a valid gameDisplay!")})
})