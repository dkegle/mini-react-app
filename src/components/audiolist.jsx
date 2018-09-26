import React from 'react';
import {connect} from 'react-redux';
import AudioElement from './audioelement.jsx';
import {nextPage} from '../actions/audiolist.jsx';

class AudioList extends React.Component {
    constructor(props){
        super();
    }

    componentDidMount(){
		this.props.nextPage();
    }

    render(){
        let elements = '';
        if(this.props.elements){
            elements = this.props.elements.map(
                el => <AudioElement key={el.key} dragon={el.name} />
            );
        }            
        return <div>{elements}</div>;
    }
}

const mapStateToProps = state => ({
    elements: state.audioListReducer
});

export default connect(mapStateToProps, {nextPage})(AudioList);