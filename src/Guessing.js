import React, {useState} from "react"
import GuessRow from "./GuessRow"
import OSKeyBoard from "./OSKeyBoard"
import './Guessing.css'

function Guessing(props){

    const [row0, setRow0] = useState([["A", ""],
                                      ["B", ""],
                                      ["C", ""],
                                      ["D", ""],
                                      ["E", ""],
                                      true])

    const [row1, setRow1] = useState([["F", ""],
                                      ["G", ""],
                                      ["H", ""],
                                      ["I", ""],
                                      ["J", ""],
                                      true])

    const [row2, setRow2] = useState([["K", ""],
                                      ["L", ""],
                                      ["M", ""],
                                      ["N", ""],
                                      ["O", ""],
                                      true])

    const [row3, setRow3] = useState([["P", ""],
                                      ["Q", ""],
                                      ["R", ""],
                                      ["S", ""],
                                      ["T", ""],
                                      true])

    const [row4, setRow4] = useState([["U", ""],
                                      ["V", ""],
                                      ["W", ""],
                                      ["X", ""],
                                      ["Y", ""],
                                      true])

    const grid = [row0, row1, row2, row3, row4]
    return(
        <div className="guessing-screen">
            <GuessRow id="row0" letters={row0} />
            <GuessRow id="row1" letters={row1} />
            <GuessRow id="row2" letters={row2} />
            <GuessRow id="row3" letters={row3} />
            <GuessRow id="row4" letters={row4} />
            <OSKeyBoard />
        </div>
    )
}

export default Guessing