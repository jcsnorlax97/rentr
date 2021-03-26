const initialState = {
  listingArray: [],
  pageNum: 1,
  numPerPage: 5,
  showListingDetail: false,
  selectedListing: {}
}

export const listingDetailReducer = (state = initialState, action) => {
  switch(action.type){
    case "SET_LISTING_ARRAY":
      return {...state, listingArray: action.payload};
    case "SET_PAGENUM":
      return {...state, pageNum: action.payload};
    case "SET_NUMPERPAGE":
      return {...state, numPerPage: action.payload};
    case "EXHIBIT_LISTING_DETAIL":
      return {...state, showListingDetail: action.payload.open, selectedListing: action.payload.selectedListing}
    default: 
			return state;
  }
}