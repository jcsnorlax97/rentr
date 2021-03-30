const initialState = {
  listingArray: [],
  pageNum: 1,
  numPerPage: 5,
  showListingDetail: false,
  selectedListing: {},
  readOnly: false,
  qnaInfo: null,
  comments: new Map(),
  newQuestion: ""
}

export const listingDetailReducer = (state = initialState, action) => {
  switch(action.type){
    case "SET_LISTING_ARRAY":
      return {...state, listingArray: action.payload};
    case "SET_PAGENUM":
      return {...state, pageNum: action.payload};
    case "SET_NUMPERPAGE":
      return {...state, numPerPage: action.payload};
    case "SET_READONLY":
      return {...state, readOnly: action.payload};
    case "SETQNA_INFO":
      return {...state, qnaInfo: action.payload};
    case "SET_NEWQUESTION":
      return {...state, newQuestion: action.payload};
    case "SET_COMMENTS":
      return {...state, comments: action.payload};
    case "EXHIBIT_LISTING_DETAIL":
      return {...state, showListingDetail: action.payload.open, selectedListing: action.payload.selectedListing}
    default: 
			return state;
  }
}