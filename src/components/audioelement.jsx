import React from 'react';
import Tag from './tag.jsx';

const AudioElement = ({trackname, username, audio_length, play_count, img, tags}) => {
    let tags_list = [];
    for(let i=0; i<tags.length; i++)
        tags_list.push(<Tag key={i} name={tags[i].name} />);

    return <div className='outer'>
        <h3 className='h3'>{trackname}</h3>
        <div className='inner_cols'>
            <div className='cols'>
                <div>User: {username}</div>
                <div>Length: {audio_length}</div>
                <div>Play count: {play_count} </div>
                <div className='s_tags'>{tags_list}</div>
            </div>
            <div>
                <img className='img_s' src={img}></img>
            </div>
        </div>
    </div>;
}

export default AudioElement;