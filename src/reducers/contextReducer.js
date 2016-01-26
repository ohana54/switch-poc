const initialState = null;

export default function contextReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_CONTEXT':
      return action.context;
    default:
    return state;
  }
}
