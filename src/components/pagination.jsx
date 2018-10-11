import React from 'react';
import {connect} from 'react-redux';
import PageNumber from './pagenumber.jsx';
import {composeUrl} from '../actions/activeitems.jsx';

class Pagination extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        let page_numbers = [1,2,3,4,5].map(i => {
            let midpoint = Math.max(this.props.cur_page, 3);
            let cp_number = midpoint + (i - 3);
            let active = cp_number === this.props.cur_page;
            let cp_limit = this.props.active_limit;
            let base_offset = this.props.active_offset - (
                this.props.cur_page - 1)*cp_limit;
            let cp_offset = base_offset + (cp_number-1)*cp_limit;
            let cp_url = composeUrl(this.props.next_page, cp_offset, cp_limit);
            return <PageNumber key={i} number={cp_number} url={cp_url} active={active} />
        });

        return (
            <div className="pagination-div">{page_numbers}</div>
        );
    }
}

const mapStateToProps = state => ({
    cur_page: state.itemsReducer.cur_page,
    next_page: state.itemsReducer.next_page,
    active_offset: state.itemsReducer.active_offset,
    active_limit: state.itemsReducer.active_limit
});

export default connect(mapStateToProps, {})(Pagination);