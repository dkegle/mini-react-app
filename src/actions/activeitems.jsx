import {ADD_ITEMS, SET_ACTIVE_ITEMS, FETCH_ERROR} from './actions.jsx';

export const setActiveItems = url => async (dispatch, getState) => {
    let new_offset = extractOffset(url);
    let new_limit = extractLimit(url);

    const new_max_index = new_offset + new_limit;
    const cur_length = getState().itemsReducer.items.length;

    // not enough items are in store, fetch additional
    if(cur_length == 0 || cur_length < new_max_index) {
        const num_missing = new_max_index - cur_length;
        const missing_items_url = composeUrl(url, cur_length, num_missing);
        try{
            const response = await fetch(missing_items_url);
            if(!response.ok)
                throw "Error, invalid request " + response.status.toString();
            const new_items = await response.json();
            dispatch({type: ADD_ITEMS, payload: new_items.data});
        }
        catch(err){
            dispatch({type: FETCH_ERROR, payload: err});
            return;
        }
    }

    const payload = calcPayload(url, new_offset, new_limit);
    dispatch({type: SET_ACTIVE_ITEMS, payload});
}

export const changeNumItems = (num_items) => (dispatch, getState) => {
    const t_url = getState().itemsReducer.next_page;
    const offset = getState().itemsReducer.active_offset;
    const new_url = composeUrl(t_url, offset, num_items);
    setActiveItems(new_url)(dispatch, getState);
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

const composeUrl = (url, offset, limit) => {
    let new_url = baseUrl(url);
    return new_url + '&offset=' + offset.toString() + '&limit=' + limit.toString();
}

const extractOffset = url => {
    let new_offset = 0; // default
    let offset_arr = url.match(/&?offset=\d+&?/g);
    if(offset_arr)
        new_offset = parseInt(offset_arr[0].match(/\d+/g));
    return new_offset;
}

const extractLimit = url => {
    let new_limit = 20; // default
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

    let new_next_offset = new_offset + new_limit;
    payload.next_page = composeUrl(url, new_next_offset, new_limit);

    payload.prev_page = '';
    if(new_offset === 0)
        return payload;

    let new_prev_offset = new_offset - new_limit;
    if(new_prev_offset < 0){
        new_prev_offset = 0;
    }
    
    payload.prev_page = composeUrl(url, new_prev_offset, new_limit);

    return payload;
}