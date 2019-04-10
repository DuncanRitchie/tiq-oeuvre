import React from "react";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import "./PlayDetails.css"

const PlayDetails = (props) => {
    return (
        <div class="play-details">
            {props.image500 ? <img src={props.image500} alt={ReactHtmlParser(props.title)} class={props.posterOrientation}/> : null}
            <div class={props.image500 ? "play-text" : "play-text-only"}>
                <h1 class="play-title">{ReactHtmlParser(props.title)}</h1>
                <p>{props.verb} <strong>{ReactHtmlParser(props.datesAsText)}</strong> {props.datePrecision == "month" ? <span>(I can&rsquo;t be more precise than that) </span> : null } by {ReactHtmlParser(props.by)}</p>
                <p>My roles: 
                {props.tags.includes("Duncan as Actor") ? <span className="tag"><strong>actor</strong></span> : null}
                {props.tags.includes("Duncan as Poster Designer") ? <span className="tag"><strong>poster</strong> designer</span> : null}
                {props.tags.includes("Duncan as Programme Designer") ? <span className="tag"><strong>programme</strong> designer</span> : null}
                {props.tags.includes("Duncan as Lyricist") ? <span className="tag"><strong>lyricist</strong></span> : null}
                {props.tags.includes("Duncan as Photographer") ? <span className="tag"><strong>photographer</strong></span> : null}
                {props.tags.includes("Duncan as Assistant Director") ? <span className="tag"><strong>assistant-director</strong></span> : null}
                {props.tags.includes("Duncan as CoDesigner") ? <span className="tag"><strong>poster</strong> co-designer (with illustration by Alison Pitt)</span> : null}
                </p>
            </div>
        </div>
    )
}

export default PlayDetails