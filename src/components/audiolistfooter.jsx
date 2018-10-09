import React from 'react';
import {connect} from 'react-redux';
import Button from './button.jsx';
import Pagination from './pagination.jsx';

class AudioListFooter extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className='audiolist-footer-div'>
                <Button text="prev" url={this.props.prev_page} />
                <Pagination />
                <Button text="next" url={this.props.next_page} />
            </div>);
    }
}

const mapStateToProps = state => ({
    prev_page: state.itemsReducer.prev_page,
    next_page: state.itemsReducer.next_page
});

export default connect(mapStateToProps, {})(AudioListFooter);