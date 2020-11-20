import React from "react";
import {Link} from "react-router-dom";
import Tag from "./Tag"
import Image from "./Image"
import "./PlayDetails.css"
import convertCloudinaryUrl from "./convert-cloudinary-url";
import upcoming from "./upcoming.png"

const PlayDetails = (props) => {
    const {
        byArray,
        byArraySlug,
        cloudinary,
        datePrecision,
        datesAsText,
        epochLastPerformance,
        exampleLyric,
        posterOrientation,
        myRoles,
        mySongsLyricized,
        slug,
        synopsis,
        title,
        verb,
    } = props.play;

    const {
        numPlays,
        roleHandler,
        slugHandler,
        troupeHandler,
        upcomingHandler,
        yearHandler,
    } = props;

    // Working out whether we’re displaying a poster, programme, or collage (if we’sre displaying any image).
    let imageType = "image"
    if (myRoles.includes("poster-designer") || myRoles.includes("co-designer")) {
        imageType = "poster"
    }
    else if (myRoles.includes("programme-designer")) {
        imageType = "programme"
    }
    else if (myRoles.includes("photographer")) {
        imageType = "collage of photos"
    }
    // Calculating whether an Upcoming! sticker should be displayed.
    let date = new Date().getTime()/1000
    let isUpcoming = date < epochLastPerformance
    // Let’s create a Tag element for every troupe.
    let byMap = byArray.map((troupe,index) => <Tag text={troupe} key={index} handler={()=>{troupeHandler(byArraySlug[index])}}/>)
    // Let’s create a Tag element for every role.
    let rolesMap = myRoles.sort().map((role, index) => <Tag handler={roleHandler} text={role} key={index}/>);
    // Let’s create a <span> element for every song I lyricized.
    const songsMap = mySongsLyricized?.map((song,index)=> <span key={index} className="song-title">{song}</span>)
    // If a URL for the image is specified in the data, we don’t want a className of play-details-text-only.
    let className = (cloudinary ? "play-details" : "play-details play-details-text-only") + " oneOf"+numPlays;
    return (
        <section className={className}>
            {/* If a URL for the image is specified in the data, we display the image. */}
            {cloudinary ? <Image cloudinary={cloudinary} imageType={imageType} title={title} posterOrientation={posterOrientation}/> : null}
            {/* Displaying the text */}
            <div className={cloudinary ? "play-text" : "play-text-only"}>
                {/* Displaying the Upcoming! sticker if appropriate. Both the `to` and the `onClick` are useful. */}
                {isUpcoming
                ?   <Link to="/?upcoming=true" onClick={upcomingHandler} title="See all upcoming productions">
                      <img className="upcoming" alt="Upcoming!" src={upcoming}/>
                    </Link>
                : null}
                {/* The heading is the play’s title, with a <button> for interactivity. */}
                <h2 className="play-title">
                    <button onClick={()=>{slugHandler(slug)}} title={`See only “${title}”`}>
                        {title}
                    </button>
                </h2>
                {/* Performance dates and troupes */}
                <p className="play-by-p"><span className="subheading">{isUpcoming ? "To be ".concat(verb.toLowerCase()) : verb}</span> <Tag handler={yearHandler} text={datesAsText} /> 
                {datePrecision === "month" ? <span>{" "}(I can’t be more precise than that)</span> : null }
                &nbsp;<span className="subheading">by</span> {byMap}</p>
                {/* Play synopsis */}
                {synopsis ? <p className="synopsis"><span className="subheading">Synopsis:</span> {synopsis}</p> : null}
                {/* List of my roles */}
                <p className="play-roles-p">
                    <span className="subheading">
                        My roles:
                    </span>
                    {" "}
                    {rolesMap}
                </p>
                {/* If I lyricized songs, they are listed. */}
                {mySongsLyricized
                    ? <p>
                        <span className="subheading">Songs I lyricized:</span>
                        {songsMap}                        
                    </p>
                    : null}
                {/* If there’s an example lyric, it’s displayed. */}
                {exampleLyric 
                    ? <p className="example-lyric">
                        <span className="subheading">Example lyric:</span><br/>
                        {/* Convert newlines to line-breaks. */}
                        {exampleLyric.split("\n").map(line=><>{line}<br /></>)}
                    </p>
                    : null}
                {cloudinary ? <p className="see-pdf"><a href={convertCloudinaryUrl(cloudinary,1280,"pdf")} title={"See "+imageType+" as a PDF"}><i className="far fa-file"></i>See {imageType} as a PDF</a></p> : null}
            </div>
        </section>
    )
}

export default PlayDetails