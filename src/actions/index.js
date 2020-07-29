//send some actions to bindActionCreators to create Action which will be listened by 'reducers' in reducers/index.js

export const select = (task) =>{
    return{
        type:"TASK_SELECTED",
        payload:task
    }
};

export const add = (newTask) =>{
    return{
        type:"TASK_ADD",
        payload:newTask
    }
};

export const deleteTask = (TaskForDelete) =>{
    return{
        type:"TASK_DELETE",
        payload:TaskForDelete
    }
};

export const editTask = (editTask,i) =>{
    return{
        type:"TASK_EDIT",
        payload:[editTask,i]
    }
};

