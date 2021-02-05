import { combineReducers } from "redux";
//import all the reducers in the files:
import { listingDetailReducer } from "../reducers/ListingDetail";

const allReducers = combineReducers({
  listingDetail: listingDetailReducer
});

export default allReducers;
