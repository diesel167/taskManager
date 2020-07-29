import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {add, editTask} from "../actions";





class EditTask extends Component{

    constructor(props) {
        super(props);
        this.state = {
            i:this.props.i,
            taskName:this.props.taskName,
            assignee:this.props.assignee,
            date:this.props.date,
            description:this.props.description
        };
        this.onTaskNameChange = this.onTaskNameChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.onResponsibleChange = this.onResponsibleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onClose = this.onClose.bind(this);
    }



    onTaskNameChange(event){
        this.setState({taskName: event.target.value});
    }

    onDescriptionChange(event){
        this.setState({description: event.target.value});
    }

    onResponsibleChange(event){
        this.setState({assignee: event.target.value});
    }
    onDateChange(event){
        this.setState({date: event.target.value});
    }

    onSubmit(event){
        let newTask={
            task_id:this.state.task_id,
            task_title:this.state.taskName,
            task_description:this.state.description,
            deadline:this.state.date,
            assignee:this.state.assignee
        };
        this.props.changEditTaskVisible(); //hide AddTask component
        this.props.editTask(newTask,this.props.i);
        event.preventDefault();
    }
    onClose(){
        this.props.changEditTaskVisible(); //hide AddTask component
    }

    render(){
        return(<form onSubmit={this.onSubmit}>
            <div>
                <div className="close" onClick={this.onClose}>&#215;</div>
                <div>Task name:<textarea className="tasktext" name="com" rows="1" onChange={this.onTaskNameChange}  value={this.state.taskName}/> </div>
                <br/>
                <div>Description:<textarea  name="com" rows="2" onChange={this.onDescriptionChange}  value={this.state.description}/> </div>
                <br/>
                <div>Assignee:<textarea  name="com" rows="1" onChange={this.onResponsibleChange}  value={this.state.assignee}/> </div>
                <label>Deadline:<input  type="date" name="date" value={this.state.date} onChange={this.onDateChange}/></label>
            </div>
            <div className="Btn submit" onClick={this.onSubmit}/>
        </form>)
    }
}



//convert 'select' action into props.select for MainPage component
function matchDispatchToProps(dispatch){
    return bindActionCreators({
        add:add,
        editTask:editTask
    },dispatch)
}


export default connect(null,matchDispatchToProps)(EditTask)