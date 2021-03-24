const initialState = {
  dialogOpen: false,
}

export const advancedSearch = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ADVANCEDSEARCH_DIALOG":
      return { ...state, dialogOpen: action.payload };
    
    default:
      return state;
  }
}