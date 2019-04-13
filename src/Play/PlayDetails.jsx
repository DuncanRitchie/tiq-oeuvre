import React from "react";
import ReactHtmlParser from 'react-html-parser';
import Tag from "./Tag"
import "./PlayDetails.css"

const PlayDetails = (props) => {
    // const troupeHandler = props.troupeHandler;
    let byMap = props.byArray.map((troupe,index)=>{return <Tag text={troupe} key={index} handler={props.troupeHandler}/>})
    return (
        <div className="play-details">
            {props.image500 ? <img src={props.image500} alt={ReactHtmlParser(props.title)} className={props.posterOrientation}/> : null}
            <div className={props.image500 ? "play-text" : "play-text-only"}>
                <h2 className="play-title" onClick={()=>{props.titleHandler(props.title)}}>{ReactHtmlParser(props.title)}</h2>
                <p className="play-by-p">{props.verb} <Tag handler={props.yearHandler} text={props.datesAsText} /> 
                {props.datePrecision === "month" ? <span>&nbsp;(I can&rsquo;t be more precise than that)</span> : null }
                &nbsp;by {byMap}</p>
                {props.synopsis ? <p>Synopsis: {ReactHtmlParser(props.synopsis)}</p> : null}
                <p>My roles: 
                {props.tags.includes("Duncan as Actor") ? <Tag handler={props.myRoleHandler} text="actor"/> : null}
                {props.tags.includes("Duncan as Poster Designer") ? <Tag handler={props.myRoleHandler} text="poster designer"/> : null}
                {props.tags.includes("Duncan as Programme Designer") ? <Tag handler={props.myRoleHandler} text="programme designer"/> : null}
                {props.tags.includes("Duncan as Lyricist") ? <Tag handler={props.myRoleHandler} text="lyricist" /> : null}
                {props.tags.includes("Duncan as Photographer") ? <Tag handler={props.myRoleHandler} text="photographer"/> : null}
                {props.tags.includes("Duncan as Assistant Director") ? <Tag handler={props.myRoleHandler} text="assistant-director"/> : null}
                {props.tags.includes("Duncan as CoDesigner") ? <Tag handler={props.myRoleHandler} text="poster co-designer (with illustration by Alison Pitt)"/> : null}</p>
    {props.mySongsLyricized ? <p>Songs I lyricized: {props.mySongsLyricized.map((song,index)=>{return <span key={index} className="song-title">{ReactHtmlParser(song)}</span>})}</p> : null}
                {props.exampleLyric ? <p>Example lyric:<br/>
                {ReactHtmlParser(props.exampleLyric)}</p> : null}
            </div>
        </div>
    )
}

export default PlayDetails