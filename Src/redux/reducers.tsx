import {
    SET_TASKSID,SET_TASKS,
    SET_TASKSCSH,
    SET_TASKIDSCSH,
    SET_TASKSTARG,
    SET_TASKIDTARG,
    SET_TASKIDCONTRAT,
    SET_TASKSCONTRAT,
    SET_TASKSCSHCONVER,
    SET_TASKSCOVENANT,
    SET_TASKSCEVACUTION,
    SET_TASKIDSCOVENANTID
} from './actions';

const initialState  ={
tasks:[],
tasksID:0,
tasksCSH:[],
tasksCSHID:0,
tasksTARG:[],
tasksTARGID:0,
tasksCONTRAT:[],
tasksCONTRATID:0,
tasksConver:[],

tasksCOVENANT:[],
tasksEVACUTION:[],
tasksCOVENANTID:0
 
}

function userReducer (state = initialState, action){
switch(action.type){
    case SET_TASKS:
        return { ...state, tasks: action.payload};
    case SET_TASKSID:
        return { ...state, tasksID: action.payload};  
    case SET_TASKSCSH :
        return {...state, tasksCSH: action.payload}  
    case SET_TASKIDSCSH :
        return {...state, tasksCSHID: action.payload}  
    case SET_TASKSCSHCONVER :
        return {...state, tasksConver: action.payload}  
    case SET_TASKSTARG :
        return {...state, tasksTARG: action.payload}  
    case SET_TASKIDTARG :
        return {...state, tasksTARGID: action.payload}  
    case SET_TASKSCONTRAT :
        return {...state, tasksCONTRAT: action.payload}  
    case SET_TASKIDCONTRAT :
        return {...state, tasksCONTRATID: action.payload}  
    case SET_TASKSCOVENANT :
        return {...state, tasksCOVENANT: action.payload}  
    case SET_TASKSCEVACUTION :
        return {...state, tasksEVACUTION: action.payload}  
    case SET_TASKIDSCOVENANTID :
        return {...state, tasksCOVENANTID: action.payload}  
        default:
            return state;
}}

export default userReducer;