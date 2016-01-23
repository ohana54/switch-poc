const initialState = {
  file: null
};

export default function filesReducer(state = initialState, action) {
  switch (action.type) {
    case 'BEGIN_LOAD_FILE':
      return {
        ...state
      };
    case 'END_LOAD_FILE':
      return {
        ...state,
        file: action.file
      };
    case 'UPDATE_FILE_CONTENT':
      return {
        ...state,
        file: {
          ...state.file,
          content: action.content
        }
      };
    default:
    return state;
  }
}
