import React from 'react';

const Tag = ({name}) => {
    return (<span style={tag}>{name}</span>);
}

export default Tag;

const tag = {
    border: "0",
    borderRadius: "2px",
    backgroundColor: '#ebedea',
    margin: '5px',
    padding: '5px'
}