import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {select} from '../actions/index.js'
import {deleteTask} from '../actions/index.js'
import {editTask} from '../actions/index.js'
import AddTask from './AddTask.js'
import Details from "./Details";


class MainPage extends Component {

    constructor() {
        super();
        this.state = {
            addTaskVisible: false
        };
        this.changeAddTaskVisible = this.changeAddTaskVisible.bind(this);
    }

    showTask=()=>{
        return(
            this.props.tasksProp.tasks.map((task)=>{
                return(
                        <div key={task.task_id} onClick={()=>{this.props.select(task)}}>
                            {task.task_title}
                        </div>)
            })
        )
    };

    //function for AddTask component for hiding itself after Submit click
    changeAddTaskVisible=()=>{
        this.setState({addTaskVisible:!this.state.addTaskVisible});
    };

    createTable=()=>{
        let rows=[];    //create rows container

        this.props.tasksProp.tasks.map((task,i)=>{
            let cells=[];
            cells.push(<td>{task.task_title}</td>);
            cells.push(<td>{task.assignee}</td>);
            cells.push(<td>{task.deadline}</td>);
            cells.push(<td><button onClick={()=>{
                this.props.deleteTask(i);
            }}>delete</button><button onClick={()=>{


            }}>edit</button></td>);

            rows.push(<tr tabIndex="0" onClick={()=>{this.props.select(task)}}>{cells}</tr>);    //join filled cells  container to rows container (join a row)
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
                    !this.state.addTaskVisible
                        ? <button className="Btn addBtn" onClick={()=>{
                            this.setState({addTaskVisible:!this.state.addTaskVisible})}}>+</button>
                        : <button className="Btn addBtn" onClick={()=>{
                            this.setState({addTaskVisible:!this.state.addTaskVisible})}}>&#215;</button>
                }
                {
                    this.state.addTaskVisible
                        ? <div className="oneLine"><div className="addForm"><AddTask changeAddTaskVisible={this.changeAddTaskVisible}/></div><Details/><div className="clear"/></div>
                        : <div className="oneLine"><Details/></div>
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