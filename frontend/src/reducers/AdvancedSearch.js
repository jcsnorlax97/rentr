const initialState = {
  dialogOpen: false,
  advancedSearching: false
}

export const advancedSearch = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ADVANCEDSEARCH_DIALOG":
      return { ...state, dialogOpen: action.payload };
    case "SET_ADVANCEDSEARCH_INPROGRESS":
      return { ...state, advancedSearching: action.payload };
    default:
      return state;
  }
}