import server from './server';

export function switchContext(newContext) {
  return (dispatch, getState) => {
    const state = getState();
    if (!state.inTransition) {
      //saveCurrentContext(state.currentContext);
      dispatch(beginTransition(newContext));
    } else {
      dispatch(updateTransition(newContext));
    }

    if (newContext.type === 'page') {
      dispatch(loadPage(newContext)).then(dispatchEndTransition);
    }
    if (newContext.type === 'file') {
      dispatch(loadFile(newContext)).then(dispatchEndTransition);
    }

    function dispatchEndTransition() {
      const currentContext = getState().context;
    	if (currentContext === newContext) {
        dispatch(endTransition(newContext));
    	}
    }
  }
}

function beginTransition(context) {
  return {
    type: 'BEGIN_TRANSITION',
    context
  };
}

function updateTransition(context) {
  return {
    type: 'UPDATE_TRANSITION',
    context
  };
}

function endTransition(newContext) {
  return {
    type: 'END_TRANSITION',
    visibleEditor: newContext.type
  };
}

function saveCurrentContext() {
  return (dispatch, getState) => {
    const currentContext = getState().context;
  }
}

function loadPage(newContext) {
  return (dispatch, getState) => {
    const pageToLoad = newContext.name;
    //dispatch(beginLoadPage(pageToLoad));
    return server.loadPage(pageToLoad).then(function(page) {
      const currentContext = getState().context;
    	if (currentContext.name === pageToLoad) {
    		dispatch(endLoadPage(page));
    	}
    });
  };
}

function loadFile(newContext) {
  return (dispatch, getState) => {
    const fileToLoad = newContext.name;
    //dispatch(beginLoadFile(fileToLoad));
    return server.loadFile(fileToLoad).then(function(file) {
      const currentContext = getState().context;
      if (currentContext.name === fileToLoad) {
        dispatch(endLoadFile(file));
      }
    });
  };
}

function beginLoadFile(fileToLoad) {
  return {
    type: 'BEGIN_LOAD_FILE',
    fileToLoad
  }
}

function beginLoadPage(pageToLoad) {
  return {
    type: 'BEGIN_LOAD_PAGE',
    pageToLoad
  }
}

function endLoadPage(page) {
  return {
    type: 'END_LOAD_PAGE',
    page
  }
}

function endLoadFile(file) {
  return {
    type: 'END_LOAD_FILE',
    file
  }
}
