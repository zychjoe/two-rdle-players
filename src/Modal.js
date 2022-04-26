/******************************************************************************
 * DEPENDENCIES
 *****************************************************************************/
import React from "react"
import './Modal.css'

/*
 * The modal will be a small window popping up with user information.
 */
const Modal = (props) => {
    return(
        <div className={props.className}
             data-display={props.visible}>
            <p>{props.text}</p>
        </div>
    )
}

export default Modal