import React from "react";
import convertCloudinaryUrl from "./convert-cloudinary-url";

let Image = (props) => {
    return (
        <picture>
            <source 
                media="(min-width:2500px)"
                srcset={convertCloudinaryUrl(props.cloudinary,800,"webp")}
                type="image/webp"
            />
            <source
                media="(min-width:2500px)"
                srcset={convertCloudinaryUrl(props.cloudinary,800,"png")}
                type="image/png"
            />
            {/* There are two columns of PlayDetails at min-width:1250px. */}
            <source 
                media="(min-width:1250px)"
                srcset={convertCloudinaryUrl(props.cloudinary,600,"webp")}
                type="image/webp"
            />
            <source
                media="(min-width:1250px)"
                srcset={convertCloudinaryUrl(props.cloudinary,600,"png")}
                type="image/png"
            />
            <source
                media="(min-width:0px)"
                srcset={convertCloudinaryUrl(props.cloudinary,400,"webp")}
                type="image/webp"
            />
            <img
                src={convertCloudinaryUrl(props.cloudinary,400,null)}
                alt={props.title+" "+props.imageType}
                className={props.posterOrientation}
            />
        </picture>
    )
}

export default Image