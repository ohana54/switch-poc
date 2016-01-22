import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';
import transitionReducer from './transitionReducer';
import visibleEditorReducer from './visibleEditorReducer';
import pagesReducer from './pagesReducer';
import filesReducer from './filesReducer';

const rootReducer = combineReducers({
  inTransition: transitionReducer,
  context: contextReducer,
  visibleEditor: visibleEditorReducer,
  pages: pagesReducer,
  files: filesReducer,
  routing: routeReducer
});

export default rootReducer;
