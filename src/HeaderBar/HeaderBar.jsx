import React from 'react';
import './HeaderBar.css';

const HeaderBar = (props) => {
    return (
        <div className="header-bar">
            <h1 className="main-header">My Theatre in the Quarter &oelig;uvre</h1>
            <p className="filter-paragraph">{props.filterParagraph}.&ensp;
            {props.filter.slug === "" && 
            props.filter.troupe === "" && 
            props.filter.myRole === "" && 
            props.filter.year === "" && 
            !props.filter.upcoming ? null :
            <span className="clear-filters" onClick={props.clearFilter}>Clear filter</span>}
            </p>
        </div>
    )
}

export default HeaderBar