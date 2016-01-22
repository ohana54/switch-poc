import server from './server';

export function switchContext(newContext) {
  return (dispatch, getState) => {
    const state = getState();
    if (!state.inTransition) {
      //saveCurrentContext(state.currentContext);
      dispatch(beginTransition(newContext));
    }

    if (newContext.type === 'page') {
      dispatch(loadPage(newContext)).then(dispatchEndTransition);
    }
    if (newContext.type === 'file') {
      dispatch(loadFile(newContext)).then(dispatchEndTransition);
    }

    function dispatchEndTransition({loaded}) {
      if (loaded) {
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

function endTransition(newContext) {
  return {
    type: 'END_TRANSITION',
    visibleEditor: newContext.type
  };
}

function saveCurrentContext() {
  return (dispatch, getState) => {
    const currentContext = getState().currentContext;
  }
}

function loadPage(newContext) {
  return (dispatch, getState) => {
    const state = getState().pages;
    const pageToLoad = newContext.name;
    if (state.pageToLoad === pageToLoad) {
      return Promise.resolve({loaded: false});
    }
    dispatch(beginLoadPage(pageToLoad));
    return server.loadPage(pageToLoad).then(function(page) {
      const state = getState().pages;
    	if (state.pageToLoad === pageToLoad) {
    		dispatch(endLoadPage(page));
    		return {loaded: true};
    	} else {
    		return {loaded: false};
    	}
    });
  };
}

function loadFile(newContext) {
  return (dispatch, getState) => {
    const state = getState().files;
    const fileToLoad = newContext.name;
    if (state.fileToLoad === fileToLoad) {
      return Promise.resolve({loaded: false});
    }
    dispatch(beginLoadFile(fileToLoad));
    return server.loadFile(fileToLoad).then(function(file) {
      const state = getState().files;
      if (state.fileToLoad === fileToLoad) {
        dispatch(endLoadFile(file));
        return {loaded: true};
      } else {
        return {loaded: false};
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
