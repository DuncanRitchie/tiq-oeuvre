import React from "react";
import ReactHtmlParser from 'react-html-parser';
import convertCloudinaryUrl from "./convert-cloudinary-url";

let Image = (props) => {

    return (
        <img
            src={convertCloudinaryUrl(props.cloudinary,400,null)}
            alt={ReactHtmlParser(props.title)+" "+props.imageType}
            className={props.posterOrientation}
        />
    )
}

export default Image