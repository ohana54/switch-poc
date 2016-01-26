import server from './server';

export function switchContext(newContext) {
  return (dispatch, getState) => {
    const state = getState();
    dispatch(setContext(newContext));

    dispatch(save(state.context));

    if (newContext.type === 'page') {
      dispatch(loadPage(newContext));
    }
    if (newContext.type === 'file') {
      dispatch(loadFile(newContext));
    }
  }
}

function shouldSave(item) {
  return item.isDirty && item.state !== 'saving';
}

export function save(contextToSave) {
  return (dispatch, getState) => {
    if (contextToSave === null) return;

    if (contextToSave.type === 'page') {
      const page = getState().pages.pages[contextToSave.name];
      if (!shouldSave(page)) return;

      dispatch(startSave(contextToSave));

      return server.savePage(page.name, page.content).then(dispatchEndSave).catch(dispatchFailSave);
  	}

  	if (contextToSave.type === 'file') {
      const file = getState().files[contextToSave.name];
      if (!shouldSave(file)) return;

      dispatch(startSave(contextToSave));

  		return server.saveFile(file.name, file.content).then(dispatchEndSave).catch(dispatchFailSave);
  	}

    function dispatchEndSave() {
      dispatch(endSave(contextToSave));
    }

    function dispatchFailSave() {
      dispatch(failSave(contextToSave));
    }
  }
}

function shouldLoad(item) {
  return !item || item.state === 'virtual';
}

function loadPage(newContext) {
  return (dispatch, getState) => {
    const pageToLoad = newContext.name;

    const page = getState().pages.pages[pageToLoad];
    // we assume that we don't have concurrent sessions
    // so we use the cached version of the code instead of reloading it
    // if we do decide to reload, we need to consider that the current
    // [potentially unsaved] content will be overridden
    if (!shouldLoad(page)) return;

    dispatch(beginLoadPage(newContext));

    server.loadPage(pageToLoad).then(function(page) {
      dispatch(endLoadPage(page));
    }).catch(function() {
      dispatch(failLoadPage(pageToLoad));
    });
  };
}

function loadFile(newContext) {
  return (dispatch, getState) => {
    const fileToLoad = newContext.name;

    const file = getState().files[fileToLoad];
    if (!shouldLoad(file)) return;

    dispatch(beginLoadFile(newContext));

    server.loadFile(fileToLoad).then(function(file) {
      dispatch(endLoadFile(file));
    }).catch(function() {
      dispatch(failLoadFile(fileToLoad));
    });
  };
}

export function updatePageContent(pageName, content) {
  return {
    type: 'UPDATE_PAGE_CONTENT',
    pageName,
    content
  }
}

export function updateFileContent(fileName, content) {
  return {
    type: 'UPDATE_FILE_CONTENT',
    fileName,
    content
  }
}

function setContext(context) {
  return {
    type: 'SET_CONTEXT',
    context
  };
}

function startSave(contextToSave) {
  return {
    type: 'BEGIN_SAVE',
    context: contextToSave
  }
}

function endSave(context) {
  return {
    type: 'END_SAVE',
    context
  }
}

function failSave(context) {
  return {
    type: 'FAIL_SAVE',
    context
  }
}

function beginLoadFile(file) {
  return {
    type: 'BEGIN_LOAD_FILE',
    file
  }
}

function beginLoadPage(page) {
  return {
    type: 'BEGIN_LOAD_PAGE',
    page
  }
}

function endLoadPage(page) {
  return {
    type: 'END_LOAD_PAGE',
    page
  }
}

function failLoadPage(pageToLoad) {
  return {
    type: 'FAIL_LOAD_PAGE',
    pageToLoad
  }
}

function failLoadFile(fileToLoad) {
  return {
    type: 'FAIL_LOAD_FILE',
    fileToLoad
  }
}

function endLoadFile(file) {
  return {
    type: 'END_LOAD_FILE',
    file
  }
}


export function autoSave(context) {
  return (dispatch, getState) => {
    const state = getState();
    dispatch(save(context));
  }
}
