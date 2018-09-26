
export const nextPage = () => dispatch => {
    fetch("https://api.mixcloud.com/search/?q=party+time&type=cloudcast")
    .then(response => {
        response.json().then(
            new_elements => {
                if(response.ok){
                    console.log('received fetch data, dispatching action');
                    dispatch({type: 'NEXT_PAGE', payload: new_elements.data})
                }
                else{
                    console.log(response.status); // invalid request
                }
            })
            .catch(error => {console.log(error)}) // invalid json
    })
    .catch(error => {console.log(error)}); // network error
}