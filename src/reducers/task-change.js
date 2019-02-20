//send it to 'reducers' in reducers/index.js to generate and change task list
import initialState from './tasks';

export default function changing (state=initialState,action){
    switch (action.type){
        case "TASK_ADD":

            let newTask = action.payload;
            (state.tasks.length===0)
                ? newTask.task_id=0
                : newTask.task_id=state.tasks[state.tasks.length-1].task_id+1;//set correct id to newTask
            return  {
                tasks: [...state.tasks,newTask]
            };
            break;

        case "TASK_DELETE":

            state.tasks.splice(action.payload,1);
            console.log(state.tasks);
            return  {
                tasks: [...state.tasks]
            };
            break;
        /*case "TASK_CHANGE":
            return  {
                ...state,
                tasks: [...state.tasks, action.payload]
            };
            break;*/
        default:
            return state;
    }
}