import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {setActiveItems} from '../actions/activeitems.jsx';

class Button extends React.Component {
    constructor(props){
        super(props);
        this.buttonClick = this.buttonClick.bind(this);
    }

    buttonClick(){
        this.props.setActiveItems(this.props.url);
    }

    render(){
        if(!this.props.url)
            return <Fragment></Fragment>
    
        return (<button 
            onClick={this.buttonClick} 
            style={style}>
            {this.props.text} 
        </button>);
    }
}

export default connect(null,{setActiveItems})(Button);

let style = {
    margin: '10px',
    borderRadius: '6px',
    width: '100px',
    height: '35px',
    fontSize: '22px'
};