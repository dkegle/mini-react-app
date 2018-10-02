import React from 'react';
import Tag from './tag.jsx';

const AudioElement = ({trackname, username, audio_length, play_count, img, tags}) => {
    let tags_list = [];
    for(let i=0; i<tags.length; i++)
        tags_list.push(<Tag key={i} name={tags[i].name} />);

    return <div className='audio-element'>
        <div className='content-title'>
            <h3>{trackname}</h3>
        </div>
        <div className='content-main'>
            <div className='info'>
                <div>User: {username}</div>
                <div>Length: {audio_length}</div>
                <div>Play count: {play_count} </div>
                <div className='tag-div'>
                    {tags_list}
                </div>
            </div>
            <div>
                <img className='element-img' src={img}></img>
            </div>
        </div>
    </div>;
}

export default AudioElement;