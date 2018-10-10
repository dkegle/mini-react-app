import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {setActiveItems} from '../actions/activeitems.jsx';

class PageNumber extends React.Component {
    constructor(props){
        super(props);
        this.click = this.click.bind(this);
    }

    click(){
        this.props.setActiveItems(this.props.url);
    }

    render(){
        if(!this.props.number)
            return <Fragment></Fragment>;
        let n_style = 'page-number';
        if(this.props.active)
            n_style = n_style + ' page-number-active';
        return <div className={n_style} onClick={this.click}>{this.props.number}</div>;
    }
}

export default connect(null, {setActiveItems})(PageNumber);