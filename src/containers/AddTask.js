import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {add} from "../actions";


let date=new Date();

//do 01..09 format for 1..9
function addZero(n) {
    return n > 9 ? n : '0' + n ;
}

class AddTask extends Component{

    constructor() {
        super();
        this.state = {
            taskName:'',
            responsible:'',
            date:date.getFullYear()+'-'+addZero(date.getMonth())+'-'+addZero(date.getDate()),
            description:''
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
        this.setState({responsible: event.target.value});
    }
    onDateChange(event){
        this.setState({date: event.target.value});
    }

    onSubmit(event){
        let newTask={
            task_id:'',
            task_title:this.state.taskName,
            task_description:this.state.description,
            deadline:this.state.date,
            assignee:this.state.responsible
        };
        this.props.changeAddTaskVisible(); //hide AddTask component
        this.props.add(newTask);
        event.preventDefault();
    }
    onClose(){
        this.props.changeAddTaskVisible(); //hide AddTask component
    }
    render(){
        return(<form onSubmit={this.onSubmit}>
                    <div>
                        <div className="close" onClick={this.onClose}>&#215;</div>
                        <div>Task name:<textarea className="tasktext" name="com" rows="1" onChange={this.onTaskNameChange}  value={this.state.taskName}/> </div>
                        <br/>
                        <div>Description:<textarea  name="com" rows="2" onChange={this.onDescriptionChange}  value={this.state.description}/> </div>
                        <br/>
                        <div>Assignee:<textarea  name="com" rows="1" onChange={this.onResponsibleChange}  value={this.state.responsible}/> </div>
                        <label>Deadline:<input  type="date" name="date" value={this.state.date} onChange={this.onDateChange}/></label>
                    </div>
                    <div className="Btn submit" onClick={this.onSubmit}/>
               </form>)
    }
}

//convert 'select' action into props.select for MainPage component
function matchDispatchToProps(dispatch){
    return bindActionCreators({
        add:add
    },dispatch)
}


export default connect(null,matchDispatchToProps)(AddTask)