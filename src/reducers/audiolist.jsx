import {ADD_ITEMS, SET_ACTIVE_LIST, FETCH_ERROR} from './../actions/actions.jsx';

const initialState = {
    active_offset: 0,
    active_limit: 0,
    next_page: '',
    prev_page: '',
    items: []
}

const audioListReducer = (state = initialState, action) => {
    switch(action.type){
        case ADD_ITEMS:
            const new_state = Object.assign({}, state);
            new_state.items.push.apply(new_state.items, action.payload);
            return new_state;
        case SET_ACTIVE_LIST:
            const new_state_ = Object.assign({}, state);
            new_state_.active_offset = action.payload.active_offset;
            new_state_.active_limit = action.payload.active_limit;
            new_state_.next_page = action.payload.next_page;
            new_state_.prev_page = action.payload.prev_page;
            return new_state_;
        case FETCH_ERROR:
            console.log(action.payload);
            return state;
        default:
            return state;
    }
}

export default audioListReducer;