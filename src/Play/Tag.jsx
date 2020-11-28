import React from "react";
import {Link} from "react-router-dom";
import "./Tag.css"

const Tag = (props) => {
    // The first word of the text is displayed in bold, the rest in normal weight.
    const firstWord = props.text.split(" ")[0]
    const restOfText = props.text.replace(firstWord,"")
    return (
        <Link
        className="tag" 
        title={`See all results for ${firstWord}`} 
        to={props.to}
        >
            <span className="first-word">
                {firstWord}
            </span>
            {restOfText}
        </Link>
    )
}

export default Tag