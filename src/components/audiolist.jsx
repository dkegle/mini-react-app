import React, {Fragment} from 'react';
import AudioElement from './audioelement.jsx';

const AudioList = ({items, from, to}) => {
    let elements = <Fragment></Fragment>;
    if(items.length > 0){
        elements = [];
        for(let i=from; i < to; i++){
            elements.push(<AudioElement 
                key={items[i].key} 
                data={items[i]}
                trackname={items[i].name}
                username={items[i].user.name} 
                play_count={items[i].play_count}
                audio_length={items[i].audio_length}
                img={items[i].pictures.medium}
                tags={items[i].tags}
                />);
        }
    }

    return (<Fragment>
        {elements}
    </Fragment>);
}

export default AudioList;
