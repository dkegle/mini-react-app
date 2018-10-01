import React from 'react';
import Tag from './tag.jsx';

const AudioElement = ({trackname, username, audio_length, play_count, img, tags}) => {
    let tags_list = [];
    for(let i=0; i<tags.length; i++)
        tags_list.push(<Tag key={i} name={tags[i].name} />);

    return <div style={outer}>
        <h3 style={h3}>{trackname}</h3>
        <div style={inner_cols}>
            <div style={cols}>
                <div>User: {username}</div>
                <div>Length: {audio_length}</div>
                <div>Play count: {play_count} </div>
                <div style={s_tags}>{tags_list}</div>
            </div>
            <div>
                <img style={img_s} src={img}></img>
            </div>
        </div>
    </div>;
}

export default AudioElement;


const outer = {
    border: "1px solid black",
    borderRadius: "6px",
    margin: "10px",
    padding: "6px"
}

const h3 = {
    textAlign: 'center'
}

const cols = {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left'
};

const inner_cols = {
    display: 'flex',
    justifyContent: 'space-between'
}

const img_s = {
    borderRadius: '6px'
}

const s_tags = {
    display: 'flex',
    alignItems: 'baseline',
    flexWrap: 'wrap'
}