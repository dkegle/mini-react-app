import React from 'react';

class AudioElement extends React.Component {
    constructor(props){
        super(props);
        this.state = {dragon: props.dragon};
    }
    render(){
        return <div>Dragon: {this.state.dragon}</div>;
    }
}

export default AudioElement;