const initialState = null;

export default function contextReducer(state = initialState, action) {
  switch (action.type) {
    case 'BEGIN_TRANSITION':
    case 'UPDATE_TRANSITION':
      return action.context;
    default:
    return state;
  }
}
