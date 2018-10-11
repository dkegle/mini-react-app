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
        let on_click = this.buttonClick;
        let class_name = 'pagination-button';
        if(!this.props.url){
            on_click = undefined;
            class_name = 'inactive-button'
        }
    
        return (<button 
            onClick={on_click} 
            className={class_name}>
            {this.props.text} 
        </button>);
    }
}

export default connect(null,{setActiveItems})(Button);
