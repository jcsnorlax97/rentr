const initialState = {
  listingArray: []
}

export const listingDetailReducer = (state = initialState, action) => {
  switch(action.type){
    case "SET_LISTING_ARRAY":
      return {...state, listingArray: action.payload};
    default: 
			return state;
  }
}