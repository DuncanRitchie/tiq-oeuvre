import React from "react";
import ReactHtmlParser from 'react-html-parser';
import Tag from "./Tag"
import "./PlayDetails.css"
import upcoming from "./upcoming.png"

const PlayDetails = (props) => {
    // Working out whether we're displaying a poster, programme, or collage (if we're displaying any image).
    let imgType = "image"
    if (props.tags.includes("Duncan as poster-designer") || props.tags.includes("Duncan as co-designer")) {
        imgType = "poster"
    }
    else if (props.tags.includes("Duncan as programme-designer")) {
        imgType = "programme"
    }
    else if (props.tags.includes("Duncan as photographer")) {
        imgType = "collage of photos"
    }
    // Calculating whether an Upcoming! sticker should be displayed.
    let date = new Date().getTime()/1000
    let isUpcoming = date<props.epoch
    // Let's create a Tag element for every troupe.
    let byMap = props.byArray.map((troupe,index)=>{return <Tag text={troupe} key={index} handler={()=>{props.troupeHandler(props.byArraySlug[index])}}/>})
    return (
        // If a URL for the image is specified in the data, we don't want a className of play-details-text-only.
        <div className={props.image500 ? "play-details" : "play-details play-details-text-only"}>
            {/* If a URL for the image is specified in the data, we display the image. */}
            {props.image500 ? <img src={props.image500} alt={ReactHtmlParser(props.title)+" "+imgType} className={props.posterOrientation}/> : null}
            {/* Displaying the text */}
            <div className={props.image500 ? "play-text" : "play-text-only"}>
                {/* Displaying the Upcoming! sticker if appropriate. */}
                {isUpcoming ? <img className="upcoming" alt="Upcoming!" src={upcoming} onClick={props.upcomingHandler}/> : null}
                {/* The heading is the play's title */}
                <h2 className="play-title" onClick={()=>{props.slugHandler(props.slug)}}>{ReactHtmlParser(props.title)}</h2>
                {/* Performance dates and troupes */}
                <p className="play-by-p"><span className="subheading">{isUpcoming ? "To be ".concat(props.verb.toLowerCase()) : props.verb}</span> <Tag handler={props.yearHandler} text={props.datesAsText} /> 
                {props.datePrecision === "month" ? <span>{" "}(I can&rsquo;t be more precise than that)</span> : null }
                &nbsp;<span className="subheading">by</span> {byMap}</p>
                {/* Play synopsis */}
                {props.synopsis ? <p className="synopsis"><span className="subheading">Synopsis:</span> {ReactHtmlParser(props.synopsis)}</p> : null}
                {/* List of my roles */}
                <p className="play-roles-p"><span className="subheading">My roles:</span>{" "} 
                    {props.tags.includes("Duncan as actor") ? <Tag handler={props.roleHandler} text="actor"/> : null}
                    {props.tags.includes("Duncan as poster-designer") ? <Tag handler={props.roleHandler} text="poster-designer"/> : null}
                    {props.tags.includes("Duncan as programme-designer") ? <Tag handler={props.roleHandler} text="programme-designer"/> : null}
                    {props.tags.includes("Duncan as lyricist") ? <Tag handler={props.roleHandler} text="lyricist" /> : null}
                    {props.tags.includes("Duncan as photographer") ? <Tag handler={props.roleHandler} text="photographer"/> : null}
                    {props.tags.includes("Duncan as assistant-director") ? <Tag handler={props.roleHandler} text="assistant-director"/> : null}
                    {props.tags.includes("Duncan as co-designer") ? <Tag handler={props.roleHandler} text="co-designer of the poster (with illustration by Alison Pitt)"/> : null}
                </p>
                {/* If I lyricized songs, they are listed. */}
                {props.mySongsLyricized ? <p><span className="subheading">Songs I lyricized:</span> {props.mySongsLyricized.map((song,index)=>{return <span key={index} className="song-title">{ReactHtmlParser(song)}</span>})}</p> : null}
                {/* If there's an example lyric, it's displayed. */}
                {props.exampleLyric ? <p className="example-lyric"><span className="subheading">Example lyric:</span><br/>
                {ReactHtmlParser(props.exampleLyric)}</p> : null}
                {props.pdf ? <p className="see-pdf"><a href={props.pdf} title={"See "+imgType+" as a PDF (on Google Drive)"}><i className="far fa-file"></i>&nbsp; See {imgType} as a PDF</a></p> : null}
            </div>
        </div>
    )
}
export default PlayDetails