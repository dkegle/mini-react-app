import React, {Fragment} from 'react';

let style = {
    margin: '10px',
    borderRadius: '6px',
    width: '100px',
    height: '35px',
    fontSize: '22px'
};

const Button = ({text, url, onclick}) => {
    let button = <Fragment></Fragment>
    if(url !== '')
        button = <button onClick={onclick} style={style}>{text} </button>
    return button;
}

export default Button;