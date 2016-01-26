const initialState = {
  currentTab: null,
  pages: {}
};

export default function pagesReducer(state = initialState, action) {
  switch (action.type) {
    case 'BEGIN_LOAD_PAGE':
      return {
        pages: {
          [action.pageToLoad]: {
            name: action.pageToLoad,
            content: null,
            state: 'loading'
          },
          ...state.pages
        },
        ...state
      };
    case 'END_LOAD_PAGE':
      return {
        ...state,
        pages: {
          ...state.pages,
          [action.page.name]: action.page
        }
      };
    case 'UPDATE_PAGE_CONTENT':
      return {
        ...state,
        pages: {
          ...state.pages,
          [action.pageName]: {
            ...state.pages[action.pageName],
            content: action.content
          }
        }
      };
    case 'BEGIN_SAVE':
      if (action.context.type !== 'page') return state;
      return {
        ...state,
        pages: {
          ...state.pages,
          [action.context.name]: {
            ...state.pages[action.context.name],
            state: 'saving'
          }
        }
      };
    case 'END_SAVE':
      if (action.context.type !== 'page') return state;
      return {
        ...state,
        pages: {
          ...state.pages,
          [action.context.name]: {
            ...state.pages[action.context.name],
            state: null
          }
        }
      };
    case 'SET_CONTEXT':
      if (action.context.type !== 'page') return state;
      const pageType = action.context.name === 'site' ? 'site' : 'page';
      return {
        ...state,
        currentTab: pageType
      };
    default:
    return state;
  }
}
