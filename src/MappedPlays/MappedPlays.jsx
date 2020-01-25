import React from 'react';
import './MappedPlays.css';
const MappedPlays = (props) => {
    return (
        <div className="mapped-plays-and-footer">
            <main className="mapped-plays">
                {props.mappedPlays}
            </main>
            <footer className="footer">
                <ul>
                    <li>
                        Made by Duncan Ritchie using React.js.
                    </li>
                    <li>
                        <a href="https://www.duncanritchie.co.uk" title="Duncan Ritchie&rsquo;s website">My&nbsp;website</a>.
                    </li>
                    <li>
                        <a href="https://theatreinthequarter.co.uk" title="Theatre in the Quarter&rsquo;s website">TiQ&rsquo;s&nbsp;website</a>.
                    </li>
                </ul>
            </footer>
        </div>
        
    )
}
export default MappedPlays