
const data = {
  pages: {
    page1: {
      name: 'page1',
      content: 'page 11111111111111'
    },
    page2: {
      name: 'page2',
      content: 'page 22222222222222'
    },
    site: {
      name: 'site',
      content: 'SITE JS SITE JS'
    }
  },
  files: {
    'file1.js': {
      name: 'file1.js',
      content: 'file 11111111111111'
    },
    'file2.js': {
      name: 'file2.js',
      content: 'file 22222222222222'
    }
  }
}

function loadPage(pageName) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('@@@ SERVER: loading ', pageName);
      resolve(data.pages[pageName]);
    }, 1500);
  });
}

function loadFile(fileName) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('@@@ SERVER: loading ', fileName);
      resolve(data.files[fileName]);
    }, 1500);
  });
}

function savePage(pageName, content) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (content !== 'fail') {
        console.log('@@@ SERVER: saving ', pageName);
        data.pages[pageName].content = content;
        resolve();
      } else {
        console.log('@@@ SERVER: failing to save ', pageName);
        reject();
      }
    }, 2500);
  });
}

function saveFile(fileName, content) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('@@@ SERVER: saving ', fileName);
      data.files[fileName].content = content;
      resolve();
    }, 2500);
  });
}

export default {
  loadPage,
  loadFile,
  savePage,
  saveFile
}
