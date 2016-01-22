const initialState = {
  fileToLoad: null,
  file: null,
};

export default function filesReducer(state = initialState, action) {
  switch (action.type) {
    case 'BEGIN_LOAD_FILE':
      return {
        ...state,
        fileToLoad: action.fileToLoad
      };
    case 'END_LOAD_FILE':
      return {
        ...state,
        fileToLoad: null,
        file: action.file
      };
    default:
    return state;
  }
}
