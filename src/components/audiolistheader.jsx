import React from 'react';
import {connect} from 'react-redux';
import {changeNumItems} from '../actions/activeitems.jsx';

class AudioListHeader extends React.Component {
    constructor(props){
        super(props);
        this.getOptions = this.getOptions.bind(this);
    }

    getOptions(){
        const per_page = [5,10,15,20];
        const retval = [];
        const selected_n = this.props.limit;
        for(let i=0; i<per_page.length; i++){
            let attrs = {key: i, name: per_page[i]};
            if(per_page[i] === selected_n)
                retval.push(<option selected {...attrs}>{per_page[i]}</option>);
            else
                retval.push(<option {...attrs} >{per_page[i]}</option>);

        }
        return retval;
    }

    render(){
        const per_page_options = this.getOptions();
        const from = this.props.offset + 1;
        const to = this.props.offset + this.props.limit;

        return (<div className='audiolist-header-div'>
            <div>Showing {from} to {to}</div>
            <div>
                <span>Items per page</span>
                <select onChange={e => 
                    this.props.changeNumItems(parseInt(e.target.value))}>
                    {per_page_options}
                </select>
            </div>
        </div>);
    }
}

const mapStateToProps = state => ({
    offset: state.itemsReducer.active_offset,
    limit: state.itemsReducer.active_limit
});

export default connect(mapStateToProps,{changeNumItems})(AudioListHeader);