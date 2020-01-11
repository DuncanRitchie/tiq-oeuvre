import React from 'react';
import './MappedPlays.css';
const MappedPlays = (props) => {
    return (
        <div className="mapped-plays-and-footer">
            <div className="mapped-plays">
                {props.mappedPlays}
            </div>
            <footer className="footer">
                <ul>
                    <ol>
                        Made by Duncan Ritchie using React.js.
                    </ol>
                    <ol>
                        <a href="https://www.duncanritchie.co.uk" title="Duncan Ritchie&rsquo;s website">My&nbsp;website</a>.
                    </ol>
                    <ol>
                        <a href="https://theatreinthequarter.co.uk" title="Theatre in the Quarter&rsquo;s website">TiQ&rsquo;s&nbsp;website</a>.
                    </ol>
                </ul>
            </footer>
        </div>
        
    )
}
export default MappedPlays