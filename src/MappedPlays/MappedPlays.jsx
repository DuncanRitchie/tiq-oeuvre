import React from 'react';
import './MappedPlays.css';

const MappedPlays = (props) => {
    return (
        <div className="mapped-plays">
            {props.mappedPlays}
        </div>
    )
}

export default MappedPlays