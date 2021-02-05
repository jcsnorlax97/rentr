const initialState = {
  price: 0,
  bedRoom: 0,
  washRoom: 0,
  laundryRoom: 0,
  description: "",
  imageSource: null,
}

export const listingDetailReducer = (state = initialState, action) => {
  switch(action.type){
    case "SET_PRICE":
      return {...state, price: action.payload};
    case "SET_BEDROOM":
      return {...state, bedRoom: action.payload};
    case "SET_WASHROOM":
      return {...state, washRoom: action.payload};
    case "SET_LAUNDRYROOM":
      return {...state, laundryRoom: action.payload};
    case "SET_DESCRIPTION":
      return {...state, description: action.payload};
    case "SET_IMAGE":
      return {...state, imageSource: action.payload};
    default: 
			return state;
  }
}