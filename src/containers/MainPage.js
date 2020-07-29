import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {select} from '../actions/index.js'
import {deleteTask} from '../actions/index.js'
import {editTask} from '../actions/index.js'
import AddTask from './AddTask.js'
import Details from "./Details.js";
import EditTask from "./EditTask.js";


class MainPage extends Component {

    constructor() {
        super();
        this.state = {
            addTaskVisible: false,
            editTaskVisible: false
        };
        this.changeAddTaskVisible = this.changeAddTaskVisible.bind(this);
        this.changeEditTaskVisible = this.changeEditTaskVisible.bind(this);
    }



    //function for AddTask component for hiding itself after Submit click
    changeAddTaskVisible=()=>{
        this.setState({
            addTaskVisible:!this.state.addTaskVisible,
            editTaskVisible:false

        });
    };

    changeEditTaskVisible=()=>{
        this.setState({
            editTaskVisible:!this.state.editTaskVisible,
            addTaskVisible:false
        });
    };

    createTable=()=>{
        let rows=[];    //create rows container

        this.props.tasksProp.tasks.map((task,i)=>{
            let cells=[];
            cells.push(<td>{task.task_title}</td>);
            cells.push(<td>{task.assignee}</td>);
            cells.push(<td>{task.deadline}</td>);
            cells.push(<td><button className="Btn delete" onClick={(e)=>{
                this.props.deleteTask(i);
                this.props.select('');
                e.stopPropagation();
            }}/><button className="Btn edit" onClick={()=>{
                this.setState({
                    i:i,
                    task_id:task.task_id,
                    taskName: task.task_title,
                    assignee: task.assignee,
                    date: task.deadline,
                    description: task.task_description,
                    editTaskVisible: true,
                    addTaskVisible: false,
                });
            }}/></td>);
            rows.push(<tr tabIndex="0" onClick={()=>{this.props.select(task)}}>{cells}</tr>);    //join filled cells  container to rows container (join a row)
            return 1
        });

        return(
            <table className="main">
                <thead><tr tabIndex="0"><th>Name</th><th>Assignee</th><th>Deadline</th><th>Actions</th></tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>);
    };

    render() {
        return(
            <div className="box">
                <div className="taskList">{this.createTable()}</div>
                    {
                        (!(this.state.addTaskVisible||this.state.editTaskVisible))
                            ? <button className="Btn addBtn" onClick={()=>{
                                this.setState({addTaskVisible:!this.state.addTaskVisible,
                                               editTaskVisible:false})}}>+</button>
                            : <button className="Btn addBtn" onClick={()=>{
                                this.setState({addTaskVisible:false,
                                               editTaskVisible:false})}}>&#215;</button>
                    }
                    <div className="clear"/>
                    <Details/>
                    {
                        !this.state.editTaskVisible
                            ?null:
                            <div className="popup">
                                <div className="addForm">
                                    <EditTask taskName={this.state.taskName}
                                              changEditTaskVisible={this.changeEditTaskVisible}
                                              i={this.state.i}
                                              task_id={this.state.task_id}
                                              assignee={this.state.assignee}
                                              date={this.state.date}
                                              description={this.state.description}/>
                                </div>
                            </div>

                    }
                    {
                        this.state.addTaskVisible
                            ? <div className="popup"><div className="addForm"><AddTask changeAddTaskVisible={this.changeAddTaskVisible}/></div></div>
                            : null
                    }
            </div>
        )
    }
}

//convert current state.tasks into props.tasksProp for MainPage component
function StateToProps (state){
    return{
        tasksProp:state.tasks
    }
}

//convert 'select' action into props.select for MainPage component
function matchDispatchToProps(dispatch){
    return bindActionCreators({
        select:select,
        deleteTask:deleteTask,
        editTask:editTask
    },dispatch)
}

//connect storage and our MainPage component
export default connect(StateToProps,
    matchDispatchToProps)(MainPage);