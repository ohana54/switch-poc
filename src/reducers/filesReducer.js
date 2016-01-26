const initialState = {};

export default function filesReducer(state = initialState, action) {
  switch (action.type) {
    case 'BEGIN_LOAD_FILE':
      let file = state[action.file.name];
      if (!file) {
        file = {
          name: action.file.name,
          content: ''
        };
      }

      return {
        ...state,
        [file.name]: {
          ...file,
          state: 'loading'
        }
      };
    case 'END_LOAD_FILE':
      return {
        ...state,
        [action.file.name]: action.file
      };
    case 'FAIL_LOAD_FILE':
      const file2 = state[action.fileToLoad];
      return {
        ...state,
        [action.fileToLoad]: {
          ...file2,
          state: 'virtual'
        }
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
