import { createStore, combineReducers } from 'redux';
import { studentReducer } from '../features/students/studentReducer';

const rootReducer = combineReducers({
  students: studentReducer,
});

export const storeRedux = createStore(rootReducer);
