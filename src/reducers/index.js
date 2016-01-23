import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';
import transitionReducer from './transitionReducer';
import visibleEditorReducer from './visibleEditorReducer';
import pagesReducer from './pagesReducer';
import filesReducer from './filesReducer';
import contextReducer from './contextReducer';
import saveReducer from './saveReducer';

const rootReducer = combineReducers({
  inTransition: transitionReducer,
  context: contextReducer,
  saveContext: saveReducer,
  visibleEditor: visibleEditorReducer,
  pages: pagesReducer,
  files: filesReducer,
  routing: routeReducer
});

export default rootReducer;
