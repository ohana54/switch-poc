import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';
import pagesReducer from './pagesReducer';
import filesReducer from './filesReducer';
import contextReducer from './contextReducer';

const rootReducer = combineReducers({
  context: contextReducer,
  pages: pagesReducer,
  files: filesReducer,
  routing: routeReducer
});

export default rootReducer;
