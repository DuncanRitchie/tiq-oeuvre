import React, { Component } from 'react';
import './Nav.css';
import '../App.css';

//// The menu-items should not be interactive when the menu is closed (or closing).
//// This is achieved by rendering each item with an <a> element if the menu is open,
//// and a <span> element if closed. (It’s a <span> not a <Fragment> for CSS.)
const MenuItem = (props) => {
    if (props.isOpen) {
        return <a href={props.href} title={props.title}>{props.children}</a>
    }
    else {
        return <span>{props.children}</span>
    }
}

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
                {/* Button is visually hidden but operated via the label. 
                It determines whether the ul is hidden or not. */}
                <button
                    id="nav-open-toggler"
                    type="button"
                    aria-controls="menu"
                    aria-expanded={menuOpen}
                    onClick={this.toggleMenuOpen}
                    className={menuOpen ? "open": "closed"}
                />
                <label htmlFor="nav-open-toggler" title="Open or close the navigation menu">
                    <img className="header-icon" alt="Duncan’s fulmar icon. Click to open or close the navigation menu" src="https://www.duncanritchie.co.uk/favicon-96x96.png"/>
                </label>
                <ul aria-label="Navigation" aria-hidden={!menuOpen}>
                    <li>
                        <MenuItem isOpen={menuOpen} href="https://www.duncanritchie.co.uk/" title="Duncan Ritchie’s portfolio">Duncan Ritchie’s website</MenuItem>
                    </li>
                    <li>
                        <MenuItem isOpen={menuOpen} href="https://www.github.com/DuncanRitchie/" title="Duncan Ritchie — GitHub">
                            <i className="fab fa-github"></i>My GitHub page
                        </MenuItem>
                    </li>
                    <li>
                        <MenuItem isOpen={menuOpen} href="https://www.linkedin.com/in/duncan-ritchie-uk/" title="Duncan Ritchie — LinkedIn">
                            <i className="fab fa-linkedin"></i>My LinkedIn page
                        </MenuItem>
                    </li>
                    <li>
                        <MenuItem isOpen={menuOpen} href="https://theatreinthequarter.co.uk/" title="Theatre in the Quarter’s website">
                            Theatre in the Quarter’s website
                        </MenuItem>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default Nav
