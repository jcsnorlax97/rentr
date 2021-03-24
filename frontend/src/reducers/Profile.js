const initialState = {
  dialogStatus: false,
  profileListingArray: [],
}

export const profile = (state = initialState, action) => {
  switch (action.type) {
    case "SET_DIALOG_STATUS":
      return { ...state, dialogStatus: action.payload };
    case "SET_PROFILE_LISTING_ARRAY":
      return { ...state, profileListingArray: action.payload };
    default:
      return state;
  }
}