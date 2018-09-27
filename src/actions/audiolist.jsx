import {ADD_ITEMS, SET_ACTIVE_LIST, FETCH_ERROR} from './actions.jsx';

export const setActiveList = (url) => (dispatch, getState) => {
    let new_offset = 0;
    let offset_arr = url.match(/&?offset=\d+&?/g);
    if(offset_arr)
        new_offset = parseInt(offset_arr[0].match(/\d+/g));

    let new_limit = 0;
    let limit_arr = url.match(/&?limit=\d+&?/g);
    if(limit_arr)
        new_limit = parseInt(limit_arr[0].match(/\d+/g));

    let state = getState().audioListReducer;

    if(state.items.length > 0 && 
        state.items.length >= new_offset + new_limit)
    {
        console.log("already in store, activating");
        let offset_arr = url.match(/&?offset=\d+&?/g);
        let offset_str = offset_arr ? offset_arr[0] : '';

        let new_url = url.replace(offset_str, '');

        let limit_arr = new_url.match(/&?limit=\d+&?/g);
        let limit_str = limit_arr ? limit_arr[0] : '';

        new_url = new_url.replace(limit_str, '');

        let next_page = new_url + '&offset=' + (new_offset + new_limit).toString();
        next_page = next_page + '&limit=' + new_limit.toString();

        let new_prev_offset = new_offset - new_limit;
        let prev_page = '';
        if(new_prev_offset >= 0){
            prev_page = new_url + '&offset=' + new_prev_offset.toString();
            prev_page = prev_page + '&limit=' + new_limit.toString();
        }            

        dispatch({type: SET_ACTIVE_LIST, payload: {
            active_offset: new_offset, active_limit: new_limit, 
            next_page, prev_page }});

        return;
    }

    console.log("not yet in store, loading");
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