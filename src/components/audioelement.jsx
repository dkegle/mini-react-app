import React from 'react';

const AudioElement = ({data}) => {
    let tags = [];
    for(let i=0; i<data.tags.length; i++)
        tags.push(<span key={i} style={tag}>{data.tags[i].name}</span>);

    return <div style={outer}>
        <h3 style={h3}>{data.name}</h3>
        <div style={inner_cols}>
            <div style={cols}>
                <div>User: {data.user.name}</div>
                <div>Length: {data.audio_length}</div>
                <div>Play count: {data.play_count} </div>
                <div style={s_tags}>{tags}</div>
            </div>
            <div>
                <img style={img} src={data.pictures.medium}></img>
            </div>
        </div>
    </div>;
}

export default AudioElement;

const outer = {
    border: "1px solid black",
    borderRadius: "6px",
    margin: "10px",
    padding: "6px",
}

const h3 = {
    textAlign: 'center'
}

const cols = {
    display: 'flex',
    flexDirection: 'column'
};

const inner_cols = {
    display: 'flex',
    justifyContent: 'space-between'
}

const img = {
    borderRadius: '6px'
}

const s_tags = {
    display: 'flex',
    alignItems: 'baseline',
    flexWrap: 'wrap'
}

const tag = {
    border: "0",
    borderRadius: "2px",
    backgroundColor: '#ebedea',
    margin: '5px',
    padding: '5px'
}