import {ADD_ITEMS, SET_ACTIVE_LIST, FETCH_ERROR} from './actions.jsx';

export const setActiveList = (url) => (dispatch, getState) => {
    let new_offset = extractOffset(url);
    let new_limit = extractLimit(url);

    const num_elements = getState().audioListReducer.items.length;
    const new_max_index = new_offset + new_limit;
    // all needed items are in store
    if(num_elements > 0 && num_elements >= new_max_index) {        
        const payload = calcPayload(url, new_offset, new_limit);
        dispatch({type: SET_ACTIVE_LIST, payload});
        return;
    }

    // not all items are in store
    fetch(url).then(response => {
        response.json().then(
            new_elements => {
                if(response.ok){
                    dispatch({type: ADD_ITEMS, payload: new_elements.data});

                    if(new_limit === 0)
                        new_limit = new_elements.data.length;

                    let next_page = '';
                    let prev_page = '';
                    if(new_elements.paging.next)
                        next_page = new_elements.paging.next;
                    if(new_elements.paging.previous)
                        prev_page = new_elements.paging.previous;

                    dispatch({type: SET_ACTIVE_LIST, payload: {
                        active_offset: new_offset, active_limit: new_limit, 
                        next_page, prev_page }});
                }
                else{
                    const err = 'Error, invalid request ' + toString(response.status);
                    dispatch({type: FETCH_ERROR, payload: err});
                }
            })
            .catch(error => {
                console.log(error);
                const err = 'Error, invalid JSON data';
                dispatch({type: FETCH_ERROR, payload: err});
            })
    })
    .catch(error => {
        console.log(error);
        const err = 'Fetch failed, network error';
        dispatch({type: FETCH_ERROR, payload: err});
    });
}

// remove substrings '&limit=123&' and '&offset=123&'
const baseUrl = url => {
    let offset_arr = url.match(/&?offset=\d+&?/g);
    let offset_str = offset_arr ? offset_arr[0] : '';

    let new_url = url.replace(offset_str, '');

    let limit_arr = new_url.match(/&?limit=\d+&?/g);
    let limit_str = limit_arr ? limit_arr[0] : '';

    return new_url.replace(limit_str, '');
}

const extractOffset = url => {
    let new_offset = 0;
    let offset_arr = url.match(/&?offset=\d+&?/g);
    if(offset_arr)
        new_offset = parseInt(offset_arr[0].match(/\d+/g));
    return new_offset;
}

const extractLimit = url => {
    let new_limit = 0;
    let limit_arr = url.match(/&?limit=\d+&?/g);
    if(limit_arr)
        new_limit = parseInt(limit_arr[0].match(/\d+/g));
    return new_limit;
}

const calcPayload = (url, new_offset, new_limit) => {
    const payload = {active_offset: new_offset, 
        active_limit: new_limit,
        next_page: null, 
        prev_page: null
    };

    let new_url = baseUrl(url);

    let new_next_offset = new_offset + new_limit;
    let next_page_url = new_url + '&offset=' + new_next_offset.toString() + 
        '&limit=' + new_limit.toString();

    let new_prev_offset = new_offset - new_limit;
    let prev_page_url = '';
    if(new_prev_offset >= 0){
        prev_page_url = new_url + '&offset=' + new_prev_offset.toString() +
            '&limit=' + new_limit.toString();
    }

    payload.next_page = next_page_url;
    payload.prev_page = prev_page_url;

    return payload;
}