// TODO: Add Tasks related reducers here:
// We should be able to CRUD Task entities
// Every Task should include:
// 'task_id', 'task_title', 'task_description', 'deadline' and 'assignee' (some percon's name)

const initialState = {
    tasks : [
        {
            task_id:0,
            task_title:"CSS editing",
            task_description:"About task 1",
            deadline:"2019-05-05",
            assignee:"Anton Smirnov"
        },
        {
            task_id:1,
            task_title:"Add form for clients",
            task_description:"About task 2",
            deadline:"2019-04-04",
            assignee:"Yury Misiyevich"
        },
        {
            task_id:2,
            task_title:"Backend debug",
            task_description:"About task 3",
            deadline:"2019-06-02",
            assignee:"Dima Petrov"
        }
    ]
};



export default initialState;
