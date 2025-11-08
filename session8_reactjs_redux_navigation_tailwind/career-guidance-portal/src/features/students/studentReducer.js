import { ADD_STUDENT, REMOVE_STUDENT } from './studentActions';

const initialState = {
  list: [],
};

export const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_STUDENT:
      return { ...state, list: [...state.list, action.payload] };

    case REMOVE_STUDENT:
      return {
        ...state,
        list: state.list.filter((student) => student.id !== action.payload),
      };

    default:
      return state;
  }
};
