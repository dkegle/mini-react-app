import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {setActiveItems} from '../actions/activeitems.jsx';

class PageNumber extends React.Component {
    constructor(props){
        super(props);
        this.click = this.click.bind(this);
    }

    click(){
        console.log(this.props.number);
    }

    render(){
        if(!this.props.number)
            return <Fragment></Fragment>;
        let n_style = 'page-number';
        if(this.props.number === this.props.cur_page)
            n_style = n_style + ' page-number-active';
        return <div className={n_style} onClick={this.click}>{this.props.number}</div>;
    }
}

const mapStateToProps = state => ({
    cur_page: state.itemsReducer.cur_page,
});

export default connect(mapStateToProps, {setActiveItems})(PageNumber);