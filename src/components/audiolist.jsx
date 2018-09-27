import React from 'react';
import {connect} from 'react-redux';
import AudioElement from './audioelement.jsx';
import Button from './button.jsx';
import {setActiveList} from '../actions/audiolist.jsx';

class AudioList extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        // initialize
        const url = 'https://api.mixcloud.com/search/?q=party+time&type=cloudcast';
		this.props.setActiveList(url);
    }

    render(){
        let elements = '';
        let prev_button = '';
        let next_button = '';
        if(this.props.elements.items.length > 0){
            elements = [];
            let start = this.props.elements.active_offset;
            let end = this.props.elements.active_offset + this.props.elements.active_limit;
            for(let i=start; i < end; i++){
                let el = this.props.elements.items[i];
                elements.push(<AudioElement key={el.key} data={el} />);
            }
            const next_page = this.props.elements.next_page;
            const prev_page = this.props.elements.prev_page;
            prev_button = <Button text="prev" url={prev_page} 
                onclick={() => this.props.setActiveList(prev_page)}/>;
            next_button = <Button text="next" url={next_page} 
                onclick={() => this.props.setActiveList(next_page)}/>;
        }

        return (<div style={{margin: '0 auto', width: "500px" }}>
            {elements}
            <div style={{display: 'flex', justifyContent: "center"}}>
                {prev_button}
                {next_button}
            </div>
        </div>);
    }
}

const mapStateToProps = state => ({
    elements: state.audioListReducer
});

export default connect(mapStateToProps, {setActiveList})(AudioList);