import React from 'react';
import AudioElement from './audioelement.jsx';

class AudioList extends React.Component {
    constructor(props){
        super();
        this.state = {elements: null};
    }

    componentDidMount(){
		fetch("https://api.mixcloud.com/search/?q=party+time&type=cloudcast")
		.then(response => {
			response.json().then(
				data => {
					if(response.ok){
						this.setState({elements: data})
					}
					else{
						console.log(response.status); // invalid request
					}
                })
                .catch(error => {console.log(error)}) // invalid json
		})
		.catch(error => {console.log(error)}); // network error
    }

    render(){
        let elements = '';
        if(this.state.elements !== null){
            elements = this.state.elements.data.map(
                el => <AudioElement key={el.key} dragon={el.name} />
            );
        }            
        return <div>{elements}</div>;
    }
}

export default AudioList;