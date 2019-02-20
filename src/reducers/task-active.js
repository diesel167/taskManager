//send it to 'reducers' in reducers/index.js to store selected task in state
export default function(state=null,action){
    switch (action.type){
        case "TASK_SELECTED":
            return action.payload;
            break;
        default:
            return state;
    }
}