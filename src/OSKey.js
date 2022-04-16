import React from "react"
import './OSKey.css'

function OSKey(props){
    return(
        <button className="osk" 
                data-type={props.type}
                data-result={props.result}
                onClick={props.onClick}>
                    {props.name}
        </button>
    )
}

export default OSKey