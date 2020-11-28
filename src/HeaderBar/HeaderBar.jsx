import React from 'react';
import { Link } from 'react-router-dom';
import Nav from './Nav.jsx';
import './HeaderBar.css';

const HeaderBar = (props) => {
    return (
        <header>
            <Nav />
            <h1 className="header-heading">My œuvre with Theatre in the Quarter and related groups</h1>
            <p className="filter-paragraph">
                {props.filterParagraph}. {props.rubric}&ensp;
                {props.filter.slug === "" && 
                props.filter.troupe === "" && 
                props.filter.role === "" && 
                props.filter.year === "" && 
                !props.filter.upcoming ? null :
                <Link className="clear-filter" title="Clear filter" to="/?">Clear filter</Link>}
            </p>
        </header>
    )
}
export default HeaderBar