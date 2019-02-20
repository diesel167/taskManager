import React, {Component} from 'react';
import {connect} from 'react-redux';

class Details extends Component{

    render(){
        if(!this.props.task){
            return(<div>Выберите задание</div>)
        }

        return(
            <div className="details">
                <p>Description:{this.props.task.task_description}</p>
            </div>
        )

    }
}

//convert current state.active into props.tasksProp for MainPage component
function StateToProps (state){
    return{
        task:state.active
    }
}

export default connect (StateToProps)(Details)