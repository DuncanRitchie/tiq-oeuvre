import React from "react";

let PlayDetails = (props) => {
    return (
        <div class="play-details">
            <img src={props.photo-url-max-width-500} alt={props.title}/>
        </div>
    )
}