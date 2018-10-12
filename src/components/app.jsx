import React from 'react';
import AudioList from './audiolist.jsx';
import {connect} from 'react-redux';
import Header from './header.jsx';
import AudioListHeader from './audiolistheader.jsx';
import AudioListFooter from './audiolistfooter.jsx';
import {setActiveItems} from '../actions/activeitems.jsx';

class App extends React.Component{
    componentDidMount(){
        // initialize
        const url = 'https://api.mixcloud.com/search/?q=party+time&type=cloudcast';
        this.props.setActiveItems(url);
    }

    render(){
        return (<div className='app-div'>
            <Header />
            <AudioListHeader />
            <AudioList 
                items={this.props.items} 
                from={this.props.active_offset}
                to={this.props.active_offset + this.props.active_limit}
            />
            <AudioListFooter />
        </div>);
    }
}

const mapStateToProps = state => ({
    items: state.itemsReducer.items,
    active_offset: state.itemsReducer.active_offset,
    active_limit: state.itemsReducer.active_limit
});

export default connect(mapStateToProps, {setActiveItems})(App);

