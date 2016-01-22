const initialState = {
  pageToLoad: null,
  page: null,
  currentTab: null
};

export default function pagesReducer(state = initialState, action) {
  switch (action.type) {
    case 'BEGIN_LOAD_PAGE':
      return {
        ...state,
        pageToLoad: action.pageToLoad
      };
    case 'END_LOAD_PAGE':
      const currentTab = action.page.name === 'site' ? 'site' : 'page';
      return {
        ...state,
        pageToLoad: null,
        page: action.page,
        currentTab
      };
    default:
    return state;
  }
}
