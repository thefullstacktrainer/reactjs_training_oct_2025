// Action types
export const ADD_STUDENT = 'ADD_STUDENT';
export const REMOVE_STUDENT = 'REMOVE_STUDENT';

// Action creators
export const addStudent = (student) => ({
  type: ADD_STUDENT,
  payload: student,
});

export const removeStudent = (id) => ({
  type: REMOVE_STUDENT,
  payload: id,
});
