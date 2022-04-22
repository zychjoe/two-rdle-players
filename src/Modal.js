import React from "react"
import './Modal.css'

const Modal = (props) => {
    return(
        <div className={props.className}
             data-display={props.visible}>
            <p>{props.text}</p>
        </div>
    )
}

export default Modal