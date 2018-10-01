import React, {Fragment} from 'react';
import AudioList from './audiolist.jsx';
import {connect} from 'react-redux';
import Button from './button.jsx';
import Header from './header.jsx';
import {setActiveItems} from '../actions/activeitems.jsx';

class App extends React.Component{
    componentDidMount(){
        // initialize
        const url = 'https://api.mixcloud.com/search/?q=party+time&type=cloudcast';
        this.props.setActiveItems(url);
    }

    render(){
        return (<div style={outer_div}>
            <Header />
            <AudioList items={this.props.items.items} 
                from={this.props.items.active_offset}
                to={this.props.items.active_offset + this.props.items.active_limit}
            />
            <div style={button_div}>
                <Button text="prev" url={this.props.items.prev_page} />
                <Button text="next" url={this.props.items.next_page} />
            </div>
        </div>);
    }
}

const mapStateToProps = state => ({
    items: state.itemsReducer
});

export default connect(mapStateToProps, {setActiveItems})(App);


const button_div = {
    display: 'flex', 
    justifyContent: "center"
}

const outer_div = {
    margin: '0 auto', 
    width: "500px",
    textAlign: 'center'
}