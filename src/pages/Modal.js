import React from 'react'
import { Button } from "@material-ui/core"
import "./Modal.css"

function selfModal(props) {
    return (
        <div className="posts_addPostModal" id={ props.id }>
            <div className="posts_addPostModal_background"
            onClick={ () => {
                document.querySelector("#" + props.id).style.display = "none";
            } }
            ></div>
            <div className="posts_addPostModal_foreground">
                <div className="modal_close_icon"
                onClick={ () => {
                    document.querySelector("#" + props.id).style.display = "none";
                } }
                >x</div>
                <h1 className="modal_title">{ props.title }</h1>
                { props.children }
            </div>
        </div>
    )
}

export default selfModal
