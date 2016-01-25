const initialState = null;

export default function contextToShowReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_IN_TRANSITION':
      return action.context;
    case 'END_TRANSITION':
      return null;
    default:
    return state;
  }
}
