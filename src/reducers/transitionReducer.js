const initialState = false;

export default function transitionReducer(state = initialState, action) {
  switch (action.type) {
    case 'BEGIN_TRANSITION':
      return true;
    case 'END_TRANSITION':
      return false;
    default:
    return state;
  }
}
