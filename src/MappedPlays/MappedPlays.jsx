import React from 'react';
import './MappedPlays.css';
const MappedPlays = (props) => {
    return (
        <div className="mapped-plays-and-footer">
            <div className="mapped-plays">
                {props.mappedPlays}
            </div>
            <div className="footer">
                <p>
                    Made by Duncan Ritchie using React.js. <a href="https://www.duncanritchie.co.uk" title="Duncan Ritchie&rsquo;s website">My&nbsp;website</a>. <a href="https://theatreinthequarter.co.uk" title="Theatre in the Quarter&rsquo;s website">TiQ&rsquo;s&nbsp;website</a>.
                </p>
            </div>
        </div>
        
    )
}
export default MappedPlays