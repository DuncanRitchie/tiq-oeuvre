import React from "react";
import ReactHtmlParser from 'react-html-parser';
import "./Tag.css"

let Tag = (props) => {
    return <span className="tag" onClick={props.handler}>{ReactHtmlParser(`<span class="first-word">${props.text.split(" ")[0]}</span>${props.text.replace(props.text.split(" ")[0],"")}`)}</span>
}

export default Tag