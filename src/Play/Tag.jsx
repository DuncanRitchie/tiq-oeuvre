import React from "react";
import ReactHtmlParser from 'react-html-parser';
import "./Tag.css"

let Tag = (props) => {
    return <span className="tag" onClick={props.troupeHandler}>{ReactHtmlParser(props.text)}</span>
}

export default Tag