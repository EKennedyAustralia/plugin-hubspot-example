import { combineReducers } from 'redux';

import { reduce as CustomTaskListReducer } from './CustomTaskListState';

// Register your redux store under a unique namespace
export const namespace = 'hubsot';

// Combine the reducers
export default combineReducers({
  customTaskList: CustomTaskListReducer
});
