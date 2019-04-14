import React from 'react';
import './MappedPlays.css';

const MappedPlays = (props) => {
    return (
        <div className="mapped-plays">
            {props.mappedPlays}
            <div className="footer">
                <p>
                    Made by Duncan Ritchie. <a href="https://www.duncanritchie.co.uk" title="Duncan Ritchie&rsquo;s website">My website</a>. <a href="theatreinthequarter.co.uk" title="Theatre in the Quarter&rsquo;s website">TiQ&rsquo;s website</a>.
                </p>
            </div>
        </div>
    )
}

export default MappedPlays