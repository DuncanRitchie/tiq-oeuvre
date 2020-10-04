import React from "react";
import "./Tag.css"

let Tag = (props) => {
    // The first word of the text is displayed in bold, the rest in normal weight.
    const firstWord = props.text.split(" ")[0]
    const restOfText = props.text.replace(firstWord,"")
    return (
        <span 
        className="tag" 
        title={`See all results for ${firstWord}`} 
        onClick={props.handler}
        >
            <span className="first-word">
                {firstWord}
            </span>
            {restOfText}
        </span>
    )
}

export default Tag