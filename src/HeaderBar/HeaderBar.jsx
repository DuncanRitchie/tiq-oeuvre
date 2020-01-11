import React from 'react';
import './HeaderBar.css';
const HeaderBar = (props) => {
    return (
        <div className="header-bar">
            <h1 className="main-header">My &oelig;uvre with Theatre in the Quarter and related groups</h1>
            <p className="filter-paragraph">
                {props.filterParagraph}. {props.rubric}&ensp;
                {props.filter.slug === "" && 
                props.filter.troupe === "" && 
                props.filter.role === "" && 
                props.filter.year === "" && 
                !props.filter.upcoming ? null :
                <span className="clear-filter" title="Clear filter" onClick={props.clearFilter}>Clear filter</span>}
            </p>
        </div>
    )
}
export default HeaderBar