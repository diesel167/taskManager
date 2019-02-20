import { combineReducers } from 'redux';
import ActiveTask from './task-active'
import changing from './task-change.js'


//combine all small reducers in one
const reducers = combineReducers({
  tasks:changing,
  active:ActiveTask,

});

export default reducers;
