import React from 'react';
import PageNumber from './pagenumber.jsx';

const Pagination = () => {
    let page_numbers = [1,2,3,4,5].map(i => <PageNumber key={i} number={i}/>);

    return (
        <div>{page_numbers}</div>
    );
}

export default Pagination;