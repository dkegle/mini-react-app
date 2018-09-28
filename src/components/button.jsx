import React from 'react';

const Button = ({text, onclick}) => {
    return (<button onClick={onclick} style={style}>
        {text} 
    </button>);
}

export default Button;

let style = {
    margin: '10px',
    borderRadius: '6px',
    width: '100px',
    height: '35px',
    fontSize: '22px'
};