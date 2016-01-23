const initialState = {
  currentTab: null,
  page: null,
  site: null
};

export default function pagesReducer(state = initialState, action) {
  switch (action.type) {
    case 'BEGIN_LOAD_PAGE':
      return {
        ...state
      };
    case 'END_LOAD_PAGE':
      const pageType = action.page.name === 'site' ? 'site' : 'page';
      return {
        ...state,
        [pageType]: action.page,
        currentTab: pageType
      };
    case 'UPDATE_PAGE_CONTENT':
      return {
        ...state,
        [action.tab]: {
          ...state[action.tab],
          content: action.content
        }
      };
    default:
    return state;
  }
}
