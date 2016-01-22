
const data = {
  pages: {
    page1: {
      name: 'page1',
      content: 'page 11111111111111'
    },
    page2: {
      name: 'page2',
      content: 'page 22222222222222'
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
      resolve(data.pages[pageName]);
    }, 1500);
  });
}

function loadFile(fileName) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data.files[fileName]);
    }, 1500);
  });
}

export default {
  loadPage,
  loadFile
}
