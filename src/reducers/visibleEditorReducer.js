const initialState = null;

export default function visibleEditorReducer(state = initialState, action) {
  switch (action.type) {
    case 'END_TRANSITION':
      return action.visibleEditor;
    default:
    return state;
  }
}
