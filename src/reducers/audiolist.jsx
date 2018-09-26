
const audioListReducer = (state = [], action) => {
    switch(action.type){
        case 'NEXT_PAGE':
            console.log('reducer changing state');
            var new_state = Object.assign([], action.payload);
            return new_state;
        default:
            return state;
    }
}

export default audioListReducer;