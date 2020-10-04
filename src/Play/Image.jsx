import React from "react";
import convertCloudinaryUrl from "./convert-cloudinary-url";

let Image = (props) => {

    return (
        // I’ll comment out the <picture> code if/when I want to deal with the CSS issues it creates.
        // (Ie, the image appears too small at certain viewport sizes if it’s inside the <picture> element.)
        //<picture>
            //<source media="(min-width:0px)" srcset={convertCloudinaryUrl(props.cloudinary,400,"webp")}/>
            <img
                src={convertCloudinaryUrl(props.cloudinary,400,null)}
                alt={props.title+" "+props.imageType}
                className={props.posterOrientation}
            />
        //</picture>
    )
}

export default Image