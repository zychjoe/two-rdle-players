import React from "react"
import './OSKey.css'

function OSKey(props){
    return(
        <button className="osk" data-type={props.type}
                onClick={props.onClick}>
                    {props.name}
        </button>
    )
}

export default OSKey