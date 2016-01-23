const initialState = null;

export default function saveReducer(state = initialState, action) {
  switch (action.type) {
    case 'START_SAVE':
      return action.context;
    case 'END_SAVE':
      return null;
    default:
    return state;
  }
}
