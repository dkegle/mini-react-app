import React from 'react';
import Tag from './tag.jsx';

const AudioElement = ({trackname, username, audio_length, play_count, img, tags}) => {
    let tags_list = [];
    for(let i=0; i<tags.length; i++)
        tags_list.push(<Tag key={i} name={tags[i].name} />);

    let audio_time = '';
    const hours = Math.floor(audio_length/3600);
    if(hours > 0){
        audio_length %= 3600;
        audio_time += hours.toString() + "h ";
    }
        
    const minutes = Math.floor(audio_length/60);
    if(minutes > 0){
        audio_length %= 60;
        audio_time += minutes.toString() + "m ";
    }
    const seconds = audio_length%60;
    audio_time += seconds.toString() + "s";

    return <div className='audio-element'>
        <div className='content-title'>
            <h3>{trackname}</h3>
        </div>
        <div className='content-main'>
            <div className='info'>
                <div><span>User:</span> {username}</div>
                <div><span>Length:</span> {audio_time}</div>
                <div><span>Play count:</span> {play_count} </div>
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