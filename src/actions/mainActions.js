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

function save(contextToSave) {
  return (dispatch, getState) => {
    if (contextToSave === null) return;

    if (contextToSave.type === 'page') {
      const page = getState().pages.pages[contextToSave.name];
      if (!page || page.state === 'saving') return;

      dispatch(startSave(contextToSave));

      return server.savePage(page.name, page.content).then(dispatchEndSave).catch(dispatchFailSave);
  	}

  	if (contextToSave.type === 'file') {
      const file = getState().files[contextToSave.name];
      if (!file || file.state === 'saving') return;

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

function loadPage(newContext) {
  return (dispatch, getState) => {
    const pageToLoad = newContext.name;

    const page = getState().pages.pages[pageToLoad];
    if (page && page.state === 'saving') return;

    server.loadPage(pageToLoad).then(function(page) {
      dispatch(endLoadPage(page));
    });
  };
}

function loadFile(newContext) {
  return (dispatch, getState) => {
    const fileToLoad = newContext.name;

    const file = getState().files[fileToLoad];
    if (file && file.state === 'saving') return;

    server.loadFile(fileToLoad).then(function(file) {
      dispatch(endLoadFile(file));
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
