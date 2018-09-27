import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {setActiveList} from '../actions/audiolist.jsx';

class Button extends React.Component {
    constructor(props){
        super(props);
        this.click = this.click.bind(this);
    }

    click(url){
        this.props.setActiveList(url);
    }

    render(){
        let button = <Fragment></Fragment>
        if(this.props.url !== ''){
            button = <button onClick={() => this.click(this.props.url)}>{this.props.name}</button>
        }
        return button;
    }
}


export default connect(null, {setActiveList})(Button);