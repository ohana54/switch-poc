const initialState = null;

export default function currentFileReducer(state = initialState, action) {
  switch (action.type) {
    case 'END_TRANSITION':
      return action.context.name;
    default:
    return state;
  }
}
