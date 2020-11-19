import React, { Component } from 'react';
import './Nav.css';
import '../App.css';

class Nav extends Component {
    constructor(props) {
        super(props)
        this.state = {
            menuOpen: false
        }
    }
    toggleMenuOpen = () => {
        this.setState({menuOpen: !this.state.menuOpen});
    }

    render() {
        let menuOpen = this.state.menuOpen;
        return (
            <nav>
                {/* Checkbox is visually hidden but operated via the label. 
                It determines whether the ul is hidden or not. */}
                <input
                    type="checkbox"
                    id="nav-open-toggler"
                    onChange={this.toggleMenuOpen}
                    tabIndex="0"
                    aria-haspopup="true"
                />
                <label htmlFor="nav-open-toggler" title="Open or close the nav menu">
                    <img className="header-icon" alt="Duncan’s fulmar icon. Click to open or close the nav menu" src="https://www.duncanritchie.co.uk/favicon-96x96.png"/>
                </label>
                <ul>
                    <li>
                        {menuOpen
                        ? <a href="https://www.duncanritchie.co.uk/" title="Duncan Ritchie’s portfolio">Duncan Ritchie’s website</a>
                        : <span>Duncan Ritchie’s website</span>}
                    </li>
                    <li>
                        {menuOpen
                        ? <a href="https://www.github.com/DuncanRitchie/" title="Duncan Ritchie — GitHub">
                            <i className="fab fa-github"></i>My GitHub page
                          </a>
                        : <span><i className="fab fa-github"></i>My GitHub page</span>}
                    </li>
                    <li>
                        {menuOpen
                        ? <a href="https://www.linkedin.com/in/duncan-ritchie-uk/" title="Duncan Ritchie — LinkedIn">
                            <i className="fab fa-linkedin"></i>My LinkedIn page
                          </a>
                        : <span><i className="fab fa-linkedin"></i>My LinkedIn page</span>}
                    </li>
                    <li>
                        {menuOpen
                        ? <a href="https://theatreinthequarter.co.uk/" title="Theatre in the Quarter’s website">
                            Theatre in the Quarter’s website
                          </a>
                        : <span>Theatre in the Quarter’s website</span>}
                    </li>
                </ul>
            </nav>
        )
    }
}

export default Nav
