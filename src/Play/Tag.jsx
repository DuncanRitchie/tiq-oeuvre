import React from "react";
import ReactHtmlParser from 'react-html-parser';
import "./Tag.css"

let Tag = (props) => {
    // The first word of the text is displayed in bold, the rest in normal weight.
    const firstWord = props.text.split(" ")[0]
    const restOfText = props.text.replace(firstWord,"")
    return (
        <span 
        className="tag" 
        title={"See all results for "+ReactHtmlParser(firstWord)} 
        onClick={props.handler}
        >
            {ReactHtmlParser(`<span class="first-word">${firstWord}</span>${restOfText}`)}
        </span>
    )
}

export default Tag