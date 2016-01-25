import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';
import visibleEditorReducer from './visibleEditorReducer';
import pagesReducer from './pagesReducer';
import filesReducer from './filesReducer';
import contextReducer from './contextReducer';
import contextToShowReducer from './contextToShowReducer';
import currentFileReducer from './currentFileReducer';

const rootReducer = combineReducers({
  context: contextReducer,
  contextToShow: contextToShowReducer,
  visibleEditor: visibleEditorReducer,
  pages: pagesReducer,
  files: filesReducer,
  currentFileName: currentFileReducer,
  routing: routeReducer
});

export default rootReducer;
