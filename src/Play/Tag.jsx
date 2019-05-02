import React from "react";
import ReactHtmlParser from 'react-html-parser';
import {BrowserRouter as Link} from "react-router-dom";
import "./Tag.css"

let Tag = (props) => {
    return <span className="tag" onClick={props.handler}>{ReactHtmlParser(`<strong>${props.text.split(" ")[0]}</strong>${props.text.replace(props.text.split(" ")[0],"")}`)}</span>
}

export default Tag