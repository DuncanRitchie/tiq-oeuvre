import React from 'react';
import './Nav.css';
import '../App.css';

const Nav = () => {
    return (
        <nav>
            {/* Checkbox is hidden but operated via the label. 
            It determines whether the ul is hidden or not. */}
            <input type="checkbox" id="nav-open-toggler" />
            <label htmlFor="nav-open-toggler" title="Open or close the nav menu">
                <img className="header-icon" alt="Duncan’s fulmar icon. Click to open or close the nav menu" src="https://www.duncanritchie.co.uk/favicon-96x96.png"/>
            </label>
            <ul>
                <li>
                    <a href="https://www.duncanritchie.co.uk/" title="Duncan Ritchie’s portfolio">
                        Duncan Ritchie’s website
                    </a>
                </li>
                <li>
                    <a href="https://www.github.com/DuncanRitchie/" title="Duncan Ritchie — GitHub">
                        <i className="fab fa-github"></i>My GitHub page
                    </a>
                </li>
                <li>
                    <a href="https://www.linkedin.com/in/duncan-ritchie-uk/" title="Duncan Ritchie — LinkedIn">
                    <i className="fab fa-linkedin"></i>My LinkedIn page
                    </a>
                </li>
                <li>
                    <a href="https://theatreinthequarter.co.uk/" title="Theatre in the Quarter’s website">
                        Theatre in the Quarter’s website
                    </a>
                </li>
            </ul>
        </nav>
    )
}

export default Nav