const initialState = {
  mainTasks: [],
};

const ADD_TASK = "ADD_TASK";
const TASK_DONE = "TASK_DONE";
const TASK_NOT_DONE = "TASK_NOT_DONE";
const DELETE_TASK = "DELETE_TASK";
const UPDATE_TASK = "UPDATE_TASK";

const todoReducer = (state = initialState, action) => {
  let { type, payload } = action;
  switch (type) {
    case ADD_TASK:
      return { ...state, mainTasks: [...state.mainTasks, payload] };

    case TASK_DONE:
      return {
        ...state,
        mainTasks: state.mainTasks.map((task) => {
          return task.id === payload.id ? { ...task, isDone: true } : task;
        }),
      };

    case TASK_NOT_DONE:
      return {
        ...state,
        mainTasks: state.mainTasks.map((task) => {
          return task.id === payload.id ? { ...task, isDone: false } : task;
        }),
      };

    case DELETE_TASK:
      return {
        ...state,
        mainTasks: state.mainTasks.filter((task) => {
          return task.id !== payload.id;
        }),
      };

    case UPDATE_TASK:
      return {
        ...state,
        mainTasks: state.mainTasks.map((task) => {
          return task.id === payload.id
            ? { ...task, title: payload.task }
            : task;
        }),
      };

    default:
      return state;
  }
};

export default todoReducer;
