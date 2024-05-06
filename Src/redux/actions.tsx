export const SET_TASKS = 'SET_TASKS';
export const SET_TASKSID = 'SET_TASKSID';
export const SET_TASKSCSH = 'SET_TASKSCSH';
export const SET_TASKIDSCSH = 'SET_TASKIDSCSH';
export const SET_TASKSTARG = 'SET_TASKSTARG';
export const SET_TASKIDTARG = 'SET_TASKIDTARG';
export const SET_TASKSCONTRAT = 'SET_TASKSCONTRAT';
export const SET_TASKIDCONTRAT = 'SET_TASKIDCONTRAT';
export const SET_TASKSCSHCONVER = 'SET_TASKSCSHCONVER';
export const SET_TASKSCOVENANT = 'SET_TASKSCOVENANT';
export const SET_TASKSCEVACUTION = 'SET_TASKSCEVACUTION';
export const SET_TASKIDSCOVENANTID = 'SET_TASKIDSCOVENANTID';
export const SET_LANGUAGE = 'SET_LANGUAGE';
export const SET_LANGUAGESIGN = 'SET_LANGUAGESIGN';
export const SET_DARK = 'SET_DARK';

//المهام
export const setTasks = tasks => dispatch => {
  dispatch({type: SET_TASKS, payload: tasks});
};
export const setTasksID = tasksID => dispatch => {
  dispatch({type: SET_TASKSID, payload: tasksID});
};

//الديون
export const setTasksCsh = tasksCSH => dispatch => {
  dispatch({type: SET_TASKSCSH, payload: tasksCSH});
};
export const setTasksCshConver = tasksConver => dispatch => {
  dispatch({type: SET_TASKSCSHCONVER, payload: tasksConver});
};
export const setTasksCshID = tasksCSHID => dispatch => {
  dispatch({type: SET_TASKIDSCSH, payload: tasksCSHID});
};

//الاهداف
export const setTasksTarg = tasksTARG => dispatch => {
  dispatch({type: SET_TASKSTARG, payload: tasksTARG});
};
export const setTasksTargID = tasksTARGID => dispatch => {
  dispatch({type: SET_TASKIDTARG, payload: tasksTARGID});
};

//اعمالي
export const setTasksCONTRAT = tasksCONTRAT => dispatch => {
  dispatch({type: SET_TASKSCONTRAT, payload: tasksCONTRAT});
};
export const setTasksCONTRATID = tasksCONTRATID => dispatch => {
  dispatch({type: SET_TASKIDCONTRAT, payload: tasksCONTRATID});
};

//COVENANT
export const setTasksCOVENANT = tasksCOVENANT => dispatch => {
  dispatch({type: SET_TASKSCOVENANT, payload: tasksCOVENANT});
};
export const setTasksEVACUTION = tasksEVACUTION => dispatch => {
  dispatch({type: SET_TASKSCEVACUTION, payload: tasksEVACUTION});
};
export const setTasksCOVENANTID = tasksCOVENANTID => dispatch => {
  dispatch({type: SET_TASKIDSCOVENANTID, payload: tasksCOVENANTID});
};

export const setLanguage = Language => dispatch => {
  dispatch({type: SET_LANGUAGE, payload: Language});
};
export const setLanguageSign = Languagesign => dispatch => {
  dispatch({type: SET_LANGUAGESIGN, payload: Languagesign});
};

export const setDark = darkmode => dispatch => {
  dispatch({type: SET_DARK, payload: darkmode});
};
