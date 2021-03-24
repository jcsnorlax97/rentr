const initialState = {
  listingArray: [],
  pageNum: 1,
  numPerPage: 5,
  showListingDetail: false,
  listingDetail: {}
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
      const {open, listingDetail} = action.payload
      return {...state, showListingDetail: open, listingDetail}
    default: 
			return state;
  }
}