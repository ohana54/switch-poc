const initialState = {};

export default function filesReducer(state = initialState, action) {
  switch (action.type) {
    case 'BEGIN_LOAD_FILE':
      return {
        [action.fileToLoad]: {
          name: action.fileToLoad,
          content: null,
          state: 'loading'
        },
        ...state
      };
    case 'END_LOAD_FILE':
      return {
        ...state,
        [action.file.name]: action.file
      };
    case 'UPDATE_FILE_CONTENT':
      return {
        ...state,
        [action.fileName]: {
          ...state[action.fileName],
          content: action.content,
          isDirty: true
        }
      };
    case 'BEGIN_SAVE':
      if (action.context.type !== 'file') return state;
      return {
        ...state,
        [action.context.name]: {
          ...state[action.context.name],
          state: 'saving',
          isDirty: false
        }
      };
    case 'END_SAVE':
      if (action.context.type !== 'file') return state;
      return {
        ...state,
        [action.context.name]: {
          ...state[action.context.name],
          state: undefined
        }
      };
    case 'FAIL_SAVE':
      if (action.context.type !== 'file') return state;
      return {
        ...state,
        [action.context.name]: {
          ...state[action.context.name],
          state: undefined,
          isDirty: true
        }
      };
    default:
    return state;
  }
}
